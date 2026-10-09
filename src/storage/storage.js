// Storage module: the single gateway to localStorage.
// No other component may touch localStorage directly (see AGENTS.md).
// State is versioned; export/import follow DATA_SCHEMA.md sections 13-14.
window.WebLab = window.WebLab || {};

(function (WebLab) {
  "use strict";

  var STORAGE_KEY = "web-lab-state";
  var BACKUP_FORMAT = "web-lab-backup";
  var CURRENT_VERSION = 1;

  function defaultState() {
    return {
      version: CURRENT_VERSION,
      currentLesson: null,
      progress: {},
      lessons: {},
      project: { html: "", css: "", js: "" },
      achievements: {},
      challenges: {},
      preferences: {
        classroomMode: false,
        livePreview: true,
        editorFontSize: 16
      }
    };
  }

  function clone(value) {
    try {
      return JSON.parse(JSON.stringify(value));
    } catch (e) {
      return value;
    }
  }

  // Probe localStorage once; fall back to memory when unavailable
  // (private mode, file:// restrictions, tests, ...).
  function getStore() {
    try {
      var ls = window.localStorage;
      var probe = "__weblab_probe__";
      ls.setItem(probe, "1");
      ls.removeItem(probe);
      return ls;
    } catch (e) {
      return null;
    }
  }

  var store = getStore();
  var memory = null;

  function readRaw() {
    if (store) {
      return store.getItem(STORAGE_KEY);
    }
    return memory;
  }

  function writeRaw(text) {
    if (store) {
      store.setItem(STORAGE_KEY, text);
    } else {
      memory = text;
    }
    return true;
  }

  function isObject(value) {
    return !!value && typeof value === "object";
  }

  // Make any incoming object safe and complete before trusting it.
  function normalize(rawState) {
    var base = defaultState();
    if (!isObject(rawState)) {
      return base;
    }
    return {
      version: CURRENT_VERSION,
      currentLesson: typeof rawState.currentLesson === "string" ? rawState.currentLesson : null,
      progress: isObject(rawState.progress) ? rawState.progress : {},
      lessons: isObject(rawState.lessons) ? rawState.lessons : {},
      project: isObject(rawState.project) ? rawState.project : base.project,
      achievements: isObject(rawState.achievements) ? rawState.achievements : {},
      challenges: isObject(rawState.challenges) ? rawState.challenges : {},
      preferences: Object.assign({}, base.preferences, isObject(rawState.preferences) ? rawState.preferences : {})
    };
  }

  // No historical schema versions yet. An unknown version starts fresh
  // instead of risking a corrupted read.
  function migrate(parsed) {
    return null;
  }

  function loadState() {
    var raw = readRaw();
    if (!raw) {
      return defaultState();
    }
    var parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      return defaultState();
    }
    if (!isObject(parsed) || parsed.version !== CURRENT_VERSION) {
      parsed = migrate(parsed);
    }
    return normalize(parsed);
  }

  function persist(state) {
    writeRaw(JSON.stringify(normalize(state)));
  }

  function getState() {
    return loadState();
  }

  function saveState(state) {
    persist(state);
  }

  function getLesson(id) {
    var state = loadState();
    return state.lessons[id] ? clone(state.lessons[id]) : null;
  }

  function saveLesson(id, data) {
    if (!id || !isObject(data)) {
      return;
    }
    var state = loadState();
    var existing = isObject(state.lessons[id]) ? state.lessons[id] : {};
    state.lessons[id] = {
      html: data.html != null ? String(data.html) : (existing.html || ""),
      css: data.css != null ? String(data.css) : (existing.css || ""),
      js: data.js != null ? String(data.js) : (existing.js || ""),
      updatedAt: new Date().toISOString()
    };
    persist(state);
  }

  function removeLesson(id) {
    var state = loadState();
    delete state.lessons[id];
    persist(state);
  }

  function getProgress() {
    return clone(loadState().progress);
  }

  function saveProgress(progress) {
    var state = loadState();
    state.progress = isObject(progress) ? progress : {};
    persist(state);
  }

  function setLessonComplete(id, completed) {
    var state = loadState();
    var entry = isObject(state.progress[id]) ? state.progress[id] : {};
    if (completed) {
      entry.completed = true;
      entry.completedAt = new Date().toISOString();
      state.progress[id] = entry;
    } else {
      delete entry.completed;
      delete entry.completedAt;
      if (Object.keys(entry).length) {
        state.progress[id] = entry;
      } else {
        delete state.progress[id];
      }
    }
    persist(state);
  }

  function setChallengePassed(id, passed) {
    var state = loadState();
    var entry = isObject(state.progress[id]) ? state.progress[id] : {};
    if (passed) {
      entry.challengePassed = true;
      entry.challengePassedAt = new Date().toISOString();
    } else {
      delete entry.challengePassed;
      delete entry.challengePassedAt;
    }
    if (Object.keys(entry).length) {
      state.progress[id] = entry;
    } else {
      delete state.progress[id];
    }
    persist(state);
  }

  function getCurrentLesson() {
    return loadState().currentLesson;
  }
  function setCurrentLesson(id) {
    var state = loadState();
    state.currentLesson = id || null;
    persist(state);
  }

  function getPreferences() {
    return clone(loadState().preferences);
  }
  function savePreferences(prefs) {
    var state = loadState();
    state.preferences = Object.assign({}, state.preferences, isObject(prefs) ? prefs : {});
    persist(state);
  }

  function getProject() {
    return clone(loadState().project);
  }

  function saveProject(data) {
    var state = loadState();
    state.project = Object.assign({ html: "", css: "", js: "" }, state.project, isObject(data) ? data : {});
    persist(state);
  }

  function getChallenges() {
    return clone(loadState().challenges);
  }

  function setChallengeComplete(id, completed) {
    var state = loadState();
    if (completed) {
      state.challenges[id] = { completed: true, completedAt: new Date().toISOString() };
    } else {
      delete state.challenges[id];
    }
    persist(state);
  }

  function isChallengeComplete(id) {
    var challenges = loadState().challenges;
    return !!(challenges[id] && challenges[id].completed);
  }

  function exportData() {
    return {
      format: BACKUP_FORMAT,
      version: CURRENT_VERSION,
      exportedAt: new Date().toISOString(),
      data: loadState()
    };
  }

  function exportJSON() {
    return JSON.stringify(exportData(), null, 2);
  }

  // Validate first; never let a bad file overwrite existing data.
  function importData(json) {
    var parsed = json;
    if (typeof json === "string") {
      try {
        parsed = JSON.parse(json);
      } catch (e) {
        return { ok: false, error: "文件不是有效的 JSON 格式。" };
      }
    }
    if (!isObject(parsed)) {
      return { ok: false, error: "备份内容为空。" };
    }
    if (parsed.format !== BACKUP_FORMAT) {
      return { ok: false, error: "这不是 Web Lab 备份文件。" };
    }
    if (typeof parsed.version !== "number") {
      return { ok: false, error: "备份缺少版本信息。" };
    }
    if (parsed.version > CURRENT_VERSION) {
      return { ok: false, error: "备份版本高于当前版本，无法导入。" };
    }
    if (!isObject(parsed.data)) {
      return { ok: false, error: "备份缺少数据内容。" };
    }
    var state = normalize(parsed.data);
    persist(state);
    return { ok: true, state: state };
  }

  function reset() {
    var fresh = defaultState();
    persist(fresh);
    return clone(fresh);
  }

  WebLab.Storage = {
    STORAGE_KEY: STORAGE_KEY,
    BACKUP_FORMAT: BACKUP_FORMAT,
    defaultState: defaultState,
    getState: getState,
    saveState: saveState,
    getLesson: getLesson,
    saveLesson: saveLesson,
    removeLesson: removeLesson,
    getProgress: getProgress,
    saveProgress: saveProgress,
    setLessonComplete: setLessonComplete,
    setChallengePassed: setChallengePassed,
    getCurrentLesson: getCurrentLesson,
    setCurrentLesson: setCurrentLesson,
    getPreferences: getPreferences,
    savePreferences: savePreferences,
    getProject: getProject,
    saveProject: saveProject,
    getChallenges: getChallenges,
    setChallengeComplete: setChallengeComplete,
    isChallengeComplete: isChallengeComplete,
    exportData: exportData,
    exportJSON: exportJSON,
    importData: importData,
    reset: reset
  };
})(window.WebLab);
