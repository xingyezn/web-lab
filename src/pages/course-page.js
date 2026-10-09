// Course page: the full course directory grouped by module.
// Lessons without content yet are shown as disabled so the overview stays
// complete and honest (see CONTENT_SPEC.md).
window.WebLab = window.WebLab || {};
window.WebLab.pages = window.WebLab.pages || {};

(function (pages) {
  "use strict";

  var data = window.WebLabData;
  var escapeHtml = window.WebLab.utils.escapeHtml;

  function renderCourse(ctx) {
    document.title = "课程 · Web Lab";
    ctx.container.innerHTML = buildCourse();
  }

  function buildCourse() {
    var summary = window.WebLab.Progress
      ? window.WebLab.Progress.getSummary()
      : { completed: 0, total: data.getTotalLessons(), percent: 0 };
    var sections = data.modules
      .map(function (module) {
        return buildModuleSection(module, summary);
      })
      .join("");

    return (
      '<section class="section">' +
        '<div class="container">' +
          '<header class="page-header">' +
            '<p class="breadcrumb"><a href="#/">首页</a><span aria-hidden="true">/</span>课程</p>' +
            '<h1 class="page-header__title">课程目录</h1>' +
            '<p class="page-header__desc">共 ' + data.modules.length + " 个模块、" +
              data.getTotalLessons() + " 个 Lesson。已完成 " + summary.completed + " / " +
              summary.total + "（" + summary.percent + "%）。</p>" +
          "</header>" +
          '<div class="module-sections">' + sections + "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function buildModuleSection(module, summary) {
    var moduleProgress = summary.byModule[module.id] || { completed: 0, total: module.lessons.length };
    var startLink = module.firstLesson
      ? '<a class="btn btn--ghost" href="#/lesson/' + module.firstLesson + '">进入模块</a>'
      : "";

    var items = module.lessons
      .map(function (lesson, index) {
        return buildLessonItem(module, lesson, index);
      })
      .join("");

    return (
      '<section class="module-section" aria-labelledby="module-' + module.id + '">' +
        '<div class="module-section__head">' +
          '<div class="module-section__titles">' +
            '<span class="module-card__index">Module ' + module.order + "</span>" +
            '<h2 id="module-' + module.id + '" class="module-section__title">' +
              escapeHtml(module.title) + "</h2>" +
          "</div>" +
          startLink +
        "</div>" +
        '<p class="module-section__desc">' + escapeHtml(module.description) + "</p>" +
        '<p class="module-section__project">阶段成果：' + escapeHtml(module.project) +
          ' · 已完成 ' + moduleProgress.completed + " / " + moduleProgress.total + "</p>" +
        '<ol class="lesson-list">' + items + "</ol>" +
      "</section>"
    );
  }

  function buildLessonItem(module, lesson, index) {
    var number = String(index + 1).padStart(2, "0");
    var hasContent = data.hasLessonContent(lesson.id);
    var done = window.WebLab.Progress ? window.WebLab.Progress.isLessonComplete(lesson.id) : false;
    var title = escapeHtml(lesson.title);

    if (hasContent) {
      var status = done
        ? '<span class="lesson-item__status lesson-item__status--done">已完成 ✓</span>'
        : '<span class="lesson-item__status lesson-item__status--ready">可学习</span>';
      return (
        '<li class="lesson-item' + (done ? " is-done" : "") + '">' +
          '<a class="lesson-item__link" href="#/lesson/' + lesson.id + '">' +
            '<span class="lesson-item__index">' + number + "</span>" +
            '<span class="lesson-item__title">' + title + "</span>" +
            status +
          "</a>" +
        "</li>"
      );
    }

    return (
      '<li class="lesson-item is-locked">' +
        '<span class="lesson-item__index">' + number + "</span>" +
        '<span class="lesson-item__title">' + title + "</span>" +
        '<span class="lesson-item__status">即将推出</span>' +
      "</li>"
    );
  }

  pages.renderCourse = renderCourse;
})(window.WebLab.pages);
