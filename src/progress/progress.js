// Progress module: derives learning progress and completion state.
// All reads/writes go through the Storage module.
window.WebLab = window.WebLab || {};

(function (WebLab) {
  "use strict";

  function isLessonComplete(lessonId) {
    var progress = WebLab.Storage.getProgress();
    return !!(progress[lessonId] && progress[lessonId].completed);
  }

  function markComplete(lessonId) {
    WebLab.Storage.setLessonComplete(lessonId, true);
  }

  function markIncomplete(lessonId) {
    WebLab.Storage.setLessonComplete(lessonId, false);
  }

  function toggleComplete(lessonId) {
    if (isLessonComplete(lessonId)) {
      markIncomplete(lessonId);
      return false;
    }
    markComplete(lessonId);
    return true;
  }

  function isChallengePassed(lessonId) {
    var progress = WebLab.Storage.getProgress();
    return !!(progress[lessonId] && progress[lessonId].challengePassed);
  }

  function markChallengePassed(lessonId) {
    WebLab.Storage.setChallengePassed(lessonId, true);
  }

  function getSummary() {
    var data = window.WebLabData;
    var progress = WebLab.Storage.getProgress();
    var total = 0;
    var completed = 0;
    var byModule = {};

    data.modules.forEach(function (module) {
      var moduleDone = 0;
      module.lessons.forEach(function (lesson) {
        if (progress[lesson.id] && progress[lesson.id].completed) {
          moduleDone++;
        }
      });
      byModule[module.id] = { total: module.lessons.length, completed: moduleDone };
      total += module.lessons.length;
      completed += moduleDone;
    });

    var percent = total ? Math.round((completed / total) * 100) : 0;
    return { total: total, completed: completed, percent: percent, byModule: byModule };
  }

  function getFirstAvailableLesson() {
    var data = window.WebLabData;
    for (var i = 0; i < data.modules.length; i++) {
      var lessons = data.modules[i].lessons;
      for (var j = 0; j < lessons.length; j++) {
        if (data.hasLessonContent(lessons[j].id)) {
          return lessons[j].id;
        }
      }
    }
    return null;
  }

  // Continue where the student left off, otherwise start the first lesson.
  function getContinueLesson() {
    var current = WebLab.Storage.getCurrentLesson();
    if (current && window.WebLabData.hasLessonContent(current)) {
      return current;
    }
    return getFirstAvailableLesson();
  }

  function getLastVisited() {
    return WebLab.Storage.getCurrentLesson();
  }

  WebLab.Progress = {
    isLessonComplete: isLessonComplete,
    markComplete: markComplete,
    markIncomplete: markIncomplete,
    toggleComplete: toggleComplete,
    isChallengePassed: isChallengePassed,
    markChallengePassed: markChallengePassed,
    getSummary: getSummary,
    getFirstAvailableLesson: getFirstAvailableLesson,
    getContinueLesson: getContinueLesson,
    getLastVisited: getLastVisited
  };
})(window.WebLab);
