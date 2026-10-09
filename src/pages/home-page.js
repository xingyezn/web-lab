// Home page: the learning console described in PRD.md section 5.
// Continue Learning and progress are now driven by the Progress + Storage
// modules; the data card provides backup / restore / reset.
window.WebLab = window.WebLab || {};
window.WebLab.pages = window.WebLab.pages || {};

(function (pages) {
  "use strict";

  var data = window.WebLabData;
  var escapeHtml = window.WebLab.utils.escapeHtml;

  function renderHome(ctx) {
    document.title = "Web Lab · Web 程序设计交互学习平台";
    ctx.container.innerHTML = buildHome();
    initHome(ctx);
  }

  function buildHome() {
    return [
      buildHero(),
      buildPath(),
      buildContinue(),
      buildModules(),
      buildGoal(),
      buildData()
    ].join("");
  }

  function buildHero() {
    return (
      '<section class="hero">' +
        '<div class="container hero__inner">' +
          '<p class="hero__eyebrow">Web 程序设计 · 交互学习平台</p>' +
          '<h1 class="hero__title">Web Lab</h1>' +
          '<p class="hero__tagline">' +
            "<span>Learn</span>" +
            '<span class="hero__dot" aria-hidden="true">·</span>' +
            "<span>Try</span>" +
            '<span class="hero__dot" aria-hidden="true">·</span>' +
            "<span>Debug</span>" +
            '<span class="hero__dot" aria-hidden="true">·</span>' +
            "<span>Create</span>" +
          "</p>" +
          '<p class="hero__desc">在浏览器中直接编写、运行和调试代码，从第一个 HTML 页面出发，一步步完成可以发布到互联网的数据项目网页。</p>' +
          '<div class="hero__actions">' +
            '<a class="btn btn--primary" href="#/course">开始学习</a>' +
            '<a class="btn btn--ghost" href="#/playground">进入实验室</a>' +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function buildPath() {
    var items = data.modules
      .map(function (module) {
        return (
          '<li class="path__item">' +
            '<span class="path__index">' + module.order + "</span>" +
            "<span>" + escapeHtml(module.shortTitle) + "</span>" +
          "</li>"
        );
      })
      .join("");

    return (
      '<section class="section" aria-labelledby="path-heading">' +
        '<div class="container">' +
          '<div class="section__head">' +
            '<h2 id="path-heading" class="section__title">课程学习路径</h2>' +
            '<p class="section__desc">从 Web 基础到完整数据项目，共 ' +
              data.modules.length + " 个模块。</p>" +
          "</div>" +
          '<ol class="path">' + items + "</ol>" +
        "</div>" +
      "</section>"
    );
  }

  function buildContinue() {
    var Progress = window.WebLab.Progress;
    var summary = Progress
      ? Progress.getSummary()
      : { total: data.getTotalLessons(), completed: 0, percent: 0 };
    var continueId = Progress ? Progress.getContinueLesson() : null;
    var last = Progress ? Progress.getLastVisited() : null;
    var lesson = continueId ? data.getLesson(continueId) : null;
    var title = continueId ? data.getLessonTitle(continueId) : "";
    var module = lesson ? data.getModuleById(lesson.module) : null;

    var heading;
    var desc;
    var actionHref;
    var actionText;

    if (continueId) {
      if (last && last === continueId) {
        heading = "继续学习：" + title;
        desc = module ? "你上次学习到「" + module.title + "」。" : "从上次的位置继续。";
        actionText = "继续学习";
      } else {
        heading = "开始学习：" + title;
        desc = "从第一课开始，一步步完成整个课程。";
        actionText = "开始第一课";
      }
      actionHref = "#/lesson/" + continueId;
    } else {
      heading = "课程内容准备中";
      desc = "课程内容正在准备，先去实验室自由探索吧。";
      actionHref = "#/playground";
      actionText = "进入实验室";
    }

    return (
      '<section class="section" aria-labelledby="continue-heading">' +
        '<div class="container">' +
          '<div class="continue card">' +
            '<div class="continue__body">' +
              '<p class="card__eyebrow">继续学习</p>' +
              '<h2 id="continue-heading" class="continue__title">' + escapeHtml(heading) + "</h2>" +
              '<p class="continue__desc">' + escapeHtml(desc) + "</p>" +
            "</div>" +
            '<div class="continue__actions">' +
              '<a class="btn btn--primary" href="' + actionHref + '">' + escapeHtml(actionText) + "</a>" +
              '<a class="btn btn--ghost" href="#/course">课程目录</a>' +
            "</div>" +
            '<div class="continue__progress">' +
              '<div class="progress">' +
                '<span class="progress__bar" style="width: ' + summary.percent + '%"></span>' +
              "</div>" +
              '<p class="progress__meta">已完成 ' + summary.completed + " / " + summary.total +
                " Lessons（" + summary.percent + "%）</p>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function buildModules() {
    var cards = data.modules
      .map(function (module) {
        return (
          '<a class="module-card" href="#/lesson/' + module.firstLesson + '">' +
            '<div class="module-card__top">' +
              '<span class="module-card__index">Module ' + module.order + "</span>" +
              '<span class="badge">' + module.lessonCount + " Lessons</span>" +
            "</div>" +
            '<h3 class="module-card__title">' + escapeHtml(module.title) + "</h3>" +
            '<p class="module-card__desc">' + escapeHtml(module.description) + "</p>" +
            '<p class="module-card__project">阶段成果：' + escapeHtml(module.project) + "</p>" +
          "</a>"
        );
      })
      .join("");

    return (
      '<section class="section" aria-labelledby="modules-heading">' +
        '<div class="container">' +
          '<div class="section__head">' +
            '<h2 id="modules-heading" class="section__title">课程模块</h2>' +
            '<p class="section__desc">每个模块都以一个可以在浏览器中展示的作品收尾。</p>' +
          "</div>" +
          '<div class="module-grid">' + cards + "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function buildGoal() {
    var goals = [
      "结构清晰的 HTML 页面",
      "响应式的 Flex 布局",
      "可交互的 JavaScript / DOM",
      "至少一个数据可视化图表",
      "可部署到 GitHub Pages"
    ]
      .map(function (text) {
        return "<li>" + escapeHtml(text) + "</li>";
      })
      .join("");

    return (
      '<section class="section" aria-labelledby="goal-heading">' +
        '<div class="container">' +
          '<div class="goal">' +
            '<p class="card__eyebrow">最终学习目标</p>' +
            '<h2 id="goal-heading" class="goal__title">完成一个可以发布的数据项目网页</h2>' +
            '<p class="goal__desc">综合运用 HTML、CSS、Flex 布局、JavaScript、DOM 与 Chart.js，讲述一个完整的数据故事，并通过 GitHub Pages 发布到互联网。</p>' +
            '<ul class="goal__list">' + goals + "</ul>" +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function buildData() {
    return (
      '<section class="section" aria-labelledby="data-heading">' +
        '<div class="container">' +
          '<div class="data-card card">' +
            '<div class="data-card__body">' +
              '<p class="card__eyebrow">学习数据</p>' +
              '<h2 id="data-heading" class="data-card__title">备份与恢复</h2>' +
              '<p class="data-card__desc">学习进度与代码保存在当前浏览器中。你可以导出备份文件，并在其它设备或浏览器中导入。</p>' +
            "</div>" +
            '<div class="data-card__actions">' +
              '<button class="btn btn--ghost" type="button" data-export>导出备份</button>' +
              '<button class="btn btn--ghost" type="button" data-import>导入备份</button>' +
              '<button class="btn btn--ghost" type="button" data-reset>清空数据</button>' +
              '<input type="file" accept="application/json,.json" data-import-input hidden>' +
            "</div>" +
            '<p class="data-card__status" data-status role="status" aria-live="polite"></p>' +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function initHome(ctx) {
    var Storage = window.WebLab.Storage;
    if (!Storage) {
      return;
    }
    var container = ctx.container;
    var exportButton = container.querySelector("[data-export]");
    var importButton = container.querySelector("[data-import]");
    var importInput = container.querySelector("[data-import-input]");
    var resetButton = container.querySelector("[data-reset]");

    if (exportButton) {
      exportButton.addEventListener("click", function () {
        var blob = new Blob([Storage.exportJSON()], { type: "application/json" });
        var url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.href = url;
        link.download = "web-lab-backup.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setStatus(container, "已导出 web-lab-backup.json", false);
      });
    }

    if (importButton && importInput) {
      importButton.addEventListener("click", function () {
        importInput.click();
      });
      importInput.addEventListener("change", function () {
        var file = importInput.files && importInput.files[0];
        if (!file) {
          return;
        }
        var reader = new FileReader();
        reader.onload = function () {
          var result = Storage.importData(String(reader.result));
          if (result.ok) {
            renderHome(ctx);
            setStatus(ctx.container, "导入成功，学习数据已更新。", false);
          } else {
            setStatus(container, "导入失败：" + result.error, true);
          }
        };
        reader.onerror = function () {
          setStatus(container, "读取文件失败，请重试。", true);
        };
        reader.readAsText(file);
      });
    }

    if (resetButton) {
      resetButton.addEventListener("click", function () {
        if (typeof window.confirm === "function" && !window.confirm("确定要清空所有学习数据吗？此操作无法撤销。")) {
          return;
        }
        Storage.reset();
        renderHome(ctx);
        setStatus(ctx.container, "学习数据已清空。", false);
      });
    }
  }

  function setStatus(container, text, isError) {
    var status = container.querySelector("[data-status]");
    if (!status) {
      return;
    }
    status.textContent = text || "";
    status.classList.toggle("is-error", !!isError);
  }

  pages.renderHome = renderHome;
})(window.WebLab.pages);
