// Shared solver used by the Challenge Center and Debug Center: a code
// workspace plus hints, an auto-check button and a feedback panel.
window.WebLab = window.WebLab || {};

(function (WebLab) {
  "use strict";

  var utils = WebLab.utils;

  function rulesOf(item) {
    if (item && item.validator && Array.isArray(item.validator.rules)) {
      return item.validator.rules;
    }
    return [];
  }

  function renderDifficulty(level) {
    var stars = "";
    for (var i = 1; i <= 3; i++) {
      stars += i <= level ? "★" : "☆";
    }
    return stars;
  }

  function needsChart(item) {
    return rulesOf(item).some(function (rule) { return rule.type === "chart"; });
  }

  function needsManualRun(item) {
    return rulesOf(item).some(function (rule) {
      return rule.type === "console-output" || rule.type === "dom-state" || rule.type === "js-event" || rule.type === "chart";
    });
  }

  function markup(item, options) {
    options = options || {};
    var categoryTitle = options.categoryTitle || item.category;
    var typeLabel = item.type === "debug" ? "Debug" : "Challenge";

    var hints = (item.hints || [])
      .map(function (hint, index) {
        return (
          '<details class="hint">' +
            '<summary class="hint__summary">提示 ' + (index + 1) + "</summary>" +
            '<p class="hint__body">' + utils.escapeHtml(hint) + "</p>" +
          "</details>"
        );
      })
      .join("");

    return (
      '<div class="solver">' +
        '<p class="breadcrumb">' +
          '<a href="#/">首页</a><span aria-hidden="true">/</span>' +
          '<a href="' + options.backHref + '">' + utils.escapeHtml(options.backLabel) + "</a>" +
          '<span aria-hidden="true">/</span>' + utils.escapeHtml(item.title) +
        "</p>" +
        '<header class="solver__header">' +
          '<p class="solver__meta">' +
            '<span class="badge">' + utils.escapeHtml(typeLabel) + " · " + utils.escapeHtml(categoryTitle) + "</span>" +
            '<span class="solver__difficulty" aria-label="难度">' + renderDifficulty(item.difficulty || 1) + "</span>" +
          "</p>" +
          '<h1 class="solver__title">' + utils.escapeHtml(item.title) + "</h1>" +
          '<p class="solver__desc">' + utils.escapeHtml(item.description) + "</p>" +
        "</header>" +
        '<div class="solver__layout">' +
          '<div class="solver__main">' +
            WebLab.Workspace.markup({ live: !needsManualRun(item) }) +
            '<div class="challenge-actions">' +
              '<button class="btn btn--primary" type="button" data-check>' + (item.type === "debug" ? "检查修复" : "检查答案") + "</button>" +
            "</div>" +
            '<div class="feedback" data-feedback role="status" aria-live="polite"></div>' +
          "</div>" +
          '<aside class="solver__side">' +
            "<h2 class=\"solver__side-title\">提示</h2>" +
            (hints || '<p class="solver__empty">先自己试试，再点开提示。</p>') +
          "</aside>" +
        "</div>" +
      "</div>"
    );
  }

  function create(root, item, options) {
    options = options || {};
    var Storage = WebLab.Storage;
    var workspaceRoot = root.querySelector("[data-workspace]");
    var checkButton = root.querySelector("[data-check]");
    var feedbackBox = root.querySelector("[data-feedback]");

    var storageKey = "practice:" + item.id;
    var saved = Storage ? Storage.getLesson(storageKey) : null;
    var values = saved ? { html: saved.html, css: saved.css, js: saved.js } : undefined;

    var workspace = null;
    if (workspaceRoot && WebLab.Workspace) {
      workspace = WebLab.Workspace.create(workspaceRoot, {
        starter: item.starterCode || { html: "", css: "", js: "" },
        values: values,
        live: !needsManualRun(item),
        chart: needsChart(item),
        onPersist: function (code) {
          if (Storage) { Storage.saveLesson(storageKey, code); }
        }
      });
    }

    if (checkButton) {
      checkButton.addEventListener("click", function () {
        var code = workspace && workspace.editor ? workspace.editor.getValues() : { html: "", css: "", js: "" };
        var consoleOutput = workspace && workspace.console ? workspace.console.getLines() : [];
        checkButton.disabled = true;
        checkButton.textContent = "检查中…";
        WebLab.Validator.check({ validators: rulesOf(item) }, {
          html: code.html,
          css: code.css,
          js: code.js,
          consoleOutput: consoleOutput,
          values: code
        }).then(function (result) {
          renderFeedback(feedbackBox, result);
          checkButton.disabled = false;
          checkButton.textContent = item.type === "debug" ? "检查修复" : "检查答案";
          if (result.success && Storage) {
            Storage.setChallengeComplete(item.id, true);
          }
        }).catch(function () {
          checkButton.disabled = false;
          checkButton.textContent = item.type === "debug" ? "检查修复" : "检查答案";
          if (feedbackBox) {
            feedbackBox.innerHTML = '<p class="feedback__item feedback__item--fail">检查时出错，请重试。</p>';
          }
        });
      });
    }

    if (options.onCompleteCheck && Storage && Storage.isChallengeComplete(item.id)) {
      options.onCompleteCheck();
    }

    return workspace;
  }

  function renderFeedback(box, result) {
    if (!box) { return; }
    var items = result.feedback
      .map(function (item) {
        var cls = item.success ? "feedback__item--pass" : "feedback__item--fail";
        var mark = item.success ? "✓" : "✕";
        return (
          '<li class="feedback__item ' + cls + '">' +
            '<span class="feedback__icon" aria-hidden="true">' + mark + "</span>" +
            "<span>" + utils.escapeHtml(item.message) + "</span>" +
          "</li>"
        );
      })
      .join("");
    var summary = result.success
      ? "全部通过（" + result.score + " / " + result.total + "）"
      : "通过 " + result.score + " / " + result.total + "，继续加油。";
    box.innerHTML =
      '<div class="feedback__summary ' + (result.success ? "is-success" : "is-fail") + '">' +
        utils.escapeHtml(summary) +
      "</div>" +
      '<ul class="feedback__list">' + items + "</ul>";
  }

  WebLab.Solver = {
    markup: markup,
    create: create,
    renderDifficulty: renderDifficulty,
    rulesOf: rulesOf
  };
})(window.WebLab);
