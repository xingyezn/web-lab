// Preview module: runs student code inside a locked-down sandbox iframe.
// - HTML/CSS lessons: debounced live preview (default 250ms).
// - JS lessons: manual run (the Workspace decides via options.live).
// Security notes:
// - iframe uses sandbox="allow-scripts" only (no allow-same-origin).
// - Incoming messages are verified by event.source against the iframe window.
window.WebLab = window.WebLab || {};

(function (WebLab) {
  "use strict";

  // Injected first in <head>. Captures console output and runtime errors and
  // forwards them to the parent. This script is fully controlled by us.
  var CONSOLE_PROXY = [
    "(function () {",
    '  var SOURCE = "weblab-preview";',
    "  function send(type, payload) {",
    "    try {",
    "      var message = { source: SOURCE, type: type };",
    "      for (var key in payload) {",
    "        if (Object.prototype.hasOwnProperty.call(payload, key)) {",
    "          message[key] = payload[key];",
    "        }",
    "      }",
    '      parent.postMessage(message, "*");',
    "    } catch (e) {}",
    "  }",
    "  function format(value) {",
    "    if (typeof value === 'string') { return value; }",
    "    if (value === null) { return 'null'; }",
    "    if (value === undefined) { return 'undefined'; }",
    "    if (typeof value === 'number' || typeof value === 'boolean') { return String(value); }",
    "    if (typeof value === 'function') { return value.toString(); }",
    "    if (value instanceof Error) { return value.name + ': ' + value.message; }",
    "    try { return JSON.stringify(value); } catch (e) { return String(value); }",
    "  }",
    "  ['log', 'warn', 'error', 'info'].forEach(function (level) {",
    "    var original = console[level] || console.log;",
    "    console[level] = function () {",
    "      var parts = [];",
    "      for (var i = 0; i < arguments.length; i++) { parts.push(format(arguments[i])); }",
    "      send('console', { level: level, text: parts.join(' ') });",
    "      try { original.apply(console, arguments); } catch (e) {}",
    "    };",
    "  });",
    "  window.onerror = function (message, source, line) {",
    "    send('error', { level: 'error', text: String(message) + (line ? '（第 ' + line + ' 行）' : '') });",
    "    return false;",
    "  };",
    "  window.addEventListener('unhandledrejection', function (event) {",
    "    send('error', { level: 'error', text: 'Unhandled Promise: ' + format(event.reason) });",
    "  });",
    "})();"
  ].join("\n");

  // Counts element-level event listeners added by student code. Placed after
  // the Console proxy so the proxy's own listener is not counted, and after
  // Chart.js is loaded so library internals are ignored. Used by the
  // `js-event` validator rule.
  var EVENT_COUNTER = [
    "(function () {",
    "  window.__weblabEventCount = 0;",
    "  try {",
    "    var proto = window.EventTarget && EventTarget.prototype;",
    "    if (proto && proto.addEventListener) {",
    "      var original = proto.addEventListener;",
    "      proto.addEventListener = function () {",
    "        try {",
    "          if (this && this.nodeType === 1 && String(this.tagName).toLowerCase() !== 'canvas') {",
    "            window.__weblabEventCount = (window.__weblabEventCount || 0) + 1;",
    "          }",
    "        } catch (e) {}",
    "        return original.apply(this, arguments);",
    "      };",
    "    }",
    "  } catch (e) {}",
    "})();"
  ].join("\n");

  function safeScript(code) {
    return String(code || "").replace(/<\/script/gi, "<\\/script");
  }
  function safeStyle(code) {
    return String(code || "").replace(/<\/style/gi, "<\\/style");
  }

  // Resolve a repo-relative asset to an absolute URL so the srcdoc iframe can
  // load it regardless of the deployment path.
  function resolveAsset(path) {
    try {
      if (typeof document !== "undefined" && document.baseURI) {
        return new URL(path, document.baseURI).href;
      }
    } catch (e) {
      /* fall through */
    }
    return path;
  }

  // Build the iframe document from the three code sources.
  // options.extraScript appends a trusted script after the student code
  // (used by the DOM validator).
  function buildSrcdoc(values, options) {
    values = values || {};
    options = options || {};
    var openScript = "<" + "script>";
    var closeScript = "</" + "script>";
    var extra = options.extraScript
      ? openScript + "\n" + safeScript(options.extraScript) + "\n" + closeScript
      : "";
    var chartScript = "";
    if (options.chart) {
      var chartUrl = options.chartUrl || resolveAsset("assets/vendor/chart.umd.js");
      chartScript = '<script src="' + String(chartUrl).replace(/"/g, "&quot;") + '"></scr' + "ipt>";
    }
    return [
      "<!DOCTYPE html>",
      '<html lang="zh-CN">',
      "<head>",
      '<meta charset="UTF-8">',
      "<style>",
      safeStyle(values.css),
      "</style>",
      openScript,
      CONSOLE_PROXY,
      closeScript,
      openScript,
      EVENT_COUNTER,
      closeScript,
      chartScript,
      "</head>",
      "<body>",
      String(values.html || ""),
      openScript,
      safeScript(values.js),
      closeScript,
      extra,
      "</body>",
      "</html>"
    ].join("\n");
  }

  // Run code in a throwaway sandbox iframe and collect its Console output.
  // Used by the console-output validator so challenges can be checked without
  // requiring the student to press "run" first.
  function capture(values, options) {
    options = options || {};
    var waitMs = options.waitMs || 700;
    return new Promise(function (resolve) {
      if (typeof document === "undefined" || !document.createElement) {
        resolve([]);
        return;
      }

      var frame = document.createElement("iframe");
      frame.setAttribute("sandbox", "allow-scripts");
      frame.style.position = "absolute";
      frame.style.width = "0";
      frame.style.height = "0";
      frame.style.border = "0";
      frame.style.visibility = "hidden";

      var lines = [];
      var settled = false;
      var timer = setTimeout(done, waitMs);

      function onMessage(event) {
        if (event.source !== frame.contentWindow) {
          return;
        }
        var data = event.data;
        if (!data || data.source !== "weblab-preview") {
          return;
        }
        if (data.type === "console" || data.type === "error") {
          lines.push({ level: data.level || "log", text: data.text == null ? "" : String(data.text) });
        }
      }

      function done() {
        if (settled) {
          return;
        }
        settled = true;
        clearTimeout(timer);
        window.removeEventListener("message", onMessage);
        if (frame.parentNode) {
          frame.parentNode.removeChild(frame);
        }
        resolve(lines);
      }

      window.addEventListener("message", onMessage);
      frame.srcdoc = buildSrcdoc(values, { chart: !!options.chart, chartUrl: options.chartUrl });
      document.body.appendChild(frame);
    });
  }

  function create(frame, options) {
    options = options || {};
    var win = options.win || window;
    var setTimer = win.setTimeout || setTimeout;
    var clearTimer = win.clearTimeout || clearTimeout;
    var debounceMs = options.debounce || 250;
    var live = options.live !== false;
    var chartOptions = { chart: !!options.chart, chartUrl: options.chartUrl };
    var timer = null;

    // Only accept messages that really come from our iframe.
    function onMessage(event) {
      if (event.source !== frame.contentWindow) {
        return;
      }
      var data = event.data;
      if (!data || data.source !== "weblab-preview") {
        return;
      }
      if (options.onMessage) {
        options.onMessage(data);
      }
    }

    function render(values) {
      if (options.onRun) {
        options.onRun();
      }
      frame.srcdoc = buildSrcdoc(values, chartOptions);
    }

    function run(values) {
      if (timer) {
        clearTimer(timer);
        timer = null;
      }
      render(values);
    }

    function schedule(values) {
      if (!live) {
        return;
      }
      if (timer) {
        clearTimer(timer);
      }
      timer = setTimer(function () {
        timer = null;
        render(values);
      }, debounceMs);
    }

    function setLive(value) {
      live = !!value;
      if (!live && timer) {
        clearTimer(timer);
        timer = null;
      }
    }

    function destroy() {
      if (timer) {
        clearTimer(timer);
        timer = null;
      }
      if (win.removeEventListener) {
        win.removeEventListener("message", onMessage);
      }
    }

    if (win.addEventListener) {
      win.addEventListener("message", onMessage);
    }

    return {
      run: run,
      schedule: schedule,
      setLive: setLive,
      isLive: function () { return live; },
      destroy: destroy
    };
  }

  WebLab.Preview = { create: create, buildSrcdoc: buildSrcdoc, capture: capture };
})(window.WebLab);
