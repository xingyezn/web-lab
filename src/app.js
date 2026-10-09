// App composition root: registers the route table, wires the shell and starts
// the router. Page rendering logic lives in src/pages/*.
window.WebLab = window.WebLab || {};

(function (WebLab) {
  "use strict";

  var Router = WebLab.Router;
  var pages = WebLab.pages;

  // Routes reserved for later phases render a clear "coming soon" page so
  // navigation never breaks. All planned routes are implemented in Phase 14.
  var reservedRoutes = [];

  // Destroy any active code workspace before a route renders, so iframe
  // message listeners do not accumulate as the student navigates.
  function withCleanup(handler) {
    return function (ctx) {
      if (WebLab.Workspace && WebLab.Workspace.destroyActive) {
        WebLab.Workspace.destroyActive();
      }
      if (WebLab.CssPlayground && WebLab.CssPlayground.destroyActive) {
        WebLab.CssPlayground.destroyActive();
      }
      if (WebLab.BoxModelLab && WebLab.BoxModelLab.destroyActive) {
        WebLab.BoxModelLab.destroyActive();
      }
      if (WebLab.FlexPlayground && WebLab.FlexPlayground.destroyActive) {
        WebLab.FlexPlayground.destroyActive();
      }
      if (WebLab.ChartLab && WebLab.ChartLab.destroyActive) {
        WebLab.ChartLab.destroyActive();
      }
      if (WebLab.DataStory && WebLab.DataStory.destroyActive) {
        WebLab.DataStory.destroyActive();
      }
      if (pages.destroyVersions) {
        pages.destroyVersions();
      }
      handler(ctx);
    };
  }

  function registerRoutes() {
    Router.register("/", withCleanup(pages.renderHome));
    Router.register("/course", withCleanup(pages.renderCourse));
    Router.register("/lesson/:id", withCleanup(pages.renderLesson));
    Router.register("/playground", withCleanup(pages.renderPlayground));
    Router.register("/css-playground", withCleanup(pages.renderCssPlayground));
    Router.register("/box-model-lab", withCleanup(pages.renderBoxModelLab));
    Router.register("/flex-playground", withCleanup(pages.renderFlexPlayground));
    Router.register("/chart-lab", withCleanup(pages.renderChartLab));
    Router.register("/data-story", withCleanup(pages.renderDataStory));
    Router.register("/project", withCleanup(pages.renderProject));
    Router.register("/challenge", withCleanup(pages.renderChallengeList));
    Router.register("/challenge/:id", withCleanup(pages.renderChallengeSolver));
    Router.register("/debug", withCleanup(pages.renderDebugList));
    Router.register("/debug/:id", withCleanup(pages.renderDebugSolver));
    Router.register("/versions", withCleanup(pages.renderVersions));
    Router.register("/reference", withCleanup(pages.renderReference));

    reservedRoutes.forEach(function (route) {
      Router.register(
        route.path,
        withCleanup(
          pages.createPlaceholder({
            title: route.title,
            description: route.description
          })
        )
      );
    });

    Router.setNotFound(withCleanup(function (ctx) {
      pages.createPlaceholder({
        eyebrow: "404",
        title: "页面未找到",
        description: "没有找到这个页面，请返回首页继续学习。"
      })(ctx);
    }));
  }

  // Highlight the nav item that matches the current route.
  function updateActiveNav(path) {
    var links = document.querySelectorAll("[data-nav-link]");
    Array.prototype.forEach.call(links, function (link) {
      var route = link.getAttribute("data-route");
      var isActive = route !== "/" && path.indexOf(route) === 0;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  // Mobile menu: toggle the panel and close it after choosing a link.
  function setupMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector("#site-nav");
    if (!toggle || !nav) {
      return;
    }

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "关闭导航菜单" : "打开导航菜单");
    }

    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setOpen(false);
      }
    });

    window.addEventListener("hashchange", function () {
      setOpen(false);
    });
  }

  // Display mode (normal / classroom / focus) and editor font size, persisted
  // through the Storage preferences.
  function setupViewControls() {
    var DisplayMode = WebLab.DisplayMode;
    var Storage = WebLab.Storage;
    var select = document.querySelector("[data-display-mode]");
    var exitButton = document.querySelector("[data-mode-exit]");
    var prefs = Storage ? Storage.getPreferences() : {};
    var mode = DisplayMode ? DisplayMode.normalize(prefs.displayMode) : "normal";
    var fontSize = DisplayMode ? DisplayMode.clampFont(prefs.editorFontSize || 16) : 16;

    function setMode(next) {
      mode = DisplayMode.apply(document, next);
      if (select) { select.value = mode; }
      if (exitButton) { exitButton.hidden = mode !== "focus"; }
      if (Storage) { Storage.savePreferences({ displayMode: mode }); }
    }

    function setFont(next) {
      fontSize = DisplayMode.applyFont(document, next);
      if (Storage) { Storage.savePreferences({ editorFontSize: fontSize }); }
    }

    if (DisplayMode) {
      DisplayMode.apply(document, mode);
      DisplayMode.applyFont(document, fontSize);
    }
    if (select) {
      select.value = mode;
      select.addEventListener("change", function () { setMode(select.value); });
    }
    if (exitButton) {
      exitButton.hidden = mode !== "focus";
      exitButton.addEventListener("click", function () { setMode("normal"); });
    }
    Array.prototype.forEach.call(document.querySelectorAll("[data-font]"), function (button) {
      button.addEventListener("click", function () {
        setFont(DisplayMode.adjustFont(fontSize, button.getAttribute("data-font") === "inc" ? 2 : -2));
      });
    });
  }

  function boot() {
    registerRoutes();
    setupMobileNav();
    setupViewControls();
    Router.start({
      root: "#main",
      onNavigate: function (path) {
        updateActiveNav(path);
        window.scrollTo(0, 0);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})(window.WebLab);
