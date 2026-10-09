// Core Validator: dispatches each challenge rule to the right validator and
// aggregates a unified result (ARCHITECTURE.md §13).
//   { success, score, total, feedback: [{ success, message }] }
window.WebLab = window.WebLab || {};

(function (WebLab) {
  "use strict";

  var HTML_RULES = ["element-exists", "element-count", "text-content", "attribute"];

  // Accept both the Lesson schema (challenge.validator.rules) and the
  // Challenge schema (challenge.validators).
  function getRules(challenge) {
    if (!challenge) {
      return [];
    }
    if (challenge.validator && Array.isArray(challenge.validator.rules)) {
      return challenge.validator.rules;
    }
    if (Array.isArray(challenge.validators)) {
      return challenge.validators;
    }
    return [];
  }

  function checkRule(rule, parsed, context) {
    var V = WebLab.Validation;

    if (!rule || !rule.type) {
      return Promise.resolve({ success: false, message: "无效的检查规则。" });
    }
    if (HTML_RULES.indexOf(rule.type) !== -1) {
      return Promise.resolve(V.html.checkRule(rule, parsed.doc));
    }
    if (rule.type === "css-property") {
      return Promise.resolve(V.css.checkRule(rule, parsed.css));
    }
    if (rule.type === "console-output") {
      return Promise.resolve(V.js.checkRule(rule, context.consoleOutput || []));
    }
    if (rule.type === "dom-state") {
      return V.dom.checkRule(rule, context);
    }
    if (rule.type === "js-event") {
      return V.dom.checkRule(rule, context);
    }
    if (rule.type === "chart") {
      return V.chart.checkRule(rule, context);
    }
    if (rule.type === "css-present") {
      var used = parsed.css.some(function (block) {
        return Object.keys(block.declarations).length > 0;
      });
      return Promise.resolve({
        success: used,
        message: used ? "已经使用了 CSS 样式。" : "还没有写任何 CSS 样式。"
      });
    }
    if (rule.type === "css-declaration") {
      var property = String(rule.property || "").toLowerCase();
      var expected = rule.value != null ? String(rule.value).replace(/\s+/g, " ").trim().toLowerCase() : null;
      var hasDeclaration = parsed.css.some(function (block) {
        return Object.prototype.hasOwnProperty.call(block.declarations, property) &&
          (expected == null || block.declarations[property] === expected);
      });
      return Promise.resolve({
        success: hasDeclaration,
        message: hasDeclaration
          ? "已使用 " + property + (expected ? ": " + expected : "") + "。"
          : "还没有使用 " + property + (expected ? ": " + expected : "") + "。"
      });
    }
    if (rule.type === "css-media") {
      var hasMedia = /@media/i.test(String(context.css || ""));
      return Promise.resolve({
        success: hasMedia,
        message: hasMedia ? "已包含 @media 媒体查询。" : "还没有写 @media 媒体查询。"
      });
    }
    return Promise.resolve({ success: false, message: "暂不支持的检查类型：" + rule.type });
  }

  function parseInputs(context) {
    var parsed = { doc: null, css: [] };
    try {
      parsed.doc = WebLab.Validation.html.parse(context.html || "");
    } catch (e) {
      parsed.doc = null;
    }
    parsed.css = WebLab.Validation.css.parse(context.css || "");
    return parsed;
  }

  function check(challenge, context) {
    context = context || {};
    var rules = getRules(challenge);
    var parsed = parseInputs(context);

    // If a console-output rule needs checking but no output was captured yet,
    // run the code once in a sandbox iframe and use its Console output.
    var hasConsoleRule = rules.some(function (rule) {
      return rule.type === "console-output";
    });
    var needsCapture = hasConsoleRule &&
      (!context.consoleOutput || !context.consoleOutput.length) &&
      context.values &&
      WebLab.Preview && WebLab.Preview.capture;

    var contextPromise = needsCapture
      ? WebLab.Preview.capture(context.values).then(function (lines) {
          return Object.assign({}, context, { consoleOutput: lines });
        })
      : Promise.resolve(context);

    return contextPromise
      .then(function (resolvedContext) {
        return Promise.all(
          rules.map(function (rule) {
            return checkRule(rule, parsed, resolvedContext);
          })
        );
      })
      .then(function (feedback) {
        var score = feedback.filter(function (item) {
          return item.success;
        }).length;
        var total = feedback.length;
        return {
          success: total > 0 && score === total,
          score: score,
          total: total,
          feedback: feedback
        };
      });
  }

  WebLab.Validator = {
    check: check,
    getRules: getRules,
    checkRule: checkRule
  };
})(window.WebLab);
