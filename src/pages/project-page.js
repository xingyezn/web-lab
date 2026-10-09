// Final Project workspace (PRD.md sections 20, 21, 27, 28).
// Combines the code workspace with a requirement checklist, presentation mode,
// file downloads and a GitHub Pages guide.
window.WebLab = window.WebLab || {};
window.WebLab.pages = window.WebLab.pages || {};

(function (pages) {
  "use strict";

  var escapeHtml = window.WebLab.utils.escapeHtml;

  var STARTER = {
    html:
      '<header class="hero">\n' +
      "  <h1>我的数据项目</h1>\n" +
      "</header>\n" +
      "<main>\n" +
      '  <section id="about">\n' +
      "    <h2>关于项目</h2>\n" +
      "    <p>用一句话介绍你的数据项目。</p>\n" +
      "  </section>\n" +
      '  <section id="data">\n' +
      "    <h2>数据图表</h2>\n" +
      '    <div style="position:relative;height:240px;"><canvas id="chart"></canvas></div>\n' +
      "  </section>\n" +
      '  <section id="cards">\n' +
      "    <h2>数据卡片</h2>\n" +
      '    <div class="cards">\n' +
      '      <div class="card">要点一</div>\n' +
      '      <div class="card">要点二</div>\n' +
      "    </div>\n" +
      "  </section>\n" +
      "</main>\n" +
      "<footer><p>© 2026 我的数据项目</p></footer>",
    css:
      "body { font-family: sans-serif; margin: 0; color: #333; }\n" +
      ".hero { background: #1677ff; color: #ffffff; padding: 24px; }\n" +
      "main { max-width: 800px; margin: 0 auto; padding: 16px; }\n" +
      ".cards { display: flex; flex-wrap: wrap; gap: 12px; }\n" +
      ".card { flex: 1 1 160px; background: #f5f7fa; border-radius: 12px; padding: 12px; }\n" +
      "@media (max-width: 600px) {\n  main { padding: 8px; }\n}",
    js:
      'document.querySelector("h1").addEventListener("click", function () {\n' +
      '  console.log("你好，这是你的数据项目");\n' +
      "});\n\n" +
      'new Chart(document.getElementById("chart"), {\n' +
      '  type: "bar",\n' +
      '  data: { labels: ["一月", "二月", "三月"], datasets: [{ label: "数值", data: [12, 15, 14], backgroundColor: "#1677ff" }] },\n' +
      "  options: { responsive: true, maintainAspectRatio: false }\n" +
      "});"
  };

  var REQUIREMENTS = [
    { id: "h1", label: "页面含主标题 h1", rule: { type: "element-exists", selector: "h1" } },
    { id: "sections", label: "至少两个内容区域 section", rule: { type: "element-count", selector: "section", min: 2 } },
    { id: "css", label: "使用了 CSS 样式", rule: { type: "css-present" } },
    { id: "class", label: "至少使用一个 class", rule: { type: "element-exists", selector: "[class]" } },
    { id: "flex", label: "使用 Flex 布局", rule: { type: "css-declaration", property: "display", value: "flex" } },
    { id: "event", label: "至少一个 JS 事件", rule: { type: "js-event", min: 1 } },
    { id: "chart", label: "至少一个图表", rule: { type: "chart" } },
    { id: "responsive", label: "包含移动端适配 @media", rule: { type: "css-media" } }
  ];

  var PRESENTATION_SCRIPT = [
    "(function () {",
    "  var sections = Array.prototype.slice.call(document.querySelectorAll('section'));",
    "  var index = 0;",
    "  function go(next) {",
    "    if (!sections.length) { return; }",
    "    index = Math.max(0, Math.min(sections.length - 1, next));",
    "    sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });",
    "  }",
    "  window.addEventListener('message', function (event) {",
    "    var data = event.data;",
    "    if (!data || data.source !== 'weblab-presentation') { return; }",
    "    if (data.action === 'next') { go(index + 1); }",
    "    else if (data.action === 'prev') { go(index - 1); }",
    "    else if (data.action === 'first') { go(0); }",
    "  });",
    "})();"
  ].join("\n");

  function buildPage() {
    return (
      '<section class="section">' +
        '<div class="container">' +
          '<header class="page-header">' +
            '<p class="breadcrumb"><a href="#/">首页</a><span aria-hidden="true">/</span>项目</p>' +
            '<h1 class="page-header__title">Final Project</h1>' +
            '<p class="page-header__desc">完成一个完整的数据项目网页：编写代码、检查需求、演示、下载，并发布到 GitHub Pages。</p>' +
          "</header>" +
          '<div class="project-layout">' +
            buildChecklist() +
            buildWorkspace() +
            buildActions() +
            buildGuide() +
          "</div>" +
          buildPresentation() +
        "</div>" +
      "</section>"
    );
  }

  function buildChecklist() {
    var items = REQUIREMENTS.map(function (req) {
      return (
        '<li class="req" data-req="' + req.id + '">' +
          '<span class="req__dot" aria-hidden="true"></span>' +
          '<span class="req__label">' + escapeHtml(req.label) + "</span>" +
          '<span class="req__status" data-req-status>待检查</span>' +
        "</li>"
      );
    }).join("");

    return (
      '<div class="project-panel card">' +
        '<p class="card__eyebrow">需求清单</p>' +
        '<h2 class="project-panel__title">自动检查</h2>' +
        '<ul class="req-list">' + items + "</ul>" +
        '<div class="project-panel__actions">' +
          '<button class="btn btn--primary" type="button" data-check-project>检查需求</button>' +
          '<span class="project-panel__summary" data-project-summary role="status" aria-live="polite">尚未检查</span>' +
        "</div>" +
      "</div>"
    );
  }

  function buildWorkspace() {
    return '<div class="project-workspace">' + window.WebLab.Workspace.markup({ live: true }) + "</div>";
  }

  function buildActions() {
    return (
      '<div class="project-panel card">' +
        '<p class="card__eyebrow">操作</p>' +
        '<h2 class="project-panel__title">演示与下载</h2>' +
        '<div class="project-actions">' +
          '<button class="btn btn--ghost" type="button" data-present>演示模式</button>' +
          '<button class="btn btn--ghost" type="button" data-download="index">下载 index.html</button>' +
          '<button class="btn btn--ghost" type="button" data-download="css">下载 style.css</button>' +
          '<button class="btn btn--ghost" type="button" data-download="js">下载 script.js</button>' +
          '<button class="btn btn--ghost" type="button" data-download="chart">下载 chart.umd.js</button>' +
        "</div>" +
        '<p class="project-actions__note" data-download-status role="status" aria-live="polite"></p>' +
      "</div>"
    );
  }

  function buildGuide() {
    return (
      '<div class="project-panel card">' +
        '<p class="card__eyebrow">发布</p>' +
        '<h2 class="project-panel__title">发布到 GitHub Pages</h2>' +
        "<details class=\"guide\">" +
          "<summary>展开查看步骤</summary>" +
          "<ol class=\"guide__steps\">" +
            "<li>下载上面的 index.html、style.css、script.js（如果用了图表，再下载 chart.umd.js）。</li>" +
            "<li>在 GitHub 新建一个仓库（Repository）。</li>" +
            "<li>把下载的文件上传到仓库根目录。</li>" +
            "<li>打开仓库 Settings → Pages。</li>" +
            "<li>Source 选择分支（如 main）和根目录，保存。</li>" +
            "<li>等待一会儿，访问 <code>https://你的用户名.github.io/仓库名/</code>。</li>" +
          "</ol>" +
        "</details>" +
      "</div>"
    );
  }

  function buildPresentation() {
    return (
      '<div class="presentation" data-presentation hidden>' +
        '<div class="presentation__bar">' +
          '<span class="presentation__title">演示模式</span>' +
          '<button class="btn btn--ghost btn--sm" type="button" data-pres-prev>← 上一节</button>' +
          '<button class="btn btn--ghost btn--sm" type="button" data-pres-next>下一节 →</button>' +
          '<button class="btn btn--primary btn--sm" type="button" data-pres-exit>退出</button>' +
        "</div>" +
        '<div class="presentation__stage">' +
          '<iframe data-presentation-frame sandbox="allow-scripts" title="演示预览"></iframe>' +
        "</div>" +
      "</div>"
    );
  }

  function renderProject(ctx) {
    document.title = "Final Project · Web Lab";
    ctx.container.innerHTML = buildPage();

    var Storage = window.WebLab.Storage;
    var root = ctx.container.querySelector("[data-workspace]");
    var workspace = null;
    if (root && window.WebLab.Workspace) {
      var saved = Storage ? Storage.getProject() : null;
      var hasSaved = saved && (saved.html || saved.css || saved.js);
      workspace = window.WebLab.Workspace.create(root, {
        starter: STARTER,
        values: hasSaved ? saved : undefined,
        live: true,
        chart: true,
        onPersist: function (values) {
          if (Storage) { Storage.saveProject(values); }
        }
      });
    }

    wireCheck(ctx.container, workspace);
    wirePresentation(ctx.container, workspace);
    wireDownloads(ctx.container, workspace);
  }

  function currentValues(workspace) {
    return workspace && workspace.editor ? workspace.editor.getValues() : { html: "", css: "", js: "" };
  }

  function wireCheck(container, workspace) {
    var button = container.querySelector("[data-check-project]");
    var summary = container.querySelector("[data-project-summary]");
    if (!button || !window.WebLab.Validator) {
      return;
    }

    button.addEventListener("click", function () {
      var values = currentValues(workspace);
      var consoleOutput = workspace && workspace.console ? workspace.console.getLines() : [];
      button.disabled = true;
      button.textContent = "检查中…";

      window.WebLab.Validator.check(
        { validators: REQUIREMENTS.map(function (req) { return req.rule; }) },
        { html: values.html, css: values.css, js: values.js, consoleOutput: consoleOutput, values: values }
      ).then(function (result) {
        Array.prototype.forEach.call(container.querySelectorAll("[data-req]"), function (item, index) {
          var feedback = result.feedback[index];
          item.classList.toggle("is-pass", !!feedback.success);
          item.classList.toggle("is-fail", !feedback.success);
          var status = item.querySelector("[data-req-status]");
          if (status) { status.textContent = feedback.success ? "通过" : "未通过"; }
          var message = item.querySelector("[data-req-msg]");
          if (message) { message.textContent = feedback.message; }
        });
        if (summary) {
          summary.textContent = "通过 " + result.score + " / " + result.total + (result.success ? "，全部完成！" : "");
          summary.classList.toggle("is-success", result.success);
        }
        button.disabled = false;
        button.textContent = "检查需求";
      }).catch(function () {
        button.disabled = false;
        button.textContent = "检查需求";
        if (summary) { summary.textContent = "检查时出错，请重试。"; }
      });
    });
  }

  function wirePresentation(container, workspace) {
    var overlay = container.querySelector("[data-presentation]");
    var frame = container.querySelector("[data-presentation-frame]");
    var openButton = container.querySelector("[data-present]");
    if (!overlay || !frame || !openButton || !window.WebLab.Preview) {
      return;
    }

    function open() {
      var values = currentValues(workspace);
      frame.srcdoc = window.WebLab.Preview.buildSrcdoc(values, {
        extraScript: PRESENTATION_SCRIPT,
        chart: true
      });
      overlay.hidden = false;
      if (overlay.requestFullscreen) {
        overlay.requestFullscreen().catch(function () {});
      }
    }

    function close() {
      overlay.hidden = true;
      frame.srcdoc = "";
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(function () {});
      }
    }

    function send(action) {
      if (frame.contentWindow) {
        frame.contentWindow.postMessage({ source: "weblab-presentation", action: action }, "*");
      }
    }

    openButton.addEventListener("click", open);
    container.querySelector("[data-pres-exit]").addEventListener("click", close);
    container.querySelector("[data-pres-next]").addEventListener("click", function () { send("next"); });
    container.querySelector("[data-pres-prev]").addEventListener("click", function () { send("prev"); });
    document.addEventListener("keydown", function (event) {
      if (overlay.hidden) { return; }
      if (event.key === "Escape") { close(); }
      else if (event.key === "ArrowRight") { send("next"); }
      else if (event.key === "ArrowLeft") { send("prev"); }
    });
  }

  function buildIndexHtml(values) {
    var usesChart = /new\s+Chart\s*\(/.test(values.js || "");
    return [
      "<!DOCTYPE html>",
      '<html lang="zh-CN">',
      "<head>",
      '  <meta charset="UTF-8">',
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      "  <title>我的数据项目</title>",
      '  <link rel="stylesheet" href="style.css">',
      "</head>",
      "<body>",
      values.html || "",
      usesChart ? '  <script src="chart.umd.js"></script>' : "",
      '  <script src="script.js"></script>',
      "</body>",
      "</html>"
    ].filter(function (line) { return line !== ""; }).join("\n");
  }

  function downloadText(filename, text) {
    var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    triggerDownload(url, filename);
    URL.revokeObjectURL(url);
  }

  function triggerDownload(url, filename) {
    var link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function wireDownloads(container, workspace) {
    var status = container.querySelector("[data-download-status]");
    Array.prototype.forEach.call(container.querySelectorAll("[data-download]"), function (button) {
      button.addEventListener("click", function () {
        var kind = button.getAttribute("data-download");
        var values = currentValues(workspace);
        if (kind === "index") {
          downloadText("index.html", buildIndexHtml(values));
        } else if (kind === "css") {
          downloadText("style.css", values.css || "");
        } else if (kind === "js") {
          downloadText("script.js", values.js || "");
        } else if (kind === "chart") {
          var chartUrl = "assets/vendor/chart.umd.js";
          try {
            chartUrl = new URL("assets/vendor/chart.umd.js", document.baseURI).href;
          } catch (e) { /* keep relative */ }
          triggerDownload(chartUrl, "chart.umd.js");
        }
        if (status) {
          status.textContent = "已开始下载（浏览器可能会询问保存位置）。";
        }
      });
    });
  }

  pages.renderProject = renderProject;
  pages.projectRequirements = REQUIREMENTS;
})(window.WebLab.pages);
