// Data Story Builder page (PRD.md section 19).
window.WebLab = window.WebLab || {};
window.WebLab.pages = window.WebLab.pages || {};

(function (pages) {
  "use strict";

  function renderDataStory(ctx) {
    document.title = "Data Story · Web Lab";

    ctx.container.innerHTML =
      '<section class="section">' +
        '<div class="container">' +
          '<header class="page-header">' +
            '<p class="breadcrumb"><a href="#/">首页</a><span aria-hidden="true">/</span>Data Story</p>' +
            '<h1 class="page-header__title">Data Story Builder</h1>' +
            '<p class="page-header__desc">填写研究问题、数据来源、图表与发现，实时生成一个完整的数据故事网页。</p>' +
          "</header>" +
          window.WebLab.DataStory.markup() +
        "</div>" +
      "</section>";

    var root = ctx.container.querySelector("[data-data-story]");
    if (root && window.WebLab.DataStory) {
      window.WebLab.DataStory.create(root);
    }
  }

  pages.renderDataStory = renderDataStory;
})(window.WebLab.pages);
