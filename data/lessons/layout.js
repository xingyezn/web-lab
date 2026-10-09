// Module 3 lesson content: Layout & Responsive (layout-01 .. layout-13).
window.WebLabData = window.WebLabData || {};
window.WebLabData.lessons = (window.WebLabData.lessons || []).concat([
  {
    id: "layout-01",
    module: "layout",
    order: 1,
    title: "盒模型",
    subtitle: "每个元素都是一个盒子",
    estimatedMinutes: 8,
    difficulty: 2,
    type: "lesson",
    objectives: ["认识盒模型的四层", "理解 content / padding / border / margin", "看懂元素占用的空间"],
    intro: { title: "为什么元素之间会有看不见的空间？", content: "页面上每个元素都是一个盒子，由内容（content）、内边距（padding）、边框（border）和外边距（margin）组成。" },
    knowledge: [
      { type: "text", content: "盒模型从内到外分为四层：content → padding → border → margin。" },
      { type: "code", language: "css", code: ".box {\n  width: 200px;\n  padding: 16px;\n  border: 4px solid #cdd6e3;\n  margin: 12px;\n}" },
      { type: "text", content: "padding 在边框里面，margin 在边框外面。" }
    ],
    starterCode: { html: '<div class="box">内容</div>', css: ".box {\n  background-color: #e8f1ff;\n}", js: "" },
    tryTask: { description: "给 .box 加上 padding 和 border，观察盒子变大。" },
    challenge: {
      title: "补全盒子",
      description: "给 .box 同时设置 padding 和 border。",
      validator: { type: "html", rules: [
        { type: "css-property", selector: ".box", property: "padding", exists: true },
        { type: "css-property", selector: ".box", property: "border", exists: true }
      ] }
    },
    hints: ["内边距用 padding。", "边框用 border。", ".box {\n  padding: 16px;\n  border: 4px solid #cdd6e3;\n}"],
    summary: ["盒模型：content / padding / border / margin。", "padding 在里，margin 在外。", "它们共同决定元素占用的空间。"],
    nextLesson: "layout-02"
  },

  {
    id: "layout-02",
    module: "layout",
    order: 2,
    title: "width / height",
    subtitle: "设置元素的宽和高",
    estimatedMinutes: 6,
    difficulty: 1,
    type: "lesson",
    objectives: ["使用 width 设置宽度", "使用 height 设置高度"],
    intro: { title: "怎样固定一个元素的大小？", content: "使用 width 和 height 设置元素的宽度和高度，单位常用 px 或 %。" },
    knowledge: [
      { type: "text", content: "width 设置宽度，height 设置高度。" },
      { type: "code", language: "css", code: ".box {\n  width: 200px;\n  height: 120px;\n}" }
    ],
    starterCode: { html: '<div class="box">内容</div>', css: ".box {\n  background-color: #e8f1ff;\n}", js: "" },
    tryTask: { description: "给 .box 设置宽度和高度。" },
    challenge: {
      title: "给盒子定大小",
      description: "给 .box 同时设置 width 和 height。",
      validator: { type: "html", rules: [
        { type: "css-property", selector: ".box", property: "width", exists: true },
        { type: "css-property", selector: ".box", property: "height", exists: true }
      ] }
    },
    hints: ["宽度用 width。", "高度用 height。", ".box {\n  width: 200px;\n  height: 120px;\n}"],
    summary: ["width 设置宽度。", "height 设置高度。", "单位可以是 px 或 %。"],
    nextLesson: "layout-03"
  },

  {
    id: "layout-03",
    module: "layout",
    order: 3,
    title: "margin",
    subtitle: "元素外部的空间",
    estimatedMinutes: 5,
    difficulty: 1,
    type: "lesson",
    objectives: ["使用 margin 设置外边距", "控制元素之间的距离"],
    intro: { title: "两个盒子挨得太近怎么办？", content: "用 margin 增加元素外部的空间，让元素之间分开。" },
    knowledge: [
      { type: "text", content: "margin 设置外边距，也就是元素外部的空间。" },
      { type: "code", language: "css", code: ".box {\n  margin: 16px;\n}" }
    ],
    starterCode: { html: '<div class="box">盒子一</div>\n<div class="box">盒子二</div>', css: ".box {\n  background-color: #e8f1ff;\n}", js: "" },
    tryTask: { description: "给 .box 设置外边距。" },
    challenge: {
      title: "拉开盒子距离",
      description: "给 .box 设置 margin。",
      validator: { type: "html", rules: [{ type: "css-property", selector: ".box", property: "margin", exists: true }] }
    },
    hints: ["外边距使用 margin。", "写一个像素值。", ".box {\n  margin: 16px;\n}"],
    summary: ["margin 是外边距。", "它能拉开元素之间的距离。", "margin 在边框外面。"],
    nextLesson: "layout-04"
  },

  {
    id: "layout-04",
    module: "layout",
    order: 4,
    title: "padding",
    subtitle: "元素内部的空间",
    estimatedMinutes: 5,
    difficulty: 1,
    type: "lesson",
    objectives: ["使用 padding 设置内边距", "让内容和边框之间留出空间"],
    intro: { title: "文字挨着边框太挤了怎么办？", content: "用 padding 增加元素内部的空间，让内容与边框之间留出呼吸感。" },
    knowledge: [
      { type: "text", content: "padding 设置内边距，也就是边框到内容之间的距离。" },
      { type: "code", language: "css", code: ".box {\n  padding: 16px;\n}" }
    ],
    starterCode: { html: '<div class="box">内容</div>', css: ".box {\n  border: 4px solid #cdd6e3;\n}", js: "" },
    tryTask: { description: "给 .box 设置内边距。" },
    challenge: {
      title: "给内容留白",
      description: "给 .box 设置 padding。",
      validator: { type: "html", rules: [{ type: "css-property", selector: ".box", property: "padding", exists: true }] }
    },
    hints: ["内边距使用 padding。", "写一个像素值。", ".box {\n  padding: 16px;\n}"],
    summary: ["padding 是内边距。", "它让内容和边框之间留出空间。", "padding 在边框里面。"],
    nextLesson: "layout-05"
  },

  {
    id: "layout-05",
    module: "layout",
    order: 5,
    title: "display",
    subtitle: "元素如何显示",
    estimatedMinutes: 7,
    difficulty: 2,
    type: "lesson",
    objectives: ["认识 display", "区分 block 与 inline", "知道 flex 值的作用"],
    intro: { title: "为什么有的元素独占一行，有的却并排？", content: "这由 display 决定。块级元素独占一行，行内元素可以并排，flex 则开启弹性布局。" },
    knowledge: [
      { type: "text", content: "display 决定元素的显示方式：block、inline、inline-block、flex、none 等。" },
      { type: "code", language: "css", code: ".box {\n  display: inline-block;\n}" },
      { type: "text", content: "display: flex 会把元素变成弹性容器，后面会详细学习。" }
    ],
    starterCode: { html: '<span class="box">盒子一</span>\n<span class="box">盒子二</span>', css: ".box {\n  background-color: #e8f1ff;\n  padding: 8px;\n}", js: "" },
    tryTask: { description: "把 .box 的 display 改成 inline-block。" },
    challenge: {
      title: "设置显示方式",
      description: "给 .box 设置 display。",
      validator: { type: "html", rules: [{ type: "css-property", selector: ".box", property: "display", exists: true }] }
    },
    hints: ["显示方式使用 display。", "常见值有 block、inline、inline-block、flex。", ".box {\n  display: inline-block;\n}"],
    summary: ["display 决定元素如何显示。", "block 独占一行，inline 可以并排。", "flex 用于弹性布局。"],
    nextLesson: "layout-06"
  },

  {
    id: "layout-06",
    module: "layout",
    order: 6,
    title: "Flex",
    subtitle: "让元素灵活排列",
    estimatedMinutes: 8,
    difficulty: 2,
    type: "lesson",
    objectives: ["开启 Flex 布局", "理解容器与项目", "让多个元素横向排列"],
    intro: { title: "怎样让几个元素轻松横向排列？", content: "把父元素设为 display: flex，它就成了弹性容器，里面的子元素会自动横向排列。" },
    knowledge: [
      { type: "text", content: "给父元素设置 display: flex，里面的子元素称为 flex 项目，会默认横向排列。" },
      { type: "code", language: "css", code: ".nav {\n  display: flex;\n}" },
      { type: "text", content: "Flex 布局由“容器”和“项目”两部分组成。" }
    ],
    starterCode: { html: '<nav class="nav">\n  <a href="#">首页</a>\n  <a href="#">关于</a>\n  <a href="#">联系</a>\n</nav>', css: ".nav {\n  background-color: #f5f7fa;\n  padding: 12px;\n}", js: "" },
    tryTask: { description: "让 .nav 变成弹性容器。" },
    challenge: {
      title: "开启弹性布局",
      description: "给 .nav 设置 display: flex。",
      validator: { type: "html", rules: [{ type: "css-property", selector: ".nav", property: "display", expected: "flex" }] }
    },
    hints: ["给父元素设置 display。", "值写成 flex。", ".nav {\n  display: flex;\n}"],
    summary: ["display: flex 开启弹性布局。", "容器里的子元素是 flex 项目。", "项目默认横向排列。"],
    nextLesson: "layout-07"
  },

  {
    id: "layout-07",
    module: "layout",
    order: 7,
    title: "flex-direction",
    subtitle: "排列方向",
    estimatedMinutes: 6,
    difficulty: 2,
    type: "lesson",
    objectives: ["使用 flex-direction", "在横向与纵向之间切换"],
    intro: { title: "flex 项目一定是横着排吗？", content: "不一定。用 flex-direction 可以决定排列方向：row 横向，column 纵向。" },
    knowledge: [
      { type: "text", content: "flex-direction 决定主轴方向：row（默认，横向）、column（纵向）等。" },
      { type: "code", language: "css", code: ".nav {\n  display: flex;\n  flex-direction: column;\n}" }
    ],
    starterCode: { html: '<nav class="nav">\n  <a href="#">首页</a>\n  <a href="#">关于</a>\n  <a href="#">联系</a>\n</nav>', css: ".nav {\n  display: flex;\n  background-color: #f5f7fa;\n  padding: 12px;\n}", js: "" },
    tryTask: { description: "把排列方向改成 column，观察变化。" },
    challenge: {
      title: "改变排列方向",
      description: "给 .nav 设置 flex-direction。",
      validator: { type: "html", rules: [
        { type: "css-property", selector: ".nav", property: "display", expected: "flex" },
        { type: "css-property", selector: ".nav", property: "flex-direction", exists: true }
      ] }
    },
    hints: ["方向使用 flex-direction。", "常用 row 和 column。", ".nav {\n  flex-direction: column;\n}"],
    summary: ["flex-direction 控制排列方向。", "row 是横向，column 是纵向。", "默认值是 row。"],
    nextLesson: "layout-08"
  },

  {
    id: "layout-08",
    module: "layout",
    order: 8,
    title: "justify-content",
    subtitle: "主轴上的对齐",
    estimatedMinutes: 6,
    difficulty: 2,
    type: "lesson",
    objectives: ["使用 justify-content", "控制项目在主轴上的分布"],
    intro: { title: "怎样让导航项居右或分散排列？", content: "用 justify-content 控制项目在主轴方向上的对齐与分布。" },
    knowledge: [
      { type: "text", content: "justify-content 控制主轴上的分布：flex-start、center、flex-end、space-between 等。" },
      { type: "code", language: "css", code: ".nav {\n  display: flex;\n  justify-content: space-between;\n}" }
    ],
    starterCode: { html: '<nav class="nav">\n  <a href="#">首页</a>\n  <a href="#">关于</a>\n  <a href="#">联系</a>\n</nav>', css: ".nav {\n  display: flex;\n  background-color: #f5f7fa;\n  padding: 12px;\n}", js: "" },
    tryTask: { description: "把 justify-content 改成 center，让导航居中。" },
    challenge: {
      title: "分布导航项",
      description: "给 .nav 设置 justify-content。",
      validator: { type: "html", rules: [
        { type: "css-property", selector: ".nav", property: "display", expected: "flex" },
        { type: "css-property", selector: ".nav", property: "justify-content", exists: true }
      ] }
    },
    hints: ["分布使用 justify-content。", "space-between 让两端对齐。", ".nav {\n  justify-content: space-between;\n}"],
    summary: ["justify-content 控制主轴分布。", "center 居中，space-between 两端对齐。", "它需要配合 display: flex 使用。"],
    nextLesson: "layout-09"
  },

  {
    id: "layout-09",
    module: "layout",
    order: 9,
    title: "align-items",
    subtitle: "交叉轴上的对齐",
    estimatedMinutes: 6,
    difficulty: 2,
    type: "lesson",
    objectives: ["使用 align-items", "控制项目在交叉轴上的对齐"],
    intro: { title: "怎样让导航项垂直居中？", content: "用 align-items 控制项目在交叉轴（与主轴垂直的方向）上的对齐。" },
    knowledge: [
      { type: "text", content: "align-items 控制交叉轴上的对齐：stretch、flex-start、center、flex-end 等。" },
      { type: "code", language: "css", code: ".nav {\n  display: flex;\n  align-items: center;\n}" }
    ],
    starterCode: { html: '<nav class="nav">\n  <a href="#">首页</a>\n  <a href="#">关于</a>\n  <a href="#">联系</a>\n</nav>', css: ".nav {\n  display: flex;\n  background-color: #f5f7fa;\n  padding: 20px;\n}", js: "" },
    tryTask: { description: "把 align-items 改成 center，让项目垂直居中。" },
    challenge: {
      title: "垂直居中",
      description: "给 .nav 设置 align-items。",
      validator: { type: "html", rules: [
        { type: "css-property", selector: ".nav", property: "display", expected: "flex" },
        { type: "css-property", selector: ".nav", property: "align-items", exists: true }
      ] }
    },
    hints: ["交叉轴对齐使用 align-items。", "center 表示居中。", ".nav {\n  align-items: center;\n}"],
    summary: ["align-items 控制交叉轴对齐。", "center 可以让项目垂直居中。", "它和 justify-content 配合使用。"],
    nextLesson: "layout-10"
  },

  {
    id: "layout-10",
    module: "layout",
    order: 10,
    title: "Navigation",
    subtitle: "做一个导航栏",
    estimatedMinutes: 9,
    difficulty: 2,
    type: "lesson",
    objectives: ["组合语义标签与 Flex", "制作一个导航栏", "处理链接间距"],
    intro: { title: "把学过的知识组合起来", content: "用 <nav> 搭配 display: flex，就能做出一个横向、两端对齐的导航栏。" },
    knowledge: [
      { type: "text", content: "导航栏通常是一个 <nav> 容器，内部放若干链接，用 flex 排列。" },
      { type: "code", language: "html", code: '<nav class="nav">\n  <a href="#">首页</a>\n  <a href="#">关于</a>\n</nav>' },
      { type: "code", language: "css", code: ".nav {\n  display: flex;\n  justify-content: space-between;\n  padding: 12px;\n}" }
    ],
    starterCode: { html: '<nav class="nav">\n  <a href="#">首页</a>\n  <a href="#">关于</a>\n  <a href="#">联系</a>\n</nav>', css: ".nav {\n  background-color: #f5f7fa;\n}", js: "" },
    tryTask: { description: "让导航栏两端对齐。" },
    challenge: {
      title: "制作导航栏",
      description: "页面里有 <nav>，并且给 nav 设置 display: flex。",
      validator: { type: "html", rules: [
        { type: "element-exists", selector: "nav" },
        { type: "css-property", selector: "nav", property: "display", expected: "flex" }
      ] }
    },
    hints: ["使用 <nav> 容器。", "给 nav 设置 display: flex。", ".nav {\n  display: flex;\n  justify-content: space-between;\n}"],
    summary: ["导航栏 = nav + flex。", "justify-content 控制分布。", "语义标签让结构更清晰。"],
    nextLesson: "layout-11"
  },

  {
    id: "layout-11",
    module: "layout",
    order: 11,
    title: "Card",
    subtitle: "排列一组卡片",
    estimatedMinutes: 8,
    difficulty: 2,
    type: "lesson",
    objectives: ["用 Flex 排列卡片", "为卡片添加样式", "理解卡片布局"],
    intro: { title: "多个卡片怎样整齐排列？", content: "用 flex 容器包住卡片，再配合 gap 或 margin，就能整齐地排列一组卡片。" },
    knowledge: [
      { type: "text", content: "卡片区通常是一个 flex 容器，里面的每张卡片是一个 flex 项目。" },
      { type: "code", language: "css", code: ".cards {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.card {\n  border: 1px solid #cdd6e3;\n  border-radius: 12px;\n}" }
    ],
    starterCode: { html: '<div class="cards">\n  <div class="card">卡片一</div>\n  <div class="card">卡片二</div>\n</div>', css: ".cards {\n  display: flex;\n}\n.card {\n  border: 1px solid #cdd6e3;\n  padding: 16px;\n}", js: "" },
    tryTask: { description: "给卡片区增加 flex-wrap 和 gap。" },
    challenge: {
      title: "排列卡片",
      description: "给 .cards 设置 display: flex，并给 .card 设置 border-radius。",
      validator: { type: "html", rules: [
        { type: "css-property", selector: ".cards", property: "display", expected: "flex" },
        { type: "css-property", selector: ".card", property: "border-radius", exists: true }
      ] }
    },
    hints: ["卡片区需要 display: flex。", "圆角使用 border-radius。", ".cards { display: flex; }\n.card { border-radius: 12px; }"],
    summary: ["卡片区用 Flex 排列。", "flex-wrap 允许换行。", "圆角与边框让卡片更美观。"],
    nextLesson: "layout-12"
  },

  {
    id: "layout-12",
    module: "layout",
    order: 12,
    title: "Responsive",
    subtitle: "适配不同屏幕",
    estimatedMinutes: 9,
    difficulty: 3,
    type: "lesson",
    objectives: ["认识响应式设计", "使用 @media 媒体查询", "让宽度自适应"],
    intro: { title: "电脑上很好看，手机上却很挤？", content: "响应式设计让同一份代码在不同屏幕上都能正常显示。用 @media 可以针对不同宽度设置样式。" },
    knowledge: [
      { type: "text", content: "@media (max-width: 600px) 里的样式只在屏幕较窄时生效。" },
      { type: "code", language: "css", code: ".box {\n  width: 300px;\n}\n\n@media (max-width: 600px) {\n  .box {\n    width: 100%;\n  }\n}" },
      { type: "text", content: "用百分比或 100% 宽度，也能让元素随容器变化。" }
    ],
    starterCode: { html: '<div class="box">响应式盒子</div>', css: ".box {\n  width: 300px;\n  background-color: #e8f1ff;\n  padding: 16px;\n}", js: "" },
    tryTask: { description: "用 @media 让 .box 在窄屏下宽度变为 100%。" },
    challenge: {
      title: "让盒子自适应",
      description: "让 .box 的 width 为 100%（可写在 @media 里）。",
      validator: { type: "html", rules: [
        { type: "css-property", selector: ".box", property: "width", expected: "100%" }
      ] }
    },
    hints: ["媒体查询使用 @media。", "窄屏下把 .box 的 width 设为 100%。", "@media (max-width: 600px) {\n  .box { width: 100%; }\n}"],
    summary: ["响应式设计适配不同屏幕。", "@media 可以针对屏幕宽度设置样式。", "百分比宽度让元素更灵活。"],
    nextLesson: "layout-13"
  },

  {
    id: "layout-13",
    module: "layout",
    order: 13,
    title: "Layout 综合挑战",
    subtitle: "完成个人主页 V3",
    estimatedMinutes: 18,
    difficulty: 3,
    type: "lesson",
    objectives: ["综合运用语义结构与 Flex", "完成导航栏与卡片布局", "完成个人主页 V3"],
    intro: { title: "给个人主页搭好骨架", content: "这是布局模块的阶段项目：用语义标签和 Flex，把个人主页升级成 V3。" },
    knowledge: [
      { type: "text", content: "推荐结构：header（含 nav）、main（含卡片区 .cards）、footer。卡片区用 Flex 排列，并允许换行。" },
      { type: "text", content: "个人主页 V3 需要：语义结构、Flex 导航栏、Flex 卡片区、卡片圆角。" }
    ],
    starterCode: {
      html: '<header class="header">\n  <nav class="nav">\n    <a href="#">首页</a>\n    <a href="#">关于</a>\n  </nav>\n</header>\n<main>\n  <div class="cards">\n    <div class="card">卡片一</div>\n    <div class="card">卡片二</div>\n    <div class="card">卡片三</div>\n  </div>\n</main>\n<footer>页脚</footer>',
      css: "",
      js: ""
    },
    tryTask: { description: "逐步添加布局样式，让检查全部通过。" },
    challenge: {
      title: "个人主页 V3",
      description: "使用语义结构与 Flex 完成个人主页 V3。",
      validator: { type: "html", rules: [
        { type: "element-exists", selector: "header" },
        { type: "element-exists", selector: "nav" },
        { type: "element-exists", selector: "main" },
        { type: "element-exists", selector: "footer" },
        { type: "element-exists", selector: ".cards" },
        { type: "css-property", selector: ".header", property: "display", expected: "flex" },
        { type: "css-property", selector: ".cards", property: "display", expected: "flex" },
        { type: "css-property", selector: ".cards", property: "flex-wrap", exists: true },
        { type: "css-property", selector: ".card", property: "border-radius", exists: true }
      ] }
    },
    hints: ["给 .header 和 .cards 设置 display: flex。", "给 .cards 设置 flex-wrap: wrap。", "给 .card 设置 border-radius。"],
    summary: ["语义标签 + Flex 构成页面骨架。", "导航栏与卡片区都可用 flex。", "你已经完成个人主页 V3。"],
    nextLesson: "js-01"
  }
]);
