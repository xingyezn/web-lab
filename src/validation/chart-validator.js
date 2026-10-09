// Chart validator.
// Chart.js is localized in Phase 11, so chart checks are enabled then. This
// module already exposes the interface used by the core Validator; once the
// preview exposes a chart registry, the rule is evaluated inside the iframe.
window.WebLab = window.WebLab || {};
window.WebLab.Validation = window.WebLab.Validation || {};

(function (Validation) {
  "use strict";

  function checkRule(rule, context) {
    return Validation.dom
      .run(context.values || { html: context.html, css: context.css, js: context.js }, {
        chart: rule
      })
      .then(function (result) {
        return result;
      });
  }

  Validation.chart = { checkRule: checkRule };
})(window.WebLab.Validation);
