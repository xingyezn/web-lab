// Chart Lab: interactive data -> config -> chart, plus a misleading-chart demo.
// Charts render inside the sandbox preview with the local Chart.js copy.
window.WebLab = window.WebLab || {};

(function (WebLab) {
  "use strict";

  var DEFAULTS = {
    type: "bar",
    title: "每月访问量",
    labels: ["一月", "二月", "三月", "四月", "五月"],
    values: [120, 200, 150, 80, 170]
  };

  var CHART_HTML =
    '<div style="position:relative;height:260px;">' +
      '<canvas id="chart"></canvas>' +
    "</div>";

  var CHART_CSS = "body { margin: 0; padding: 8px; font-family: sans-serif; }";

  function datasetCode(state) {
    var values = JSON.stringify(state.values);
    if (state.type === "line") {
      return '{ label: "数值", data: ' + values + ', borderColor: "#1677ff", backgroundColor: "rgba(22,119,255,0.2)", tension: 0.3, fill: true }';
    }
    if (state.type === "pie") {
      return '{ label: "数值", data: ' + values + ', backgroundColor: ["#1677ff","#52c41a","#faad14","#f5222d","#722ed1","#13c2c2"] }';
    }
    return '{ label: "数值", data: ' + values + ', backgroundColor: "#1677ff" }';
  }

  function buildCode(state) {
    var s = Object.assign({}, DEFAULTS, state || {});
    return (
      'const ctx = document.getElementById("chart");\n\n' +
      "new Chart(ctx, {\n" +
      '  type: "' + s.type + '",\n' +
      "  data: {\n" +
      "    labels: " + JSON.stringify(s.labels) + ",\n" +
      "    datasets: [\n      " + datasetCode(s) + "\n    ]\n" +
      "  },\n" +
      "  options: {\n" +
      "    responsive: true,\n" +
      "    maintainAspectRatio: false,\n" +
      "    plugins: {\n" +
      "      title: { display: true, text: " + JSON.stringify(s.title) + " }\n" +
      "    }\n" +
      "  }\n" +
      "});"
    );
  }

  function row(index) {
    return (
      '<div class="chart-lab__row">' +
        '<input type="text" data-cl="label" data-cl-index="' + index + '" value="' + DEFAULTS.labels[index] + '" aria-label="标签 ' + (index + 1) + '">' +
        '<input type="number" data-cl="value" data-cl-index="' + index + '" value="' + DEFAULTS.values[index] + '" aria-label="数值 ' + (index + 1) + '">' +
      "</div>"
    );
  }

  function markup() {
    var rows = DEFAULTS.labels.map(function (_, index) { return row(index); }).join("");
    return (
      '<div class="chart-lab" data-chart-lab>' +
        '<div class="chart-lab__controls">' +
          '<div class="cp-field"><label for="cl-type">图表类型</label>' +
            '<div class="cp-field__control"><select id="cl-type" data-cl="type">' +
              '<option value="bar">柱状图 bar</option>' +
              '<option value="line">折线图 line</option>' +
              '<option value="pie">饼图 pie</option>' +
            "</select></div>" +
          "</div>" +
          '<div class="cp-field"><label for="cl-title">标题</label>' +
            '<div class="cp-field__control"><input id="cl-title" type="text" data-cl="title" value="' + DEFAULTS.title + '"></div>' +
          "</div>" +
          '<div class="chart-lab__data"><p class="chart-lab__data-title">数据（标签 / 数值）</p>' + rows + "</div>" +
          '<button class="btn btn--ghost" type="button" data-cl-reset>恢复默认</button>' +
        "</div>" +
        '<div class="chart-lab__preview">' +
          '<pre class="code-block"><code data-cl-code></code></pre>' +
          '<iframe class="preview__frame" data-cl-frame sandbox="allow-scripts" title="图表预览"></iframe>' +
        "</div>" +
      "</div>"
    );
  }

  function readState(root) {
    var state = Object.assign({}, DEFAULTS, { labels: [], values: [] });
    var typeInput = root.querySelector('[data-cl="type"]');
    var titleInput = root.querySelector('[data-cl="title"]');
    if (typeInput) { state.type = typeInput.value; }
    if (titleInput) { state.title = titleInput.value; }
    var labels = root.querySelectorAll('[data-cl="label"]');
    var values = root.querySelectorAll('[data-cl="value"]');
    Array.prototype.forEach.call(labels, function (input) { state.labels.push(input.value); });
    Array.prototype.forEach.call(values, function (input) { state.values.push(Number(input.value)); });
    return state;
  }

  var activePreviews = [];

  function destroyActive() {
    activePreviews.forEach(function (preview) {
      preview.destroy();
    });
    activePreviews = [];
  }

  function create(root) {
    destroyActive();
    var frame = root.querySelector("[data-cl-frame]");
    var codeEl = root.querySelector("[data-cl-code]");
    var resetButton = root.querySelector("[data-cl-reset]");
    var inputs = root.querySelectorAll("[data-cl]");

    var preview = WebLab.Preview.create(frame, { live: false, chart: true });
    activePreviews.push(preview);

    function update() {
      var state = readState(root);
      var code = buildCode(state);
      if (codeEl) { codeEl.textContent = code; }
      preview.run({ html: CHART_HTML, css: CHART_CSS, js: code });
    }

    Array.prototype.forEach.call(inputs, function (input) {
      input.addEventListener("input", update);
      input.addEventListener("change", update);
    });

    if (resetButton) {
      resetButton.addEventListener("click", function () {
        var typeInput = root.querySelector('[data-cl="type"]');
        var titleInput = root.querySelector('[data-cl="title"]');
        if (typeInput) { typeInput.value = DEFAULTS.type; }
        if (titleInput) { titleInput.value = DEFAULTS.title; }
        Array.prototype.forEach.call(root.querySelectorAll('[data-cl="label"]'), function (input, index) {
          input.value = DEFAULTS.labels[index];
        });
        Array.prototype.forEach.call(root.querySelectorAll('[data-cl="value"]'), function (input, index) {
          input.value = DEFAULTS.values[index];
        });
        update();
      });
    }

    update();
    return { update: update };
  }

  // ---- Misleading chart demo: same data, different y-axis start ----
  function misleadingCode(misleading) {
    var options = misleading
      ? 'scales: { y: { beginAtZero: false, suggestedMin: 90, suggestedMax: 100 } }'
      : 'scales: { y: { beginAtZero: true } }';
    return (
      'const ctx = document.getElementById("chart");\n\n' +
      "new Chart(ctx, {\n" +
      '  type: "bar",\n' +
      "  data: {\n" +
      '    labels: ["A", "B", "C", "D", "E"],\n' +
      "    datasets: [{ label: \"分数\", data: [96, 98, 95, 99, 97], backgroundColor: \"#1677ff\" }]\n" +
      "  },\n" +
      "  options: {\n" +
      "    responsive: true,\n" +
      "    maintainAspectRatio: false,\n" +
      "    plugins: { legend: { display: false } },\n" +
      "    " + options + "\n" +
      "  }\n" +
      "});"
    );
  }

  function misleadingMarkup() {
    return (
      '<div class="chart-demo" data-chart-demo>' +
        '<div class="chart-demo__panes">' +
          '<figure class="chart-demo__pane">' +
            '<figcaption>真实：纵轴从 0 开始</figcaption>' +
            '<iframe data-chart-demo-frame="normal" sandbox="allow-scripts" title="真实图表"></iframe>' +
          "</figure>" +
          '<figure class="chart-demo__pane">' +
            '<figcaption>误导：纵轴从 90 开始</figcaption>' +
            '<iframe data-chart-demo-frame="misleading" sandbox="allow-scripts" title="误导图表"></iframe>' +
          "</figure>" +
        "</div>" +
        '<p class="chart-demo__note">同样的数据，截断纵轴会让差异看起来大得多——这就是误导性图表。</p>' +
      "</div>"
    );
  }

  function createMisleading(root) {
    destroyActive();
    var panes = [
      { frame: root.querySelector('[data-chart-demo-frame="normal"]'), misleading: false },
      { frame: root.querySelector('[data-chart-demo-frame="misleading"]'), misleading: true }
    ];
    panes.forEach(function (pane) {
      if (!pane.frame) { return; }
      var preview = WebLab.Preview.create(pane.frame, { live: false, chart: true });
      activePreviews.push(preview);
      preview.run({ html: CHART_HTML, css: CHART_CSS, js: misleadingCode(pane.misleading) });
    });
  }

  WebLab.ChartLab = {
    markup: markup,
    create: create,
    buildCode: buildCode,
    misleadingMarkup: misleadingMarkup,
    createMisleading: createMisleading,
    defaults: DEFAULTS,
    destroyActive: destroyActive
  };
})(window.WebLab);
