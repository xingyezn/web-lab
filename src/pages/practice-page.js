// Challenge Center + Debug Center pages (list + solver).
window.WebLab = window.WebLab || {};
window.WebLab.pages = window.WebLab.pages || {};

(function (pages) {
  "use strict";

  var data = window.WebLabData;
  var escapeHtml = window.WebLab.utils.escapeHtml;

  function categoryTitle(categories, id) {
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].id === id) { return categories[i].title; }
    }
    return id;
  }

  function card(item, completed, basePath) {
    var done = !!(completed && completed[item.id]);
    return (
      '<a class="practice-card' + (done ? " is-done" : "") + '" href="#' + basePath + "/" + item.id + '">' +
        '<div class="practice-card__top">' +
          '<span class="badge">' + escapeHtml(item.category) + "</span>" +
          '<span class="practice-card__diff" aria-label="难度">' + window.WebLab.Solver.renderDifficulty(item.difficulty || 1) + "</span>" +
        "</div>" +
        '<h3 class="practice-card__title">' + escapeHtml(item.title) + "</h3>" +
        '<p class="practice-card__desc">' + escapeHtml(item.description) + "</p>" +
        '<span class="practice-card__status">' + (done ? "已完成 ✓" : "去挑战 →") + "</span>" +
      "</a>"
    );
  }

  function listMarkup(items, categories, options) {
    var completed = window.WebLab.Storage ? window.WebLab.Storage.getChallenges() : {};
    var groups = categories
      .map(function (category) {
        var groupItems = items.filter(function (item) { return item.category === category.id; });
        if (!groupItems.length) { return ""; }
        return (
          '<section class="practice-group" aria-label="' + escapeHtml(category.title) + '">' +
            '<h2 class="practice-group__title">' + escapeHtml(category.title) + "</h2>" +
            '<div class="practice-grid">' +
              groupItems.map(function (item) { return card(item, completed, options.basePath); }).join("") +
            "</div>" +
          "</section>"
        );
      })
      .join("");

    return (
      '<section class="section">' +
        '<div class="container">' +
          '<header class="page-header">' +
            '<p class="breadcrumb"><a href="#/">首页</a><span aria-hidden="true">/</span>' + escapeHtml(options.title) + "</p>" +
            '<h1 class="page-header__title">' + escapeHtml(options.title) + "</h1>" +
            '<p class="page-header__desc">' + escapeHtml(options.desc) + "</p>" +
            (options.crossLink
              ? '<p class="workspace-tools"><a href="' + options.crossLink.href + '">' + escapeHtml(options.crossLink.label) + " →</a></p>"
              : "") +
          "</header>" +
          groups +
        "</div>" +
      "</section>"
    );
  }

  function solverMarkup(item, categories, backHref, backLabel) {
    return (
      '<section class="section">' +
        '<div class="container">' +
          window.WebLab.Solver.markup(item, {
            backHref: backHref,
            backLabel: backLabel,
            categoryTitle: categoryTitle(categories, item.category)
          }) +
        "</div>" +
      "</section>"
    );
  }

  function notFound(ctx, backHref, label) {
    document.title = "未找到 · Web Lab";
    ctx.container.innerHTML =
      '<section class="coming">' +
        '<p class="card__eyebrow">404</p>' +
        '<h1 class="coming__title">没有找到这个题目</h1>' +
        '<p class="coming__desc">它可能已经被移除，回到列表重新选择吧。</p>' +
        '<a class="btn btn--primary" href="' + backHref + '">' + escapeHtml(label) + "</a>" +
      "</section>";
  }

  // ---- Challenge Center ----
  function renderChallengeList(ctx) {
    document.title = "挑战中心 · Web Lab";
    ctx.container.innerHTML = listMarkup(data.challenges, data.challengeCategories, {
      title: "挑战中心",
      desc: "按分类与难度挑选小挑战，写代码后自动检查。",
      basePath: "/challenge",
      crossLink: { href: "#/debug", label: "前往 Debug Center 修复错误" }
    });
  }

  function renderChallengeSolver(ctx) {
    var item = data.getChallenge(ctx.params.id);
    if (!item) { notFound(ctx, "#/challenge", "返回挑战中心"); return; }
    document.title = item.title + " · Web Lab";
    ctx.container.innerHTML = solverMarkup(item, data.challengeCategories, "#/challenge", "挑战中心");
    window.WebLab.Solver.create(ctx.container, item, {});
  }

  // ---- Debug Center ----
  function renderDebugList(ctx) {
    document.title = "Debug Center · Web Lab";
    ctx.container.innerHTML = listMarkup(data.debugItems, data.debugCategories, {
      title: "Debug Center",
      desc: "下面每一段代码都有错误，找出并修复它们。",
      basePath: "/debug",
      crossLink: { href: "#/challenge", label: "前往挑战中心" }
    });
  }

  function renderDebugSolver(ctx) {
    var item = data.getDebugItem(ctx.params.id);
    if (!item) { notFound(ctx, "#/debug", "返回 Debug Center"); return; }
    document.title = item.title + " · Web Lab";
    ctx.container.innerHTML = solverMarkup(item, data.debugCategories, "#/debug", "Debug Center");
    window.WebLab.Solver.create(ctx.container, item, {});
  }

  pages.renderChallengeList = renderChallengeList;
  pages.renderChallengeSolver = renderChallengeSolver;
  pages.renderDebugList = renderDebugList;
  pages.renderDebugSolver = renderDebugSolver;
})(window.WebLab.pages);
