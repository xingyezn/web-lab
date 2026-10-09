// Practice challenges (Challenge Center). Each item is checked with the
// Validator in the sandbox, and category + difficulty drive the list page.
window.WebLabData = window.WebLabData || {};
window.WebLabData.challenges = (window.WebLabData.challenges || []).concat([
  {
    id: "ch-html-01",
    type: "challenge",
    category: "html",
    difficulty: 1,
    title: "标题与段落",
    description: "页面里有一个 <h1> 和一个 <p>。",
    starterCode: { html: "", css: "", js: "" },
    validator: { rules: [
      { type: "element-exists", selector: "h1" },
      { type: "element-exists", selector: "p" }
    ] },
    hints: ["主标题用 h1。", "段落用 p。", "<h1>标题</h1>\n<p>段落</p>"]
  },
  {
    id: "ch-html-02",
    type: "challenge",
    category: "html",
    difficulty: 2,
    title: "三个列表项",
    description: "使用 <ul> 创建一个至少包含三个 <li> 的列表。",
    starterCode: { html: "", css: "", js: "" },
    validator: { rules: [
      { type: "element-exists", selector: "ul" },
      { type: "element-count", selector: "li", min: 3 }
    ] },
    hints: ["列表用 ul 包裹。", "每一项用 li。", "<ul><li>一</li><li>二</li><li>三</li></ul>"]
  },
  {
    id: "ch-css-01",
    type: "challenge",
    category: "css",
    difficulty: 1,
    title: "给标题上色",
    description: "用 CSS 给 h1 设置 color。",
    starterCode: { html: "<h1>我的主页</h1>", css: "", js: "" },
    validator: { rules: [{ type: "css-property", selector: "h1", property: "color", exists: true }] },
    hints: ["选择 h1，设置 color。", "颜色可以写颜色名。", "h1 { color: #1677ff; }"]
  },
  {
    id: "ch-css-02",
    type: "challenge",
    category: "css",
    difficulty: 2,
    title: "卡片三件套",
    description: "给 .card 同时设置背景色、边框和圆角。",
    starterCode: { html: '<div class="card">卡片</div>', css: "", js: "" },
    validator: { rules: [
      { type: "css-property", selector: ".card", property: "background-color", exists: true },
      { type: "css-property", selector: ".card", property: "border", exists: true },
      { type: "css-property", selector: ".card", property: "border-radius", exists: true }
    ] },
    hints: ["背景用 background-color。", "边框用 border。", "圆角用 border-radius。"]
  },
  {
    id: "ch-layout-01",
    type: "challenge",
    category: "layout",
    difficulty: 2,
    title: "横向导航",
    description: "让 .nav 使用 Flex 横向排列，并设置 justify-content。",
    starterCode: { html: '<nav class="nav">\n  <a href="#">首页</a>\n  <a href="#">关于</a>\n</nav>', css: "", js: "" },
    validator: { rules: [
      { type: "css-property", selector: ".nav", property: "display", expected: "flex" },
      { type: "css-property", selector: ".nav", property: "justify-content", exists: true }
    ] },
    hints: ["display: flex 开启弹性布局。", "justify-content 控制分布。", ".nav { display: flex; justify-content: space-between; }"]
  },
  {
    id: "ch-js-01",
    type: "challenge",
    category: "js",
    difficulty: 1,
    title: "输出 Hello",
    description: "让 Console 输出「Hello」。",
    starterCode: { html: "", css: "", js: "" },
    validator: { rules: [{ type: "console-output", expected: "Hello" }] },
    hints: ["使用 console.log。", "文字要加引号。", 'console.log("Hello");']
  },
  {
    id: "ch-js-02",
    type: "challenge",
    category: "js",
    difficulty: 2,
    title: "1 到 5 求和",
    description: "用循环计算 1 + 2 + 3 + 4 + 5 并输出结果（15）。",
    starterCode: { html: "", css: "", js: "" },
    validator: { rules: [{ type: "console-output", expected: "15" }] },
    hints: ["用 for 循环 1 到 5。", "用 sum 累加。", "console.log(sum);"]
  },
  {
    id: "ch-dom-01",
    type: "challenge",
    category: "dom",
    difficulty: 2,
    title: "点击改变文字",
    description: "点击 #btn 后，#msg 的文字变成「完成」。",
    starterCode: { html: '<button id="btn">点我</button>\n<p id="msg">等待中</p>', css: "", js: "" },
    validator: { rules: [
      { type: "dom-state", trigger: { type: "click", selector: "#btn" }, assert: { selector: "#msg", property: "textContent", expected: "完成" } }
    ] },
    hints: ["用 addEventListener 监听 click。", "在回调里给 #msg 设置 textContent。", 'msg.textContent = "完成";']
  },
  {
    id: "ch-dom-02",
    type: "challenge",
    category: "dom",
    difficulty: 3,
    title: "点击切换 class",
    description: "点击 #btn 后，#box 获得 class「active」。",
    starterCode: { html: '<button id="btn">切换</button>\n<div id="box">内容</div>', css: ".active { color: #1677ff; }", js: "" },
    validator: { rules: [
      { type: "dom-state", trigger: { type: "click", selector: "#btn" }, assert: { selector: "#box", property: "class", expected: "active" } }
    ] },
    hints: ["使用 classList.add 或 toggle。", "class 名字是 active。", 'box.classList.add("active");']
  },
  {
    id: "ch-chart-01",
    type: "challenge",
    category: "chart",
    difficulty: 2,
    title: "创建柱状图",
    description: "使用 Chart.js 创建一个 bar 柱状图。",
    starterCode: { html: '<div style="position:relative;height:240px;"><canvas id="chart"></canvas></div>', css: "", js: "" },
    validator: { rules: [{ type: "chart", chartType: "bar" }] },
    hints: ["取得 canvas。", "用 new Chart 创建图表。", 'type: "bar"']
  },
  {
    id: "ch-chart-02",
    type: "challenge",
    category: "chart",
    difficulty: 3,
    title: "带标签与标题的图表",
    description: "创建 bar 图表，标签含 一月/二月/三月，并设置标题「访问量」。",
    starterCode: { html: '<div style="position:relative;height:240px;"><canvas id="chart"></canvas></div>', css: "", js: "" },
    validator: { rules: [
      { type: "chart", chartType: "bar", labels: ["一月", "二月", "三月"], title: "访问量" }
    ] },
    hints: ["labels 写三个月份。", "标题写在 options.plugins.title。", 'title: { display: true, text: "访问量" }']
  }
]);
