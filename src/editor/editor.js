// Editor module: three plain textareas (HTML / CSS / JS) with tab switching.
// Interface follows ARCHITECTURE.md section 6. V1 uses <textarea> on purpose:
// no build step, no external dependency, easy to explain in class.
window.WebLab = window.WebLab || {};

(function (WebLab) {
  "use strict";

  var TYPES = ["html", "css", "js"];

  function create(root, options) {
    options = options || {};
    var starter = options.starter || { html: "", css: "", js: "" };
    var initialValues = options.values || starter;
    var onChange = options.onChange || function () {};
    var onRun = options.onRun || function () {};

    var inputs = {
      html: root.querySelector('[data-editor-input="html"]'),
      css: root.querySelector('[data-editor-input="css"]'),
      js: root.querySelector('[data-editor-input="js"]')
    };
    var tabs = root.querySelectorAll("[data-editor-tab]");
    var resetButton = root.querySelector("[data-editor-reset]");

    function setActive(type) {
      TYPES.forEach(function (current) {
        if (inputs[current]) {
          inputs[current].hidden = current !== type;
        }
      });
      Array.prototype.forEach.call(tabs, function (tab) {
        var active = tab.getAttribute("data-editor-tab") === type;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", active ? "true" : "false");
      });
    }

    function setValues(values) {
      values = values || {};
      TYPES.forEach(function (type) {
        if (inputs[type]) {
          inputs[type].value = values[type] || "";
        }
      });
    }

    function getValues() {
      var values = {};
      TYPES.forEach(function (type) {
        values[type] = inputs[type] ? inputs[type].value : "";
      });
      return values;
    }

    function setValue(type, code) {
      if (inputs[type]) {
        inputs[type].value = code == null ? "" : code;
      }
    }

    function getValue(type) {
      return inputs[type] ? inputs[type].value : "";
    }

    function reset() {
      setValues(starter);
      onChange("reset");
    }

    function focus(type) {
      if (inputs[type]) {
        setActive(type);
        inputs[type].focus();
      }
    }

    // Insert two spaces so students can indent code without leaving the editor.
    function insertIndent(input) {
      var start = input.selectionStart;
      var end = input.selectionEnd;
      input.value = input.value.slice(0, start) + "  " + input.value.slice(end);
      input.selectionStart = start + 2;
      input.selectionEnd = start + 2;
    }

    Array.prototype.forEach.call(tabs, function (tab) {
      tab.addEventListener("click", function () {
        setActive(tab.getAttribute("data-editor-tab"));
      });
    });

    TYPES.forEach(function (type) {
      var input = inputs[type];
      if (!input) {
        return;
      }
      input.addEventListener("input", function () {
        onChange(type);
      });
      input.addEventListener("keydown", function (event) {
        if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
          event.preventDefault();
          onRun();
          return;
        }
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
          event.preventDefault();
          return;
        }
        if (event.key === "Tab") {
          event.preventDefault();
          insertIndent(input);
          onChange(type);
        }
      });
    });

    if (resetButton) {
      resetButton.addEventListener("click", reset);
    }

    setActive("html");
    setValues(initialValues);

    return {
      setHTML: function (code) { setValue("html", code); },
      setCSS: function (code) { setValue("css", code); },
      setJS: function (code) { setValue("js", code); },
      getHTML: function () { return getValue("html"); },
      getCSS: function () { return getValue("css"); },
      getJS: function () { return getValue("js"); },
      setValues: setValues,
      getValues: getValues,
      reset: reset,
      focus: focus,
      getStarter: function () { return starter; }
    };
  }

  WebLab.Editor = { create: create };
})(window.WebLab);
