// Flex Playground: interactive flex-direction / justify-content / align-items
// with live preview and synced code (PRD.md section 14).
window.WebLab = window.WebLab || {};

(function (WebLab) {
  "use strict";

  var DEFAULTS = { direction: "row", justify: "flex-start", align: "stretch", gap: 12 };

  var DEMO_HTML =
    '<div class="flex-container">' +
      '<div class="flex-item">1</div>' +
      '<div class="flex-item">2</div>' +
      '<div class="flex-item">3</div>' +
    "</div>";

  function buildCss(state) {
    var s = Object.assign({}, DEFAULTS, state || {});
    return (
      ".flex-container {\n" +
      "  display: flex;\n" +
      "  flex-direction: " + s.direction + ";\n" +
      "  justify-content: " + s.justify + ";\n" +
      "  align-items: " + s.align + ";\n" +
      "  gap: " + s.gap + "px;\n" +
      "  min-height: 180px;\n" +
      "  padding: 12px;\n" +
      "  background-color: #f5f7fa;\n" +
      "  border: 1px solid #e3e8ef;\n" +
      "}\n\n" +
      ".flex-item {\n" +
      "  padding: 16px 20px;\n" +
      "  background-color: #e8f1ff;\n" +
      "  border: 1px solid #cdd6e3;\n" +
      "  border-radius: 8px;\n" +
      "  text-align: center;\n" +
      "}"
    );
  }

  function selectField(name, label, options) {
    var opts = options
      .map(function (value) {
        return '<option value="' + value + '">' + value + "</option>";
      })
      .join("");
    return (
      '<div class="cp-field">' +
        '<label for="fp-' + name + '">' + label + "</label>" +
        '<div class="cp-field__control">' +
          '<select id="fp-' + name + '" data-fp="' + name + '">' + opts + "</select>" +
        "</div>" +
      "</div>"
    );
  }

  function markup() {
    return (
      '<div class="flex-playground" data-fp-root>' +
        '<div class="fp__controls">' +
          selectField("direction", "flex-direction", ["row", "row-reverse", "column", "column-reverse"]) +
          selectField("justify", "justify-content", ["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"]) +
          selectField("align", "align-items", ["stretch", "flex-start", "center", "flex-end", "baseline"]) +
          '<div class="cp-field">' +
            '<label for="fp-gap">gap <output data-fp-out="gap"></output></label>' +
            '<div class="cp-field__control"><input id="fp-gap" type="range" min="0" max="32" step="1" data-fp="gap" value="' + DEFAULTS.gap + '"></div>' +
          "</div>" +
          '<button class="btn btn--ghost" type="button" data-fp-reset>恢复默认</button>' +
        "</div>" +
        '<div class="fp__stage">' +
          '<pre class="code-block"><code data-fp-code></code></pre>' +
          '<iframe class="preview__frame" data-fp-frame sandbox="allow-scripts" title="Flex 预览"></iframe>' +
        "</div>" +
      "</div>"
    );
  }

  var active = null;

  function create(root, options) {
    options = options || {};
    destroyActive();

    var inputs = root.querySelectorAll("[data-fp]");
    var outputs = root.querySelectorAll("[data-fp-out]");
    var codeEl = root.querySelector("[data-fp-code]");
    var resetButton = root.querySelector("[data-fp-reset]");
    var previewFrame = root.querySelector("[data-fp-frame]");

    var preview = WebLab.Preview.create(previewFrame, { live: false });

    function readState() {
      var state = Object.assign({}, DEFAULTS);
      Array.prototype.forEach.call(inputs, function (input) {
        var name = input.getAttribute("data-fp");
        state[name] = input.type === "range" ? Number(input.value) : input.value;
      });
      return state;
    }

    function update() {
      var state = readState();

      Array.prototype.forEach.call(outputs, function (output) {
        output.textContent = state[output.getAttribute("data-fp-out")] + "px";
      });
      if (codeEl) { codeEl.textContent = buildCss(state); }

      preview.run({ html: DEMO_HTML, css: buildCss(state), js: "" });
    }

    Array.prototype.forEach.call(inputs, function (input) {
      input.addEventListener("input", update);
      input.addEventListener("change", update);
    });

    if (resetButton) {
      resetButton.addEventListener("click", function () {
        Array.prototype.forEach.call(inputs, function (input) {
          input.value = DEFAULTS[input.getAttribute("data-fp")];
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

  WebLab.FlexPlayground = {
    markup: markup,
    create: create,
    buildCss: buildCss,
    defaults: DEFAULTS,
    destroyActive: destroyActive
  };
})(window.WebLab);
