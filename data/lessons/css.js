// Module 2 lesson content: CSS (css-01 .. css-16), ending with Homepage V2.
window.WebLabData = window.WebLabData || {};
window.WebLabData.lessons = (window.WebLabData.lessons || []).concat([
  {
    id: "css-01",
    module: "css",
    order: 1,
    title: "CSS 是什么",
    subtitle: "让网页变好看的语言",
    estimatedMinutes: 6,
    difficulty: 1,
    type: "lesson",
    objectives: ["知道 CSS 的作用", "理解“选择谁 → 改什么 → 改成什么”", "认识结构与样式分离"],
    intro: { title: "同一个 HTML，为什么可以长得完全不同？", content: "HTML 负责内容，CSS 负责外观。同一段 HTML，配上不同的 CSS，就会呈现完全不同的样子。" },
    knowledge: [
      { type: "text", content: "CSS（层叠样式表）用来控制网页的外观：颜色、字体、背景、间距等。" },
      { type: "code", language: "css", code: "h1 {\n  color: #1677ff;\n}" },
      { type: "text", content: "一条 CSS 规则由选择和声明组成：选择 h1，把 color 改成 #1677ff。" }
    ],
    starterCode: { html: "<h1>我的主页</h1>\n<p>CSS 让网页更好看。</p>", css: "h1 {\n  color: #1677ff;\n}", js: "" },
    tryTask: { description: "把 CSS 里的颜色改成你喜欢的颜色，观察标题的变化。" },
    challenge: {
      title: "给标题加样式",
      description: "页面里有 <h1>，并且用 CSS 给 h1 设置了 color。",
      validator: { type: "html", rules: [
        { type: "element-exists", selector: "h1" },
        { type: "css-property", selector: "h1", property: "color", exists: true }
      ] }
    },
    hints: ["样式要写在 CSS 标签里。", "选择 h1，再设置 color。", "h1 {\n  color: #1677ff;\n}"],
    summary: ["CSS 负责网页外观。", "规则形如：选择谁 { 改什么: 改成什么; }。", "内容与样式分离，便于维护。"],
    nextLesson: "css-02"
  },

  {
    id: "css-02",
    module: "css",
    order: 2,
    title: "CSS 基本语法",
    subtitle: "选择谁 → 改什么 → 改成什么",
    estimatedMinutes: 7,
    difficulty: 1,
    type: "lesson",
    objectives: ["认识选择器", "认识属性与值", "会写一条完整的 CSS 规则"],
    intro: { title: "一条 CSS 规则由哪几部分组成？", content: "一条规则包含选择器和若干声明：选择器决定“选择谁”，声明里的属性和值决定“改什么、改成什么”。" },
    knowledge: [
      { type: "text", content: "选择器写在花括号前面，声明写在花括号里面，每条声明以分号结尾。" },
      { type: "code", language: "css", code: "p {\n  color: #333;\n  font-size: 16px;\n}" },
      { type: "text", content: "属性名和值之间用冒号分隔：属性名 : 值 ;" }
    ],
    starterCode: { html: "<h1>我的主页</h1>\n<p>这是正文段落。</p>", css: "p {\n  color: #333;\n}", js: "" },
    tryTask: { description: "给 p 再添加一条 font-size 声明。" },
    challenge: {
      title: "写两条声明",
      description: "页面里有 <p>，并且给 p 设置了 color 和 font-size。",
      validator: { type: "html", rules: [
        { type: "element-exists", selector: "p" },
        { type: "css-property", selector: "p", property: "color", exists: true },
        { type: "css-property", selector: "p", property: "font-size", exists: true }
      ] }
    },
    hints: ["选择器后面是花括号。", "每条声明写成 属性: 值;。", "p {\n  color: #333;\n  font-size: 16px;\n}"],
    summary: ["CSS 规则 = 选择器 + 声明块。", "声明由属性和值组成。", "每条声明以分号结尾。"],
    nextLesson: "css-03"
  },

  {
    id: "css-03",
    module: "css",
    order: 3,
    title: "行内 CSS",
    subtitle: "直接写在标签里的样式",
    estimatedMinutes: 6,
    difficulty: 1,
    type: "lesson",
    objectives: ["认识 style 属性", "给元素写行内样式", "了解行内 CSS 的优缺点"],
    intro: { title: "能不能把样式直接写在标签上？", content: "可以。使用 style 属性，就能把样式直接写在元素上，这叫行内 CSS。" },
    knowledge: [
      { type: "text", content: "行内 CSS 写在元素的 style 属性里，只影响当前这个元素。" },
      { type: "code", language: "html", code: '<h1 style="color: #1677ff;">我的主页</h1>' },
      { type: "text", content: "行内 CSS 写起来快，但会让 HTML 变得杂乱，所以通常只在特殊情况下使用。" }
    ],
    starterCode: { html: "<h1>我的主页</h1>\n<p>给标题加上行内样式。</p>", css: "", js: "" },
    tryTask: { description: "给 <h1> 添加 style，把颜色改成蓝色。" },
    challenge: {
      title: "写一个行内样式",
      description: "让 <h1> 拥有 style 属性。",
      validator: { type: "html", rules: [
        { type: "element-exists", selector: "h1" },
        { type: "attribute", selector: "h1", attribute: "style", required: true }
      ] }
    },
    hints: ["样式写在元素的 style 属性里。", "属性值用引号包起来。", '<h1 style="color: #1677ff;">我的主页</h1>'],
    summary: ["行内 CSS 使用 style 属性。", "它只影响当前元素。", "大量样式更适合写在 CSS 里。"],
    nextLesson: "css-04"
  },

  {
    id: "css-04",
    module: "css",
    order: 4,
    title: "内部 CSS",
    subtitle: "写在页面 head 里的样式",
    estimatedMinutes: 6,
    difficulty: 1,
    type: "lesson",
    objectives: ["认识 <style> 标签", "把样式集中写在页面里", "给多个元素统一设置样式"],
    intro: { title: "样式能不能集中写在一个地方？", content: "可以。把样式写在 <style> 标签里，就能集中管理整个页面的外观。" },
    knowledge: [
      { type: "text", content: "内部 CSS 写在 HTML 的 <style> 标签中（通常放在 head 里），对整页生效。" },
      { type: "code", language: "html", code: "<style>\n  h1 { color: #1677ff; }\n</style>" },
      { type: "text", content: "在本课程中，CSS 标签里的样式就相当于页面的内部样式。" }
    ],
    starterCode: { html: "<h1>我的主页</h1>\n<p>把样式写在 CSS 标签里。</p>", css: "h1 {\n  color: #1677ff;\n}", js: "" },
    tryTask: { description: "在 CSS 中给 h1 添加背景色。" },
    challenge: {
      title: "给标题加背景",
      description: "用 CSS 给 h1 设置 background-color。",
      validator: { type: "html", rules: [
        { type: "element-exists", selector: "h1" },
        { type: "css-property", selector: "h1", property: "background-color", exists: true }
      ] }
    },
    hints: ["背景色使用 background-color。", "在 h1 的声明里增加一条。", "h1 {\n  background-color: #e8f1ff;\n}"],
    summary: ["内部 CSS 写在 <style> 标签里。", "它对整个页面生效。", "集中写样式便于统一修改。"],
    nextLesson: "css-05"
  },

  {
    id: "css-05",
    module: "css",
    order: 5,
    title: "外部 CSS",
    subtitle: "把样式放进单独的 CSS 文件",
    estimatedMinutes: 7,
    difficulty: 2,
    type: "lesson",
    objectives: ["认识 link 标签", "引入外部样式表", "理解外部 CSS 的好处"],
    intro: { title: "多个页面可以共用一份样式吗？", content: "可以。把样式放进单独的 style.css 文件，再用 <link> 引入，多个页面就能共用同一套样式。" },
    knowledge: [
      { type: "text", content: "外部 CSS 通过 <link> 标签引入，href 指向 CSS 文件，rel 需要写成 stylesheet。" },
      { type: "code", language: "html", code: '<link rel="stylesheet" href="css/style.css">' },
      { type: "text", content: "外部 CSS 便于多页共用、集中维护，是实际项目最常用的方式。" }
    ],
    starterCode: { html: "<h1>我的主页</h1>\n<p>用 link 引入外部样式表。</p>", css: "", js: "" },
    tryTask: { description: "在 HTML 中加入一个 link，引入 css/style.css。" },
    challenge: {
      title: "引入外部样式表",
      description: "页面里有一个 <link>，并且 rel 是 stylesheet。",
      validator: { type: "html", rules: [
        { type: "element-exists", selector: "link" },
        { type: "attribute", selector: "link", attribute: "rel", expected: "stylesheet" }
      ] }
    },
    hints: ["使用 <link> 标签。", "rel 属性写 stylesheet。", '<link rel="stylesheet" href="css/style.css">'],
    summary: ["外部 CSS 放在单独的 .css 文件。", "用 <link rel=\"stylesheet\"> 引入。", "它便于多页共用与维护。"],
    nextLesson: "css-06"
  },

  {
    id: "css-06",
    module: "css",
    order: 6,
    title: "标签选择器",
    subtitle: "用标签名选中元素",
    estimatedMinutes: 5,
    difficulty: 1,
    type: "lesson",
    objectives: ["使用标签选择器", "为同类标签统一设置样式"],
    intro: { title: "怎样一次给所有段落设置样式？", content: "用标签名作为选择器，就能选中页面上所有该标签的元素。" },
    knowledge: [
      { type: "text", content: "标签选择器直接使用标签名，例如 h1、p、ul。" },
      { type: "code", language: "css", code: "h1 { color: #1677ff; }\np { color: #666; }" },
      { type: "text", content: "标签选择器会影响页面上所有同名标签。" }
    ],
    starterCode: { html: "<h1>我的主页</h1>\n<p>用标签选择器设置样式。</p>", css: "h1 {\n  color: #1677ff;\n}", js: "" },
    tryTask: { description: "用标签选择器给 p 设置颜色。" },
    challenge: {
      title: "设置段落颜色",
      description: "用标签选择器给 p 设置 color。",
      validator: { type: "html", rules: [
        { type: "css-property", selector: "p", property: "color", exists: true }
      ] }
    },
    hints: ["选择器直接写标签名。", "p 表示所有段落。", "p {\n  color: #666;\n}"],
    summary: ["标签选择器使用标签名。", "它选中所有同名元素。", "适合设置整类元素的默认样式。"],
    nextLesson: "css-07"
  },

  {
    id: "css-07",
    module: "css",
    order: 7,
    title: "class",
    subtitle: "给一组元素起名字",
    estimatedMinutes: 7,
    difficulty: 2,
    type: "lesson",
    objectives: ["认识 class 属性", "用 . 选择 class", "给多个元素应用同一 class"],
    intro: { title: "只想给某几个元素设置样式怎么办？", content: "给元素加上 class 名字，再用 .名字 作为选择器，就能精确选中这一组元素。" },
    knowledge: [
      { type: "text", content: "在 HTML 中用 class=\"名字\" 给元素命名，在 CSS 中用 .名字 选择它们。" },
      { type: "code", language: "html", code: '<p class="desc">这是一段简介。</p>' },
      { type: "code", language: "css", code: ".desc {\n  color: #666;\n}" },
      { type: "text", content: "同一个 class 可以用在多个元素上。" }
    ],
    starterCode: { html: '<h1>我的主页</h1>\n<p class="desc">这是简介。</p>', css: ".desc {\n  color: #666;\n}", js: "" },
    tryTask: { description: "修改 .desc 的颜色或字号。" },
    challenge: {
      title: "使用 class 选择器",
      description: "页面里有 class=\"desc\" 的元素，并且用 .desc 设置了 color。",
      validator: { type: "html", rules: [
        { type: "element-exists", selector: ".desc" },
        { type: "css-property", selector: ".desc", property: "color", exists: true }
      ] }
    },
    hints: ["HTML 里用 class=\"desc\"。", "CSS 里用 .desc 选中它。", ".desc {\n  color: #666;\n}"],
    summary: ["class 用来给元素分类命名。", "CSS 用 .名字 选择 class。", "class 可以复用在多个元素上。"],
    nextLesson: "css-08"
  },

  {
    id: "css-08",
    module: "css",
    order: 8,
    title: "id",
    subtitle: "页面上唯一的标识",
    estimatedMinutes: 6,
    difficulty: 2,
    type: "lesson",
    objectives: ["认识 id 属性", "用 # 选择 id", "理解 id 应保持唯一"],
    intro: { title: "如果只想选中唯一的一个元素？", content: "用 id。id 在页面中应当唯一，CSS 里用 #名字 来选择它。" },
    knowledge: [
      { type: "text", content: "在 HTML 中用 id=\"名字\" 标记元素，在 CSS 中用 #名字 选择它。" },
      { type: "code", language: "html", code: '<main id="main">...</main>' },
      { type: "code", language: "css", code: "#main {\n  background-color: #f5f7fa;\n}" },
      { type: "text", content: "一个页面里相同的 id 只应出现一次。" }
    ],
    starterCode: { html: '<main id="main">\n  <h1>我的主页</h1>\n</main>', css: "#main {\n  background-color: #f5f7fa;\n}", js: "" },
    tryTask: { description: "给 #main 增加一些内边距 padding。" },
    challenge: {
      title: "使用 id 选择器",
      description: "页面里有 id=\"main\" 的元素，并且用 #main 设置了 background-color。",
      validator: { type: "html", rules: [
        { type: "element-exists", selector: "#main" },
        { type: "css-property", selector: "#main", property: "background-color", exists: true }
      ] }
    },
    hints: ["HTML 里用 id=\"main\"。", "CSS 里用 #main 选中它。", "#main {\n  background-color: #f5f7fa;\n}"],
    summary: ["id 用来唯一标识一个元素。", "CSS 用 #名字 选择 id。", "同一页面里 id 应唯一。"],
    nextLesson: "css-09"
  },

  {
    id: "css-09",
    module: "css",
    order: 9,
    title: "color",
    subtitle: "设置文字颜色",
    estimatedMinutes: 5,
    difficulty: 1,
    type: "lesson",
    objectives: ["使用 color 设置文字颜色", "认识颜色名与十六进制写法"],
    intro: { title: "文字的颜色怎么改？", content: "使用 color 属性。颜色可以写颜色名（red），也可以用 # 开头的十六进制值。" },
    knowledge: [
      { type: "text", content: "color 属性控制文字颜色。" },
      { type: "code", language: "css", code: "h1 {\n  color: #1677ff;\n}" },
      { type: "text", content: "常见写法：red、#ff0000、#1677ff、rgb(22, 119, 255)。" }
    ],
    starterCode: { html: "<h1>我的主页</h1>\n<p>把标题改成红色系。</p>", css: "h1 {\n  color: #1677ff;\n}", js: "" },
    tryTask: { description: "把 h1 的颜色改成红色系（red / #ff0000 / #f00 之一）。" },
    challenge: {
      title: "把标题改成红色",
      description: "给 h1 设置一个红色系的 color。",
      validator: { type: "html", rules: [
        { type: "css-property", selector: "h1", property: "color", oneOf: ["red", "#ff0000", "#f00", "crimson", "tomato"] }
      ] }
    },
    hints: ["改的是 color 属性的值。", "红色可以写成 red。", "h1 {\n  color: red;\n}"],
    summary: ["color 设置文字颜色。", "颜色可以是颜色名或 # 十六进制。", "不同写法可以表示同一种颜色。"],
    nextLesson: "css-10"
  },

  {
    id: "css-10",
    module: "css",
    order: 10,
    title: "font-size / font-weight / text-align",
    subtitle: "字号、粗细与对齐",
    estimatedMinutes: 8,
    difficulty: 2,
    type: "lesson",
    objectives: ["设置字号", "设置字体粗细", "设置文字对齐方式"],
    intro: { title: "标题能变大、变粗、居中吗？", content: "可以。font-size 控制字号，font-weight 控制粗细，text-align 控制对齐。" },
    knowledge: [
      { type: "text", content: "font-size 设置字号（常用单位 px），font-weight 设置粗细（如 bold），text-align 设置对齐（left/center/right）。" },
      { type: "code", language: "css", code: "h1 {\n  font-size: 32px;\n  font-weight: bold;\n  text-align: center;\n}" }
    ],
    starterCode: { html: "<h1>我的主页</h1>\n<p>把标题调大并居中。</p>", css: "h1 {\n  font-size: 20px;\n}", js: "" },
    tryTask: { description: "把 h1 的字号调到 24px 以上，并让它居中。" },
    challenge: {
      title: "调大标题并居中",
      description: "给 h1 设置不小于 24px 的 font-size，并把 text-align 设为 center。",
      validator: { type: "html", rules: [
        { type: "css-property", selector: "h1", property: "font-size", minNumber: 24 },
        { type: "css-property", selector: "h1", property: "text-align", expected: "center" }
      ] }
    },
    hints: ["字号用 font-size，单位通常是 px。", "居中用 text-align: center。", "h1 {\n  font-size: 32px;\n  text-align: center;\n}"],
    summary: ["font-size 设置字号。", "font-weight 设置粗细。", "text-align 设置对齐方式。"],
    nextLesson: "css-11"
  },

  {
    id: "css-11",
    module: "css",
    order: 11,
    title: "background-color",
    subtitle: "给元素加背景色",
    estimatedMinutes: 5,
    difficulty: 1,
    type: "lesson",
    objectives: ["使用 background-color", "为页面或元素设置背景"],
    intro: { title: "怎样给页面换个底色？", content: "使用 background-color 属性，可以给 body 或任意元素设置背景颜色。" },
    knowledge: [
      { type: "text", content: "background-color 设置元素的背景颜色。" },
      { type: "code", language: "css", code: "body {\n  background-color: #f5f7fa;\n}" }
    ],
    starterCode: { html: "<h1>我的主页</h1>\n<p>给页面加一个背景色。</p>", css: "", js: "" },
    tryTask: { description: "给 body 设置一个浅色背景。" },
    challenge: {
      title: "给页面加背景",
      description: "给 body 设置 background-color。",
      validator: { type: "html", rules: [
        { type: "css-property", selector: "body", property: "background-color", exists: true }
      ] }
    },
    hints: ["背景色使用 background-color。", "选择 body 可以设置整页背景。", "body {\n  background-color: #f5f7fa;\n}"],
    summary: ["background-color 设置背景色。", "可以对 body 或任意元素设置。", "浅色背景让内容更易读。"],
    nextLesson: "css-12"
  },

  {
    id: "css-12",
    module: "css",
    order: 12,
    title: "border",
    subtitle: "给元素加边框",
    estimatedMinutes: 6,
    difficulty: 2,
    type: "lesson",
    objectives: ["认识 border", "设置边框宽度、样式与颜色"],
    intro: { title: "怎样让一块内容有边界感？", content: "使用 border 给元素加边框。border 通常一次写宽度、样式和颜色。" },
    knowledge: [
      { type: "text", content: "border 可以一次设置宽度、样式和颜色，例如 border: 1px solid #cdd6e3。" },
      { type: "code", language: "css", code: ".card {\n  border: 1px solid #cdd6e3;\n}" }
    ],
    starterCode: { html: '<div class="card">这是一张卡片</div>', css: ".card {\n  padding: 16px;\n}", js: "" },
    tryTask: { description: "给 .card 添加一个边框。" },
    challenge: {
      title: "给卡片加边框",
      description: "页面里有 .card，并且给它设置了 border。",
      validator: { type: "html", rules: [
        { type: "element-exists", selector: ".card" },
        { type: "css-property", selector: ".card", property: "border", exists: true }
      ] }
    },
    hints: ["使用 border 属性。", "一般写成 宽度 样式 颜色。", ".card {\n  border: 1px solid #cdd6e3;\n}"],
    summary: ["border 设置边框。", "一般包含宽度、样式和颜色。", "边框能增强卡片的边界感。"],
    nextLesson: "css-13"
  },

  {
    id: "css-13",
    module: "css",
    order: 13,
    title: "border-radius",
    subtitle: "做出圆角",
    estimatedMinutes: 5,
    difficulty: 1,
    type: "lesson",
    objectives: ["使用 border-radius", "为卡片或头像设置圆角"],
    intro: { title: "方方正正的边角能变圆吗？", content: "可以。用 border-radius 设置圆角半径，数值越大越圆。" },
    knowledge: [
      { type: "text", content: "border-radius 控制圆角大小，常用单位是 px。" },
      { type: "code", language: "css", code: ".card {\n  border-radius: 12px;\n}" },
      { type: "text", content: "把 border-radius 设得足够大，可以让正方形变成圆形。" }
    ],
    starterCode: { html: '<div class="card">这是一张卡片</div>', css: ".card {\n  padding: 16px;\n  border: 1px solid #cdd6e3;\n}", js: "" },
    tryTask: { description: "给 .card 添加圆角。" },
    challenge: {
      title: "给卡片加圆角",
      description: "给 .card 设置 border-radius。",
      validator: { type: "html", rules: [
        { type: "css-property", selector: ".card", property: "border-radius", exists: true }
      ] }
    },
    hints: ["圆角使用 border-radius。", "单位常用 px。", ".card {\n  border-radius: 12px;\n}"],
    summary: ["border-radius 设置圆角。", "数值越大越圆。", "头像常用大圆角做圆形效果。"],
    nextLesson: "css-14"
  },

  {
    id: "css-14",
    module: "css",
    order: 14,
    title: "margin / padding 初体验",
    subtitle: "元素内外的空间",
    estimatedMinutes: 8,
    difficulty: 2,
    type: "lesson",
    objectives: ["区分 margin 与 padding", "设置内边距", "设置外边距"],
    intro: { title: "内容和边框之间、元素与元素之间，怎么留出空间？", content: "padding 是内边距（边框到内容），margin 是外边距（元素与元素之间）。" },
    knowledge: [
      { type: "text", content: "padding 增加元素内部的空间，margin 增加元素外部的空间。" },
      { type: "code", language: "css", code: ".card {\n  padding: 16px;\n  margin: 12px;\n}" },
      { type: "text", content: "简单记法：padding 向内，margin 向外。" }
    ],
    starterCode: { html: '<div class="card">这是一张卡片</div>', css: ".card {\n  border: 1px solid #cdd6e3;\n  border-radius: 12px;\n}", js: "" },
    tryTask: { description: "给 .card 分别添加 padding 和 margin。" },
    challenge: {
      title: "给卡片留出空间",
      description: "给 .card 同时设置 padding 和 margin。",
      validator: { type: "html", rules: [
        { type: "css-property", selector: ".card", property: "padding", exists: true },
        { type: "css-property", selector: ".card", property: "margin", exists: true }
      ] }
    },
    hints: ["内边距用 padding。", "外边距用 margin。", ".card {\n  padding: 16px;\n  margin: 12px;\n}"],
    summary: ["padding 是内边距，margin 是外边距。", "它们都能让页面更有呼吸感。", "合理留白能提升可读性。"],
    nextLesson: "css-15"
  },

  {
    id: "css-15",
    module: "css",
    order: 15,
    title: "CSS Debug",
    subtitle: "找出并修复样式里的错误",
    estimatedMinutes: 8,
    difficulty: 2,
    type: "lesson",
    objectives: ["识别常见 CSS 错误", "修复缺少冒号、单位与分号的问题"],
    intro: { title: "样式没有生效，通常是哪里写错了？", content: "常见的 CSS 错误有：属性名和值之间缺少冒号、数值缺少单位、声明末尾缺少分号。" },
    knowledge: [
      { type: "text", content: "属性名和值之间必须用冒号分隔，否则这条声明会被忽略。" },
      { type: "text", content: "px 等单位不能省略；声明末尾不要忘记分号。" },
      { type: "code", language: "css", code: "/* 错误 */\nh1 {\n  color blue;\n  font-size: 30;\n}\n\n/* 正确 */\nh1 {\n  color: blue;\n  font-size: 30px;\n}" }
    ],
    starterCode: { html: "<h1>我的主页</h1>\n<p>修复 CSS 里的错误。</p>", css: "h1 {\n  color blue;\n  font-size: 30;\n}\n\np {\n  color: #666\n}", js: "" },
    tryTask: { description: "修复 CSS 里的错误，让标题变成蓝色、字号为 30px。" },
    challenge: {
      title: "修复样式错误",
      description: "让 h1 的 color 为 blue，font-size 为 30px。",
      validator: { type: "html", rules: [
        { type: "css-property", selector: "h1", property: "color", expected: "blue" },
        { type: "css-property", selector: "h1", property: "font-size", expected: "30px" }
      ] }
    },
    hints: ["检查属性名和值之间是否有冒号。", "font-size 的数值需要单位，例如 px。", "color: blue; 和 font-size: 30px;"],
    summary: ["冒号、单位、分号是常见错误点。", "写错时浏览器会忽略那条声明。", "逐条检查能让调试更快。"],
    nextLesson: "css-16"
  },

  {
    id: "css-16",
    module: "css",
    order: 16,
    title: "CSS 综合挑战",
    subtitle: "完成个人主页 V2",
    estimatedMinutes: 15,
    difficulty: 2,
    type: "lesson",
    objectives: ["综合运用颜色、背景、边框、圆角与间距", "使用 class 组织样式", "完成个人主页 V2"],
    intro: { title: "给个人主页 V1 穿上一身新衣服", content: "这是 CSS 模块的阶段项目：用你学过的样式，把个人主页升级成 V2。" },
    knowledge: [
      { type: "text", content: "个人主页 V2 需要：标题颜色、页面背景、卡片背景与边框、圆角、头像尺寸与圆角，以及至少一个 class。" },
      { type: "text", content: "先给整体定基调，再逐个元素调整颜色和间距。" }
    ],
    starterCode: {
      html: '<h1>我的主页</h1>\n<div class="card">\n  <img class="avatar" src="images/avatar.png" alt="我的头像">\n  <p>你好，我是一名大一学生。</p>\n</div>',
      css: "",
      js: ""
    },
    tryTask: { description: "逐步添加样式，让检查全部通过。" },
    challenge: {
      title: "个人主页 V2",
      description: "综合运用颜色、背景、边框、圆角与间距，完成个人主页 V2。",
      validator: { type: "html", rules: [
        { type: "element-exists", selector: "h1" },
        { type: "css-property", selector: "h1", property: "color", exists: true },
        { type: "css-property", selector: "body", property: "background-color", exists: true },
        { type: "element-exists", selector: ".card" },
        { type: "css-property", selector: ".card", property: "background-color", exists: true },
        { type: "css-property", selector: ".card", property: "border", exists: true },
        { type: "css-property", selector: ".card", property: "border-radius", exists: true },
        { type: "css-property", selector: ".avatar", property: "width", exists: true },
        { type: "css-property", selector: ".avatar", property: "border-radius", exists: true }
      ] }
    },
    hints: ["给 h1 设置 color，给 body 设置 background-color。", "用 .card 设置背景、边框和圆角。", "用 .avatar 设置 width 和 border-radius。"],
    summary: ["CSS 让 HTML 有了外观与风格。", "颜色、背景、边框、圆角、间距是常用样式。", "你已经完成个人主页 V2。"],
    nextLesson: "layout-01"
  }
]);
