// Module 8 lesson content: Final Project (final-01 .. final-06).
window.WebLabData = window.WebLabData || {};
window.WebLabData.lessons = (window.WebLabData.lessons || []).concat([
  {
    id: "final-01",
    module: "final",
    order: 1,
    title: "Project Check",
    subtitle: "检查项目是否完整",
    estimatedMinutes: 10,
    difficulty: 2,
    type: "lesson",
    objectives: ["了解项目要求", "用需求清单自检", "补齐缺失的结构"],
    intro: { title: "交作业之前，先自己检查一遍", content: "一个完整的数据项目网页需要：主标题、内容区域、样式、Flex 布局、事件、图表和移动端适配。逐项检查，心里有底。" },
    knowledge: [
      { type: "text", content: "项目要求：h1、至少两个 section、CSS 样式、class、Flex、JS 事件、图表、@media 移动端适配。" },
      { type: "text", content: "在“项目”页面（#/project）有一个需求清单，点击「检查需求」会自动逐项检查。" },
      { type: "text", content: "本节先检查最基本的结构：一个主标题和至少两个内容区域。" }
    ],
    starterCode: {
      html: '<header><h1>我的数据项目</h1></header>\n<main>\n  <section id="about"><h2>关于项目</h2><p>...</p></section>\n  <section id="data"><h2>数据</h2><p>...</p></section>\n</main>',
      css: "body { font-family: sans-serif; }",
      js: ""
    },
    tryTask: { description: "补齐标题和内容区域，让结构检查通过。" },
    challenge: {
      title: "检查项目结构",
      description: "页面里有 <h1>，并且至少有两个 <section>。",
      validator: { type: "dom", rules: [
        { type: "element-exists", selector: "h1" },
        { type: "element-count", selector: "section", min: 2 }
      ] }
    },
    hints: ["主标题使用 h1。", "每个内容区域用一个 section。", "<main><section>...</section><section>...</section></main>"],
    summary: ["完整项目需要清晰的结构。", "需求清单能帮你逐项检查。", "先保证结构，再优化样式。"],
    nextLesson: "final-02"
  },

  {
    id: "final-02",
    module: "final",
    order: 2,
    title: "Debug",
    subtitle: "找出并修复错误",
    estimatedMinutes: 10,
    difficulty: 2,
    type: "lesson",
    objectives: ["定位常见错误", "修复 CSS 语法问题", "保证样式生效"],
    intro: { title: "样式没生效，往往是小错误", content: "缺少冒号、缺少单位、拼写错误都会让样式失效。学会看 Console 和检查代码，就能快速定位问题。" },
    knowledge: [
      { type: "text", content: "常见错误：属性名和值之间缺少冒号、数值缺少单位、选择器写错。" },
      { type: "code", language: "css", code: "/* 错误 */\nh1 { color blue; }\n.card { border-radius: 12; }\n\n/* 正确 */\nh1 { color: blue; }\n.card { border-radius: 12px; }" }
    ],
    starterCode: {
      html: '<h1>我的数据项目</h1>\n<div class="card">卡片</div>',
      css: "h1 {\n  color blue;\n}\n\n.card {\n  border-radius: 12;\n  padding: 16px;\n}",
      js: ""
    },
    tryTask: { description: "修复上面 CSS 里的错误。" },
    challenge: {
      title: "修复样式错误",
      description: "让 h1 的颜色为 blue，并给 .card 设置 border-radius。",
      validator: { type: "dom", rules: [
        { type: "css-property", selector: "h1", property: "color", expected: "blue" },
        { type: "css-property", selector: ".card", property: "border-radius", exists: true }
      ] }
    },
    hints: ["属性名和值之间要有冒号。", "border-radius 的值需要单位 px。", "color: blue; 和 border-radius: 12px;"],
    summary: ["小错误会让样式失效。", "冒号、单位要写对。", "Console 能帮助定位问题。"],
    nextLesson: "final-03"
  },

  {
    id: "final-03",
    module: "final",
    order: 3,
    title: "Responsive",
    subtitle: "让项目适配手机",
    estimatedMinutes: 9,
    difficulty: 2,
    type: "lesson",
    objectives: ["检查移动端适配", "使用 @media", "使用 Flex 布局"],
    intro: { title: "在手机上也要好看", content: "使用 @media 媒体查询和 Flex 布局，让页面在小屏幕上也能正常显示。" },
    knowledge: [
      { type: "text", content: "@media (max-width: 600px) 里的样式只在窄屏生效。" },
      { type: "code", language: "css", code: ".cards { display: flex; flex-wrap: wrap; gap: 12px; }\n\n@media (max-width: 600px) {\n  .cards { flex-direction: column; }\n}" },
      { type: "text", content: "窗口太窄时，用列布局让卡片竖排。" }
    ],
    starterCode: {
      html: '<h1>我的数据项目</h1>\n<div class="cards">\n  <div class="card">卡片一</div>\n  <div class="card">卡片二</div>\n</div>',
      css: ".cards {\n  display: flex;\n  gap: 12px;\n}",
      js: ""
    },
    tryTask: { description: "添加 @media，让窄屏下的卡片竖排。" },
    challenge: {
      title: "添加移动端适配",
      description: "CSS 里使用 Flex 布局，并包含 @media 媒体查询。",
      validator: { type: "dom", rules: [
        { type: "css-declaration", property: "display", value: "flex" },
        { type: "css-media" }
      ] }
    },
    hints: ["Flex 用 display: flex。", "媒体查询使用 @media。", "@media (max-width: 600px) { ... }"],
    summary: ["媒体查询适配不同屏幕。", "Flex 让布局更灵活。", "窄屏下可以改用列布局。"],
    nextLesson: "final-04"
  },

  {
    id: "final-04",
    module: "final",
    order: 4,
    title: "Content Review",
    subtitle: "检查内容是否完整",
    estimatedMinutes: 8,
    difficulty: 2,
    type: "lesson",
    objectives: ["检查内容结构", "保证段落完整", "让项目读得懂"],
    intro: { title: "结构对了，内容也要完整", content: "除了技术要求，项目内容也要完整：标题、说明、数据与分析都应有清楚的分段说明。" },
    knowledge: [
      { type: "text", content: "检查每个 section 是否有标题和说明段落，避免只有标题没有内容。" },
      { type: "text", content: "自动检查只评价技术结构，内容质量仍需要你自己把关。" }
    ],
    starterCode: {
      html: '<h1>我的数据项目</h1>\n<section id="about">\n  <h2>关于项目</h2>\n  <p>这是一个关于城市空气质量的数据项目。</p>\n</section>\n<section id="data">\n  <h2>数据分析</h2>\n  <p>数据显示优良天数在上升。</p>\n</section>',
      css: "",
      js: ""
    },
    tryTask: { description: "为每个部分补上一段说明。" },
    challenge: {
      title: "内容完整",
      description: "页面里有 <h1>，并且至少三个 <p> 段落。",
      validator: { type: "dom", rules: [
        { type: "element-exists", selector: "h1" },
        { type: "element-count", selector: "p", min: 3 }
      ] }
    },
    hints: ["每个部分写一段说明。", "段落使用 p。", "<p>这里是说明文字。</p>"],
    summary: ["内容完整才能读懂。", "每个 section 配标题与说明。", "自动化检查不评价内容质量。"],
    nextLesson: "final-05"
  },

  {
    id: "final-05",
    module: "final",
    order: 5,
    title: "Presentation",
    subtitle: "用演示模式展示项目",
    estimatedMinutes: 7,
    difficulty: 1,
    type: "lesson",
    objectives: ["了解演示模式", "按 section 浏览", "准备课堂展示"],
    intro: { title: "把项目展示给同学看", content: "演示模式会全屏显示页面，并可以按 section 逐节浏览，适合课堂展示。" },
    knowledge: [
      { type: "text", content: "在“项目”页面点击「演示模式」，页面会全屏展示，可用上一节/下一节浏览。" },
      { type: "text", content: "合理划分 section，演示时思路更清晰。" }
    ],
    starterCode: {
      html: '<header><h1>我的数据项目</h1></header>\n<main>\n  <section id="about"><h2>关于项目</h2><p>...</p></section>\n  <section id="data"><h2>数据分析</h2><p>...</p></section>\n  <section id="conclusion"><h2>结论</h2><p>...</p></section>\n</main>',
      css: "",
      js: ""
    },
    tryTask: { description: "把项目分成至少三个 section，方便逐节演示。" },
    challenge: {
      title: "准备演示",
      description: "页面至少有三个 <section>，便于逐节浏览。",
      validator: { type: "dom", rules: [
        { type: "element-count", selector: "section", min: 3 }
      ] }
    },
    hints: ["每个主题一个 section。", "至少三个 section。", "<section>...</section>"],
    summary: ["演示模式适合课堂展示。", "按 section 逐节浏览。", "清晰的划分让演示更顺畅。"],
    nextLesson: "final-06"
  },

  {
    id: "final-06",
    module: "final",
    order: 6,
    title: "GitHub Pages",
    subtitle: "把项目发布到互联网",
    estimatedMinutes: 10,
    difficulty: 2,
    type: "lesson",
    objectives: ["导出项目文件", "了解 GitHub Pages 发布流程", "让网站上线"],
    intro: { title: "让你的项目被所有人访问", content: "把文件上传到 GitHub 仓库，开启 Pages，你的数据项目就能通过一个网址访问。" },
    knowledge: [
      { type: "text", content: "发布步骤：下载 index.html / style.css / script.js → 新建仓库 → 上传文件 → Settings → Pages → 访问网址。" },
      { type: "text", content: "如果项目用了图表，记得把 chart.umd.js 一起上传。" },
      { type: "text", content: "在“项目”页面可以一键下载所有文件。" }
    ],
    starterCode: {
      html: '<!DOCTYPE html>\n<html lang="zh-CN">\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>我的数据项目</title>\n  </head>\n  <body>\n    <h1>我的数据项目</h1>\n  </body>\n</html>',
      css: "",
      js: ""
    },
    tryTask: { description: "确保页面有 title 和 h1，然后到“项目”页面下载文件。" },
    challenge: {
      title: "准备发布",
      description: "页面包含 <title> 和 <h1>。",
      validator: { type: "dom", rules: [
        { type: "element-exists", selector: "title" },
        { type: "element-exists", selector: "h1" }
      ] }
    },
    hints: ["HTML 里要有 title。", "页面有 h1 主标题。", "<title>我的数据项目</title>"],
    summary: ["下载文件后上传到 GitHub。", "开启 Pages 即可发布。", "你已经完成一个可上线的数据项目！"],
    nextLesson: null
  }
]);
