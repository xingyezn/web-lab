// Local reference: HTML / CSS / Flex / JS / DOM / Chart, with local search.
window.WebLabData = window.WebLabData || {};
window.WebLabData.reference = [
  {
    id: "html",
    title: "HTML",
    entries: [
      { name: "h1–h6 标题", syntax: "<h1>标题</h1>", description: "一级到六级标题，h1 最大。" },
      { name: "p 段落", syntax: "<p>一段文字</p>", description: "表示一个段落。" },
      { name: "ul / li 列表", syntax: "<ul><li>项目</li></ul>", description: "无序列表与列表项。" },
      { name: "a 链接", syntax: '<a href="https://example.com">链接</a>', description: "href 指定跳转地址。" },
      { name: "img 图片", syntax: '<img src="images/a.png" alt="描述">', description: "src 是图片地址，alt 是替代文字。" },
      { name: "语义标签", syntax: "<header> <main> <section> <footer>", description: "描述页面区域的作用。" }
    ]
  },
  {
    id: "css",
    title: "CSS",
    entries: [
      { name: "基本语法", syntax: "选择器 { 属性: 值; }", description: "选择谁、改什么、改成什么。" },
      { name: "color", syntax: "color: #1677ff;", description: "设置文字颜色。" },
      { name: "background-color", syntax: "background-color: #f5f7fa;", description: "设置背景颜色。" },
      { name: "border", syntax: "border: 1px solid #cdd6e3;", description: "设置边框。" },
      { name: "border-radius", syntax: "border-radius: 12px;", description: "设置圆角。" },
      { name: "margin / padding", syntax: "margin: 16px; padding: 16px;", description: "外边距与内边距。" },
      { name: "class / id", syntax: ".card { }   #main { }", description: "class 用 . 选择，id 用 # 选择。" }
    ]
  },
  {
    id: "flex",
    title: "Flex",
    entries: [
      { name: "display: flex", syntax: "display: flex;", description: "把元素变成弹性容器。" },
      { name: "flex-direction", syntax: "flex-direction: row | column;", description: "排列方向。" },
      { name: "justify-content", syntax: "justify-content: space-between;", description: "主轴上的分布。" },
      { name: "align-items", syntax: "align-items: center;", description: "交叉轴上的对齐。" },
      { name: "gap", syntax: "gap: 12px;", description: "项目之间的间距。" },
      { name: "flex-wrap", syntax: "flex-wrap: wrap;", description: "空间不足时换行。" }
    ]
  },
  {
    id: "js",
    title: "JavaScript",
    entries: [
      { name: "console.log", syntax: 'console.log("Hello");', description: "把内容输出到 Console。" },
      { name: "变量", syntax: "let x = 1; const name = \"小明\";", description: "let 可改变，const 不可改变。" },
      { name: "if", syntax: "if (score >= 60) { ... } else { ... }", description: "条件判断。" },
      { name: "for", syntax: "for (let i = 1; i <= 3; i++) { ... }", description: "循环执行。" },
      { name: "函数", syntax: "function add(a, b) { return a + b; }", description: "定义并返回结果。" }
    ]
  },
  {
    id: "dom",
    title: "DOM",
    entries: [
      { name: "querySelector", syntax: 'document.querySelector("#id");', description: "按选择器找到第一个元素。" },
      { name: "textContent", syntax: 'el.textContent = "文字";', description: "读取或修改元素文字。" },
      { name: "style", syntax: 'el.style.color = "red";', description: "修改行内样式。" },
      { name: "addEventListener", syntax: 'el.addEventListener("click", fn);', description: "绑定事件。" },
      { name: "classList", syntax: 'el.classList.toggle("active");', description: "添加/移除/切换 class。" }
    ]
  },
  {
    id: "chart",
    title: "Chart.js",
    entries: [
      { name: "创建图表", syntax: 'new Chart(ctx, { type, data, options })', description: "用配置创建图表。" },
      { name: "type", syntax: '"bar" | "line" | "pie"', description: "图表类型。" },
      { name: "labels", syntax: 'labels: ["一月", "二月"]', description: "数据标签。" },
      { name: "datasets", syntax: "datasets: [{ data: [12, 15] }]", description: "数据集。" },
      { name: "title", syntax: 'plugins: { title: { display: true, text: "标题" } }', description: "图表标题。" }
    ]
  }
];

window.WebLabData.referenceIndex = {};
window.WebLabData.reference.forEach(function (category) {
  window.WebLabData.referenceIndex[category.id] = category;
});

window.WebLabData.getReference = function (id) {
  return window.WebLabData.referenceIndex[id] || null;
};

// Local search across all reference entries.
window.WebLabData.searchReference = function (query) {
  var q = String(query || "").trim().toLowerCase();
  if (!q) {
    return [];
  }
  var results = [];
  window.WebLabData.reference.forEach(function (category) {
    category.entries.forEach(function (entry) {
      var haystack = (entry.name + " " + entry.syntax + " " + entry.description).toLowerCase();
      if (haystack.indexOf(q) !== -1) {
        results.push({ category: category, entry: entry });
      }
    });
  });
  return results;
};
