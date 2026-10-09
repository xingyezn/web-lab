// Version timeline: project snapshots used by the Versions page (view / code / diff).
window.WebLabData = window.WebLabData || {};
window.WebLabData.versions = [
  {
    id: "v0",
    title: "V0 · Hello Web",
    description: "第一个网页：一个标题。",
    html: "<h1>Hello Web</h1>",
    css: "",
    js: ""
  },
  {
    id: "v1",
    title: "V1 · HTML",
    description: "用 HTML 搭出个人主页的内容结构。",
    html: '<h1>我的主页</h1>\n<h2>关于我</h2>\n<p>你好，我是一名大一学生。</p>\n<h2>兴趣爱好</h2>\n<ul>\n  <li>编程</li>\n  <li>阅读</li>\n  <li>运动</li>\n</ul>\n<a href="https://www.example.com">我的链接</a>\n<img src="images/avatar.png" alt="我的头像">',
    css: "",
    js: ""
  },
  {
    id: "v2",
    title: "V2 · CSS",
    description: "用 CSS 给页面配色与排版。",
    html: '<div class="card">\n  <h1>我的主页</h1>\n  <p>你好，我是一名大一学生。</p>\n</div>',
    css: "body {\n  background-color: #f5f7fa;\n  font-family: sans-serif;\n}\n\n.card {\n  background-color: #ffffff;\n  border: 1px solid #e3e8ef;\n  border-radius: 12px;\n  padding: 24px;\n}",
    js: ""
  },
  {
    id: "v3",
    title: "V3 · Flex",
    description: "用 Flex 做导航栏与卡片布局。",
    html: '<header class="header">\n  <h1>我的主页</h1>\n  <nav class="nav">\n    <a href="#">首页</a>\n    <a href="#">关于</a>\n  </nav>\n</header>\n<main>\n  <div class="cards">\n    <div class="card">卡片一</div>\n    <div class="card">卡片二</div>\n  </div>\n</main>',
    css: "body { font-family: sans-serif; }\n.header { display: flex; align-items: center; justify-content: space-between; }\n.nav { display: flex; gap: 12px; }\n.cards { display: flex; flex-wrap: wrap; gap: 12px; }\n.card { flex: 1 1 160px; background: #f5f7fa; border-radius: 12px; padding: 12px; }",
    js: ""
  },
  {
    id: "v4",
    title: "V4 · DOM",
    description: "用 JavaScript 让页面可以交互。",
    html: '<h1 id="title">我的主页</h1>\n<button id="btn">点我</button>\n<p id="msg">等待点击</p>',
    css: "body { font-family: sans-serif; }",
    js: 'const btn = document.querySelector("#btn");\nconst msg = document.querySelector("#msg");\n\nbtn.addEventListener("click", function () {\n  msg.textContent = "欢迎来到我的主页";\n});'
  },
  {
    id: "v5",
    title: "V5 · Chart",
    description: "加入 Chart.js 数据图表。",
    html: '<h1>数据概览</h1>\n<div style="position:relative;height:240px;"><canvas id="chart"></canvas></div>',
    css: "body { font-family: sans-serif; }",
    js: 'new Chart(document.getElementById("chart"), {\n  type: "bar",\n  data: { labels: ["一月", "二月", "三月"], datasets: [{ label: "访问量", data: [120, 200, 150], backgroundColor: "#1677ff" }] },\n  options: { responsive: true, maintainAspectRatio: false }\n});'
  },
  {
    id: "story",
    title: "Data Story",
    description: "组织成一个完整的数据故事。",
    html: '<header class="hero"><h1>城市空气质量小调查</h1></header>\n<main>\n  <section id="question"><h2>研究问题</h2><p>过去半年，空气质量变好了吗？</p></section>\n  <section id="chart"><h2>数据图表</h2><div style="position:relative;height:240px;"><canvas id="chart"></canvas></div></section>\n  <section id="conclusion"><h2>结论</h2><p>优良天数整体在上升。</p></section>\n</main>',
    css: "body { font-family: sans-serif; }\n.hero { background: #1677ff; color: #fff; padding: 24px; }\nmain { max-width: 800px; margin: 0 auto; padding: 16px; }",
    js: 'new Chart(document.getElementById("chart"), {\n  type: "bar",\n  data: { labels: ["一月", "二月", "三月"], datasets: [{ label: "优良天数", data: [12, 15, 14], backgroundColor: "#1677ff" }] },\n  options: { responsive: true, maintainAspectRatio: false }\n});'
  },
  {
    id: "final",
    title: "Final Project",
    description: "完整的数据项目网页，可发布到 GitHub Pages。",
    html: '<header class="hero">\n  <h1>我的数据项目</h1>\n  <nav class="nav">\n    <a href="#about">关于</a>\n    <a href="#data">数据</a>\n  </nav>\n</header>\n<main>\n  <section id="about"><h2>关于项目</h2><p>这是一份关于城市空气质量的数据项目。</p></section>\n  <section id="data"><h2>数据图表</h2><div style="position:relative;height:240px;"><canvas id="chart"></canvas></div></section>\n  <section id="conclusion"><h2>结论</h2><p>优良天数整体在上升。</p></section>\n</main>\n<footer><p>© 2026 我的数据项目</p></footer>',
    css: "body { font-family: sans-serif; margin: 0; color: #333; }\n.hero { display: flex; align-items: center; justify-content: space-between; background: #1677ff; color: #fff; padding: 24px; }\n.nav { display: flex; gap: 12px; }\n.nav a { color: #fff; }\nmain { max-width: 800px; margin: 0 auto; padding: 16px; }\n@media (max-width: 600px) {\n  .hero { flex-direction: column; }\n}",
    js: 'new Chart(document.getElementById("chart"), {\n  type: "bar",\n  data: { labels: ["一月", "二月", "三月"], datasets: [{ label: "优良天数", data: [12, 15, 14], backgroundColor: "#1677ff" }] },\n  options: { responsive: true, maintainAspectRatio: false }\n});'
  }
];

window.WebLabData.versionIndex = {};
window.WebLabData.versions.forEach(function (version, index) {
  version.order = index;
  window.WebLabData.versionIndex[version.id] = version;
});

window.WebLabData.getVersion = function (id) {
  return window.WebLabData.versionIndex[id] || null;
};
