// Web Lab Hash Router.
// Uses location.hash so the app works on GitHub Pages and from a local file
// without any server-side route fallback.
window.WebLab = window.WebLab || {};

(function (WebLab) {
  "use strict";

  var routes = [];
  var notFoundHandler = null;
  var rootSelector = "#main";
  var onNavigate = null;

  // Normalize a path: always start with "/" and drop a trailing "/".
  function normalize(path) {
    if (!path) {
      return "/";
    }
    if (path.charAt(0) !== "/") {
      path = "/" + path;
    }
    if (path.length > 1 && path.charAt(path.length - 1) === "/") {
      path = path.slice(0, -1);
    }
    return path;
  }

  // Read the current route path from location.hash (e.g. "#/lesson/html-01").
  function getPath() {
    var raw = window.location.hash || "";
    var path = raw.replace(/^#/, "");
    return normalize(path);
  }

  // Match "/lesson/:id" style patterns. Returns a params object or null.
  function matchPath(pattern, path) {
    var patternParts = normalize(pattern).split("/").filter(Boolean);
    var pathParts = normalize(path).split("/").filter(Boolean);

    if (patternParts.length !== pathParts.length) {
      return null;
    }

    var params = {};
    var i;
    for (i = 0; i < patternParts.length; i++) {
      var patternPart = patternParts[i];
      var pathPart = pathParts[i];

      if (patternPart.charAt(0) === ":") {
        params[patternPart.slice(1)] = decodeURIComponent(pathPart);
      } else if (patternPart !== pathPart) {
        return null;
      }
    }
    return params;
  }

  function findRoute(path) {
    var i;
    for (i = 0; i < routes.length; i++) {
      var params = matchPath(routes[i].pattern, path);
      if (params) {
        return {
          handler: routes[i].handler,
          pattern: routes[i].pattern,
          params: params
        };
      }
    }
    return null;
  }

  function register(pattern, handler) {
    routes.push({ pattern: normalize(pattern), handler: handler });
  }

  function setNotFound(handler) {
    notFoundHandler = handler;
  }

  function navigate(path) {
    var target = "#" + normalize(path);
    if (window.location.hash === target) {
      handleRoute();
    } else {
      window.location.hash = target;
    }
  }

  // Render the page that matches the current hash.
  function handleRoute() {
    var root = document.querySelector(rootSelector);
    if (!root) {
      return;
    }

    var path = getPath();
    var match = findRoute(path);
    var context = {
      path: path,
      params: match ? match.params : {},
      container: root
    };

    if (match) {
      match.handler(context);
    } else if (notFoundHandler) {
      notFoundHandler(context);
    }

    if (onNavigate) {
      onNavigate(path);
    }
  }

  function start(options) {
    options = options || {};
    rootSelector = options.root || rootSelector;
    onNavigate = options.onNavigate || null;

    window.addEventListener("hashchange", handleRoute);
    handleRoute();
  }

  WebLab.Router = {
    register: register,
    setNotFound: setNotFound,
    navigate: navigate,
    start: start,
    getPath: getPath
  };
})(window.WebLab);
