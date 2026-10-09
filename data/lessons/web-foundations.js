// Module 0 lesson content: Web Foundations (web-01 .. web-05).
// Content lives in data files; no lesson content belongs in page components.
window.WebLabData = window.WebLabData || {};
window.WebLabData.lessons = (window.WebLabData.lessons || []).concat([
  {
    id: "web-01",
    module: "web",
    order: 1,
    title: "Web 是什么",
    subtitle: "网页、网站与浏览器",
    estimatedMinutes: 6,
    difficulty: 1,
    type: "lesson",

    objectives: [
      "知道网页是由文件构成的",
      "区分网页与网站",
      "理解浏览器的作用"
    ],

    intro: {
      title: "你打开的网页，其实是一份文件？",
      content: "网页本质上是由 HTML、CSS、JavaScript 文件组成的。浏览器读取这些文件，把它们显示成你看到的样子。"
    },

    knowledge: [
      { type: "text", content: "一个网页（page）是一份文档；一个网站（site）通常由许多个相互链接的网页组成。" },
      { type: "text", content: "浏览器（browser）负责读取网页文件，并把它们“翻译”成看得见的页面。Chrome、Edge、Firefox 都是浏览器。" },
      { type: "code", language: "html", code: "<h1>Hello Web</h1>" }
    ],

    starterCode: { html: "<h1>Hello Web</h1>", css: "", js: "" },

    tryTask: {
      description: "把 <h1> 里的文字改成你的名字，观察页面标题的变化。"
    },

    challenge: {
      title: "出现你的第一个标题",
      description: "让页面里有一个 <h1>，并且内容包含「Hello Web」。",
      validator: {
        type: "html",
        rules: [
          { type: "element-exists", selector: "h1" },
          { type: "text-content", selector: "h1", contains: "Hello Web" }
        ]
      }
    },

    hints: [
      "页面需要一个一级标题。",
      "一级标题使用 <h1> 和 </h1> 这一对标签。",
      "<h1>Hello Web</h1>"
    ],

    summary: [
      "网页由文件组成，网站由多个网页组成。",
      "浏览器负责把网页文件显示成页面。",
      "<h1> 用来写一级标题。"
    ],

    nextLesson: "web-02"
  },

  {
    id: "web-02",
    module: "web",
    order: 2,
    title: "浏览器与服务器",
    subtitle: "一次请求，一次响应",
    estimatedMinutes: 7,
    difficulty: 1,
    type: "lesson",

    objectives: [
      "理解请求与响应",
      "知道浏览器如何获取网页资源",
      "认识 URL 的作用"
    ],

    intro: {
      title: "在地址栏回车后，发生了什么？",
      content: "浏览器会向服务器发出请求，服务器再把网页文件返回给浏览器。这个过程就叫“请求与响应”。"
    },

    knowledge: [
      { type: "text", content: "在地址栏输入网址并回车，浏览器会向服务器发送一个“请求（Request）”。" },
      { type: "text", content: "服务器收到请求后，把网页文件作为“响应（Response）”返回给浏览器。" },
      { type: "text", content: "浏览器拿到文件后再解析并显示成页面，这个过程通常不到一秒。" },
      { type: "code", language: "text", code: "浏览器  --请求 Request-->  服务器\n浏览器  <--响应 Response--  服务器" }
    ],

    starterCode: {
      html: "<h1>请求与响应</h1>\n<p>浏览器向服务器发送请求，服务器返回网页文件。</p>",
      css: "",
      js: ""
    },

    tryTask: {
      description: "把 <p> 的内容改成你自己对“请求与响应”的理解。"
    },

    challenge: {
      title: "说说请求与响应",
      description: "页面里有一个 <h1> 和一个 <p>。",
      validator: {
        type: "html",
        rules: [
          { type: "element-exists", selector: "h1" },
          { type: "element-exists", selector: "p" }
        ]
      }
    },

    hints: [
      "标题使用 <h1>。",
      "段落使用 <p> 和 </p>。",
      "<h1>标题</h1> 下面接一个 <p>段落</p>。"
    ],

    summary: [
      "浏览器发送请求，服务器返回响应。",
      "网页文件通过网络传输到浏览器。",
      "浏览器负责把文件显示成页面。"
    ],

    nextLesson: "web-03"
  },

  {
    id: "web-03",
    module: "web",
    order: 3,
    title: "HTML / CSS / JS",
    subtitle: "结构、样式与行为",
    estimatedMinutes: 8,
    difficulty: 1,
    type: "lesson",

    objectives: [
      "说出 HTML / CSS / JS 的分工",
      "用 h1 写内容",
      "用 CSS 给元素设置颜色"
    ],

    intro: {
      title: "一个网页，为什么要用三种语言？",
      content: "HTML 负责内容与结构，CSS 负责外观与样式，JavaScript 负责行为与交互。三者分工合作，才构成完整的网页。"
    },

    knowledge: [
      { type: "text", content: "HTML：内容与结构，决定页面上有什么。" },
      { type: "text", content: "CSS：外观与样式，决定元素长什么样。" },
      { type: "text", content: "JavaScript：行为与交互，决定页面如何响应用户。" },
      { type: "code", language: "html", code: "<h1>HTML：内容与结构</h1>" },
      { type: "code", language: "css", code: "h1 {\n  color: #1677ff;\n}" },
      { type: "code", language: "js", code: 'console.log("JS：行为与交互");' }
    ],

    starterCode: {
      html: "<h1>HTML：内容与结构</h1>\n<p>CSS 负责样式，JavaScript 负责交互。</p>",
      css: "",
      js: 'console.log("JS：行为与交互");'
    },

    tryTask: {
      description: "切到 CSS 标签，写一条 h1 { color: … } 规则，给标题换个颜色。"
    },

    challenge: {
      title: "给标题加上颜色",
      description: "页面里有 <h1>，并且用 CSS 给 h1 设置了 color。",
      validator: {
        type: "html",
        rules: [
          { type: "element-exists", selector: "h1" },
          { type: "css-property", selector: "h1", property: "color", exists: true }
        ]
      }
    },

    hints: [
      "颜色是 CSS 的职责，要写在 CSS 里。",
      "选择 h1，再设置 color 属性。",
      "h1 {\n  color: #1677ff;\n}"
    ],

    summary: [
      "HTML 管结构，CSS 管样式，JS 管行为。",
      "CSS 规则形如：选择谁 { 改什么: 改成什么; }。",
      "三者写在不同的位置，共同组成网页。"
    ],

    nextLesson: "web-04"
  },

  {
    id: "web-04",
    module: "web",
    order: 4,
    title: "项目目录",
    subtitle: "组织你的网站文件",
    estimatedMinutes: 7,
    difficulty: 1,
    type: "lesson",

    objectives: [
      "认识 index.html",
      "认识 css / js / images 文件夹",
      "理解文件要分类放置"
    ],

    intro: {
      title: "网站文件如果乱放，会怎样？",
      content: "当文件越来越多时，把它们分类放进不同的文件夹，才能方便查找和维护。"
    },

    knowledge: [
      { type: "text", content: "一个网站通常会有一个主页文件 index.html，以及 css/、js/、images/ 等文件夹，分别存放样式、脚本和图片。" },
      {
        type: "code",
        language: "text",
        code: "my-website/\n├── index.html\n├── css/\n│   └── style.css\n├── js/\n│   └── script.js\n└── images/\n    └── avatar.png"
      },
      { type: "text", content: "浏览器默认打开 index.html，所以主页一般命名为 index.html。" }
    ],

    starterCode: {
      html: "<h1>我的主页</h1>\n<p>网站通常由 index.html、css/、js/、images/ 组成。</p>",
      css: "",
      js: ""
    },

    tryTask: {
      description: "读一读目录结构，想一想 css/、js/、images/ 分别放什么内容。"
    },

    challenge: {
      title: "列一列项目结构",
      description: "使用无序列表列出至少三个文件夹。",
      validator: {
        type: "html",
        rules: [
          { type: "text-content", selector: "h1", contains: "我的主页" },
          { type: "element-exists", selector: "ul" },
          { type: "element-count", selector: "li", min: 3 }
        ]
      }
    },

    hints: [
      "列表使用 <ul> 包裹。",
      "每个列表项使用 <li>。",
      "<ul><li>index.html</li><li>css/</li><li>images/</li></ul>"
    ],

    summary: [
      "主页通常命名为 index.html。",
      "样式、脚本、图片分文件夹存放。",
      "清晰的项目结构便于维护。"
    ],

    nextLesson: "web-05"
  },

  {
    id: "web-05",
    module: "web",
    order: 5,
    title: "VS Code",
    subtitle: "你的代码工作台",
    estimatedMinutes: 8,
    difficulty: 1,
    type: "lesson",

    objectives: [
      "认识资源管理器、编辑器与终端",
      "了解 Emmet 的作用",
      "知道 Live Server 可以实时预览"
    ],

    intro: {
      title: "写代码只能用记事本吗？",
      content: "用专门的代码编辑器效率会高很多。VS Code 是最常用的免费编辑器之一。"
    },

    knowledge: [
      { type: "text", content: "VS Code 的界面主要分为：左侧资源管理器、中间代码编辑器、下方终端（Terminal）。" },
      { type: "text", content: "Emmet 可以用简写快速生成代码；Live Server 扩展可以在保存时自动刷新预览。" },
      { type: "code", language: "text", code: "输入 ! 再按 Tab  ------->  生成完整的 HTML 结构" }
    ],

    starterCode: {
      html: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>我的第一个网页</title>\n  </head>\n  <body>\n    <h1>Hello Web</h1>\n  </body>\n</html>",
      css: "",
      js: ""
    },

    tryTask: {
      description: "修改 <title> 的内容，观察浏览器标签页的变化。"
    },

    challenge: {
      title: "补全页面结构",
      description: "让页面包含 title 和 h1。",
      validator: {
        type: "html",
        rules: [
          { type: "element-exists", selector: "title" },
          { type: "element-exists", selector: "h1" }
        ]
      }
    },

    hints: [
      "页面信息写在 head 里。",
      "title 放在 head 中。",
      "<title>我的主页</title>"
    ],

    summary: [
      "VS Code 是常用的代码编辑器。",
      "Emmet 可以快速生成代码片段。",
      "Live Server 可以实时预览页面。"
    ],

    nextLesson: "html-01"
  }
]);
