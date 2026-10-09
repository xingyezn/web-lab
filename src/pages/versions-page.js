// Versions page: timeline, view page / code / diff (PRD.md section 22).
window.WebLab = window.WebLab || {};
window.WebLab.pages = window.WebLab.pages || {};

(function (pages) {
  "use strict";

  var data = window.WebLabData;
  var escapeHtml = window.WebLab.utils.escapeHtml;
  var diffLines = window.WebLab.utils.diffLines;

  var activePreview = null;
  var currentId = null;
  var currentTab = "page";

  function destroyActive() {
    if (activePreview) {
      activePreview.destroy();
      activePreview = null;
    }
  }

  function renderVersions(ctx) {
    document.title = "版本 · Web Lab";
    var versions = data.versions;

    var timeline = versions
      .map(function (version) {
        return (
          '<button class="version-item" type="button" data-version="' + version.id + '">' +
            '<span class="version-item__title">' + escapeHtml(version.title) + "</span>" +
            '<span class="version-item__desc">' + escapeHtml(version.description) + "</span>" +
          "</button>"
        );
      })
      .join("");

    ctx.container.innerHTML =
      '<section class="section">' +
        '<div class="container">' +
          '<header class="page-header">' +
            '<p class="breadcrumb"><a href="#/">首页</a><span aria-hidden="true">/</span>版本</p>' +
            '<h1 class="page-header__title">版本演进</h1>' +
            '<p class="page-header__desc">同一个作品从 Hello Web 一步步升级到 Final Project。查看每个版本的页面、代码与变化。</p>' +
          "</header>" +
          '<div class="versions">' +
            '<aside class="versions__timeline" aria-label="版本时间线">' + timeline + "</aside>" +
            '<div class="versions__main">' +
              '<div class="versions__tabs" role="tablist">' +
                '<button class="versions__tab is-active" type="button" data-vtab="page" aria-selected="true">页面</button>' +
                '<button class="versions__tab" type="button" data-vtab="code" aria-selected="false">代码</button>' +
                '<button class="versions__tab" type="button" data-vtab="diff" aria-selected="false">对比上一版</button>' +
              "</div>" +
              '<div class="versions__page" data-vpage><iframe data-version-frame sandbox="allow-scripts" title="版本预览"></iframe></div>' +
              '<div class="versions__code code-panel" data-vcode hidden></div>' +
              '<div class="versions__diff code-panel" data-vdiff hidden></div>' +
            "</div>" +
          "</div>" +
        "</div>" +
      "</section>";

    destroyActive();

    var frame = ctx.container.querySelector("[data-version-frame]");
    activePreview = frame
      ? window.WebLab.Preview.create(frame, { live: false, chart: true })
      : { run: function () {}, destroy: function () {} };

    Array.prototype.forEach.call(ctx.container.querySelectorAll("[data-version]"), function (button) {
      button.addEventListener("click", function () {
        select(ctx, button.getAttribute("data-version"));
      });
    });
    Array.prototype.forEach.call(ctx.container.querySelectorAll("[data-vtab]"), function (button) {
      button.addEventListener("click", function () {
        currentTab = button.getAttribute("data-vtab");
        Array.prototype.forEach.call(ctx.container.querySelectorAll("[data-vtab]"), function (other) {
          var on = other === button;
          other.classList.toggle("is-active", on);
          other.setAttribute("aria-selected", on ? "true" : "false");
        });
        apply(ctx);
      });
    });

    select(ctx, versions[versions.length - 1].id);
  }

  function select(ctx, id) {
    currentId = id;
    Array.prototype.forEach.call(ctx.container.querySelectorAll("[data-version]"), function (button) {
      button.classList.toggle("is-active", button.getAttribute("data-version") === id);
    });
    apply(ctx);
  }

  function apply(ctx) {
    var version = data.getVersion(currentId);
    if (!version) { return; }
    var pageEl = ctx.container.querySelector("[data-vpage]");
    var codeEl = ctx.container.querySelector("[data-vcode]");
    var diffEl = ctx.container.querySelector("[data-vdiff]");
    if (!pageEl || !codeEl || !diffEl) {
      return;
    }

    pageEl.hidden = currentTab !== "page";
    codeEl.hidden = currentTab !== "code";
    diffEl.hidden = currentTab !== "diff";

    if (currentTab === "page") {
      activePreview.run({ html: version.html, css: version.css, js: version.js });
    } else if (currentTab === "code") {
      codeEl.innerHTML = renderCode(version);
    } else {
      diffEl.innerHTML = renderDiff(version);
    }
  }

  function renderCode(version) {
    var parts = [
      { label: "HTML", language: "html", code: version.html },
      { label: "CSS", language: "css", code: version.css },
      { label: "JS", language: "js", code: version.js }
    ];
    return parts
      .map(function (part) {
        return (
          '<section class="code-panel__block">' +
            "<h2>" + part.label + "</h2>" +
            (part.code ? window.WebLab.utils.codeBlock(part.language, part.code) : '<p class="code-panel__empty">（无）</p>') +
          "</section>"
        );
      })
      .join("");
  }

  function diffSection(title, oldText, newText) {
    var lines = diffLines(oldText || "", newText || "");
    var body = lines
      .map(function (line) {
        var prefix = line.type === "add" ? "+ " : line.type === "remove" ? "- " : "  ";
        return '<span class="diff__line diff__line--' + line.type + '">' + escapeHtml(prefix + line.text) + "</span>";
      })
      .join("");
    return (
      '<section class="code-panel__block">' +
        "<h2>" + title + "</h2>" +
        '<pre class="diff">' + (body || '<span class="diff__line diff__line--same">  （无变化）</span>') + "</pre>" +
      "</section>"
    );
  }

  function renderDiff(version) {
    var index = version.order;
    var previous = index > 0 ? data.versions[index - 1] : null;
    if (!previous) {
      return '<p class="code-panel__empty">这是第一个版本，没有可对比的上一版。</p>';
    }
    return (
      '<p class="code-panel__hint">与「' + escapeHtml(previous.title) + '」对比。</p>' +
      diffSection("HTML", previous.html, version.html) +
      diffSection("CSS", previous.css, version.css) +
      diffSection("JS", previous.js, version.js)
    );
  }

  pages.renderVersions = renderVersions;
  pages.destroyVersions = destroyActive;
})(window.WebLab.pages);
