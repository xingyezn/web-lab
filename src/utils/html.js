// Shared HTML helpers used by page components.
// Keeping escaping in one place avoids subtle XSS differences between pages.
window.WebLab = window.WebLab || {};
window.WebLab.utils = window.WebLab.utils || {};

(function (utils) {
  "use strict";

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Render a read-only code block. Phase 3 will reuse this styling for the editor.
  function codeBlock(language, code) {
    var label = language
      ? '<figcaption class="code-block__label">' + escapeHtml(language) + "</figcaption>"
      : "";
    return (
      '<figure class="code-block">' +
        label +
        "<pre><code>" + escapeHtml(code) + "</code></pre>" +
      "</figure>"
    );
  }

  utils.escapeHtml = escapeHtml;
  utils.codeBlock = codeBlock;
})(window.WebLab.utils);
