// Web Lab course metadata.
// Phase 2 keeps module-level information plus the ordered lesson list of each
// module. Full lesson content lives in data/lessons.js.
window.WebLabData = window.WebLabData || {};

window.WebLabData.modules = [
  {
    id: "web",
    order: 0,
    title: "Web 与开发环境",
    shortTitle: "Web 基础",
    description: "理解网页、浏览器与服务器的关系，认识 HTML / CSS / JS 的分工，搭建开发环境。",
    project: "Hello Web",
    lessons: [
      { id: "web-01", title: "Web 是什么" },
      { id: "web-02", title: "浏览器与服务器" },
      { id: "web-03", title: "HTML / CSS / JS" },
      { id: "web-04", title: "项目目录" },
      { id: "web-05", title: "VS Code" }
    ]
  },
  {
    id: "html",
    order: 1,
    title: "HTML 基础",
    shortTitle: "HTML",
    description: "学习网页的结构与内容：标题、段落、列表、链接、图片、路径与语义结构。",
    project: "个人主页 V1",
    lessons: [
      { id: "html-01", title: "Hello HTML" },
      { id: "html-02", title: "HTML 基本结构" },
      { id: "html-03", title: "标题" },
      { id: "html-04", title: "段落" },
      { id: "html-05", title: "列表" },
      { id: "html-06", title: "超链接" },
      { id: "html-07", title: "图片" },
      { id: "html-08", title: "文件路径" },
      { id: "html-09", title: "语义结构" },
      { id: "html-10", title: "HTML 综合挑战" },
      { id: "html-11", title: "表单" }
    ]
  },
  {
    id: "css",
    order: 2,
    title: "CSS 样式",
    shortTitle: "CSS",
    description: "掌握 CSS 语法与选择器，为页面设置颜色、字体、背景、边框与圆角。",
    project: "个人主页 V2",
    lessons: [
      { id: "css-01", title: "CSS 是什么" },
      { id: "css-02", title: "CSS 基本语法" },
      { id: "css-03", title: "行内 CSS" },
      { id: "css-04", title: "内部 CSS" },
      { id: "css-05", title: "外部 CSS" },
      { id: "css-06", title: "标签选择器" },
      { id: "css-07", title: "class" },
      { id: "css-08", title: "id" },
      { id: "css-09", title: "color" },
      { id: "css-10", title: "font-size / font-weight / text-align" },
      { id: "css-11", title: "background-color" },
      { id: "css-12", title: "border" },
      { id: "css-13", title: "border-radius" },
      { id: "css-14", title: "margin / padding 初体验" },
      { id: "css-15", title: "CSS Debug" },
      { id: "css-16", title: "CSS 综合挑战" }
    ]
  },
  {
    id: "layout",
    order: 3,
    title: "页面布局与响应式",
    shortTitle: "布局",
    description: "理解盒模型，使用 display 与 Flex 完成导航栏、卡片与响应式页面布局。",
    project: "个人主页 V3",
    lessons: [
      { id: "layout-01", title: "盒模型" },
      { id: "layout-02", title: "width / height" },
      { id: "layout-03", title: "margin" },
      { id: "layout-04", title: "padding" },
      { id: "layout-05", title: "display" },
      { id: "layout-06", title: "Flex" },
      { id: "layout-07", title: "flex-direction" },
      { id: "layout-08", title: "justify-content" },
      { id: "layout-09", title: "align-items" },
      { id: "layout-10", title: "Navigation" },
      { id: "layout-11", title: "Card" },
      { id: "layout-12", title: "Responsive" },
      { id: "layout-13", title: "Layout 综合挑战" }
    ]
  },
  {
    id: "js",
    order: 4,
    title: "JavaScript 基础",
    shortTitle: "JavaScript",
    description: "学习变量、数据类型、条件判断、循环与函数，掌握后续交互所需的基础。",
    project: "基础 JavaScript 挑战",
    lessons: [
      { id: "js-01", title: "JavaScript 是什么" },
      { id: "js-02", title: "Console" },
      { id: "js-03", title: "Variable" },
      { id: "js-04", title: "String" },
      { id: "js-05", title: "Number" },
      { id: "js-06", title: "Boolean" },
      { id: "js-07", title: "if" },
      { id: "js-08", title: "for" },
      { id: "js-09", title: "Function" },
      { id: "js-10", title: "综合挑战" }
    ]
  },
  {
    id: "dom",
    order: 5,
    title: "DOM 与网页交互",
    shortTitle: "DOM",
    description: "让页面动起来：使用 querySelector、事件、样式切换实现真实的用户交互。",
    project: "个人主页 V4",
    lessons: [
      { id: "dom-01", title: "DOM 是什么" },
      { id: "dom-02", title: "DOM Tree" },
      { id: "dom-03", title: "querySelector" },
      { id: "dom-04", title: "textContent" },
      { id: "dom-05", title: "style" },
      { id: "dom-06", title: "Event" },
      { id: "dom-07", title: "Click" },
      { id: "dom-08", title: "Show / Hide" },
      { id: "dom-09", title: "Toggle Class" },
      { id: "dom-10", title: "综合挑战" }
    ]
  },
  {
    id: "chart",
    order: 6,
    title: "Web 数据可视化",
    shortTitle: "数据可视化",
    description: "使用 Chart.js 绘制柱状图、折线图与饼图，理解数据、配置与图表的关系。",
    project: "Data Dashboard",
    lessons: [
      { id: "chart-01", title: "数据与网页" },
      { id: "chart-02", title: "Chart.js" },
      { id: "chart-03", title: "Bar" },
      { id: "chart-04", title: "Line" },
      { id: "chart-05", title: "Pie" },
      { id: "chart-06", title: "Labels" },
      { id: "chart-07", title: "Title" },
      { id: "chart-08", title: "图表选择" },
      { id: "chart-09", title: "误导性图表" },
      { id: "chart-10", title: "综合挑战" }
    ]
  },
  {
    id: "data-story",
    order: 7,
    title: "数据项目网页",
    shortTitle: "数据故事",
    description: "把研究问题、数据来源、图表、发现与结论组织成一个完整的数据故事页面。",
    project: "Data Story V1",
    lessons: [
      { id: "project-01", title: "什么是数据故事" },
      { id: "project-02", title: "研究问题" },
      { id: "project-03", title: "数据来源" },
      { id: "project-04", title: "数据概览" },
      { id: "project-05", title: "图表" },
      { id: "project-06", title: "数据发现" },
      { id: "project-07", title: "结论" },
      { id: "project-08", title: "页面组织" },
      { id: "project-09", title: "页面优化" }
    ]
  },
  {
    id: "final",
    order: 8,
    title: "Final Project",
    shortTitle: "最终项目",
    description: "完成项目检查、调试、响应式与内容优化，并发布到 GitHub Pages。",
    project: "完整数据项目网站",
    lessons: [
      { id: "final-01", title: "Project Check" },
      { id: "final-02", title: "Debug" },
      { id: "final-03", title: "Responsive" },
      { id: "final-04", title: "Content Review" },
      { id: "final-05", title: "Presentation" },
      { id: "final-06", title: "GitHub Pages" }
    ]
  }
];

// Derive counts and first lesson so callers cannot drift out of sync.
window.WebLabData.modules.forEach(function (module) {
  module.lessonCount = module.lessons.length;
  module.firstLesson = module.lessons.length ? module.lessons[0].id : null;
});

window.WebLabData.getTotalLessons = function () {
  return window.WebLabData.modules.reduce(function (total, module) {
    return total + module.lessons.length;
  }, 0);
};

window.WebLabData.getModuleById = function (moduleId) {
  var modules = window.WebLabData.modules;
  for (var i = 0; i < modules.length; i++) {
    if (modules[i].id === moduleId) {
      return modules[i];
    }
  }
  return null;
};

// Lesson title lookup works even before the lesson content exists.
window.WebLabData.getLessonTitle = function (lessonId) {
  var lesson = window.WebLabData.getLesson && window.WebLabData.getLesson(lessonId);
  if (lesson) {
    return lesson.title;
  }
  var modules = window.WebLabData.modules;
  for (var i = 0; i < modules.length; i++) {
    for (var j = 0; j < modules[i].lessons.length; j++) {
      if (modules[i].lessons[j].id === lessonId) {
        return modules[i].lessons[j].title;
      }
    }
  }
  return lessonId;
};
