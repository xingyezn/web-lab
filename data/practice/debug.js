// Debug Center: buggy starter code students must fix. Each bug maps to one
// category: HTML / CSS / JS / path / DOM / chart.
window.WebLabData = window.WebLabData || {};
window.WebLabData.debugItems = (window.WebLabData.debugItems || []).concat([
  {
    id: "dbg-html-01",
    type: "debug",
    category: "html",
    difficulty: 1,
    title: "用错的主标题标签",
    description: "页面缺少 h1：现在用的是 h2。请把主标题改成 h1。",
    starterCode: { html: "<h2>我的主页</h2>\n<p>这是主标题，但标签用错了。</p>", css: "", js: "" },
    validator: { rules: [
      { type: "element-exists", selector: "h1" },
      { type: "text-content", selector: "h1", contains: "我的主页" }
    ] },
    hints: ["主标题应该用 h1。", "把 <h2> 改成 <h1>。", "<h1>我的主页</h1>"]
  },
  {
    id: "dbg-css-01",
    type: "debug",
    category: "css",
    difficulty: 1,
    title: "缺少冒号",
    description: "h1 的颜色没有生效，请修复 CSS 语法。",
    starterCode: { html: "<h1>我的主页</h1>", css: "h1 {\n  color blue;\n}", js: "" },
    validator: { rules: [{ type: "css-property", selector: "h1", property: "color", exists: true }] },
    hints: ["属性名和值之间要有冒号。", "写成 color: blue;。", "h1 {\n  color: blue;\n}"]
  },
  {
    id: "dbg-css-02",
    type: "debug",
    category: "css",
    difficulty: 1,
    title: "缺少单位",
    description: "圆角没有生效，请给 border-radius 补上单位。",
    starterCode: { html: '<div class="card">卡片</div>', css: ".card {\n  border-radius: 12;\n  padding: 16px;\n}", js: "" },
    validator: { rules: [{ type: "css-property", selector: ".card", property: "border-radius", expected: "12px" }] },
    hints: ["数值后面需要单位。", "圆角常用 px。", "border-radius: 12px;"]
  },
  {
    id: "dbg-js-01",
    type: "debug",
    category: "js",
    difficulty: 1,
    title: "缺少引号",
    description: "运行后 Console 报错，请修复字符串引号。",
    starterCode: { html: "", css: "", js: "console.log(Hello);" },
    validator: { rules: [{ type: "console-output", expected: "Hello" }] },
    hints: ["文字要放在引号里。", "字符串要用单引号或双引号。", 'console.log("Hello");']
  },
  {
    id: "dbg-path-01",
    type: "debug",
    category: "path",
    difficulty: 1,
    title: "图片路径错误",
    description: "图片在 images 文件夹里，请把 src 改成正确路径 images/avatar.png。",
    starterCode: { html: '<h1>我的主页</h1>\n<img src="avatar.png" alt="我的头像">', css: "", js: "" },
    validator: { rules: [{ type: "attribute", selector: "img", attribute: "src", expected: "images/avatar.png" }] },
    hints: ["图片在 images 文件夹里。", "路径要带文件夹名。", 'src="images/avatar.png"']
  },
  {
    id: "dbg-dom-01",
    type: "debug",
    category: "dom",
    difficulty: 2,
    title: "选择器拼写错误",
    description: "点击按钮没有反应，请修复选择器拼写。",
    starterCode: {
      html: '<button id="btn">点我</button>\n<p id="msg">等待中</p>',
      css: "",
      js: 'const btn = document.querySelector("#buton");\nconst msg = document.querySelector("#msg");\n\nbtn.addEventListener("click", function () {\n  msg.textContent = "已点击";\n});'
    },
    validator: { rules: [
      { type: "dom-state", trigger: { type: "click", selector: "#btn" }, assert: { selector: "#msg", property: "textContent", expected: "已点击" } }
    ] },
    hints: ["检查 querySelector 里的 id。", "按钮的 id 是 btn。", 'document.querySelector("#btn");']
  },
  {
    id: "dbg-chart-01",
    type: "debug",
    category: "chart",
    difficulty: 2,
    title: "Canvas 找不到",
    description: "图表没有出现，请修复 canvas 的 id 与选择器不一致的问题。",
    starterCode: {
      html: '<div style="position:relative;height:240px;"><canvas id="chart"></canvas></div>',
      css: "",
      js: 'const ctx = document.getElementById("chat");\n\nnew Chart(ctx, {\n  type: "bar",\n  data: { labels: ["一月", "二月"], datasets: [{ data: [12, 15] }] },\n  options: { responsive: true, maintainAspectRatio: false }\n});'
    },
    validator: { rules: [{ type: "chart", chartType: "bar" }] },
    hints: ["canvas 的 id 是 chart。", "getElementById 里的 id 要和 canvas 一致。", 'document.getElementById("chart")']
  }
]);
