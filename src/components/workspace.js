// Workspace component: combines Editor + Preview + Console into one reusable
// block, shared by the Lesson page and the Playground.
window.WebLab = window.WebLab || {};

(function (WebLab) {
  "use strict";

  var active = null;

  // HTML markup for a workspace. Pages insert this string, then call create().
  function markup(options) {
    options = options || {};
    var live = options.live !== false;
    return (
      '<div class="workspace" data-workspace>' +
        '<div class="workspace__pane">' +
          '<div class="editor" data-editor>' +
            '<div class="editor__bar">' +
              '<div class="editor__tabs" role="tablist" aria-label="代码类型">' +
                '<button class="editor__tab is-active" type="button" role="tab" data-editor-tab="html" aria-selected="true">HTML</button>' +
                '<button class="editor__tab" type="button" role="tab" data-editor-tab="css" aria-selected="false">CSS</button>' +
                '<button class="editor__tab" type="button" role="tab" data-editor-tab="js" aria-selected="false">JS</button>' +
              "</div>" +
              '<button class="editor__action" type="button" data-editor-reset>重置</button>' +
            "</div>" +
            '<div class="editor__panels">' +
              '<textarea class="editor__input" data-editor-input="html" spellcheck="false" aria-label="HTML 代码"></textarea>' +
              '<textarea class="editor__input" data-editor-input="css" spellcheck="false" aria-label="CSS 代码" hidden></textarea>' +
              '<textarea class="editor__input" data-editor-input="js" spellcheck="false" aria-label="JavaScript 代码" hidden></textarea>' +
            "</div>" +
          "</div>" +
        "</div>" +
        '<div class="workspace__pane">' +
          '<div class="preview" data-preview>' +
            '<div class="preview__bar">' +
              '<span class="pane__title">预览</span>' +
              '<div class="preview__devices" role="group" aria-label="预览尺寸">' +
                '<button class="preview__device is-active" type="button" data-device="" aria-pressed="true">自适应</button>' +
                '<button class="preview__device" type="button" data-device="1200" aria-pressed="false">桌面</button>' +
                '<button class="preview__device" type="button" data-device="768" aria-pressed="false">平板</button>' +
                '<button class="preview__device" type="button" data-device="375" aria-pressed="false">手机</button>' +
              "</div>" +
              '<label class="preview__live"><input type="checkbox" data-live' + (live ? " checked" : "") + "> 实时预览</label>" +
              '<button class="btn btn--primary btn--sm" type="button" data-run>运行</button>' +
            "</div>" +
            '<div class="preview__stage" data-preview-stage>' +
              '<iframe class="preview__frame" data-preview-frame sandbox="allow-scripts" title="代码运行预览"></iframe>' +
            "</div>" +
          "</div>" +
          '<div class="console" data-console>' +
            '<div class="console__bar">' +
              '<span class="pane__title">Console</span>' +
              '<button class="console__clear" type="button" data-console-clear>清空</button>' +
            "</div>" +
            '<ul class="console__output" data-console-output aria-live="polite"></ul>' +
          "</div>" +
        "</div>" +
      "</div>"
    );
  }

  function create(root, options) {
    options = options || {};
    destroyActive();

    var editorRoot = root.querySelector("[data-editor]");
    var previewFrame = root.querySelector("[data-preview-frame]");
    var consoleRoot = root.querySelector("[data-console]");
    var runButton = root.querySelector("[data-run]");
    var liveInput = root.querySelector("[data-live]");
    var deviceButtons = root.querySelectorAll("[data-device]");
    var persistTimer = null;

    var consolePanel = window.WebLab.Console.create(consoleRoot);

    var preview = window.WebLab.Preview.create(previewFrame, {
      live: options.live !== false,
      chart: !!options.chart,
      onMessage: function (message) {
        consolePanel.add(message);
      },
      onRun: function () {
        consolePanel.clear();
      }
    });

    // Debounced so we do not write to storage on every keystroke.
    function schedulePersist(reason) {
      if (!options.onPersist) {
        return;
      }
      if (persistTimer) {
        clearTimeout(persistTimer);
      }
      persistTimer = setTimeout(function () {
        persistTimer = null;
        options.onPersist(editor.getValues(), reason);
      }, options.persistDelay || 500);
    }

    var editor = window.WebLab.Editor.create(editorRoot, {
      starter: options.starter,
      values: options.values,
      onRun: function () {
        run();
      },
      onChange: function (type) {
        schedulePersist(type);
        if (type === "reset") {
          run();
          return;
        }
        // JavaScript always requires a manual run; HTML/CSS follow live mode.
        if (preview.isLive() && type !== "js") {
          preview.schedule(editor.getValues());
        }
      }
    });

    function run() {
      preview.run(editor.getValues());
    }

    if (runButton) {
      runButton.addEventListener("click", run);
    }

    if (liveInput) {
      liveInput.checked = options.live !== false;
      liveInput.addEventListener("change", function () {
        preview.setLive(liveInput.checked);
        if (options.onLiveChange) {
          options.onLiveChange(liveInput.checked);
        }
        if (liveInput.checked) {
          run();
        }
      });
    }

    // Responsive Preview: switch the iframe width between device sizes.
    Array.prototype.forEach.call(deviceButtons, function (button) {
      button.addEventListener("click", function () {
        var width = button.getAttribute("data-device");
        Array.prototype.forEach.call(deviceButtons, function (other) {
          var isActive = other === button;
          other.classList.toggle("is-active", isActive);
          other.setAttribute("aria-pressed", isActive ? "true" : "false");
        });
        if (previewFrame) {
          previewFrame.style.width = width ? width + "px" : "100%";
        }
      });
    });

    run();

    active = {
      editor: editor,
      preview: preview,
      console: consolePanel,
      run: run,
      destroy: function () {
        if (persistTimer) {
          clearTimeout(persistTimer);
          persistTimer = null;
        }
        preview.destroy();
      }
    };
    return active;
  }

  // Clean up the previous workspace so message listeners do not pile up.
  function destroyActive() {
    if (active && active.destroy) {
      active.destroy();
    }
    active = null;
  }

  WebLab.Workspace = { markup: markup, create: create, destroyActive: destroyActive };
})(window.WebLab);
