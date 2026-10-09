// DOM Lab: a small interactive DOM tree with selector highlighting.
// Runs entirely in the main document by parsing a demo snippet with DOMParser,
// so students can experiment with selectors without touching an iframe.
window.WebLab = window.WebLab || {};

(function (WebLab) {
  "use strict";

  var DEMO_HTML =
    '<header id="site-header">' +
      '<h1 class="title">我的主页</h1>' +
    "</header>" +
    "<main>" +
      '<section class="card">' +
        "<h2>关于我</h2>" +
        "<p>你好，我是一名大一学生。</p>" +
      "</section>" +
    "</main>";

  function getParser() {
    if (typeof window !== "undefined" && window.DOMParser) {
      return window.DOMParser;
    }
    if (typeof DOMParser !== "undefined") {
      return DOMParser;
    }
    return null;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function label(element) {
    var tag = element.tagName.toLowerCase();
    if (element.id) {
      tag += "#" + element.id;
    }
    if (element.classList && element.classList.length) {
      for (var i = 0; i < element.classList.length; i++) {
        tag += "." + element.classList[i];
      }
    }
    return tag;
  }

  // Parse the snippet, list elements in document order and build the tree.
  function build(code) {
    var Parser = getParser();
    if (!Parser) {
      return null;
    }
    var doc = new Parser().parseFromString(String(code || ""), "text/html");
    var elements = [];

    function walk(element) {
      var index = elements.length;
      elements.push(element);
      var children = Array.prototype.slice.call(element.children || []);
      var inner = children.length
        ? '<ul class="dom-tree__list">' + children.map(walk).join("") + "</ul>"
        : "";
      return (
        '<li class="dom-tree__node" data-idx="' + index + '">' +
          '<button type="button" class="dom-tree__tag dom-tree__tag--button">' + escapeHtml(label(element)) + "</button>" +
          inner +
        "</li>"
      );
    }

    var roots = Array.prototype.slice.call(doc.body ? doc.body.children : []);
    var treeHTML = '<ul class="dom-tree__list">' + roots.map(walk).join("") + "</ul>";
    return { doc: doc, elements: elements, treeHTML: treeHTML };
  }

  // Pure helper: how many elements match, and their tree indices.
  function inspect(code, selector) {
    var built = build(code);
    if (!built) {
      return { count: 0, indices: [], treeHTML: "" };
    }
    var matched = [];
    if (selector) {
      try {
        matched = Array.prototype.slice.call(built.doc.querySelectorAll(selector));
      } catch (e) {
        matched = [];
      }
    }
    var indices = matched
      .map(function (element) {
        return built.elements.indexOf(element);
      })
      .filter(function (index) {
        return index >= 0;
      });
    return { count: indices.length, indices: indices, treeHTML: built.treeHTML, first: matched[0] || null };
  }

  function markup() {
    return (
      '<div class="dom-lab" data-dom-lab>' +
        '<div class="dom-lab__controls">' +
          '<label for="dom-lab-selector">选择器</label>' +
          '<input id="dom-lab-selector" type="text" data-dom-lab-input value="h2" spellcheck="false">' +
          '<span class="dom-lab__status" data-dom-lab-status role="status" aria-live="polite"></span>' +
        "</div>" +
        '<div class="dom-lab__panes">' +
          '<pre class="code-block"><code data-dom-lab-code></code></pre>' +
          '<div class="dom-lab__tree" data-dom-lab-tree></div>' +
        "</div>" +
      "</div>"
    );
  }

  function create(root) {
    var built = build(DEMO_HTML);
    if (!built) {
      return null;
    }
    var input = root.querySelector("[data-dom-lab-input]");
    var treeEl = root.querySelector("[data-dom-lab-tree]");
    var codeEl = root.querySelector("[data-dom-lab-code]");
    var statusEl = root.querySelector("[data-dom-lab-status]");

    if (treeEl) { treeEl.innerHTML = built.treeHTML; }
    if (codeEl) { codeEl.textContent = DEMO_HTML; }

    function clearMatches() {
      if (!treeEl) { return; }
      Array.prototype.forEach.call(treeEl.querySelectorAll(".is-match"), function (node) {
        node.classList.remove("is-match");
      });
    }

    function update() {
      var selector = input ? input.value.trim() : "";
      var matched = [];
      if (selector) {
        try {
          matched = Array.prototype.slice.call(built.doc.querySelectorAll(selector));
        } catch (e) {
          matched = [];
        }
      }
      clearMatches();
      matched.forEach(function (element) {
        var index = built.elements.indexOf(element);
        var node = index >= 0 && treeEl ? treeEl.querySelector('[data-idx="' + index + '"]') : null;
        if (node) { node.classList.add("is-match"); }
      });

      if (!statusEl) { return; }
      if (!selector) {
        statusEl.textContent = "输入一个 CSS 选择器";
      } else if (!matched.length) {
        statusEl.textContent = "没有匹配的元素";
      } else {
        var text = matched[0].textContent ? matched[0].textContent.trim().slice(0, 16) : "";
        statusEl.textContent = "匹配 " + matched.length + " 个元素：" + label(matched[0]) + (text ? "「" + text + "」" : "");
      }
    }

    if (input) { input.addEventListener("input", update); }
    update();

    return { update: update, inspect: inspect };
  }

  WebLab.DomLab = { markup: markup, create: create, inspect: inspect, demo: DEMO_HTML };
})(window.WebLab);
