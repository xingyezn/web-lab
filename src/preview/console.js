// Console panel: renders console output and runtime errors that the sandbox
// iframe forwards through postMessage (see src/preview/preview.js).
window.WebLab = window.WebLab || {};

(function (WebLab) {
  "use strict";

  var MAX_LINES = 200;

  function create(root, options) {
    options = options || {};
    var output = root.querySelector("[data-console-output]");
    var clearButton = root.querySelector("[data-console-clear]");
    var doc = root.ownerDocument || (typeof document !== "undefined" ? document : null);
    var lines = [];

    function appendLine(level, text) {
      if (!output || !doc) {
        return;
      }
      var line = doc.createElement("li");
      line.className = "console__line console__line--" + (level || "log");
      line.textContent = text == null ? "" : String(text);
      output.appendChild(line);

      lines.push({ level: level || "log", text: text == null ? "" : String(text) });
      if (lines.length > MAX_LINES) {
        lines.shift();
      }

      if (output.children && output.children.length > MAX_LINES && output.removeChild) {
        output.removeChild(output.children[0]);
      }

      output.scrollTop = output.scrollHeight;
    }

    function clear() {
      lines = [];
      if (output) {
        output.innerHTML = "";
      }
    }

    function add(message) {
      if (!message) {
        return;
      }
      appendLine(message.level, message.text);
    }

    function getLines() {
      return lines.slice();
    }

    if (clearButton) {
      clearButton.addEventListener("click", clear);
    }

    return { add: add, clear: clear, appendLine: appendLine, getLines: getLines };
  }

  WebLab.Console = { create: create };
})(window.WebLab);
