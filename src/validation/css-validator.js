// CSS validator: tolerant of whitespace, line breaks and declaration order
// (see ARCHITECTURE.md §15 and TEST_PLAN.md §7).
window.WebLab = window.WebLab || {};
window.WebLab.Validation = window.WebLab.Validation || {};

(function (Validation) {
  "use strict";

  function stripComments(css) {
    return String(css || "").replace(/\/\*[\s\S]*?\*\//g, "");
  }

  function normalizeSpace(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function normalizeValue(value) {
    return normalizeSpace(value).toLowerCase();
  }

  function parseDeclarations(text) {
    var declarations = {};
    String(text || "").split(";").forEach(function (part) {
      var index = part.indexOf(":");
      if (index === -1) {
        return;
      }
      var property = normalizeSpace(part.slice(0, index)).toLowerCase();
      var value = normalizeValue(part.slice(index + 1));
      if (property) {
        declarations[property] = value;
      }
    });
    return declarations;
  }

  // Collect "selector { declarations }" blocks. At-rules such as @media are
  // descended into so the rules they contain can still be validated.
  function collectBlocks(text, blocks) {
    var index = 0;
    while (index < text.length) {
      var open = text.indexOf("{", index);
      if (open === -1) {
        break;
      }
      var selector = normalizeSpace(text.slice(index, open));
      var depth = 1;
      var cursor = open + 1;
      while (cursor < text.length && depth > 0) {
        var char = text.charAt(cursor);
        if (char === "{") {
          depth++;
        } else if (char === "}") {
          depth--;
        }
        cursor++;
      }
      var body = text.slice(open + 1, cursor - 1);

      if (selector.charAt(0) === "@") {
        collectBlocks(body, blocks);
      } else if (selector) {
        blocks.push({
          selectors: selector.split(",").map(normalizeSpace).filter(Boolean),
          declarations: parseDeclarations(body)
        });
      }
      index = cursor;
    }
  }

  function parse(css) {
    var blocks = [];
    collectBlocks(stripComments(css), blocks);
    return blocks;
  }

  function findValue(blocks, selector, property) {
    var target = normalizeSpace(selector);
    var value = null;
    blocks.forEach(function (block) {
      if (block.selectors.indexOf(target) === -1) {
        return;
      }
      if (Object.prototype.hasOwnProperty.call(block.declarations, property)) {
        value = block.declarations[property];
      }
    });
    return value;
  }

  function checkRule(rule, blocks) {
    var selector = normalizeSpace(rule.selector);
    var property = String(rule.property || "").toLowerCase();
    var value = findValue(blocks, selector, property);

    if (rule.exists) {
      if (value != null) {
        return { success: true, message: selector + " 设置了 " + property + "。" };
      }
      return { success: false, message: selector + " 还需要设置 " + property + "。" };
    }

    if (value == null) {
      return { success: false, message: "没有找到 " + selector + " 的 " + property + " 设置。" };
    }

    if (rule.expected != null && value !== normalizeValue(rule.expected)) {
      return {
        success: false,
        message: selector + " 的 " + property + " 应该是 " + rule.expected + "，当前是 " + value + "。"
      };
    }

    if (rule.oneOf && rule.oneOf.map(normalizeValue).indexOf(value) === -1) {
      return {
        success: false,
        message: selector + " 的 " + property + " 需要是以下之一：" + rule.oneOf.join("、") + "。"
      };
    }

    if (rule.minNumber != null || rule.maxNumber != null) {
      var number = parseFloat(value);
      if (isNaN(number)) {
        return { success: false, message: selector + " 的 " + property + " 不是有效数字。" };
      }
      if (rule.minNumber != null && number < rule.minNumber) {
        return {
          success: false,
          message: selector + " 的 " + property + " 太小了（当前 " + number + "）。"
        };
      }
      if (rule.maxNumber != null && number > rule.maxNumber) {
        return {
          success: false,
          message: selector + " 的 " + property + " 太大了（当前 " + number + "）。"
        };
      }
    }

    return { success: true, message: selector + " 的 " + property + " 设置正确。" };
  }

  Validation.css = { parse: parse, checkRule: checkRule };
})(window.WebLab.Validation);
