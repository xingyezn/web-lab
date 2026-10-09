// Chart Lab page (PRD.md section 18): data table -> chart type -> chart.
window.WebLab = window.WebLab || {};
window.WebLab.pages = window.WebLab.pages || {};

(function (pages) {
  "use strict";

  function renderChartLab(ctx) {
    document.title = "Chart Lab · Web Lab";

    ctx.container.innerHTML =
      '<section class="section">' +
        '<div class="container">' +
          '<header class="page-header">' +
            '<p class="breadcrumb"><a href="#/">首页</a><span aria-hidden="true">/</span>Chart Lab</p>' +
            '<h1 class="page-header__title">Chart Lab</h1>' +
            '<p class="page-header__desc">编辑数据、切换图表类型与标题，实时查看生成的 Chart.js 配置与图表。</p>' +
          "</header>" +
          window.WebLab.ChartLab.markup() +
        "</div>" +
      "</section>";

    var root = ctx.container.querySelector("[data-chart-lab]");
    if (root && window.WebLab.ChartLab) {
      window.WebLab.ChartLab.create(root);
    }
  }

  pages.renderChartLab = renderChartLab;
})(window.WebLab.pages);
