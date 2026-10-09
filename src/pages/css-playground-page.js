// CSS Playground page: visual CSS editor (PRD.md section 12).
window.WebLab = window.WebLab || {};
window.WebLab.pages = window.WebLab.pages || {};

(function (pages) {
  "use strict";

  function renderCssPlayground(ctx) {
    document.title = "CSS Playground · Web Lab";

    ctx.container.innerHTML =
      '<section class="section">' +
        '<div class="container">' +
          '<header class="page-header">' +
            '<p class="breadcrumb"><a href="#/">首页</a><span aria-hidden="true">/</span>CSS Playground</p>' +
            '<h1 class="page-header__title">CSS Playground</h1>' +
            '<p class="page-header__desc">用可视化控件调整颜色、字号、圆角、边框与间距，实时查看生成的 CSS 与预览。</p>' +
          "</header>" +
          window.WebLab.CssPlayground.markup() +
        "</div>" +
      "</section>";

    var root = ctx.container.querySelector("[data-css-playground]");
    if (root && window.WebLab.CssPlayground) {
      window.WebLab.CssPlayground.create(root, {});
    }
  }

  pages.renderCssPlayground = renderCssPlayground;
})(window.WebLab.pages);
