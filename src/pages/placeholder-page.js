// Reusable "coming soon" page for routes reserved by later phases.
// Keeping placeholders in one factory avoids many near-identical page files.
window.WebLab = window.WebLab || {};
window.WebLab.pages = window.WebLab.pages || {};

(function (pages) {
  "use strict";

  var escapeHtml = window.WebLab.utils.escapeHtml;

  // Create a render function for a reserved route.
  function createPlaceholder(options) {
    return function render(ctx) {
      document.title = options.title + " · Web Lab";
      ctx.container.innerHTML =
        '<section class="coming">' +
          '<p class="card__eyebrow">' + escapeHtml(options.eyebrow || "即将推出") + "</p>" +
          '<h1 class="coming__title">' + escapeHtml(options.title) + "</h1>" +
          '<p class="coming__desc">' + escapeHtml(options.description) + "</p>" +
          '<p class="coming__path">当前路由：<code>' + escapeHtml(ctx.path) + "</code></p>" +
          '<a class="btn btn--primary" href="#/">返回首页</a>' +
        "</section>";
    };
  }

  pages.createPlaceholder = createPlaceholder;
})(window.WebLab.pages);
