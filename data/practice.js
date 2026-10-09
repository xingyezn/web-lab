// Practice registry: Challenge Center + Debug Center data and accessors.
window.WebLabData = window.WebLabData || {};
window.WebLabData.challenges = window.WebLabData.challenges || [];
window.WebLabData.debugItems = window.WebLabData.debugItems || [];

window.WebLabData.challengeCategories = [
  { id: "html", title: "HTML" },
  { id: "css", title: "CSS" },
  { id: "layout", title: "布局" },
  { id: "js", title: "JavaScript" },
  { id: "dom", title: "DOM" },
  { id: "chart", title: "图表" }
];

window.WebLabData.debugCategories = [
  { id: "html", title: "HTML Bug" },
  { id: "css", title: "CSS Bug" },
  { id: "js", title: "JavaScript Bug" },
  { id: "path", title: "路径 Bug" },
  { id: "dom", title: "DOM Bug" },
  { id: "chart", title: "图表 Bug" }
];

window.WebLabData.challengeIndex = {};
window.WebLabData.challenges.forEach(function (item) {
  window.WebLabData.challengeIndex[item.id] = item;
});

window.WebLabData.debugIndex = {};
window.WebLabData.debugItems.forEach(function (item) {
  window.WebLabData.debugIndex[item.id] = item;
});

window.WebLabData.getChallenge = function (id) {
  return window.WebLabData.challengeIndex[id] || null;
};

window.WebLabData.getDebugItem = function (id) {
  return window.WebLabData.debugIndex[id] || null;
};

// Look up by id in either collection (used by the solver route).
window.WebLabData.getPractice = function (id) {
  return window.WebLabData.getChallenge(id) || window.WebLabData.getDebugItem(id);
};
