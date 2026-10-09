// HTML validator: parses code with DOMParser and checks the resulting DOM.
// Raw substring matching is forbidden (see AGENTS.md and ARCHITECTURE.md §14).
window.WebLab = window.WebLab || {};
window.WebLab.Validation = window.WebLab.Validation || {};

(function (Validation) {
  "use strict";

  function getParser() {
    if (typeof window !== "undefined" && window.DOMParser) {
      return window.DOMParser;
    }
    if (typeof DOMParser !== "undefined") {
      return DOMParser;
    }
    return null;
  }

  function parse(html) {
    var Parser = getParser();
    if (!Parser) {
      throw new Error("当前环境不支持 DOMParser，无法解析 HTML。");
    }
    return new Parser().parseFromString(String(html || ""), "text/html");
  }

  function queryAll(doc, selector) {
    if (!doc) {
      return [];
    }
    return Array.prototype.slice.call(doc.querySelectorAll(selector));
  }

  function queryOne(doc, selector) {
    if (!doc) {
      return null;
    }
    return doc.querySelector(selector);
  }

  function checkExists(rule, doc) {
    if (queryOne(doc, rule.selector)) {
      return { success: true, message: "已找到 " + rule.selector + "。" };
    }
    return { success: false, message: "还需要一个 " + rule.selector + " 元素。" };
  }

  function checkCount(rule, doc) {
    var count = queryAll(doc, rule.selector).length;
    var min = typeof rule.min === "number" ? rule.min : null;
    var max = typeof rule.max === "number" ? rule.max : null;

    if (min !== null && count < min) {
      return {
        success: false,
        message: rule.selector + " 还不够：当前有 " + count + " 个，至少需要 " + min + " 个。"
      };
    }
    if (max !== null && count > max) {
      return {
        success: false,
        message: rule.selector + " 太多了：当前有 " + count + " 个，最多 " + max + " 个。"
      };
    }
    return { success: true, message: rule.selector + " 数量正确（" + count + " 个）。" };
  }

  function checkText(rule, doc) {
    var element = queryOne(doc, rule.selector);
    if (!element) {
      return { success: false, message: "还没有找到 " + rule.selector + " 元素。" };
    }
    var text = (element.textContent || "").replace(/\s+/g, " ").trim();

    if (rule.contains && text.indexOf(rule.contains) === -1) {
      return {
        success: false,
        message: rule.selector + " 的文字里还没有包含「" + rule.contains + "」。"
      };
    }
    if (rule.equals != null && text !== rule.equals) {
      return {
        success: false,
        message: rule.selector + " 的文字应该是「" + rule.equals + "」，当前是「" + text + "」。"
      };
    }
    return { success: true, message: rule.selector + " 的文字正确。" };
  }

  function checkAttribute(rule, doc) {
    var element = queryOne(doc, rule.selector);
    if (!element) {
      return { success: false, message: "还没有找到 " + rule.selector + " 元素。" };
    }
    var value = element.getAttribute(rule.attribute);

    if (rule.required && (value === null || value === "")) {
      return {
        success: false,
        message: rule.selector + " 还需要设置 " + rule.attribute + " 属性。"
      };
    }
    if (rule.expected != null && value !== rule.expected) {
      return {
        success: false,
        message: rule.selector + " 的 " + rule.attribute + " 应该是「" + rule.expected + "」。"
      };
    }
    return { success: true, message: rule.selector + " 的 " + rule.attribute + " 属性正确。" };
  }

  function checkRule(rule, doc) {
    if (!doc) {
      return { success: false, message: "无法解析 HTML 代码。" };
    }
    switch (rule.type) {
      case "element-exists":
        return checkExists(rule, doc);
      case "element-count":
        return checkCount(rule, doc);
      case "text-content":
        return checkText(rule, doc);
      case "attribute":
        return checkAttribute(rule, doc);
      default:
        return { success: false, message: "未知的 HTML 检查类型：" + rule.type };
    }
  }

  Validation.html = { parse: parse, checkRule: checkRule };
})(window.WebLab.Validation);
