// Reference page: local searchable cheatsheet (PRD.md / TASKS reference).
window.WebLab = window.WebLab || {};
window.WebLab.pages = window.WebLab.pages || {};

(function (pages) {
  "use strict";

  var data = window.WebLabData;
  var escapeHtml = window.WebLab.utils.escapeHtml;

  function entryMarkup(entry) {
    return (
      '<div class="ref-entry">' +
        '<p class="ref-entry__name">' + escapeHtml(entry.name) + "</p>" +
        '<pre class="ref-entry__syntax"><code>' + escapeHtml(entry.syntax) + "</code></pre>" +
        '<p class="ref-entry__desc">' + escapeHtml(entry.description) + "</p>" +
      "</div>"
    );
  }

  function allMarkup() {
    return data.reference
      .map(function (category) {
        return (
          '<section class="ref-group">' +
            '<h2 class="ref-group__title">' + escapeHtml(category.title) + "</h2>" +
            '<div class="ref-grid">' + category.entries.map(entryMarkup).join("") + "</div>" +
          "</section>"
        );
      })
      .join("");
  }

  function renderReference(ctx) {
    document.title = "帮助 · Web Lab";

    ctx.container.innerHTML =
      '<section class="section">' +
        '<div class="container">' +
          '<header class="page-header">' +
            '<p class="breadcrumb"><a href="#/">首页</a><span aria-hidden="true">/</span>帮助</p>' +
            '<h1 class="page-header__title">参考手册</h1>' +
            '<p class="page-header__desc">HTML / CSS / Flex / JavaScript / DOM / Chart.js 常用写法速查，支持本地搜索。</p>' +
          "</header>" +
          '<div class="ref-search">' +
            '<label class="visually-hidden" for="ref-search-input">搜索</label>' +
            '<input id="ref-search-input" type="search" data-ref-search placeholder="搜索：color、flex、querySelector…" autocomplete="off">' +
          "</div>" +
          '<div data-ref-results>' + allMarkup() + "</div>" +
        "</div>" +
      "</section>";

    var results = ctx.container.querySelector("[data-ref-results]");
    var input = ctx.container.querySelector("[data-ref-search]");

    function update() {
      if (!results) {
        return;
      }
      var query = input ? input.value : "";
      if (!String(query).trim()) {
        results.innerHTML = allMarkup();
        return;
      }
      var found = data.searchReference(query);
      if (!found.length) {
        results.innerHTML = '<p class="ref-empty">没有找到「' + escapeHtml(query) + "」相关的内容。</p>";
        return;
      }
      results.innerHTML =
        '<p class="ref-count">找到 ' + found.length + " 条：" + "</p>" +
        '<div class="ref-grid">' + found.map(function (item) { return entryMarkup(item.entry); }).join("") + "</div>";
    }

    if (input) {
      input.addEventListener("input", update);
    }
    update();
  }

  pages.renderReference = renderReference;
})(window.WebLab.pages);
