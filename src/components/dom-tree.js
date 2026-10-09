// Simplified DOM Tree: parses an HTML snippet with DOMParser and renders a
// nested list of tags. Used by HTML lessons to visualize structure.
window.WebLab = window.WebLab || {};

(function (WebLab) {
  "use strict";

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

  function nodeLabel(element) {
    var tag = element.tagName.toLowerCase();
    var extra = "";
    if (element.id) {
      extra += "#" + element.id;
    }
    if (element.classList && element.classList.length) {
      for (var i = 0; i < element.classList.length; i++) {
        extra += "." + element.classList[i];
      }
    }
    return "<" + tag + ">" + (extra ? " " + extra : "");
  }

  function renderList(elements) {
    if (!elements.length) {
      return "";
    }
    var items = elements
      .map(function (element) {
        var children = Array.prototype.slice.call(element.children || []);
        return (
          '<li class="dom-tree__node">' +
            '<span class="dom-tree__tag">' + escapeHtml(nodeLabel(element)) + "</span>" +
            renderList(children) +
          "</li>"
        );
      })
      .join("");
    return '<ul class="dom-tree__list">' + items + "</ul>";
  }

  function render(code) {
    var Parser = getParser();
    if (!Parser) {
      return '<p class="dom-tree__note">当前环境无法生成 DOM 树。</p>';
    }
    var doc = new Parser().parseFromString(String(code || ""), "text/html");
    var roots = Array.prototype.slice.call(doc.body ? doc.body.children : []);
    if (!roots.length) {
      return '<p class="dom-tree__note">代码里还没有可以显示的元素。</p>';
    }
    return '<div class="dom-tree">' + renderList(roots) + "</div>";
  }

  WebLab.DomTree = { render: render };
})(window.WebLab);
