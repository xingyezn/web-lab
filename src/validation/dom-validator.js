// DOM validator: runs student code plus a verification script inside a fresh
// sandbox iframe, then reads the result through postMessage.
// Message source is verified against the iframe window (ARCHITECTURE.md §16).
window.WebLab = window.WebLab || {};
window.WebLab.Validation = window.WebLab.Validation || {};

(function (Validation) {
  "use strict";

  var TIMEOUT_MS = 2500;

  function buildVerificationScript(spec) {
    var json = JSON.stringify(spec || {});
    return [
      "(function () {",
      "  var spec = " + json + ";",
      "  function send(result) {",
      "    try { parent.postMessage({ source: 'weblab-preview', type: 'validation', result: result }, '*'); } catch (e) {}",
      "  }",
      "  function normalize(value) { return String(value == null ? '' : value).replace(/\\s+/g, ' ').trim(); }",
      "  function run() {",
      "    try {",
      "      if (spec.eventCheck != null) {",
      "        var count = window.__weblabEventCount || 0;",
      "        if (count >= spec.eventCheck) { send({ success: true, message: '检测到 ' + count + ' 个事件监听。' }); }",
      "        else { send({ success: false, message: '还没有检测到事件监听，例如 addEventListener(\"click\", ...)。' }); }",
      "        return;",
      "      }",
      "      if (spec.chart) {",
      "        var chart = null;",
      "        if (window.Chart && typeof window.Chart.getChart === 'function') {",
      "          var canvas = spec.chart.canvas ? document.querySelector(spec.chart.canvas) : document.querySelector('canvas');",
      "          if (canvas) { chart = window.Chart.getChart(canvas); }",
      "        }",
      "        if (!chart && window.__weblabCharts && window.__weblabCharts.length) { chart = window.__weblabCharts[window.__weblabCharts.length - 1]; }",
      "        if (!chart) { send({ success: false, message: '还没有检测到图表。请确认 canvas 与 new Chart(...) 已正确创建。' }); return; }",
      "        var config = chart.config || {};",
      "        var data = config.data || {};",
      "        var problems = [];",
      "        if (spec.chart.chartType && config.type !== spec.chart.chartType) { problems.push('图表类型应为 ' + spec.chart.chartType + '，当前是 ' + config.type); }",
      "        if (spec.chart.datasets) {",
      "          var need = typeof spec.chart.datasets === 'number' ? spec.chart.datasets : spec.chart.datasets.length;",
      "          var have = (data.datasets || []).length;",
      "          if (have < need) { problems.push('数据集至少需要 ' + need + ' 个，当前 ' + have + ' 个'); }",
      "        }",
      "        if (spec.chart.labels && spec.chart.labels.length) {",
      "          var actualLabels = data.labels || [];",
      "          var missing = spec.chart.labels.filter(function (label) { return actualLabels.indexOf(label) === -1; });",
      "          if (missing.length) { problems.push('标签缺少：' + missing.join('、')); }",
      "        }",
      "        if (spec.chart.title) {",
      "          var titleText = '';",
      "          try { titleText = config.options.plugins.title.text || ''; } catch (e) {}",
      "          if (String(titleText).indexOf(spec.chart.title) === -1) { problems.push('图表标题应包含「' + spec.chart.title + '」'); }",
      "        }",
      "        if (problems.length) { send({ success: false, message: problems.join('；') + '。' }); }",
      "        else { send({ success: true, message: '图表检查通过（类型：' + config.type + '）。' }); }",
      "        return;",
      "      }",
      "      var trigger = spec.trigger || null;",
      "      if (trigger && trigger.selector) {",
      "        var target = document.querySelector(trigger.selector);",
      "        if (!target) { send({ success: false, message: '找不到要触发的元素 ' + trigger.selector + '。' }); return; }",
      "        if (trigger.type === 'click') { target.click(); }",
      "      }",
      "      var assert = spec.assert || {};",
      "      var element = document.querySelector(assert.selector);",
      "      if (!element) { send({ success: false, message: '找不到元素 ' + assert.selector + '。' }); return; }",
      "      var actual;",
      "      if (assert.property === 'class') { actual = element.classList.contains(assert.expected) ? assert.expected : ''; }",
      "      else if (String(assert.property).indexOf('style.') === 0) { actual = element.style[assert.property.slice(6)]; }",
      "      else { actual = element[assert.property]; }",
      "      if (normalize(actual) === normalize(assert.expected)) {",
      "        send({ success: true, message: assert.selector + ' 的状态正确。' });",
      "      } else {",
      "        send({ success: false, message: assert.selector + ' 的 ' + assert.property + ' 应为「' + assert.expected + '」，当前是「' + actual + '」。' });",
      "      }",
      "    } catch (e) { send({ success: false, message: '运行出错：' + e.message }); }",
      "  }",
      "  setTimeout(run, 0);",
      "})();"
    ].join("\n");
  }

  // Run a spec (trigger + assert) against the given code and resolve a result.
  function run(values, spec) {
    return new Promise(function (resolve) {
      if (typeof document === "undefined" || !document.createElement) {
        resolve({ success: false, message: "当前环境无法运行 DOM 验证。" });
        return;
      }

      var frame = document.createElement("iframe");
      frame.setAttribute("sandbox", "allow-scripts");
      frame.setAttribute("title", "DOM 验证");
      frame.style.position = "absolute";
      frame.style.width = "0";
      frame.style.height = "0";
      frame.style.border = "0";
      frame.style.visibility = "hidden";

      var settled = false;
      var timer = setTimeout(function () {
        finish({ success: false, message: "验证超时：代码可能没有正常运行。" });
      }, TIMEOUT_MS);

      function onMessage(event) {
        if (event.source !== frame.contentWindow) {
          return;
        }
        var data = event.data;
        if (!data || data.source !== "weblab-preview" || data.type !== "validation") {
          return;
        }
        finish(data.result);
      }

      function finish(result) {
        if (settled) {
          return;
        }
        settled = true;
        clearTimeout(timer);
        window.removeEventListener("message", onMessage);
        if (frame.parentNode) {
          frame.parentNode.removeChild(frame);
        }
        resolve(result || { success: false, message: "验证没有返回结果。" });
      }

      window.addEventListener("message", onMessage);
      frame.srcdoc = window.WebLab.Preview.buildSrcdoc(values, {
        extraScript: buildVerificationScript(spec),
        chart: !!(spec && spec.chart)
      });
      document.body.appendChild(frame);
    });
  }

  function checkRule(rule, context) {
    var values = context.values || {
      html: context.html,
      css: context.css,
      js: context.js
    };
    if (rule.type === "js-event") {
      return run(values, { eventCheck: rule.min || 1 });
    }
    return run(values, { trigger: rule.trigger, assert: rule.assert });
  }

  Validation.dom = { run: run, checkRule: checkRule, buildVerificationScript: buildVerificationScript };
})(window.WebLab.Validation);
