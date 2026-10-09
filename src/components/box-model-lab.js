// Box Model Lab: sliders for width / padding / border / margin, a synced
// diagram, generated CSS and a live preview (PRD.md section 13).
window.WebLab = window.WebLab || {};

(function (WebLab) {
  "use strict";

  var DEFAULTS = { width: 200, padding: 16, border: 4, margin: 12 };
  var DEMO_HTML = '<div class="box">内容</div>';

  function buildCss(state) {
    var s = Object.assign({}, DEFAULTS, state || {});
    return (
      ".box {\n" +
      "  width: " + s.width + "px;\n" +
      "  padding: " + s.padding + "px;\n" +
      "  border: " + s.border + "px solid #cdd6e3;\n" +
      "  margin: " + s.margin + "px;\n" +
      "  background-color: #e8f1ff;\n" +
      "}"
    );
  }

  function control(name, label, min, max, unit) {
    return (
      '<div class="cp-field">' +
        '<label for="bml-' + name + '">' + label + ' <output data-bml-out="' + name + '"></output></label>' +
        '<div class="cp-field__control">' +
          '<input id="bml-' + name + '" type="range" min="' + min + '" max="' + max + '" step="1" data-bml="' + name + '" value="' + DEFAULTS[name] + '">' +
        "</div>" +
      "</div>"
    );
  }

  function markup() {
    return (
      '<div class="box-model-lab" data-bml>' +
        '<div class="bml__controls">' +
          control("width", "宽度", 40, 320) +
          control("padding", "内边距", 0, 48) +
          control("border", "边框", 0, 20) +
          control("margin", "外边距", 0, 48) +
          '<button class="btn btn--ghost" type="button" data-bml-reset>恢复默认</button>' +
        "</div>" +
        '<div class="bml__stage">' +
          '<div class="bml__diagram" data-bml-diagram>' +
            '<div class="bml__margin" data-bml-margin>' +
              '<span class="bml__tag bml__tag--margin">margin</span>' +
              '<div class="bml__border" data-bml-border>' +
                '<span class="bml__tag bml__tag--border">border</span>' +
                '<div class="bml__padding" data-bml-padding>' +
                  '<span class="bml__tag bml__tag--padding">padding</span>' +
                  '<div class="bml__content" data-bml-content>内容</div>' +
                "</div>" +
              "</div>" +
            "</div>" +
          "</div>" +
          '<pre class="code-block"><code data-bml-code></code></pre>' +
          '<iframe class="preview__frame" data-bml-frame sandbox="allow-scripts" title="盒模型预览"></iframe>' +
        "</div>" +
      "</div>"
    );
  }

  var active = null;

  function create(root, options) {
    options = options || {};
    destroyActive();

    var inputs = root.querySelectorAll("[data-bml]");
    var outputs = root.querySelectorAll("[data-bml-out]");
    var marginEl = root.querySelector("[data-bml-margin]");
    var borderEl = root.querySelector("[data-bml-border]");
    var paddingEl = root.querySelector("[data-bml-padding]");
    var contentEl = root.querySelector("[data-bml-content]");
    var codeEl = root.querySelector("[data-bml-code]");
    var resetButton = root.querySelector("[data-bml-reset]");
    var previewFrame = root.querySelector("[data-bml-frame]");

    var preview = WebLab.Preview.create(previewFrame, { live: false });

    function readState() {
      var state = Object.assign({}, DEFAULTS);
      Array.prototype.forEach.call(inputs, function (input) {
        state[input.getAttribute("data-bml")] = Number(input.value);
      });
      return state;
    }

    function update() {
      var state = readState();

      Array.prototype.forEach.call(outputs, function (output) {
        output.textContent = state[output.getAttribute("data-bml-out")] + "px";
      });
      if (marginEl) { marginEl.style.padding = state.margin + "px"; }
      if (borderEl) { borderEl.style.borderWidth = state.border + "px"; }
      if (paddingEl) { paddingEl.style.padding = state.padding + "px"; }
      if (contentEl) { contentEl.style.width = state.width + "px"; }
      if (codeEl) { codeEl.textContent = buildCss(state); }

      preview.run({ html: DEMO_HTML, css: buildCss(state), js: "" });
    }

    Array.prototype.forEach.call(inputs, function (input) {
      input.addEventListener("input", update);
    });

    if (resetButton) {
      resetButton.addEventListener("click", function () {
        Array.prototype.forEach.call(inputs, function (input) {
          input.value = DEFAULTS[input.getAttribute("data-bml")];
        });
        update();
      });
    }

    update();

    active = {
      update: update,
      readState: readState,
      destroy: function () { preview.destroy(); }
    };
    return active;
  }

  function destroyActive() {
    if (active && active.destroy) {
      active.destroy();
    }
    active = null;
  }

  WebLab.BoxModelLab = {
    markup: markup,
    create: create,
    buildCss: buildCss,
    defaults: DEFAULTS,
    destroyActive: destroyActive
  };
})(window.WebLab);
