// Module 5 lesson content: DOM & interaction (dom-01 .. dom-10).
// DOM challenges execute inside a sandbox iframe (dom-state rules).
window.WebLabData = window.WebLabData || {};
window.WebLabData.lessons = (window.WebLabData.lessons || []).concat([
  {
    id: "dom-01",
    module: "dom",
    order: 1,
    title: "DOM 是什么",
    subtitle: "用代码操作网页",
    estimatedMinutes: 7,
    difficulty: 2,
    type: "lesson",
    objectives: ["认识 DOM", "理解 DOM 是页面在 JS 中的表示", "用 querySelector 找到元素"],
    intro: { title: "JavaScript 怎么“看到”页面上的元素？", content: "浏览器会把 HTML 解析成一棵 DOM 树。JS 通过 DOM 就能找到并修改页面上的元素。" },
    knowledge: [
      { type: "text", content: "DOM（文档对象模型）把网页表示成一棵树，JS 可以通过它读取和修改页面。" },
      { type: "code", language: "js", code: 'const title = document.querySelector("h1");\nconsole.log(title.textContent);' },
      { type: "text", content: "document.querySelector 用来按选择器找到第一个匹配的元素。" }
    ],
    starterCode: { html: "<h1>我的主页</h1>", css: "", js: 'const title = document.querySelector("h1");\nconsole.log(title.textContent);' },
    tryTask: { description: "点击「运行」，在 Console 里看看输出了什么。" },
    challenge: {
      title: "读取标题文字",
      description: "用 querySelector 找到 h1，并输出它的文字（包含「我的主页」）。",
      validator: { type: "dom", rules: [{ type: "console-output", expected: "我的主页" }] }
    },
    hints: ["用 document.querySelector 找到元素。", "用 textContent 读取文字。", 'console.log(document.querySelector("h1").textContent);'],
    summary: ["DOM 是页面在 JS 中的树形表示。", "document 是访问 DOM 的入口。", "querySelector 按选择器查找元素。"],
    nextLesson: "dom-02"
  },

  {
    id: "dom-02",
    module: "dom",
    order: 2,
    title: "DOM Tree",
    subtitle: "网页的树形结构",
    estimatedMinutes: 7,
    difficulty: 2,
    type: "lesson",
    objectives: ["理解 DOM 树", "认识父子与嵌套关系", "看懂简化 DOM 树"],
    intro: { title: "元素之间是有层级的", content: "DOM 树里，元素层层嵌套：外层的元素包含内层的元素，就像大盒子套小盒子。" },
    knowledge: [
      { type: "text", content: "根是 html，里面有 head 和 body；body 里再嵌套各种元素。" },
      {
        type: "dom-tree",
        code: "<main><section class=\"card\"><h2>关于我</h2><p>你好</p></section></main>"
      },
      { type: "code", language: "js", code: 'document.querySelector("main .card h2");' }
    ],
    starterCode: { html: "<main>\n  <h1>我的主页</h1>\n</main>", css: "", js: "" },
    tryTask: { description: "在 main 里增加一个 .card 区域，并在其中放一个 h2。" },
    challenge: {
      title: "搭一层嵌套结构",
      description: "在 main 中有一个 .card 区域，并且 .card 里有一个 h2。",
      validator: { type: "dom", rules: [
        { type: "element-exists", selector: "main .card" },
        { type: "element-exists", selector: "main .card h2" }
      ] }
    },
    hints: ["在 <main> 里放一个 <section class=\"card\">。", "在 card 里放一个 <h2>。", '<main><section class="card"><h2>关于我</h2></section></main>'],
    summary: ["DOM 是一棵树，元素层层嵌套。", "选择器可以描述层级关系。", "结构清晰便于查找元素。"],
    nextLesson: "dom-03"
  },

  {
    id: "dom-03",
    module: "dom",
    order: 3,
    title: "querySelector",
    subtitle: "按选择器找到元素",
    estimatedMinutes: 8,
    difficulty: 2,
    type: "lesson",
    objectives: ["使用 querySelector", "使用 CSS 选择器定位元素", "读取找到的元素"],
    intro: { title: "怎么精确地找到想要的元素？", content: "用 querySelector，它的参数就是 CSS 选择器：标签名、.class、#id 都可以。" },
    knowledge: [
      { type: "text", content: "querySelector 返回第一个匹配的元素，选择器写法和 CSS 一样。" },
      { type: "code", language: "js", code: 'const title = document.querySelector("#title");\nconsole.log(title.textContent);' },
      { type: "dom-lab" }
    ],
    starterCode: { html: '<h1 id="title">我的主页</h1>', css: "", js: 'const title = document.querySelector("#title");\nconsole.log(title.textContent);' },
    tryTask: { description: "在上面的 DOM Lab 里输入 h2、.card、#site-header，观察高亮变化。" },
    challenge: {
      title: "用 id 选择器查找",
      description: "用 #title 找到元素，并输出它的文字（包含「我的主页」）。",
      validator: { type: "dom", rules: [{ type: "console-output", expected: "我的主页" }] }
    },
    hints: ["id 选择器以 # 开头。", "用 textContent 读取文字。", 'document.querySelector("#title").textContent'],
    summary: ["querySelector 返回第一个匹配元素。", "选择器与 CSS 相同。", "标签、.class、#id 都是常用选择器。"],
    nextLesson: "dom-04"
  },

  {
    id: "dom-04",
    module: "dom",
    order: 4,
    title: "textContent",
    subtitle: "修改元素文字",
    estimatedMinutes: 6,
    difficulty: 2,
    type: "lesson",
    objectives: ["读取 textContent", "修改 textContent", "让页面内容变化"],
    intro: { title: "怎样用代码改掉页面上的文字？", content: "找到元素后，给它设置 textContent，就能替换它的文字内容。" },
    knowledge: [
      { type: "text", content: "textContent 表示元素里的文字，读它可以获取，赋值可以修改。" },
      { type: "code", language: "js", code: 'const title = document.querySelector("#title");\ntitle.textContent = "新标题";' }
    ],
    starterCode: { html: '<h1 id="title">旧标题</h1>', css: "", js: 'const title = document.querySelector("#title");\n\ntitle.textContent = "新标题";' },
    tryTask: { description: "把文字改成别的内容，运行后观察页面。" },
    challenge: {
      title: "把标题改成「新标题」",
      description: "用 JS 让 #title 的文字变成「新标题」。",
      validator: { type: "dom", rules: [
        { type: "dom-state", assert: { selector: "#title", property: "textContent", expected: "新标题" } }
      ] }
    },
    hints: ["先 querySelector 找到元素。", "给 textContent 赋值。", 'document.querySelector("#title").textContent = "新标题";'],
    summary: ["textContent 读取或修改文字。", "赋值会立即更新页面。", "这是最常见的 DOM 操作之一。"],
    nextLesson: "dom-05"
  },

  {
    id: "dom-05",
    module: "dom",
    order: 5,
    title: "style",
    subtitle: "用 JS 修改样式",
    estimatedMinutes: 7,
    difficulty: 2,
    type: "lesson",
    objectives: ["认识 element.style", "用 JS 设置行内样式", "修改文字颜色"],
    intro: { title: "能用 JavaScript 改变样式吗？", content: "可以。通过 element.style 可以设置元素的行内样式，例如修改文字颜色。" },
    knowledge: [
      { type: "text", content: "element.style.属性 = 值 可以设置行内样式，属性名使用小驼峰，如 backgroundColor。" },
      { type: "code", language: "js", code: 'const title = document.querySelector("#title");\ntitle.style.color = "red";' }
    ],
    starterCode: { html: '<h1 id="title">我的主页</h1>', css: "", js: 'const title = document.querySelector("#title");\ntitle.style.color = "red";' },
    tryTask: { description: "把颜色改成你喜欢的颜色。" },
    challenge: {
      title: "用 JS 把标题改成红色",
      description: "让 #title 的行内 color 为 red。",
      validator: { type: "dom", rules: [
        { type: "dom-state", assert: { selector: "#title", property: "style.color", expected: "red" } }
      ] }
    },
    hints: ["通过 element.style 设置样式。", "颜色属性是 color。", 'title.style.color = "red";'],
    summary: ["element.style 设置行内样式。", "属性名用小驼峰写法。", "样式也可以由 JS 动态改变。"],
    nextLesson: "dom-06"
  },

  {
    id: "dom-06",
    module: "dom",
    order: 6,
    title: "Event",
    subtitle: "响应用户操作",
    estimatedMinutes: 8,
    difficulty: 2,
    type: "lesson",
    objectives: ["认识事件", "使用 addEventListener", "在事件中修改页面"],
    intro: { title: "怎样让页面响应用户的点击？", content: "给元素绑定事件监听器。当事件发生时，就会执行你写的函数。" },
    knowledge: [
      { type: "text", content: "element.addEventListener(\"事件\", 函数) 可以监听用户操作，例如 click。" },
      { type: "code", language: "js", code: 'const btn = document.querySelector("#btn");\nconst msg = document.querySelector("#msg");\n\nbtn.addEventListener("click", function () {\n  msg.textContent = "已触发";\n});' }
    ],
    starterCode: { html: '<button id="btn">点我</button>\n<p id="msg">等待点击</p>', css: "", js: 'const btn = document.querySelector("#btn");\nconst msg = document.querySelector("#msg");\n\nbtn.addEventListener("click", function () {\n  msg.textContent = "已触发";\n});' },
    tryTask: { description: "运行后点击按钮，观察文字变化。" },
    challenge: {
      title: "点击后改变文字",
      description: "点击 #btn 后，#msg 的文字变成「已触发」。",
      validator: { type: "dom", rules: [
        { type: "dom-state", trigger: { type: "click", selector: "#btn" }, assert: { selector: "#msg", property: "textContent", expected: "已触发" } }
      ] }
    },
    hints: ["使用 addEventListener。", "事件名是 click。", 'btn.addEventListener("click", function () { msg.textContent = "已触发"; });'],
    summary: ["事件让页面响应用户操作。", "addEventListener 绑定事件与函数。", "事件发生时执行回调函数。"],
    nextLesson: "dom-07"
  },

  {
    id: "dom-07",
    module: "dom",
    order: 7,
    title: "Click",
    subtitle: "处理点击事件",
    estimatedMinutes: 7,
    difficulty: 2,
    type: "lesson",
    objectives: ["专门认识 click 事件", "在点击里累加计数", "更新页面文字"],
    intro: { title: "点击按钮，数字会变", content: "点击事件是网页交互里最常见的一种。可以在点击时更新文字、数字或样式。" },
    knowledge: [
      { type: "text", content: "click 事件在用户点击元素时触发。可以在回调里改变变量，再更新页面。" },
      { type: "code", language: "js", code: 'let count = 0;\nconst btn = document.querySelector("#btn");\nconst out = document.querySelector("#count");\n\nbtn.addEventListener("click", function () {\n  count = count + 1;\n  out.textContent = "已点击 " + count + " 次";\n});' }
    ],
    starterCode: { html: '<button id="btn">点我</button>\n<p id="count">已点击 0 次</p>', css: "", js: 'let count = 0;\nconst btn = document.querySelector("#btn");\nconst out = document.querySelector("#count");\n\nbtn.addEventListener("click", function () {\n  count = count + 1;\n  out.textContent = "已点击 " + count + " 次";\n});' },
    tryTask: { description: "点击按钮几次，看看计数如何变化。" },
    challenge: {
      title: "点击计数",
      description: "点击 #btn 后，#count 的文字变成「已点击 1 次」。",
      validator: { type: "dom", rules: [
        { type: "dom-state", trigger: { type: "click", selector: "#btn" }, assert: { selector: "#count", property: "textContent", expected: "已点击 1 次" } }
      ] }
    },
    hints: ["用 addEventListener 监听 click。", "在回调里让 count 加一。", 'out.textContent = "已点击 " + count + " 次";'],
    summary: ["click 是最常见的交互事件。", "可以在回调里更新变量与页面。", "计数器是典型的点击应用。"],
    nextLesson: "dom-08"
  },

  {
    id: "dom-08",
    module: "dom",
    order: 8,
    title: "Show / Hide",
    subtitle: "显示与隐藏内容",
    estimatedMinutes: 8,
    difficulty: 2,
    type: "lesson",
    objectives: ["用 style.display 控制显示", "点击显示内容", "理解 none 与 block"],
    intro: { title: "怎样点击按钮后再把内容显示出来？", content: "用 display 控制：none 表示隐藏，block 表示显示。点击时修改 display 即可。" },
    knowledge: [
      { type: "text", content: "display: none 隐藏元素，display: block 显示元素。" },
      { type: "code", language: "js", code: 'const btn = document.querySelector("#btn");\nconst box = document.querySelector("#box");\n\nbtn.addEventListener("click", function () {\n  box.style.display = "block";\n});' },
      { type: "text", content: "初始隐藏可以写在 HTML 的 style 里，例如 style=\"display: none;\"。" }
    ],
    starterCode: { html: '<button id="btn">显示内容</button>\n<div id="box" style="display: none;">隐藏的内容</div>', css: "", js: 'const btn = document.querySelector("#btn");\nconst box = document.querySelector("#box");\n\nbtn.addEventListener("click", function () {\n  box.style.display = "block";\n});' },
    tryTask: { description: "运行后点击按钮，让隐藏内容出现。" },
    challenge: {
      title: "点击显示内容",
      description: "点击 #btn 后，#box 的 display 变成 block。",
      validator: { type: "dom", rules: [
        { type: "dom-state", trigger: { type: "click", selector: "#btn" }, assert: { selector: "#box", property: "style.display", expected: "block" } }
      ] }
    },
    hints: ["用 style.display 控制显示。", "隐藏是 none，显示是 block。", 'box.style.display = "block";'],
    summary: ["display 控制元素的显示方式。", "none 隐藏，block 显示。", "点击切换常用于展开内容。"],
    nextLesson: "dom-09"
  },

  {
    id: "dom-09",
    module: "dom",
    order: 9,
    title: "Toggle Class",
    subtitle: "用 class 切换样式",
    estimatedMinutes: 8,
    difficulty: 3,
    type: "lesson",
    objectives: ["使用 classList.toggle", "用 class 管理样式", "点击切换高亮"],
    intro: { title: "点击一下加样式，再点一下去掉", content: "classList.toggle 可以在有/没有某个 class 之间切换，非常适合做高亮效果。" },
    knowledge: [
      { type: "text", content: "element.classList.toggle(\"名字\") 会添加或移除这个 class。" },
      { type: "code", language: "css", code: ".highlight { color: red; font-weight: bold; }" },
      { type: "code", language: "js", code: 'const btn = document.querySelector("#btn");\nconst text = document.querySelector("#text");\n\nbtn.addEventListener("click", function () {\n  text.classList.toggle("highlight");\n});' }
    ],
    starterCode: { html: '<button id="btn">切换高亮</button>\n<p id="text">点击按钮切换我的样式</p>', css: ".highlight {\n  color: red;\n  font-weight: bold;\n}", js: 'const btn = document.querySelector("#btn");\nconst text = document.querySelector("#text");\n\nbtn.addEventListener("click", function () {\n  text.classList.toggle("highlight");\n});' },
    tryTask: { description: "点击按钮，观察文字样式反复切换。" },
    challenge: {
      title: "点击切换 class",
      description: "点击 #btn 后，#text 拥有 class「highlight」。",
      validator: { type: "dom", rules: [
        { type: "dom-state", trigger: { type: "click", selector: "#btn" }, assert: { selector: "#text", property: "class", expected: "highlight" } }
      ] }
    },
    hints: ["使用 classList.toggle。", "先写好 .highlight 样式。", 'text.classList.toggle("highlight");'],
    summary: ["classList 管理元素的 class。", "toggle 在添加与移除间切换。", "用 class 控制样式更清晰。"],
    nextLesson: "dom-10"
  },

  {
    id: "dom-10",
    module: "dom",
    order: 10,
    title: "综合挑战",
    subtitle: "完成个人主页 V4",
    estimatedMinutes: 16,
    difficulty: 3,
    type: "lesson",
    objectives: ["综合运用事件、文字与 class", "完成个人主页 V4"],
    intro: { title: "让个人主页动起来", content: "这是 DOM 模块的阶段项目：用一个按钮和点击事件，让主页上的内容发生文字变化或高亮。" },
    knowledge: [
      { type: "text", content: "个人主页 V4 需要：一个按钮、一个点击事件，以及一处文字变化或内容显示隐藏。" },
      { type: "text", content: "本例要求：点击 #btn 后，#greeting 的文字变成「欢迎」，并加上 class「active」。" }
    ],
    starterCode: {
      html: '<h1>我的主页</h1>\n<button id="btn">打招呼</button>\n<p id="greeting">点击按钮打个招呼</p>',
      css: ".active {\n  color: #1677ff;\n  font-weight: bold;\n}",
      js: ""
    },
    tryTask: { description: "给按钮绑定 click 事件，改文字并加上 active class。" },
    challenge: {
      title: "个人主页 V4",
      description: "点击 #btn 后，#greeting 文字变成「欢迎」并获得 class「active」。",
      validator: { type: "dom", rules: [
        { type: "dom-state", trigger: { type: "click", selector: "#btn" }, assert: { selector: "#greeting", property: "textContent", expected: "欢迎" } },
        { type: "dom-state", trigger: { type: "click", selector: "#btn" }, assert: { selector: "#greeting", property: "class", expected: "active" } }
      ] }
    },
    hints: ["用 addEventListener 监听 click。", "在回调里设置 greeting.textContent = \"欢迎\"。", 'greeting.classList.add("active");'],
    summary: ["事件让页面响应用户。", "文字与 class 都可以在事件里修改。", "你已经完成个人主页 V4。"],
    nextLesson: "chart-01"
  }
]);
