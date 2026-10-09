// Data Story Builder: a form-based template that generates a complete data
// story page (title, question, source, overview, chart, findings, conclusion,
// reflection) and previews it with the local Chart.js (PRD.md section 19).
window.WebLab = window.WebLab || {};

(function (WebLab) {
  "use strict";

  var DEFAULTS = {
    title: "城市空气质量小调查",
    question: "过去半年，这座城市的空气质量变好了吗？",
    source: "数据来自某城市环保部门 2025 年 1–6 月的公开月报。",
    overview: "我们统计了 1 月到 6 月的空气质量优良天数，共 6 组数据。",
    chartType: "bar",
    labelsText: "一月, 二月, 三月, 四月, 五月, 六月",
    valuesText: "12, 15, 14, 18, 20, 22",
    findingsText: "优良天数整体在上升\n4 到 6 月增长最明显",
    conclusion: "过去半年空气质量有变好的趋势，但仍需长期观察。",
    reflection: "这次项目让我学会用图表讲清楚一个研究问题。"
  };

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function parseList(text) {
    return String(text || "")
      .split(",")
      .map(function (item) { return item.trim(); })
      .filter(Boolean);
  }

  function parseNumbers(text) {
    return parseList(text).map(function (item) { return Number(item) || 0; });
  }

  function buildStory(state) {
    var s = Object.assign({}, DEFAULTS, state || {});
    var labels = parseList(s.labelsText);
    var values = parseNumbers(s.valuesText);
    var findings = String(s.findingsText || "")
      .split("\n")
      .map(function (line) { return line.trim(); })
      .filter(Boolean);

    var findingCards = findings
      .map(function (text) {
        return '      <div class="finding">' + escapeHtml(text) + "</div>";
      })
      .join("\n");

    var html = [
      '<header class="story-header">',
      "  <h1>" + escapeHtml(s.title) + "</h1>",
      "</header>",
      "<main>",
      '  <section id="question"><h2>研究问题</h2><p>' + escapeHtml(s.question) + "</p></section>",
      '  <section id="source"><h2>数据来源</h2><p>' + escapeHtml(s.source) + "</p></section>",
      '  <section id="overview"><h2>数据概览</h2><p>' + escapeHtml(s.overview) + "</p></section>",
      '  <section id="chart"><h2>数据图表</h2>',
      '    <div class="chart-box"><canvas id="chart"></canvas></div>',
      "  </section>",
      '  <section id="findings"><h2>主要发现</h2>',
      '    <div class="findings">',
      findingCards,
      "    </div>",
      "  </section>",
      '  <section id="conclusion"><h2>结论</h2><p>' + escapeHtml(s.conclusion) + "</p></section>",
      "</main>",
      '<footer id="reflection"><h2>反思</h2><p>' + escapeHtml(s.reflection) + "</p></footer>"
    ].join("\n");

    var css = [
      "body { font-family: sans-serif; margin: 0; color: #333; }",
      ".story-header { background: #1677ff; color: #ffffff; padding: 24px; }",
      ".story-header h1 { margin: 0; }",
      "main { max-width: 800px; margin: 0 auto; padding: 16px; }",
      "section { margin-bottom: 24px; }",
      ".chart-box { position: relative; height: 240px; }",
      ".findings { display: flex; flex-wrap: wrap; gap: 12px; }",
      ".finding { flex: 1 1 200px; background: #f5f7fa; border: 1px solid #e3e8ef; border-radius: 12px; padding: 12px; }",
      "footer { background: #f5f7fa; color: #666; padding: 16px; }"
    ].join("\n");

    var js = [
      'const ctx = document.getElementById("chart");',
      "",
      "new Chart(ctx, {",
      '  type: "' + s.chartType + '",',
      "  data: {",
      "    labels: " + JSON.stringify(labels) + ",",
      "    datasets: [{ label: \"数值\", data: " + JSON.stringify(values) + ', backgroundColor: "#1677ff" }]',
      "  },",
      "  options: { responsive: true, maintainAspectRatio: false }",
      "});"
    ].join("\n");

    return { html: html, css: css, js: js };
  }

  function field(name, label, control) {
    return (
      '<div class="cp-field">' +
        '<label for="ds-' + name + '">' + label + "</label>" +
        '<div class="cp-field__control">' + control + "</div>" +
      "</div>"
    );
  }

  function textarea(name, value) {
    return '<textarea id="ds-' + name + '" data-ds="' + name + '" rows="2">' + escapeHtml(value) + "</textarea>";
  }

  function markup() {
    return (
      '<div class="data-story" data-data-story>' +
        '<div class="data-story__form">' +
          field("title", "项目名称", '<input id="ds-title" type="text" data-ds="title" value="' + escapeHtml(DEFAULTS.title) + '">') +
          field("question", "研究问题", textarea("question", DEFAULTS.question)) +
          field("source", "数据来源", textarea("source", DEFAULTS.source)) +
          field("overview", "数据概览", textarea("overview", DEFAULTS.overview)) +
          field("chartType", "图表类型", '<select id="ds-chartType" data-ds="chartType"><option value="bar">柱状图 bar</option><option value="line">折线图 line</option><option value="pie">饼图 pie</option></select>') +
          field("labelsText", "图表标签（逗号分隔）", '<input id="ds-labelsText" type="text" data-ds="labelsText" value="' + escapeHtml(DEFAULTS.labelsText) + '">') +
          field("valuesText", "图表数值（逗号分隔）", '<input id="ds-valuesText" type="text" data-ds="valuesText" value="' + escapeHtml(DEFAULTS.valuesText) + '">') +
          field("findingsText", "主要发现（每行一条）", '<textarea id="ds-findingsText" data-ds="findingsText" rows="3">' + escapeHtml(DEFAULTS.findingsText) + "</textarea>") +
          field("conclusion", "结论", textarea("conclusion", DEFAULTS.conclusion)) +
          field("reflection", "反思", textarea("reflection", DEFAULTS.reflection)) +
          '<button class="btn btn--ghost" type="button" data-ds-reset>恢复默认</button>' +
        "</div>" +
        '<div class="data-story__preview">' +
          '<pre class="code-block"><code data-ds-code></code></pre>' +
          '<iframe class="preview__frame" data-ds-frame sandbox="allow-scripts" title="数据故事预览"></iframe>' +
        "</div>" +
      "</div>"
    );
  }

  var active = null;

  function readState(root) {
    var state = Object.assign({}, DEFAULTS);
    Array.prototype.forEach.call(root.querySelectorAll("[data-ds]"), function (input) {
      state[input.getAttribute("data-ds")] = input.value;
    });
    return state;
  }

  function create(root) {
    destroyActive();
    var frame = root.querySelector("[data-ds-frame]");
    var codeEl = root.querySelector("[data-ds-code]");
    var resetButton = root.querySelector("[data-ds-reset]");
    var inputs = root.querySelectorAll("[data-ds]");

    var preview = WebLab.Preview.create(frame, { live: false, chart: true });

    function update() {
      var story = buildStory(readState(root));
      if (codeEl) { codeEl.textContent = story.html; }
      preview.run(story);
    }

    Array.prototype.forEach.call(inputs, function (input) {
      input.addEventListener("input", update);
      input.addEventListener("change", update);
    });

    if (resetButton) {
      resetButton.addEventListener("click", function () {
        Array.prototype.forEach.call(inputs, function (input) {
          var name = input.getAttribute("data-ds");
          input.value = DEFAULTS[name];
        });
        update();
      });
    }

    update();

    active = {
      update: update,
      readState: function () { return readState(root); },
      destroy: function () { preview.destroy(); }
    };
    return active;
  }

  function destroyActive() {
    if (active && active.destroy) {
      active.destroy();
    }
    active = null;
  }

  WebLab.DataStory = {
    markup: markup,
    create: create,
    buildStory: buildStory,
    defaults: DEFAULTS,
    destroyActive: destroyActive
  };
})(window.WebLab);
