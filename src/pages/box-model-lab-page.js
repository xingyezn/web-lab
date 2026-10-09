// Box Model Lab page (PRD.md section 13).
window.WebLab = window.WebLab || {};
window.WebLab.pages = window.WebLab.pages || {};

(function (pages) {
  "use strict";

  function renderBoxModelLab(ctx) {
    document.title = "Box Model Lab · Web Lab";

    ctx.container.innerHTML =
      '<section class="section">' +
        '<div class="container">' +
          '<header class="page-header">' +
            '<p class="breadcrumb"><a href="#/">首页</a><span aria-hidden="true">/</span>Box Model Lab</p>' +
            '<h1 class="page-header__title">Box Model Lab</h1>' +
            '<p class="page-header__desc">用滑块调整 width、padding、border、margin，观察盒模型图示、CSS 与预览的同步变化。</p>' +
          "</header>" +
          window.WebLab.BoxModelLab.markup() +
        "</div>" +
      "</section>";

    var root = ctx.container.querySelector("[data-bml]");
    if (root && window.WebLab.BoxModelLab) {
      window.WebLab.BoxModelLab.create(root, {});
    }
  }

  pages.renderBoxModelLab = renderBoxModelLab;
})(window.WebLab.pages);
