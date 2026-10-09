// Lesson page: renders one lesson using the standard Learn structure
// (Hook -> Objectives -> Knowledge -> Example -> Try -> Challenge -> Summary).
// Code is persisted through Storage; completion is tracked through Progress.
// The Validator itself is still handled in a later phase.
window.WebLab = window.WebLab || {};
window.WebLab.pages = window.WebLab.pages || {};

(function (pages) {
  "use strict";

  var data = window.WebLabData;
  var utils = window.WebLab.utils;
  var escapeHtml = utils.escapeHtml;
  var HINT_LABELS = ["方向", "知识点", "代码结构"];

  function renderLesson(ctx) {
    var lesson = data.getLesson(ctx.params.id);

    if (!lesson) {
      renderMissingLesson(ctx);
      return;
    }

    var module = data.getModuleById(lesson.module);
    document.title = lesson.title + " · Web Lab";

    if (window.WebLab.Storage) {
      window.WebLab.Storage.setCurrentLesson(lesson.id);
    }

    ctx.container.innerHTML =
      '<div class="container lesson">' +
        '<p class="breadcrumb">' +
          '<a href="#/">首页</a><span aria-hidden="true">/</span>' +
          '<a href="#/course">课程</a><span aria-hidden="true">/</span>' +
          escapeHtml(lesson.title) +
        "</p>" +
        '<div class="lesson-layout">' +
          buildSidebar(module, lesson) +
          '<article class="lesson-content">' +
            buildHeader(module, lesson) +
            buildIntro(lesson) +
            buildObjectives(lesson) +
            buildKnowledge(lesson) +
            buildTry(lesson) +
            buildChallenge(lesson) +
            buildSummary(lesson) +
            buildComplete(lesson) +
            buildPager(module, lesson) +
          "</article>" +
        "</div>" +
      "</div>";

    var workspace = initWorkspace(ctx.container, lesson);
    initDemos(ctx.container);
    wireCompletion(ctx.container, lesson);
    wireChallenge(ctx.container, lesson, workspace);
  }

  function initDemos(container) {
    var JsDemos = window.WebLab.JsDemos;
    if (JsDemos) {
      Array.prototype.forEach.call(container.querySelectorAll("[data-demo]"), function (root) {
        JsDemos.create(root);
      });
    }
    var DomLab = window.WebLab.DomLab;
    if (DomLab) {
      Array.prototype.forEach.call(container.querySelectorAll("[data-dom-lab]"), function (root) {
        DomLab.create(root);
      });
    }
    var ChartLab = window.WebLab.ChartLab;
    if (ChartLab) {
      Array.prototype.forEach.call(container.querySelectorAll("[data-chart-lab]"), function (root) {
        ChartLab.create(root);
      });
      Array.prototype.forEach.call(container.querySelectorAll("[data-chart-demo]"), function (root) {
        ChartLab.createMisleading(root);
      });
    }
    var DataStory = window.WebLab.DataStory;
    if (DataStory) {
      Array.prototype.forEach.call(container.querySelectorAll("[data-data-story]"), function (root) {
        DataStory.create(root);
      });
    }
  }

  // JavaScript lessons default to manual run; HTML/CSS/layout run live.
  function isManualRunLesson(lesson) {
    return ["js", "dom", "chart", "data-story"].indexOf(lesson.module) !== -1;
  }

  // Modules whose lessons may include a Chart.js chart.
  function usesChart(lesson) {
    return lesson.module === "chart" || lesson.module === "data-story";
  }

  function initWorkspace(container, lesson) {
    var Workspace = window.WebLab.Workspace;
    var Storage = window.WebLab.Storage;
    if (!Workspace) {
      return null;
    }
    var root = container.querySelector("[data-workspace]");
    if (!root) {
      return null;
    }
    var starter = lesson.starterCode || { html: "", css: "", js: "" };
    var saved = Storage ? Storage.getLesson(lesson.id) : null;
    var initial = saved ? { html: saved.html, css: saved.css, js: saved.js } : null;
    var prefs = Storage ? Storage.getPreferences() : { livePreview: true };

    return Workspace.create(root, {
      starter: starter,
      values: initial || undefined,
      live: prefs.livePreview !== false && !isManualRunLesson(lesson),
      chart: usesChart(lesson),
      onPersist: function (values) {
        if (Storage) {
          Storage.saveLesson(lesson.id, values);
        }
      },
      onLiveChange: function (value) {
        if (Storage) {
          Storage.savePreferences({ livePreview: value });
        }
      }
    });
  }

  function wireChallenge(container, lesson, workspace) {
    var Validator = window.WebLab.Validator;
    var Progress = window.WebLab.Progress;
    var button = container.querySelector("[data-check]");
    var feedbackBox = container.querySelector("[data-feedback]");
    if (!button || !Validator || !lesson.challenge) {
      return;
    }

    button.addEventListener("click", function () {
      var values = workspace && workspace.editor
        ? workspace.editor.getValues()
        : { html: "", css: "", js: "" };
      var consoleOutput = workspace && workspace.console ? workspace.console.getLines() : [];

      button.disabled = true;
      button.textContent = "检查中…";

      Validator.check(lesson.challenge, {
        html: values.html,
        css: values.css,
        js: values.js,
        consoleOutput: consoleOutput,
        values: values
      }).then(function (result) {
        renderFeedback(feedbackBox, result);
        button.disabled = false;
        button.textContent = "检查答案";
        if (result.success && Progress) {
          Progress.markChallengePassed(lesson.id);
        }
      }).catch(function () {
        button.disabled = false;
        button.textContent = "检查答案";
        if (feedbackBox) {
          feedbackBox.innerHTML =
            '<p class="feedback__item feedback__item--fail">' +
              '<span class="feedback__icon" aria-hidden="true">✕</span><span>检查时出错，请重试。</span>' +
            "</p>";
        }
      });
    });
  }

  function renderFeedback(box, result) {
    if (!box) {
      return;
    }
    var items = result.feedback
      .map(function (item) {
        var cls = item.success ? "feedback__item--pass" : "feedback__item--fail";
        var mark = item.success ? "✓" : "✕";
        return (
          '<li class="feedback__item ' + cls + '">' +
            '<span class="feedback__icon" aria-hidden="true">' + mark + "</span>" +
            "<span>" + escapeHtml(item.message) + "</span>" +
          "</li>"
        );
      })
      .join("");

    var summary = result.success
      ? "全部通过（" + result.score + " / " + result.total + "）"
      : "通过 " + result.score + " / " + result.total + "，继续加油。";

    box.innerHTML =
      '<div class="feedback__summary ' + (result.success ? "is-success" : "is-fail") + '">' +
        escapeHtml(summary) +
      "</div>" +
      '<ul class="feedback__list">' + items + "</ul>";
  }

  function wireCompletion(container, lesson) {
    var Progress = window.WebLab.Progress;
    var button = container.querySelector("[data-complete]");
    if (!button || !Progress) {
      return;
    }

    function sync() {
      var done = Progress.isLessonComplete(lesson.id);
      button.setAttribute("aria-pressed", done ? "true" : "false");
      button.classList.toggle("is-done", done);
      button.textContent = done ? "已完成 ✓（点击取消）" : "标记为已完成";
    }

    button.addEventListener("click", function () {
      Progress.toggleComplete(lesson.id);
      sync();
    });
    sync();
  }

  function renderMissingLesson(ctx) {
    var id = ctx.params.id;
    var title = data.getLessonTitle(id);
    document.title = title + " · Web Lab";
    ctx.container.innerHTML =
      '<section class="coming">' +
        '<p class="card__eyebrow">即将推出</p>' +
        '<h1 class="coming__title">' + escapeHtml(title) + "</h1>" +
        '<p class="coming__desc">这一课的内容正在准备中，先看看已经可以学习的课程吧。</p>' +
        '<a class="btn btn--primary" href="#/course">返回课程目录</a>' +
      "</section>";
  }

  function buildSidebar(module, lesson) {
    if (!module) {
      return "";
    }

    var items = module.lessons
      .map(function (entry, index) {
        var number = String(index + 1).padStart(2, "0");
        var isActive = entry.id === lesson.id;
        var hasContent = data.hasLessonContent(entry.id);
        var title = escapeHtml(entry.title);

        if (isActive) {
          return (
            '<li class="lesson-nav__item">' +
              '<span class="lesson-nav__link is-active" aria-current="page">' +
                '<span class="lesson-nav__index">' + number + "</span>" +
                '<span class="lesson-nav__title">' + title + "</span>" +
              "</span>" +
            "</li>"
          );
        }

        if (hasContent) {
          return (
            '<li class="lesson-nav__item">' +
              '<a class="lesson-nav__link" href="#/lesson/' + entry.id + '">' +
                '<span class="lesson-nav__index">' + number + "</span>" +
                '<span class="lesson-nav__title">' + title + "</span>" +
              "</a>" +
            "</li>"
          );
        }

        return (
          '<li class="lesson-nav__item is-locked">' +
            '<span class="lesson-nav__index">' + number + "</span>" +
            '<span class="lesson-nav__title">' + title + "</span>" +
          "</li>"
        );
      })
      .join("");

    return (
      '<aside class="lesson-sidebar" aria-label="模块课程">' +
        '<p class="lesson-sidebar__eyebrow">' + escapeHtml(module.title) + "</p>" +
        '<ol class="lesson-nav">' + items + "</ol>" +
      "</aside>"
    );
  }

  function buildHeader(module, lesson) {
    var moduleTitle = module ? module.title : "";
    var done = window.WebLab.Progress && window.WebLab.Progress.isLessonComplete(lesson.id);
    return (
      '<header class="lesson-header">' +
        '<p class="lesson-header__eyebrow">' +
          escapeHtml(moduleTitle) + " · Lesson " + lesson.order +
        "</p>" +
        '<h1 class="lesson-header__title">' + escapeHtml(lesson.title) + "</h1>" +
        '<p class="lesson-header__subtitle">' + escapeHtml(lesson.subtitle || "") + "</p>" +
        '<ul class="lesson-meta">' +
          '<li class="lesson-meta__item">约 ' + lesson.estimatedMinutes + " 分钟</li>" +
          '<li class="lesson-meta__item">难度 ' + renderDifficulty(lesson.difficulty) + "</li>" +
          (done ? '<li class="lesson-meta__item lesson-meta__item--done">已完成 ✓</li>' : "") +
        "</ul>" +
      "</header>"
    );
  }

  function buildIntro(lesson) {
    if (!lesson.intro) {
      return "";
    }
    return (
      '<section class="lesson-block lesson-intro">' +
        '<h2 class="lesson-block__title">' + escapeHtml(lesson.intro.title) + "</h2>" +
        "<p>" + escapeHtml(lesson.intro.content) + "</p>" +
      "</section>"
    );
  }

  function buildObjectives(lesson) {
    if (!lesson.objectives || !lesson.objectives.length) {
      return "";
    }
    var items = lesson.objectives
      .map(function (objective) {
        return "<li>" + escapeHtml(objective) + "</li>";
      })
      .join("");
    return (
      '<section class="lesson-block">' +
        '<h2 class="lesson-block__title">学习目标</h2>' +
        '<ul class="objectives">' + items + "</ul>" +
      "</section>"
    );
  }

  function buildKnowledge(lesson) {
    if (!lesson.knowledge || !lesson.knowledge.length) {
      return "";
    }
    var body = lesson.knowledge
      .map(function (item) {
        if (item.type === "code") {
          return utils.codeBlock(item.language, item.code);
        }
        if (item.type === "dom-tree") {
          return buildDomTree(item.code);
        }
        if (item.type === "demo" && window.WebLab.JsDemos) {
          return window.WebLab.JsDemos.markup(item.demo);
        }
        if (item.type === "dom-lab" && window.WebLab.DomLab) {
          return window.WebLab.DomLab.markup();
        }
        if (item.type === "chart-lab" && window.WebLab.ChartLab) {
          return window.WebLab.ChartLab.markup();
        }
        if (item.type === "chart-demo" && window.WebLab.ChartLab) {
          return window.WebLab.ChartLab.misleadingMarkup();
        }
        return "<p>" + escapeHtml(item.content) + "</p>";
      })
      .join("");
    return (
      '<section class="lesson-block">' +
        '<h2 class="lesson-block__title">知识点</h2>' +
        body +
      "</section>"
    );
  }

  function buildDomTree(code) {
    var DomTree = window.WebLab.DomTree;
    var content = DomTree
      ? DomTree.render(code)
      : '<p class="dom-tree__note">当前环境无法生成 DOM 树。</p>';
    return (
      '<div class="lesson-subblock">' +
        '<h3 class="lesson-subblock__title">简化 DOM 树</h3>' +
        content +
      "</div>"
    );
  }

  function buildTry(lesson) {
    var hasTry = lesson.tryTask || lesson.starterCode;
    if (!hasTry) {
      return "";
    }
    var manual = isManualRunLesson(lesson);
    var note = manual
      ? "JavaScript 课程默认手动运行：修改代码后点击「运行」查看结果。"
      : "HTML / CSS 会实时预览；也可以点击「运行」立即执行。";
    return (
      '<section class="lesson-block">' +
        '<h2 class="lesson-block__title">试一试</h2>' +
        '<p>' + escapeHtml(lesson.tryTask ? lesson.tryTask.description : "") + "</p>" +
        '<p class="workspace-note">' + note + "</p>" +
        window.WebLab.Workspace.markup({ live: !manual }) +
        buildToolLinks(lesson) +
      "</section>"
    );
  }

  function buildToolLinks(lesson) {
    if (lesson.module === "css") {
      return '<p class="workspace-tools"><a href="#/css-playground">打开 CSS Playground，可视化调整样式 →</a></p>';
    }
    if (lesson.module === "layout") {
      return (
        '<p class="workspace-tools">' +
          '<a href="#/box-model-lab">Box Model Lab →</a>' +
          '<span class="workspace-tools__sep" aria-hidden="true">·</span>' +
          '<a href="#/flex-playground">Flex Playground →</a>' +
        "</p>"
      );
    }
    if (lesson.module === "chart") {
      return '<p class="workspace-tools"><a href="#/chart-lab">打开 Chart Lab，边改数据边看图表 →</a></p>';
    }
    if (lesson.module === "data-story") {
      return '<p class="workspace-tools"><a href="#/data-story">打开 Data Story Builder，用模板生成故事 →</a></p>';
    }
    return "";
  }

  function buildChallenge(lesson) {
    if (!lesson.challenge) {
      return "";
    }
    var hints = (lesson.hints || [])
      .map(function (hint, index) {
        var label = HINT_LABELS[index] || "提示";
        return (
          '<details class="hint">' +
            '<summary class="hint__summary">提示 ' + (index + 1) + " · " + label + "</summary>" +
            '<p class="hint__body">' + escapeHtml(hint) + "</p>" +
          "</details>"
        );
      })
      .join("");

    var passed = window.WebLab.Progress && window.WebLab.Progress.isChallengePassed(lesson.id);

    return (
      '<section class="lesson-block">' +
        '<h2 class="lesson-block__title">挑战</h2>' +
        '<div class="callout callout--challenge">' +
          '<p class="callout__label">Challenge</p>' +
          '<h3 class="callout__title">' + escapeHtml(lesson.challenge.title) + "</h3>" +
          "<p>" + escapeHtml(lesson.challenge.description) + "</p>" +
          (passed ? '<p class="challenge-badge">已通过 ✓</p>' : "") +
          '<p class="callout__note">在「试一试」中完成代码后，点击下面的按钮自动检查。</p>' +
          (hints ? '<div class="hints">' + hints + "</div>" : "") +
        "</div>" +
        '<div class="challenge-actions">' +
          '<button class="btn btn--primary" type="button" data-check>检查答案</button>' +
        "</div>" +
        '<div class="feedback" data-feedback role="status" aria-live="polite"></div>' +
      "</section>"
    );
  }

  function buildSummary(lesson) {
    if (!lesson.summary || !lesson.summary.length) {
      return "";
    }
    var items = lesson.summary
      .map(function (point) {
        return "<li>" + escapeHtml(point) + "</li>";
      })
      .join("");
    return (
      '<section class="lesson-block">' +
        '<h2 class="lesson-block__title">小结</h2>' +
        '<ul class="summary-list">' + items + "</ul>" +
      "</section>"
    );
  }

  function buildComplete() {
    return (
      '<div class="lesson-complete">' +
        "<div>" +
          '<p class="lesson-complete__title">完成这一课了吗？</p>' +
          '<p class="lesson-complete__desc">标记完成后，首页与课程目录的学习进度会同步更新。</p>' +
        "</div>" +
        '<button class="btn btn--primary" type="button" data-complete aria-pressed="false">标记为已完成</button>' +
      "</div>"
    );
  }

  function buildPager(module, lesson) {
    if (!module) {
      return "";
    }

    var index = -1;
    for (var i = 0; i < module.lessons.length; i++) {
      if (module.lessons[i].id === lesson.id) {
        index = i;
        break;
      }
    }

    var previous = index > 0 ? module.lessons[index - 1] : null;
    var next = index >= 0 && index < module.lessons.length - 1 ? module.lessons[index + 1] : null;

    if (!previous && !next) {
      return "";
    }

    var prevHtml = previous
      ? '<a class="pager__link" href="#/lesson/' + previous.id + '">' +
          '<span class="pager__direction">← 上一课</span>' +
          '<span class="pager__title">' + escapeHtml(previous.title) + "</span>" +
        "</a>"
      : '<span class="pager__spacer" aria-hidden="true"></span>';

    var nextHtml = next
      ? '<a class="pager__link pager__link--next" href="#/lesson/' + next.id + '">' +
          '<span class="pager__direction">下一课 →</span>' +
          '<span class="pager__title">' + escapeHtml(next.title) + "</span>" +
        "</a>"
      : '<span class="pager__spacer" aria-hidden="true"></span>';

    return '<nav class="pager" aria-label="课程导航">' + prevHtml + nextHtml + "</nav>";
  }

  function renderDifficulty(level) {
    var stars = "";
    for (var i = 1; i <= 3; i++) {
      stars += i <= level ? "★" : "☆";
    }
    return stars;
  }

  pages.renderLesson = renderLesson;
})(window.WebLab.pages);
