// Module 7 lesson content: Data Story (project-01 .. project-09).
// Students assemble a complete data story page; project-09 is Data Story V1.
window.WebLabData = window.WebLabData || {};
window.WebLabData.lessons = (window.WebLabData.lessons || []).concat([
  {
    id: "project-01",
    module: "data-story",
    order: 1,
    title: "什么是数据故事",
    subtitle: "用数据讲一个故事",
    estimatedMinutes: 8,
    difficulty: 2,
    type: "lesson",
    objectives: ["理解什么是数据故事", "认识数据故事的结构", "搭出基本骨架"],
    intro: { title: "一堆图表，怎样变成有人读的故事？", content: "数据故事 = 研究问题 + 数据 + 图表 + 主要发现 + 结论。它用数据回答一个问题。" },
    knowledge: [
      { type: "text", content: "数据故事围绕一个研究问题展开，用数据与图表支撑主要发现和结论。" },
      { type: "code", language: "text", code: "项目名称\n研究问题 → 数据来源 → 数据概览 → 图表 → 主要发现 → 结论 → 反思" },
      { type: "text", content: "本模块你会在“试一试”中一步步搭出一个完整的 Data Story V1。" }
    ],
    starterCode: { html: '<h1>我的数据故事</h1>\n<section>\n  <h2>研究问题</h2>\n  <p>过去半年，空气质量变好了吗？</p>\n</section>', css: "", js: "" },
    tryTask: { description: "写好标题，并保留一个 section 作为故事的第一部分。" },
    challenge: {
      title: "搭出故事骨架",
      description: "页面里有 <h1> 和一个 <section>。",
      validator: { type: "dom", rules: [
        { type: "element-exists", selector: "h1" },
        { type: "element-exists", selector: "section" }
      ] }
    },
    hints: ["标题使用 h1。", "每个部分用 section 包裹。", '<h1>我的数据故事</h1>\n<section><h2>研究问题</h2></section>'],
    summary: ["数据故事用数据回答一个问题。", "结构：问题 → 数据 → 图表 → 发现 → 结论。", "section 用来划分每个部分。"],
    nextLesson: "project-02"
  },

  {
    id: "project-02",
    module: "data-story",
    order: 2,
    title: "研究问题",
    subtitle: "从一个好问题开始",
    estimatedMinutes: 7,
    difficulty: 2,
    type: "lesson",
    objectives: ["提出一个可研究的问题", "用 h2 与段落说明问题", "给 section 起 id"],
    intro: { title: "先想清楚要回答什么", content: "好的数据故事从一个明确的研究问题开始。把问题写清楚，后面的数据才有方向。" },
    knowledge: [
      { type: "text", content: "研究问题要具体、可回答，例如“过去半年空气质量是否改善”。" },
      { type: "code", language: "html", code: '<section id="question">\n  <h2>研究问题</h2>\n  <p>过去半年，空气质量变好了吗？</p>\n</section>' },
      { type: "text", content: "给 section 设置 id，方便定位与说明结构。" }
    ],
    starterCode: { html: '<h1>我的数据故事</h1>\n<section id="question">\n  <h2>研究问题</h2>\n  <p>过去半年，空气质量变好了吗？</p>\n</section>', css: "", js: "" },
    tryTask: { description: "把研究问题改成你自己关心的数据问题。" },
    challenge: {
      title: "写下研究问题",
      description: "页面里有一个 id 为 question 的部分。",
      validator: { type: "dom", rules: [{ type: "element-exists", selector: "#question" }] }
    },
    hints: ["用 section 包裹这一部分。", "给 section 加 id=\"question\"。", '<section id="question"><h2>研究问题</h2></section>'],
    summary: ["研究问题是故事的方向。", "问题要具体、可回答。", "id 便于标记每个部分。"],
    nextLesson: "project-03"
  },

  {
    id: "project-03",
    module: "data-story",
    order: 3,
    title: "数据来源",
    subtitle: "说清数据从哪来",
    estimatedMinutes: 6,
    difficulty: 2,
    type: "lesson",
    objectives: ["说明数据来源", "提高故事可信度", "用段落描述来源"],
    intro: { title: "数据从哪来？", content: "可信的数据故事会说明数据来源。写清来源，读者才知道数据是否可靠。" },
    knowledge: [
      { type: "text", content: "数据来源要写清楚：来自哪里、时间范围、样本数量等。" },
      { type: "code", language: "html", code: '<section id="source">\n  <h2>数据来源</h2>\n  <p>数据来自某城市环保部门 2025 年 1–6 月的公开月报。</p>\n</section>' }
    ],
    starterCode: { html: '<h1>我的数据故事</h1>\n<section id="question">\n  <h2>研究问题</h2>\n  <p>过去半年，空气质量变好了吗？</p>\n</section>\n<section id="source">\n  <h2>数据来源</h2>\n  <p>数据来自公开月报。</p>\n</section>', css: "", js: "" },
    tryTask: { description: "补充更具体的数据来源说明。" },
    challenge: {
      title: "说明数据来源",
      description: "页面里有一个 id 为 source 的部分。",
      validator: { type: "dom", rules: [{ type: "element-exists", selector: "#source" }] }
    },
    hints: ["新增一个 section。", "给它加 id=\"source\"。", '<section id="source"><h2>数据来源</h2></section>'],
    summary: ["说明来源能提高可信度。", "写清时间范围与来源。", "每部分用一个 section。"],
    nextLesson: "project-04"
  },

  {
    id: "project-04",
    module: "data-story",
    order: 4,
    title: "数据概览",
    subtitle: "先给读者一个全貌",
    estimatedMinutes: 7,
    difficulty: 2,
    type: "lesson",
    objectives: ["用列表概览数据", "整理关键数据点", "为图表做准备"],
    intro: { title: "先让读者看到数据全貌", content: "在画图之前，用列表把关键数据点列出来，读者能先有一个整体印象。" },
    knowledge: [
      { type: "text", content: "用 <ul> 和 <li> 列出关键数据点，例如每个月的优良天数。" },
      { type: "code", language: "html", code: '<section id="overview">\n  <h2>数据概览</h2>\n  <ul>\n    <li>1 月：12 天</li>\n    <li>2 月：15 天</li>\n    <li>3 月：14 天</li>\n  </ul>\n</section>' }
    ],
    starterCode: { html: '<h1>我的数据故事</h1>\n<section id="question"><h2>研究问题</h2><p>过去半年，空气质量变好了吗？</p></section>\n<section id="source"><h2>数据来源</h2><p>数据来自公开月报。</p></section>\n<section id="overview">\n  <h2>数据概览</h2>\n  <ul>\n    <li>1 月：12 天</li>\n    <li>2 月：15 天</li>\n    <li>3 月：14 天</li>\n  </ul>\n</section>', css: "", js: "" },
    tryTask: { description: "把列表里的数据换成你的真实数据。" },
    challenge: {
      title: "列出数据概览",
      description: "在 #overview 里用列表列出至少三个数据点。",
      validator: { type: "dom", rules: [
        { type: "element-exists", selector: "#overview" },
        { type: "element-count", selector: "#overview li", min: 3 }
      ] }
    },
    hints: ["使用 ul 和 li。", "至少三个 li。", '<ul><li>1 月：12 天</li><li>2 月：15 天</li><li>3 月：14 天</li></ul>'],
    summary: ["概览让读者先看到全貌。", "列表适合列出关键数据点。", "数据为图表做准备。"],
    nextLesson: "project-05"
  },

  {
    id: "project-05",
    module: "data-story",
    order: 5,
    title: "图表",
    subtitle: "把数据画出来",
    estimatedMinutes: 9,
    difficulty: 2,
    type: "lesson",
    objectives: ["用 Chart.js 画图表", "把图表放进对应 section", "为故事提供证据"],
    intro: { title: "图表是数据故事的核心证据", content: "把数据画成图表，读者一眼就能看出趋势。图表要放在故事里对应的位置。" },
    knowledge: [
      { type: "text", content: "在图表 section 里放一个 canvas，再用 Chart.js 画图。" },
      { type: "code", language: "html", code: '<section id="chart">\n  <h2>数据图表</h2>\n  <div class="chart-box"><canvas id="chart"></canvas></div>\n</section>' },
      { type: "code", language: "js", code: 'new Chart(document.getElementById("chart"), {\n  type: "bar",\n  data: { labels: ["一月", "二月", "三月"], datasets: [{ data: [12, 15, 14] }] }\n});' }
    ],
    starterCode: {
      html: '<h1>我的数据故事</h1>\n<section id="question"><h2>研究问题</h2><p>过去半年，空气质量变好了吗？</p></section>\n<section id="chart">\n  <h2>数据图表</h2>\n  <div class="chart-box" style="position:relative;height:240px;">\n    <canvas id="chart"></canvas>\n  </div>\n</section>',
      css: "",
      js: 'new Chart(document.getElementById("chart"), {\n  type: "bar",\n  data: {\n    labels: ["一月", "二月", "三月"],\n    datasets: [{ label: "优良天数", data: [12, 15, 14], backgroundColor: "#1677ff" }]\n  },\n  options: { responsive: true, maintainAspectRatio: false }\n});'
    },
    tryTask: { description: "把图表数据换成你概览里的数据。" },
    challenge: {
      title: "加入柱状图",
      description: "#chart 里有 canvas，并创建了一个 bar 图表。",
      validator: { type: "dom", rules: [
        { type: "element-exists", selector: "#chart canvas" },
        { type: "chart", chartType: "bar" }
      ] }
    },
    hints: ["canvas 放在 #chart 里。", "用 new Chart 创建图表。", 'type: "bar"'],
    summary: ["图表是故事的核心证据。", "canvas 是图表的位置。", "图表类型要与数据匹配。"],
    nextLesson: "project-06"
  },

  {
    id: "project-06",
    module: "data-story",
    order: 6,
    title: "数据发现",
    subtitle: "从数据里读出结论线索",
    estimatedMinutes: 8,
    difficulty: 2,
    type: "lesson",
    objectives: ["从图表中总结发现", "用发现卡片呈现", "让读者抓住重点"],
    intro: { title: "图表告诉了我们什么？", content: "看完图表，要总结出主要发现。把每条发现放进一张卡片，读者更容易抓住重点。" },
    knowledge: [
      { type: "text", content: "用 class=\"finding\" 的卡片呈现每条主要发现。" },
      { type: "code", language: "html", code: '<section id="findings">\n  <h2>主要发现</h2>\n  <div class="finding">优良天数整体在上升</div>\n  <div class="finding">4 到 6 月增长最明显</div>\n</section>' }
    ],
    starterCode: {
      html: '<h1>我的数据故事</h1>\n<section id="findings">\n  <h2>主要发现</h2>\n  <div class="finding">优良天数整体在上升</div>\n  <div class="finding">4 到 6 月增长最明显</div>\n</section>',
      css: ".finding { background: #f5f7fa; border: 1px solid #e3e8ef; border-radius: 12px; padding: 12px; margin: 8px 0; }",
      js: ""
    },
    tryTask: { description: "写出至少两条你自己的主要发现。" },
    challenge: {
      title: "总结主要发现",
      description: "#findings 里至少有两张 .finding 发现卡片。",
      validator: { type: "dom", rules: [
        { type: "element-exists", selector: "#findings" },
        { type: "element-count", selector: "#findings .finding", min: 2 }
      ] }
    },
    hints: ["每张发现卡片用一个 div。", "给卡片加 class=\"finding\"。", '<div class="finding">发现一</div><div class="finding">发现二</div>'],
    summary: ["发现是从数据中读出的结论线索。", "用卡片突出每条发现。", "发现要基于图表数据。"],
    nextLesson: "project-07"
  },

  {
    id: "project-07",
    module: "data-story",
    order: 7,
    title: "结论",
    subtitle: "回答最初的问题",
    estimatedMinutes: 6,
    difficulty: 2,
    type: "lesson",
    objectives: ["给出明确结论", "回应研究问题", "保持结论有依据"],
    intro: { title: "回到最初的问题", content: "结论要明确回答研究问题，并且有前面的数据与发现作为支撑。" },
    knowledge: [
      { type: "text", content: "结论部分用一段话回答研究问题，并点出依据。" },
      { type: "code", language: "html", code: '<section id="conclusion">\n  <h2>结论</h2>\n  <p>过去半年空气质量有变好的趋势，但仍需长期观察。</p>\n</section>' }
    ],
    starterCode: {
      html: '<h1>我的数据故事</h1>\n<section id="findings">\n  <h2>主要发现</h2>\n  <div class="finding">发现一</div>\n  <div class="finding">发现二</div>\n</section>\n<section id="conclusion">\n  <h2>结论</h2>\n  <p>过去半年空气质量有变好的趋势。</p>\n</section>',
      css: "",
      js: ""
    },
    tryTask: { description: "用一句话明确回答你的研究问题。" },
    challenge: {
      title: "给出结论",
      description: "页面里有一个 id 为 conclusion 的部分。",
      validator: { type: "dom", rules: [{ type: "element-exists", selector: "#conclusion" }] }
    },
    hints: ["新增一个 section。", "给它加 id=\"conclusion\"。", '<section id="conclusion"><h2>结论</h2></section>'],
    summary: ["结论回应研究问题。", "结论要有数据支撑。", "简洁明确更容易理解。"],
    nextLesson: "project-08"
  },

  {
    id: "project-08",
    module: "data-story",
    order: 8,
    title: "页面组织",
    subtitle: "让故事有头有尾",
    estimatedMinutes: 8,
    difficulty: 2,
    type: "lesson",
    objectives: ["用 header/main/footer 组织页面", "用 section 划分内容", "让结构清晰"],
    intro: { title: "给故事一个完整的结构", content: "用 header、main、footer 把页面组织起来，每个主题用一个 section，读者读起来更顺。" },
    knowledge: [
      { type: "text", content: "header 放标题，main 放各 section，footer 放反思或版权。" },
      { type: "code", language: "html", code: "<header><h1>项目名称</h1></header>\n<main>\n  <section>...</section>\n</main>\n<footer>反思</footer>" }
    ],
    starterCode: {
      html: '<header>\n  <h1>我的数据故事</h1>\n</header>\n<main>\n  <section id="question"><h2>研究问题</h2><p>...</p></section>\n  <section id="source"><h2>数据来源</h2><p>...</p></section>\n  <section id="conclusion"><h2>结论</h2><p>...</p></section>\n</main>\n<footer>\n  <p>反思</p>\n</footer>',
      css: "",
      js: ""
    },
    tryTask: { description: "把各部分都放进 main 里。" },
    challenge: {
      title: "组织页面结构",
      description: "页面有 header、main、footer，并且 main 里至少三个 section。",
      validator: { type: "dom", rules: [
        { type: "element-exists", selector: "header" },
        { type: "element-exists", selector: "main" },
        { type: "element-exists", selector: "footer" },
        { type: "element-count", selector: "main section", min: 3 }
      ] }
    },
    hints: ["使用 header、main、footer。", "每个主题一个 section。", "<main><section>...</section></main>"],
    summary: ["header/main/footer 让页面有结构。", "section 划分每个主题。", "清晰的结构方便阅读。"],
    nextLesson: "project-09"
  },

  {
    id: "project-09",
    module: "data-story",
    order: 9,
    title: "页面优化",
    subtitle: "完成 Data Story V1",
    estimatedMinutes: 18,
    difficulty: 3,
    type: "lesson",
    objectives: ["优化字体与间距", "保证结构完整", "完成 Data Story V1"],
    intro: { title: "最后完善你的数据故事", content: "这是本模块的阶段项目：结构完整、图表清晰、样式舒适，就形成了 Data Story V1。" },
    knowledge: [
      { type: "text", content: "优化要点：设置字体、留出间距、突出标题，让页面更好读。" },
      { type: "text", content: "Data Story V1 需要：标题、至少三个 section、一张图表，以及基本的字体样式。" },
      { type: "text", content: "也可以打开 Data Story Builder，先在模板上填内容，再把结构搬到编辑器。" }
    ],
    starterCode: {
      html: '<header class="story-header"><h1>我的数据故事</h1></header>\n<main>\n  <section id="question"><h2>研究问题</h2><p>过去半年，空气质量变好了吗？</p></section>\n  <section id="overview"><h2>数据概览</h2><ul><li>1 月：12 天</li><li>2 月：15 天</li><li>3 月：14 天</li></ul></section>\n  <section id="chart">\n    <h2>数据图表</h2>\n    <div style="position:relative;height:240px;"><canvas id="chart"></canvas></div>\n  </section>\n  <section id="conclusion"><h2>结论</h2><p>空气质量有变好的趋势。</p></section>\n</main>\n<footer id="reflection"><h2>反思</h2><p>我学会了用图表回答问题。</p></footer>',
      css: "body { font-family: sans-serif; color: #333; }",
      js: 'new Chart(document.getElementById("chart"), {\n  type: "bar",\n  data: {\n    labels: ["一月", "二月", "三月"],\n    datasets: [{ label: "优良天数", data: [12, 15, 14], backgroundColor: "#1677ff" }]\n  },\n  options: { responsive: true, maintainAspectRatio: false }\n});'
    },
    tryTask: { description: "补全结构与样式，让检查全部通过。" },
    challenge: {
      title: "Data Story V1",
      description: "页面含 h1、至少三个 section、一张 bar 图表，并设置了 body 字体。",
      validator: { type: "dom", rules: [
        { type: "element-exists", selector: "h1" },
        { type: "element-count", selector: "section", min: 3 },
        { type: "element-exists", selector: "canvas" },
        { type: "chart", chartType: "bar" },
        { type: "css-property", selector: "body", property: "font-family", exists: true }
      ] }
    },
    hints: ["用 header/main/footer 组织页面。", "图表 section 里放 canvas 并创建 bar 图表。", "给 body 设置 font-family。"],
    summary: ["Data Story 用数据回答一个问题。", "结构、图表与样式共同决定阅读体验。", "你已经完成 Data Story V1。"],
    nextLesson: "final-01"
  }
]);
