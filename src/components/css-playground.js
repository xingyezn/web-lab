// CSS Playground: visual controls that generate CSS and update a live preview.
// Reuses the Preview module; keeps generated CSS as plain text so students can
// read the exact rules they are building.
window.WebLab = window.WebLab || {};

(function (WebLab) {
  "use strict";

  var DEFAULTS = {
    color: "#1677ff",
    background: "#ffffff",
    fontSize: 20,
    fontWeight: "normal",
    textAlign: "left",
    radius: 12,
    borderWidth: 2,
    padding: 24,
    margin: 16
  };

  var DEMO_HTML =
    '<div class="demo-card">' +
      "<h2>个人主页</h2>" +
      "<p>拖动左侧控件，观察预览与代码的变化。</p>" +
    "</div>";

  function buildCss(state) {
    var s = Object.assign({}, DEFAULTS, state || {});
    return (
      ".demo-card {\n" +
      "  color: " + s.color + ";\n" +
      "  background-color: " + s.background + ";\n" +
      "  font-size: " + s.fontSize + "px;\n" +
      "  font-weight: " + s.fontWeight + ";\n" +
      "  text-align: " + s.textAlign + ";\n" +
      "  border: " + s.borderWidth + "px solid #cbd5e1;\n" +
      "  border-radius: " + s.radius + "px;\n" +
      "  padding: " + s.padding + "px;\n" +
      "  margin: " + s.margin + "px;\n" +
      "}"
    );
  }

  function markup() {
    return (
      '<div class="css-playground" data-css-playground>' +
        '<div class="css-playground__controls">' +
          field("color", "文字颜色", '<input id="cp-color" type="color" data-cp="color" value="' + DEFAULTS.color + '">') +
          field("background", "背景颜色", '<input id="cp-background" type="color" data-cp="background" value="' + DEFAULTS.background + '">') +
          field("fontSize", "字号", '<input id="cp-fontSize" type="range" min="12" max="48" step="1" data-cp="fontSize" value="' + DEFAULTS.fontSize + '"> <output data-cp-out="fontSize"></output>') +
          field("fontWeight", "字重", '<select id="cp-fontWeight" data-cp="fontWeight"><option value="normal">normal</option><option value="bold">bold</option></select>') +
          field("textAlign", "对齐", '<select id="cp-textAlign" data-cp="textAlign"><option value="left">left</option><option value="center">center</option><option value="right">right</option></select>') +
          field("radius", "圆角", '<input id="cp-radius" type="range" min="0" max="40" step="1" data-cp="radius" value="' + DEFAULTS.radius + '"> <output data-cp-out="radius"></output>') +
          field("borderWidth", "边框", '<input id="cp-borderWidth" type="range" min="0" max="10" step="1" data-cp="borderWidth" value="' + DEFAULTS.borderWidth + '"> <output data-cp-out="borderWidth"></output>') +
          field("padding", "内边距", '<input id="cp-padding" type="range" min="0" max="48" step="1" data-cp="padding" value="' + DEFAULTS.padding + '"> <output data-cp-out="padding"></output>') +
          field("margin", "外边距", '<input id="cp-margin" type="range" min="0" max="48" step="1" data-cp="margin" value="' + DEFAULTS.margin + '"> <output data-cp-out="margin"></output>') +
          '<button class="btn btn--ghost" type="button" data-cp-reset>恢复默认</button>' +
        "</div>" +
        '<div class="css-playground__preview">' +
          '<pre class="code-block"><code data-cp-code></code></pre>' +
          '<iframe class="preview__frame" data-cp-frame sandbox="allow-scripts" title="CSS 预览"></iframe>' +
        "</div>" +
      "</div>"
    );
  }

  function field(name, label, control) {
    return (
      '<div class="cp-field">' +
        '<label for="cp-' + name + '">' + label + "</label>" +
        '<div class="cp-field__control">' + control + "</div>" +
      "</div>"
    );
  }

  var active = null;

  function create(root, options) {
    options = options || {};
    destroyActive();

    var previewFrame = root.querySelector("[data-cp-frame]");
    var codeEl = root.querySelector("[data-cp-code]");
    var resetButton = root.querySelector("[data-cp-reset]");
    var inputs = root.querySelectorAll("[data-cp]");

    var preview = WebLab.Preview.create(previewFrame, { live: false });

    function readState() {
      var state = Object.assign({}, DEFAULTS);
      Array.prototype.forEach.call(inputs, function (input) {
        var name = input.getAttribute("data-cp");
        state[name] = input.type === "range" ? Number(input.value) : input.value;
      });
      return state;
    }

    function update() {
      var state = readState();
      var css = buildCss(state);

      Array.prototype.forEach.call(root.querySelectorAll("[data-cp-out]"), function (output) {
        var name = output.getAttribute("data-cp-out");
        output.textContent = state[name] + "px";
      });
      if (codeEl) {
        codeEl.textContent = css;
      }
      preview.run({ html: DEMO_HTML, css: css, js: "" });
    }

    Array.prototype.forEach.call(inputs, function (input) {
      input.addEventListener("input", update);
      input.addEventListener("change", update);
    });

    if (resetButton) {
      resetButton.addEventListener("click", function () {
        Array.prototype.forEach.call(inputs, function (input) {
          var name = input.getAttribute("data-cp");
          input.value = DEFAULTS[name];
        });
        update();
      });
    }

    update();

    active = {
      update: update,
      readState: readState,
      destroy: function () {
        preview.destroy();
      }
    };
    return active;
  }

  function destroyActive() {
    if (active && active.destroy) {
      active.destroy();
    }
    active = null;
  }

  WebLab.CssPlayground = {
    markup: markup,
    create: create,
    buildCss: buildCss,
    defaults: DEFAULTS,
    destroyActive: destroyActive
  };
})(window.WebLab);
