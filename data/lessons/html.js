// Module 1 lesson content: HTML (html-01 .. html-10), ending with Homepage V1.
window.WebLabData = window.WebLabData || {};
window.WebLabData.lessons = (window.WebLabData.lessons || []).concat([
  {
    id: "html-01",
    module: "html",
    order: 1,
    title: "Hello HTML",
    subtitle: "写出你的第一个网页标题",
    estimatedMinutes: 6,
    difficulty: 1,
    type: "lesson",

    objectives: [
      "认识第一个 HTML 标签",
      "使用 <h1> 写出一级标题",
      "在浏览器中看到结果"
    ],

    intro: {
      title: "网页上最大的那行字是怎么来的？",
      content: "网页由 HTML 标签组成。<h1> 是最大的一级标题标签，把文字放进这对标签里，它就会变成页面的大标题。"
    },

    knowledge: [
      {
        type: "text",
        content: "HTML 使用一对尖括号标签来标记内容：开始标签 <h1> 和结束标签 </h1> 之间的文字会被浏览器显示出来。"
      },
      {
        type: "code",
        language: "html",
        code: "<h1>Hello HTML</h1>"
      },
      {
        type: "text",
        content: "标签名不区分大小写，但课程里统一使用小写，读起来更清楚。"
      }
    ],

    starterCode: {
      html: "<h1>Hello HTML</h1>",
      css: "",
      js: ""
    },

    tryTask: {
      description: "把 <h1> 里的文字改成你的名字，看看页面标题发生了什么变化。"
    },

    challenge: {
      title: "写一个属于你的标题",
      description: "使用 <h1> 标签写出一个标题，内容需要包含「我的主页」。",
      validator: {
        type: "html",
        rules: [
          { type: "element-exists", selector: "h1" },
          { type: "text-content", selector: "h1", contains: "我的主页" }
        ]
      }
    },

    hints: [
      "页面里需要一个最大号的一级标题。",
      "一级标题使用 <h1> 和 </h1> 这一对标签。",
      "<h1>我的主页</h1>"
    ],

    summary: [
      "网页内容写在 HTML 标签里。",
      "<h1> 表示一级标题。",
      "标签成对出现：<h1> 开始，</h1> 结束。"
    ],

    nextLesson: "html-02"
  },

  {
    id: "html-02",
    module: "html",
    order: 2,
    title: "HTML 基本结构",
    subtitle: "每个网页都有固定的骨架",
    estimatedMinutes: 8,
    difficulty: 1,
    type: "lesson",

    objectives: [
      "认识 DOCTYPE 声明",
      "认识 html、head、body",
      "写出一个完整的页面结构"
    ],

    intro: {
      title: "为什么一个完整网页要写这么多行？",
      content: "一个标准网页由固定的几个部分组成：DOCTYPE、html、head 和 body。把它们写对，浏览器才能正确显示页面。"
    },

    knowledge: [
      {
        type: "text",
        content: "DOCTYPE 告诉浏览器这是一个 HTML5 页面。<html> 是整个页面的最外层容器。"
      },
      {
        type: "code",
        language: "html",
        code: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>我的第一个网页</title>\n  </head>\n  <body>\n    <h1>Hello HTML</h1>\n  </body>\n</html>"
      },
      {
        type: "text",
        content: "head 里放页面信息，不会直接显示在页面上；body 里的内容才是用户能看到的。"
      },
      {
        type: "dom-tree",
        code: "<!DOCTYPE html><html><head><title>我的第一个网页</title></head><body><h1>Hello HTML</h1></body></html>"
      }
    ],

    starterCode: {
      html: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>我的第一个网页</title>\n  </head>\n  <body>\n    <h1>Hello HTML</h1>\n  </body>\n</html>",
      css: "",
      js: ""
    },

    tryTask: {
      description: "把 <title> 的内容改成「我的主页」，它不会显示在页面上，而是出现在浏览器标签页上。"
    },

    challenge: {
      title: "搭建完整页面结构",
      description: "写出包含 DOCTYPE、html、head、body 和 title 的完整结构，并在 body 中放一个 <h1>。",
      validator: {
        type: "html",
        rules: [
          { type: "element-exists", selector: "title" },
          { type: "element-exists", selector: "h1" }
        ]
      }
    },

    hints: [
      "页面需要一套固定的外层结构。",
      "外层是 <html>，它里面分成 <head> 和 <body>。",
      "先写 <!DOCTYPE html>，再写 <html>、<head>、<body>。"
    ],

    summary: [
      "DOCTYPE 声明这是一个 HTML5 页面。",
      "head 存放页面信息，body 存放可见内容。",
      "title 会显示在浏览器标签页上。"
    ],

    nextLesson: "html-03"
  },

  {
    id: "html-03",
    module: "html",
    order: 3,
    title: "标题",
    subtitle: "用 h1 到 h3 组织内容层级",
    estimatedMinutes: 7,
    difficulty: 1,
    type: "lesson",

    objectives: [
      "认识 h1、h2、h3",
      "理解标题的层级关系",
      "为一篇小介绍添加层级标题"
    ],

    intro: {
      title: "文章为什么需要不同大小的标题？",
      content: "标题可以表示内容的层级：h1 是主标题，h2 是小节标题，h3 是更小的标题。读者能一眼看出文章结构。"
    },

    knowledge: [
      {
        type: "text",
        content: "HTML 提供六级标题，从 <h1> 到 <h6>。数字越大，字号越小，层级越低。"
      },
      {
        type: "code",
        language: "html",
        code: "<h1>我的主页</h1>\n<h2>关于我</h2>\n<h3>兴趣爱好</h3>"
      },
      {
        type: "text",
        content: "一个页面通常只使用一个 <h1>，其余小节使用 h2 和 h3。"
      }
    ],

    starterCode: {
      html: "<h1>我的主页</h1>\n<h2>关于我</h2>\n<h3>兴趣爱好</h3>",
      css: "",
      js: ""
    },

    tryTask: {
      description: "在示例后面再加一个 <h2> 小节，例如「联系方式」，观察标题层级的变化。"
    },

    challenge: {
      title: "组织一篇小介绍",
      description: "使用一个 <h1> 作为主标题，并至少使用两个 <h2> 作为小节标题。",
      validator: {
        type: "html",
        rules: [
          { type: "element-count", selector: "h1", min: 1, max: 1 },
          { type: "element-count", selector: "h2", min: 2 }
        ]
      }
    },

    hints: [
      "主标题使用 h1，小节标题使用 h2。",
      "标题标签是成对的：<h2> 开始，</h2> 结束。",
      "<h1>我的主页</h1> 后面接两个 <h2>…</h2>。"
    ],

    summary: [
      "h1–h6 表示不同层级的标题。",
      "h1 最大，通常一个页面只用一个。",
      "合理使用标题能让页面结构更清晰。"
    ],

    nextLesson: "html-04"
  },

  {
    id: "html-04",
    module: "html",
    order: 4,
    title: "段落",
    subtitle: "用 p 把文字分段",
    estimatedMinutes: 6,
    difficulty: 1,
    type: "lesson",

    objectives: [
      "认识 p 标签",
      "用 p 写段落",
      "理解段落会自动换行分段"
    ],

    intro: {
      title: "一段文字，怎么单独成段？",
      content: "在 HTML 里，文字要放进段落标签 <p> 中。浏览器会在每个段落前后自动换行，让文字更好读。"
    },

    knowledge: [
      { type: "text", content: "<p> 表示一个段落（paragraph）。" },
      { type: "code", language: "html", code: "<p>这是我的第一段自我介绍。</p>\n<p>这是第二段。</p>" },
      { type: "text", content: "如果直接写文字而不使用 <p>，它们会挤在一起，不容易阅读。" }
    ],

    starterCode: {
      html: "<h1>我的主页</h1>\n<p>这是第一段自我介绍。</p>",
      css: "",
      js: ""
    },

    tryTask: {
      description: "再写一段，介绍你的兴趣爱好。"
    },

    challenge: {
      title: "写两段介绍",
      description: "页面中至少使用两个 <p> 段落。",
      validator: {
        type: "html",
        rules: [{ type: "element-count", selector: "p", min: 2 }]
      }
    },

    hints: [
      "段落使用 <p> 和 </p>。",
      "两段就是两对 <p>…</p>。",
      "<p>第一段</p>\n<p>第二段</p>"
    ],

    summary: [
      "<p> 用来写段落。",
      "浏览器会在段落前后自动换行。",
      "合理分段能让内容更清楚。"
    ],

    nextLesson: "html-05"
  },

  {
    id: "html-05",
    module: "html",
    order: 5,
    title: "列表",
    subtitle: "把多个相关内容组织起来",
    estimatedMinutes: 7,
    difficulty: 1,
    type: "lesson",

    objectives: [
      "认识 ul 与 li",
      "创建一个无序列表",
      "理解列表用于组织多个项目"
    ],

    intro: {
      title: "三个兴趣，怎么并列展示？",
      content: "把多个相关的内容组织在一起，可以使用列表。无序列表用圆点表示，每一项是一个列表项。"
    },

    knowledge: [
      { type: "text", content: "无序列表使用 <ul> 包裹，每个列表项使用 <li>。" },
      { type: "code", language: "html", code: "<ul>\n  <li>编程</li>\n  <li>阅读</li>\n  <li>运动</li>\n</ul>" },
      { type: "text", content: "ul 是列表容器，li 是列表里的每一项。" }
    ],

    starterCode: {
      html: "<h1>兴趣爱好</h1>\n<ul>\n  <li>编程</li>\n  <li>阅读</li>\n</ul>",
      css: "",
      js: ""
    },

    tryTask: {
      description: "再增加一个兴趣列表项。"
    },

    challenge: {
      title: "写下三个兴趣",
      description: "使用一个 <ul> 和至少三个 <li> 列出你的兴趣。",
      validator: {
        type: "html",
        rules: [
          { type: "element-exists", selector: "ul" },
          { type: "element-count", selector: "li", min: 3 }
        ]
      }
    },

    hints: [
      "列表需要一个 <ul> 容器。",
      "每个列表项使用 <li>。",
      "<ul><li>编程</li><li>阅读</li><li>运动</li></ul>"
    ],

    summary: [
      "<ul> 表示无序列表。",
      "<li> 表示列表项。",
      "列表适合组织并列的多项内容。"
    ],

    nextLesson: "html-06"
  },

  {
    id: "html-06",
    module: "html",
    order: 6,
    title: "超链接",
    subtitle: "让文字可以点击跳转",
    estimatedMinutes: 6,
    difficulty: 1,
    type: "lesson",

    objectives: [
      "认识 a 标签",
      "使用 href 设置链接地址",
      "创建可以点击的链接"
    ],

    intro: {
      title: "怎样从我的页面跳到别的网站？",
      content: "使用超链接标签 <a>，并通过 href 属性告诉浏览器要跳转到哪里。"
    },

    knowledge: [
      { type: "text", content: "<a> 表示链接，href 属性写目标地址。" },
      { type: "code", language: "html", code: '<a href="https://www.example.com">访问示例网站</a>' },
      { type: "text", content: "标签之间的文字就是页面上可以点击的部分。" }
    ],

    starterCode: {
      html: '<h1>我的主页</h1>\n<p>友情链接：</p>\n<a href="https://www.example.com">示例网站</a>',
      css: "",
      js: ""
    },

    tryTask: {
      description: "把 href 改成你经常访问的网站地址。"
    },

    challenge: {
      title: "添加一个链接",
      description: "页面里有一个 <a>，并且设置了 href。",
      validator: {
        type: "html",
        rules: [
          { type: "element-exists", selector: "a" },
          { type: "attribute", selector: "a", attribute: "href", required: true }
        ]
      }
    },

    hints: [
      "链接使用 <a> 标签。",
      "跳转地址写在 href 里。",
      '<a href="https://www.example.com">点我</a>'
    ],

    summary: [
      "<a> 用来创建超链接。",
      "href 决定链接指向的地址。",
      "链接文字会显示为可点击样式。"
    ],

    nextLesson: "html-07"
  },

  {
    id: "html-07",
    module: "html",
    order: 7,
    title: "图片",
    subtitle: "用 img 显示图片",
    estimatedMinutes: 7,
    difficulty: 1,
    type: "lesson",

    objectives: [
      "认识 img 标签",
      "使用 src 指定图片地址",
      "使用 alt 描述图片"
    ],

    intro: {
      title: "怎样在页面里放一张图片？",
      content: "使用 <img> 标签显示图片，src 属性写图片的地址，alt 属性写图片的替代文字。"
    },

    knowledge: [
      { type: "text", content: "<img> 用来显示图片，src 是图片地址，alt 是图片的替代文字。" },
      { type: "code", language: "html", code: '<img src="images/avatar.png" alt="我的头像">' },
      { type: "text", content: "img 比较特殊，它不需要结束标签。alt 在图片无法显示时会出现，也方便屏幕阅读器理解图片。" }
    ],

    starterCode: {
      html: '<h1>我的主页</h1>\n<img src="images/avatar.png" alt="我的头像">',
      css: "",
      js: ""
    },

    tryTask: {
      description: "把 alt 改成一句更准确的图片描述。"
    },

    challenge: {
      title: "插入一张图片",
      description: "页面里有 <img>，并设置了 alt 属性。",
      validator: {
        type: "html",
        rules: [
          { type: "element-exists", selector: "img" },
          { type: "attribute", selector: "img", attribute: "alt", required: true }
        ]
      }
    },

    hints: [
      "图片使用 <img> 标签。",
      "图片地址写在 src，描述写在 alt。",
      '<img src="images/avatar.png" alt="我的头像">'
    ],

    summary: [
      "<img> 用来插入图片。",
      "src 是图片地址，alt 是替代文字。",
      "img 不需要结束标签。"
    ],

    nextLesson: "html-08"
  },

  {
    id: "html-08",
    module: "html",
    order: 8,
    title: "文件路径",
    subtitle: "找到文件夹里的图片",
    estimatedMinutes: 8,
    difficulty: 2,
    type: "lesson",

    objectives: [
      "理解相对路径",
      "引用子文件夹中的图片",
      "修正错误的图片路径"
    ],

    intro: {
      title: "图片明明在，为什么显示不出来？",
      content: "如果图片放在 images 文件夹里，路径就必须写成 images/文件名。路径写错，浏览器就找不到图片。"
    },

    knowledge: [
      { type: "text", content: "当图片放在子文件夹 images 中时，路径要写成 images/文件名。" },
      { type: "code", language: "html", code: '<img src="images/avatar.png" alt="我的头像">' },
      { type: "code", language: "text", code: "index.html 与 images/ 在同一个目录：\n├── index.html\n└── images/\n    └── avatar.png" },
      { type: "text", content: "路径就像地址：从当前文件出发，一层层找到目标文件。" }
    ],

    starterCode: {
      html: '<h1>我的主页</h1>\n<img src="avatar.png" alt="我的头像">',
      css: "",
      js: ""
    },

    tryTask: {
      description: "图片路径少了文件夹，试一试用 images/ 开头的正确路径。"
    },

    challenge: {
      title: "修正图片路径",
      description: "让 <img> 的 src 指向 images/avatar.png。",
      validator: {
        type: "html",
        rules: [
          { type: "element-exists", selector: "img" },
          { type: "attribute", selector: "img", attribute: "src", expected: "images/avatar.png" }
        ]
      }
    },

    hints: [
      "图片和 index.html 不在同一个文件夹。",
      "images 文件夹里的图片要写成 images/文件名。",
      'src="images/avatar.png"'
    ],

    summary: [
      "相对路径从当前文件出发找目标。",
      "子文件夹里的文件要带文件夹名。",
      "路径写错，图片或链接就会失效。"
    ],

    nextLesson: "html-09"
  },

  {
    id: "html-09",
    module: "html",
    order: 9,
    title: "语义结构",
    subtitle: "用 header、main、section、footer 分区",
    estimatedMinutes: 8,
    difficulty: 2,
    type: "lesson",

    objectives: [
      "认识 header / main / section / footer",
      "用语义标签组织页面",
      "理解结构清晰的好处"
    ],

    intro: {
      title: "页面内容不少，怎么分区域？",
      content: "HTML 提供了语义标签，让页面的区域一目了然：header 是页头，main 是主体，section 是分区，footer 是页脚。"
    },

    knowledge: [
      { type: "text", content: "语义标签让页面结构更清楚：<header> 页头、<main> 主体、<section> 分区、<footer> 页脚。" },
      { type: "code", language: "html", code: "<header>页头</header>\n<main>\n  <section>一个分区</section>\n</main>\n<footer>页脚</footer>" },
      {
        type: "dom-tree",
        code: "<header><h1>我的主页</h1></header><main><section><h2>关于我</h2></section></main><footer><p>页脚</p></footer>"
      }
    ],

    starterCode: {
      html: "<header>\n  <h1>我的主页</h1>\n</header>\n<main>\n  <section>\n    <h2>关于我</h2>\n    <p>你好，我是一名大一学生。</p>\n  </section>\n</main>\n<footer>\n  <p>© 2026 我的主页</p>\n</footer>",
      css: "",
      js: ""
    },

    tryTask: {
      description: "在 main 中再增加一个 <section> 分区，例如「兴趣爱好」。"
    },

    challenge: {
      title: "组织页面结构",
      description: "使用 header、main、footer 三个语义标签。",
      validator: {
        type: "html",
        rules: [
          { type: "element-exists", selector: "header" },
          { type: "element-exists", selector: "main" },
          { type: "element-exists", selector: "footer" }
        ]
      }
    },

    hints: [
      "页头使用 <header>。",
      "主体内容使用 <main>。",
      "页脚使用 <footer>。"
    ],

    summary: [
      "语义标签描述内容的作用。",
      "header / main / section / footer 让结构更清晰。",
      "清晰的语义结构也方便样式与后续交互。"
    ],

    nextLesson: "html-10"
  },

  {
    id: "html-10",
    module: "html",
    order: 10,
    title: "HTML 综合挑战",
    subtitle: "完成个人主页 V1",
    estimatedMinutes: 15,
    difficulty: 2,
    type: "lesson",

    objectives: [
      "综合运用标题、段落、列表、链接与图片",
      "独立完成个人主页 V1"
    ],

    intro: {
      title: "把所有知识组合起来",
      content: "这是 HTML 模块的阶段项目：用你学过的标签，做出一个结构完整的个人主页 V1。"
    },

    knowledge: [
      { type: "text", content: "个人主页 V1 需要包含：一个 h1 主标题、至少两个 h2 小节、至少两个 p 段落、一个 ul（至少三个 li）、一个链接、一张图片。" },
      { type: "text", content: "先搭结构，再填内容。标题标明区域，段落写正文，列表整理要点。" }
    ],

    starterCode: {
      html: "<h1>我的主页</h1>\n<h2>关于我</h2>\n<p>你好，我是一名大一学生。</p>",
      css: "",
      js: ""
    },

    tryTask: {
      description: "按照要求逐步补全，让个人主页 V1 通过检查。"
    },

    challenge: {
      title: "个人主页 V1",
      description: "综合运用标题、段落、列表、链接与图片，完成个人主页 V1。",
      validator: {
        type: "html",
        rules: [
          { type: "element-exists", selector: "h1" },
          { type: "element-count", selector: "h2", min: 2 },
          { type: "element-count", selector: "p", min: 2 },
          { type: "element-exists", selector: "ul" },
          { type: "element-count", selector: "li", min: 3 },
          { type: "element-exists", selector: "a" },
          { type: "element-exists", selector: "img" }
        ]
      }
    },

    hints: [
      "主标题用 h1，小节标题用 h2。",
      "列表用 <ul> 包裹 <li>。",
      '链接 <a href="...">，图片 <img src="..." alt="...">。'
    ],

    summary: [
      "HTML 用标签组织内容与结构。",
      "标题、段落、列表、链接、图片是常用标签。",
      "你已经完成个人主页 V1 的结构。"
    ],

    nextLesson: "html-11"
  },

  {
    id: "html-11",
    module: "html",
    order: 11,
    title: "表单",
    subtitle: "收集用户输入",
    estimatedMinutes: 9,
    difficulty: 2,
    type: "lesson",

    objectives: [
      "认识 form 表单容器",
      "用 label 与 input 收集输入",
      "了解常见的 input 类型"
    ],

    intro: {
      title: "网页怎样让用户输入内容？",
      content: "用表单。form 是容器，label 说明字段，input 负责输入。本节只讲表单怎么写，不涉及把数据发送给服务器。"
    },

    knowledge: [
      { type: "text", content: "<form> 是表单容器；<label> 说明这个字段是什么，<input> 用来收集输入。label 的 for 要等于对应 input 的 id，点标签也能聚焦到输入框。" },
      { type: "code", language: "html", code: '<form>\n  <label for="name">姓名</label>\n  <input id="name" type="text" placeholder="请输入姓名">\n\n  <label for="email">邮箱</label>\n  <input id="email" type="email" placeholder="name@example.com">\n\n  <button type="button">提交</button>\n</form>' },
      { type: "text", content: "常见的 input 类型：text（文本）、email（邮箱）、password（密码）、number（数字）、checkbox（复选）、radio（单选）。" },
      { type: "code", language: "html", code: '<input type="number" min="1" max="10">\n\n<input type="checkbox" id="agree">\n<label for="agree">我同意</label>' },
      { type: "text", content: "本课程不连接服务器，所以按钮用 type=\"button\"：点击时页面不会刷新，也不会提交数据。" }
    ],

    starterCode: {
      html: '<form>\n  <label for="name">姓名</label>\n  <input id="name" type="text" placeholder="请输入姓名">\n\n  <button type="button">提交</button>\n</form>',
      css: "form {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  max-width: 260px;\n}\n\ninput {\n  padding: 8px;\n  border: 1px solid #cdd6e3;\n  border-radius: 6px;\n}",
      js: ""
    },

    tryTask: {
      description: "再添加一个邮箱字段：一个 label 加一个 type=\"email\" 的 input。"
    },

    challenge: {
      title: "写一个表单",
      description: "页面里有一个 <form>，至少两个 label 和两个 input，并且 label 设置了 for。",
      validator: {
        type: "html",
        rules: [
          { type: "element-exists", selector: "form" },
          { type: "element-count", selector: "label", min: 2 },
          { type: "element-count", selector: "input", min: 2 },
          { type: "attribute", selector: "label", attribute: "for", required: true }
        ]
      }
    },

    hints: [
      "用 <form> 作为容器。",
      "每个字段配一个 <label> 和一个 <input>。",
      '<label for="email">邮箱</label>\n<input id="email" type="email">'
    ],

    summary: [
      "<form> 是表单容器，input 收集输入。",
      "label 的 for 与 input 的 id 关联。",
      "本课程不提交数据，按钮用 type=\"button\"。"
    ],

    nextLesson: "css-01"
  }
]);
