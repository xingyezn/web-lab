// Flex Playground page (PRD.md section 14).
window.WebLab = window.WebLab || {};
window.WebLab.pages = window.WebLab.pages || {};

(function (pages) {
  "use strict";

  function renderFlexPlayground(ctx) {
    document.title = "Flex Playground · Web Lab";

    ctx.container.innerHTML =
      '<section class="section">' +
        '<div class="container">' +
          '<header class="page-header">' +
            '<p class="breadcrumb"><a href="#/">首页</a><span aria-hidden="true">/</span>Flex Playground</p>' +
            '<h1 class="page-header__title">Flex Playground</h1>' +
            '<p class="page-header__desc">切换 flex-direction、justify-content 与 align-items，实时查看布局与代码的变化。</p>' +
          "</header>" +
          window.WebLab.FlexPlayground.markup() +
        "</div>" +
      "</section>";

    var root = ctx.container.querySelector("[data-fp-root]");
    if (root && window.WebLab.FlexPlayground) {
      window.WebLab.FlexPlayground.create(root, {});
    }
  }

  pages.renderFlexPlayground = renderFlexPlayground;
})(window.WebLab.pages);
