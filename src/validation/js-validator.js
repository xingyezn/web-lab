// JavaScript validator: checks captured Console output.
// The output itself is produced inside the sandbox iframe by the injected
// proxy in src/preview/preview.js, then verified here.
window.WebLab = window.WebLab || {};
window.WebLab.Validation = window.WebLab.Validation || {};

(function (Validation) {
  "use strict";

  function checkRule(rule, consoleOutput) {
    var expected = rule.expected == null ? "" : String(rule.expected);
    var lines = consoleOutput || [];
    var found = lines.some(function (line) {
      return line && typeof line.text === "string" && line.text.indexOf(expected) !== -1;
    });

    if (found) {
      return { success: true, message: "Console 输出了「" + expected + "」。" };
    }
    return {
      success: false,
      message: "Console 里还没有看到「" + expected + "」。可以用 console.log 输出试试。"
    };
  }

  Validation.js = { checkRule: checkRule };
})(window.WebLab.Validation);
