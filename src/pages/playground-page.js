// Playground page: a free, task-free workspace for experimenting with
// HTML / CSS / JavaScript (PRD.md section 9).
window.WebLab = window.WebLab || {};
window.WebLab.pages = window.WebLab.pages || {};

(function (pages) {
  "use strict";

  var STARTER_HTML =
    "<h1>Hello Web Lab</h1>\n" +
    "<p>在左边修改代码，右边会实时更新。</p>\n" +
    '<button id="btn">点我</button>';

  var STARTER_CSS =
    "body {\n" +
    "  font-family: sans-serif;\n" +
    "  padding: 16px;\n" +
    "}\n\n" +
    "button {\n" +
    "  padding: 8px 16px;\n" +
    "}";

  var STARTER_JS =
    'const btn = document.querySelector("#btn");\n\n' +
    'btn.addEventListener("click", function () {\n' +
    '  console.log("按钮被点击了");\n' +
    "});";

  function renderPlayground(ctx) {
    document.title = "实验室 · Web Lab";

    ctx.container.innerHTML =
      '<section class="section">' +
        '<div class="container">' +
          '<header class="page-header">' +
            '<p class="breadcrumb"><a href="#/">首页</a><span aria-hidden="true">/</span>实验室</p>' +
            '<h1 class="page-header__title">实验室</h1>' +
            '<p class="page-header__desc">自由编写 HTML、CSS 与 JavaScript，实时查看运行结果。试试修改代码，或者点击按钮查看 Console 输出。</p>' +
          "</header>" +
          window.WebLab.Workspace.markup({ live: true }) +
        "</div>" +
      "</section>";

    var root = ctx.container.querySelector("[data-workspace]");
    if (root && window.WebLab.Workspace) {
      window.WebLab.Workspace.create(root, {
        starter: { html: STARTER_HTML, css: STARTER_CSS, js: STARTER_JS },
        live: true
      });
    }
  }

  pages.renderPlayground = renderPlayground;
})(window.WebLab.pages);
