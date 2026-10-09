// Display modes (normal / classroom / focus) and editor font sizing.
// Pure helpers keep the shell logic testable.
window.WebLab = window.WebLab || {};

(function (WebLab) {
  "use strict";

  var MODES = ["normal", "classroom", "focus"];
  var MIN_FONT = 12;
  var MAX_FONT = 24;

  function normalize(mode) {
    return MODES.indexOf(mode) !== -1 ? mode : "normal";
  }

  // Apply a mode to the document root so CSS can react.
  function apply(doc, mode) {
    var value = normalize(mode);
    if (doc && doc.documentElement) {
      doc.documentElement.setAttribute("data-mode", value);
    }
    return value;
  }

  function clampFont(size) {
    var value = Number(size);
    if (isNaN(value)) {
      value = 16;
    }
    return Math.max(MIN_FONT, Math.min(MAX_FONT, Math.round(value)));
  }

  function adjustFont(current, delta) {
    return clampFont(Number(current || 16) + Number(delta || 0));
  }

  function applyFont(doc, size) {
    var value = clampFont(size);
    if (doc && doc.documentElement && doc.documentElement.style) {
      doc.documentElement.style.setProperty("--editor-font-size", value + "px");
    }
    return value;
  }

  WebLab.DisplayMode = {
    MODES: MODES,
    MIN_FONT: MIN_FONT,
    MAX_FONT: MAX_FONT,
    normalize: normalize,
    apply: apply,
    clampFont: clampFont,
    adjustFont: adjustFont,
    applyFont: applyFont
  };
})(window.WebLab);
