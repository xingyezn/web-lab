// Lesson registry: content is defined in data/lessons/*.js and concatenated
// onto WebLabData.lessons. This file only indexes and exposes accessors.
window.WebLabData = window.WebLabData || {};
window.WebLabData.lessons = window.WebLabData.lessons || [];

window.WebLabData.lessonIndex = {};
window.WebLabData.lessons.forEach(function (lesson) {
  window.WebLabData.lessonIndex[lesson.id] = lesson;
});

window.WebLabData.getLesson = function (lessonId) {
  return window.WebLabData.lessonIndex[lessonId] || null;
};

window.WebLabData.hasLessonContent = function (lessonId) {
  return !!window.WebLabData.lessonIndex[lessonId];
};
