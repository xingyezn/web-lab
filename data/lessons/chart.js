// Module 6 lesson content: Web data visualization (chart-01 .. chart-10).
// Charts render with the locally vendored Chart.js (assets/vendor/chart.umd.js).
window.WebLabData = window.WebLabData || {};
window.WebLabData.lessons = (window.WebLabData.lessons || []).concat([
  {
    id: "chart-01",
    module: "chart",
    order: 1,
    title: "数据与网页",
    subtitle: "用图表讲故事",
    estimatedMinutes: 7,
    difficulty: 1,
    type: "lesson",
    objectives: ["理解数据可视化的作用", "知道图表画在 canvas 上", "认识“数据 → 配置 → 图表”"],
    intro: { title: "一串数字，怎样让人一眼看懂？", content: "把数据画成图表，读者能更快看出趋势与差异。图表通常画在 <canvas> 元素上。" },
    knowledge: [
      { type: "text", content: "数据可视化把数字变成图表，帮助人们更快理解数据。" },
      { type: "text", content: "网页里的图表一般画在 <canvas> 画布上，由 JavaScript 绘制。" },
      { type: "text", content: "Chart.js 的工作流程是：准备数据 → 写配置 → 生成图表。" }
    ],
    starterCode: { html: "<h1>数据概览</h1>", css: "", js: "" },
    tryTask: { description: "在页面里添加一个 canvas 画布，作为图表的位置。" },
    challenge: {
      title: "准备画布",
      description: "页面里有 <h1> 和一个 <canvas> 画布。",
      validator: { type: "dom", rules: [
        { type: "element-exists", selector: "h1" },
        { type: "element-exists", selector: "canvas" }
      ] }
    },
    hints: ["图表需要一个 canvas 元素。", "给 canvas 一个 id 方便 JS 找到。", '<canvas id="chart"></canvas>'],
    summary: ["数据可视化把数据变成图表。", "图表画在 canvas 上。", "Chart.js 让画图更简单。"],
    nextLesson: "chart-02"
  },

  {
    id: "chart-02",
    module: "chart",
    order: 2,
    title: "Chart.js",
    subtitle: "创建你的第一个图表",
    estimatedMinutes: 9,
    difficulty: 2,
    type: "lesson",
    objectives: ["使用 Chart.js", "理解 new Chart(config)", "创建一个柱状图"],
    intro: { title: "用几行代码画出一个图表", content: "Chart.js 是一个常用的图表库。找到 canvas，把一个配置对象交给 new Chart，图表就出现了。" },
    knowledge: [
      { type: "text", content: "先取得 canvas，再 new Chart(ctx, { type, data, options })。" },
      { type: "code", language: "js", code: 'const ctx = document.getElementById("chart");\n\nnew Chart(ctx, {\n  type: "bar",\n  data: {\n    labels: ["一月", "二月", "三月"],\n    datasets: [{ label: "访问量", data: [120, 200, 150] }]\n  }\n});' },
      { type: "chart-lab" }
    ],
    starterCode: {
      html: '<div style="position:relative;height:260px;">\n  <canvas id="chart"></canvas>\n</div>',
      css: "",
      js: 'const ctx = document.getElementById("chart");\n\nnew Chart(ctx, {\n  type: "bar",\n  data: {\n    labels: ["一月", "二月", "三月"],\n    datasets: [{\n      label: "访问量",\n      data: [120, 200, 150],\n      backgroundColor: "#1677ff"\n    }]\n  },\n  options: {\n    responsive: true,\n    maintainAspectRatio: false\n  }\n});'
    },
    tryTask: { description: "修改 data 里的数字，运行后观察柱子高度。" },
    challenge: {
      title: "创建柱状图",
      description: "使用 Chart.js 创建一个 type 为 bar 的图表。",
      validator: { type: "dom", rules: [{ type: "chart", chartType: "bar" }] }
    },
    hints: ["先取得 canvas 元素。", "用 new Chart(ctx, {...}) 创建图表。", 'type: "bar"'],
    summary: ["Chart.js 把配置变成图表。", "type 决定图表种类。", "data 里放标签和数据集。"],
    nextLesson: "chart-03"
  },

  {
    id: "chart-03",
    module: "chart",
    order: 3,
    title: "Bar",
    subtitle: "柱状图",
    estimatedMinutes: 6,
    difficulty: 2,
    type: "lesson",
    objectives: ["认识柱状图", "用柱状图比较数值", "创建 bar 图表"],
    intro: { title: "比较不同类别的大小", content: "柱状图适合比较不同类别的大小，柱子越高数值越大。" },
    knowledge: [
      { type: "text", content: "柱状图（bar）用柱子的高度表示数值，适合比较不同类别。" },
      { type: "code", language: "js", code: 'type: "bar"\ndata.labels: ["一月", "二月", "三月"]\ndata.datasets[0].data: [120, 200, 150]' }
    ],
    starterCode: {
      html: '<div style="position:relative;height:260px;">\n  <canvas id="chart"></canvas>\n</div>',
      css: "",
      js: 'const ctx = document.getElementById("chart");\n\nnew Chart(ctx, {\n  type: "bar",\n  data: {\n    labels: ["一月", "二月", "三月"],\n    datasets: [{ label: "访问量", data: [120, 200, 150], backgroundColor: "#1677ff" }]\n  },\n  options: { responsive: true, maintainAspectRatio: false }\n});'
    },
    tryTask: { description: "把三个数字改成你自己的数据。" },
    challenge: {
      title: "创建一个柱状图",
      description: "创建一个 type 为 bar 的图表。",
      validator: { type: "dom", rules: [{ type: "chart", chartType: "bar" }] }
    },
    hints: ["图表类型写在 type 里。", "柱状图是 bar。", 'type: "bar"'],
    summary: ["柱状图用于比较类别。", "标签表示类别。", "数据表示每个类别的值。"],
    nextLesson: "chart-04"
  },

  {
    id: "chart-04",
    module: "chart",
    order: 4,
    title: "Line",
    subtitle: "折线图",
    estimatedMinutes: 6,
    difficulty: 2,
    type: "lesson",
    objectives: ["认识折线图", "用折线图展示趋势", "创建 line 图表"],
    intro: { title: "看数据随时间怎么变化", content: "折线图把数据点连成线，适合展示随时间变化的趋势。" },
    knowledge: [
      { type: "text", content: "折线图（line）适合展示趋势，例如访问量随时间的变化。" },
      { type: "code", language: "js", code: 'type: "line"\ndata: {\n  labels: ["周一", "周二", "周三"],\n  datasets: [{ label: "步数", data: [8000, 9500, 7000] }]\n}' }
    ],
    starterCode: {
      html: '<div style="position:relative;height:260px;">\n  <canvas id="chart"></canvas>\n</div>',
      css: "",
      js: 'const ctx = document.getElementById("chart");\n\nnew Chart(ctx, {\n  type: "line",\n  data: {\n    labels: ["周一", "周二", "周三"],\n    datasets: [{ label: "步数", data: [8000, 9500, 7000], borderColor: "#1677ff" }]\n  },\n  options: { responsive: true, maintainAspectRatio: false }\n});'
    },
    tryTask: { description: "增加一个数据点，观察折线的变化。" },
    challenge: {
      title: "创建折线图",
      description: "创建一个 type 为 line 的图表。",
      validator: { type: "dom", rules: [{ type: "chart", chartType: "line" }] }
    },
    hints: ["折线图的 type 是 line。", "把 type 改成 line。", 'type: "line"'],
    summary: ["折线图用于展示趋势。", "适合时间序列数据。", "type 决定图表种类。"],
    nextLesson: "chart-05"
  },

  {
    id: "chart-05",
    module: "chart",
    order: 5,
    title: "Pie",
    subtitle: "饼图",
    estimatedMinutes: 6,
    difficulty: 2,
    type: "lesson",
    objectives: ["认识饼图", "用饼图展示占比", "创建 pie 图表"],
    intro: { title: "看每一部分占多少", content: "饼图把整体分成扇形，适合展示各部分所占的比例。" },
    knowledge: [
      { type: "text", content: "饼图（pie）适合展示占比，各部分加起来是整体。" },
      { type: "code", language: "js", code: 'type: "pie"\ndata: {\n  labels: ["编程", "阅读", "运动"],\n  datasets: [{ data: [40, 35, 25] }]\n}' }
    ],
    starterCode: {
      html: '<div style="position:relative;height:260px;">\n  <canvas id="chart"></canvas>\n</div>',
      css: "",
      js: 'const ctx = document.getElementById("chart");\n\nnew Chart(ctx, {\n  type: "pie",\n  data: {\n    labels: ["编程", "阅读", "运动"],\n    datasets: [{ data: [40, 35, 25], backgroundColor: ["#1677ff", "#52c41a", "#faad14"] }]\n  },\n  options: { responsive: true, maintainAspectRatio: false }\n});'
    },
    tryTask: { description: "修改各部分的数值，观察扇形变化。" },
    challenge: {
      title: "创建饼图",
      description: "创建一个 type 为 pie 的图表。",
      validator: { type: "dom", rules: [{ type: "chart", chartType: "pie" }] }
    },
    hints: ["饼图的 type 是 pie。", "把 type 改成 pie。", 'type: "pie"'],
    summary: ["饼图用于展示占比。", "每个扇形代表一部分。", "不同类型适合不同数据。"],
    nextLesson: "chart-06"
  },

  {
    id: "chart-06",
    module: "chart",
    order: 6,
    title: "Labels",
    subtitle: "给数据加上标签",
    estimatedMinutes: 6,
    difficulty: 2,
    type: "lesson",
    objectives: ["认识 labels", "为图表添加标签", "让图表更易读"],
    intro: { title: "没有标签，图表看不懂", content: "labels 用来给每个数据点命名，例如月份、类别。标签让图表更清楚。" },
    knowledge: [
      { type: "text", content: "labels 是 data 里的一个数组，和 datasets 里的数据一一对应。" },
      { type: "code", language: "js", code: 'data: {\n  labels: ["一月", "二月", "三月"],\n  datasets: [{ data: [120, 200, 150] }]\n}' }
    ],
    starterCode: {
      html: '<div style="position:relative;height:260px;">\n  <canvas id="chart"></canvas>\n</div>',
      css: "",
      js: 'const ctx = document.getElementById("chart");\n\nnew Chart(ctx, {\n  type: "bar",\n  data: {\n    labels: ["一月", "二月", "三月"],\n    datasets: [{ label: "访问量", data: [120, 200, 150], backgroundColor: "#1677ff" }]\n  },\n  options: { responsive: true, maintainAspectRatio: false }\n});'
    },
    tryTask: { description: "把标签改成你关心的类别名称。" },
    challenge: {
      title: "添加三个标签",
      description: "柱状图的 labels 至少包含「一月」「二月」「三月」。",
      validator: { type: "dom", rules: [
        { type: "chart", chartType: "bar", labels: ["一月", "二月", "三月"] }
      ] }
    },
    hints: ["标签写在 data.labels 里。", "标签和数据一一对应。", 'labels: ["一月", "二月", "三月"]'],
    summary: ["labels 给数据命名。", "标签和数据要一一对应。", "清晰的标签让图表更容易理解。"],
    nextLesson: "chart-07"
  },

  {
    id: "chart-07",
    module: "chart",
    order: 7,
    title: "Title",
    subtitle: "给图表加标题",
    estimatedMinutes: 6,
    difficulty: 2,
    type: "lesson",
    objectives: ["认识 plugins.title", "为图表添加标题", "让图表说明主题"],
    intro: { title: "图表也需要标题", content: "标题告诉读者这张图在讲什么。用 options.plugins.title 设置并显示标题。" },
    knowledge: [
      { type: "text", content: "在 options.plugins.title 里设置 text，并让 display 为 true。" },
      { type: "code", language: "js", code: 'options: {\n  plugins: {\n    title: { display: true, text: "每月访问量" }\n  }\n}' }
    ],
    starterCode: {
      html: '<div style="position:relative;height:260px;">\n  <canvas id="chart"></canvas>\n</div>',
      css: "",
      js: 'const ctx = document.getElementById("chart");\n\nnew Chart(ctx, {\n  type: "bar",\n  data: {\n    labels: ["一月", "二月", "三月"],\n    datasets: [{ label: "访问量", data: [120, 200, 150], backgroundColor: "#1677ff" }]\n  },\n  options: {\n    responsive: true,\n    maintainAspectRatio: false,\n    plugins: {\n      title: { display: true, text: "每月访问量" }\n    }\n  }\n});'
    },
    tryTask: { description: "把标题改成你数据对应的主题。" },
    challenge: {
      title: "给图表加标题",
      description: "图表标题包含「每月访问量」。",
      validator: { type: "dom", rules: [
        { type: "chart", chartType: "bar", title: "每月访问量" }
      ] }
    },
    hints: ["标题写在 options.plugins.title。", "text 是标题内容。", 'title: { display: true, text: "每月访问量" }'],
    summary: ["标题说明图表的主题。", "写在 options.plugins.title。", "display: true 才会显示。"],
    nextLesson: "chart-08"
  },

  {
    id: "chart-08",
    module: "chart",
    order: 8,
    title: "图表选择",
    subtitle: "为数据选对图表",
    estimatedMinutes: 7,
    difficulty: 2,
    type: "lesson",
    objectives: ["比较柱状图、折线图、饼图", "根据问题选择图表", "用折线图展示趋势"],
    intro: { title: "什么数据用什么图？", content: "比较大小用柱状图，展示趋势用折线图，展示占比用饼图。选对图表，数据才讲得清楚。" },
    knowledge: [
      { type: "text", content: "柱状图 → 比较；折线图 → 趋势；饼图 → 占比。" },
      { type: "code", language: "text", code: "比较各类别的数量  →  bar\n数据随时间变化    →  line\n各部分占整体多少  →  pie" },
      { type: "text", content: "本课的数据是“访问量随时间变化”，所以应该用折线图。" }
    ],
    starterCode: {
      html: '<div style="position:relative;height:260px;">\n  <canvas id="chart"></canvas>\n</div>',
      css: "",
      js: 'const ctx = document.getElementById("chart");\n\nnew Chart(ctx, {\n  type: "bar",\n  data: {\n    labels: ["一月", "二月", "三月"],\n    datasets: [{ label: "访问量", data: [120, 200, 150] }]\n  },\n  options: { responsive: true, maintainAspectRatio: false }\n});'
    },
    tryTask: { description: "把图表类型改成更适合展示趋势的那种。" },
    challenge: {
      title: "选择折线图",
      description: "用 line 折线图展示访问量随时间的变化，并包含三个月份标签。",
      validator: { type: "dom", rules: [
        { type: "chart", chartType: "line", labels: ["一月", "二月", "三月"] }
      ] }
    },
    hints: ["趋势用折线图。", "把 type 改成 line。", 'type: "line"'],
    summary: ["比较用 bar，趋势用 line，占比用 pie。", "选对图表才能讲清数据。", "标签说明每个数据点。"],
    nextLesson: "chart-09"
  },

  {
    id: "chart-09",
    module: "chart",
    order: 9,
    title: "误导性图表",
    subtitle: "让图表说真话",
    estimatedMinutes: 8,
    difficulty: 2,
    type: "lesson",
    objectives: ["认识误导性图表", "理解截断纵轴的后果", "用诚实的刻度展示数据"],
    intro: { title: "同样的数据，为什么看起来差很多？", content: "如果把纵轴从 0 改成 90，原本很小的差异会被放大，误导读者。图表应当如实反映数据。" },
    knowledge: [
      { type: "text", content: "柱状图的纵轴通常应该从 0 开始；截断纵轴会夸大差异。" },
      { type: "chart-demo" },
      { type: "text", content: "另外，选择不合适的图表类型也可能造成误导。" }
    ],
    starterCode: {
      html: '<div style="position:relative;height:260px;">\n  <canvas id="chart"></canvas>\n</div>',
      css: "",
      js: 'const ctx = document.getElementById("chart");\n\nnew Chart(ctx, {\n  type: "bar",\n  data: {\n    labels: ["A", "B", "C"],\n    datasets: [{ label: "分数", data: [96, 98, 95], backgroundColor: "#1677ff" }]\n  },\n  options: {\n    responsive: true,\n    maintainAspectRatio: false,\n    scales: { y: { beginAtZero: true } }\n  }\n});'
    },
    tryTask: { description: "对比上面的两张图，说说哪张更诚实。" },
    challenge: {
      title: "画一张诚实的柱状图",
      description: "创建一个 type 为 bar 的柱状图。",
      validator: { type: "dom", rules: [{ type: "chart", chartType: "bar" }] }
    },
    hints: ["诚实起见，纵轴从 0 开始。", "柱状图 type 是 bar。", 'type: "bar"'],
    summary: ["截断纵轴会夸大差异。", "柱状图纵轴通常从 0 开始。", "图表要如实反映数据。"],
    nextLesson: "chart-10"
  },

  {
    id: "chart-10",
    module: "chart",
    order: 10,
    title: "综合挑战",
    subtitle: "完成 Data Dashboard",
    estimatedMinutes: 16,
    difficulty: 3,
    type: "lesson",
    objectives: ["综合运用图表类型、标签与标题", "完成 Data Dashboard"],
    intro: { title: "把数据变成一块仪表盘", content: "这是可视化模块的阶段项目：用一张带标题、标签清晰的图表展示你的数据。" },
    knowledge: [
      { type: "text", content: "Data Dashboard 需要：一张图表、清晰的标签、一个有意义的标题。" },
      { type: "text", content: "本任务是“每月访问量”的柱状图，包含一月、二月、三月三个标签。" }
    ],
    starterCode: {
      html: '<div style="position:relative;height:260px;">\n  <canvas id="chart"></canvas>\n</div>',
      css: "",
      js: 'const ctx = document.getElementById("chart");\n\nnew Chart(ctx, {\n  type: "bar",\n  data: {\n    labels: ["一月", "二月", "三月"],\n    datasets: [{ label: "访问量", data: [120, 200, 150], backgroundColor: "#1677ff" }]\n  },\n  options: {\n    responsive: true,\n    maintainAspectRatio: false,\n    plugins: { title: { display: true, text: "每月访问量" } }\n  }\n});'
    },
    tryTask: { description: "让图表同时满足类型、标签与标题要求。" },
    challenge: {
      title: "Data Dashboard",
      description: "创建柱状图，包含一月/二月/三月标签与标题「每月访问量」。",
      validator: { type: "dom", rules: [
        { type: "chart", chartType: "bar", labels: ["一月", "二月", "三月"], datasets: 1, title: "每月访问量" }
      ] }
    },
    hints: ["type 用 bar。", "labels 写三个月份。", "标题写在 options.plugins.title。"],
    summary: ["图表 = 数据 + 配置。", "标签说明类别，标题说明主题。", "你已经完成 Data Dashboard。"],
    nextLesson: "project-01"
  }
]);
