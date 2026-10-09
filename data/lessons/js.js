// Module 4 lesson content: JavaScript basics (js-01 .. js-10).
// These lessons only cover what later DOM interaction needs (PRD.md / CONTENT_SPEC.md).
window.WebLabData = window.WebLabData || {};
window.WebLabData.lessons = (window.WebLabData.lessons || []).concat([
  {
    id: "js-01",
    module: "js",
    order: 1,
    title: "JavaScript 是什么",
    subtitle: "让网页动起来",
    estimatedMinutes: 7,
    difficulty: 1,
    type: "lesson",
    objectives: ["知道 JavaScript 的作用", "会写 console.log", "运行后看到输出"],
    intro: { title: "网页为什么能响应点击、弹出内容？", content: "这都靠 JavaScript。JS 负责网页的行为与交互，比如响应点击、修改内容、计算数据。" },
    knowledge: [
      { type: "text", content: "JavaScript 负责行为与交互，和 HTML（结构）、CSS（样式）一起构成网页。" },
      { type: "code", language: "js", code: 'console.log("Hello");' },
      { type: "text", content: "console.log 会把内容输出到 Console（控制台），方便我们查看结果。" }
    ],
    starterCode: { html: "<h1>JavaScript</h1>", css: "", js: 'console.log("Hello");' },
    tryTask: { description: "修改 console.log 里的文字，点击「运行」查看 Console 面板的输出。" },
    challenge: {
      title: "输出 Hello",
      description: "让 Console 输出「Hello」。",
      validator: { type: "js", rules: [{ type: "console-output", expected: "Hello" }] }
    },
    hints: ["使用 console.log。", "把文字用引号包起来。", 'console.log("Hello");'],
    summary: ["JavaScript 负责网页的行为。", "console.log 输出到 Console。", "JS 课程默认手动运行。"],
    nextLesson: "js-02"
  },

  {
    id: "js-02",
    module: "js",
    order: 2,
    title: "Console",
    subtitle: "在控制台查看输出",
    estimatedMinutes: 6,
    difficulty: 1,
    type: "lesson",
    objectives: ["认识 Console 面板", "使用 console.log 输出", "清空 Console"],
    intro: { title: "运行代码后，结果在哪里看？", content: "在 Console 面板里。console.log 输出的内容会显示在那里，出错信息也会出现。" },
    knowledge: [
      { type: "text", content: "Console 用来查看程序的输出与错误，是调试代码最重要的工具。" },
      { type: "code", language: "js", code: 'console.log("Web Lab");' },
      { type: "text", content: "运行后点击 Console 的「清空」可以清除历史输出。" }
    ],
    starterCode: { html: "", css: "", js: 'console.log("Web Lab");' },
    tryTask: { description: "输出你自己的文字。" },
    challenge: {
      title: "输出 Web Lab",
      description: "让 Console 输出「Web Lab」。",
      validator: { type: "js", rules: [{ type: "console-output", expected: "Web Lab" }] }
    },
    hints: ["使用 console.log。", "把文字放进引号里。", 'console.log("Web Lab");'],
    summary: ["Console 显示输出与错误。", "console.log 是最常用的输出方式。", "善用 Console 可以帮助调试。"],
    nextLesson: "js-03"
  },

  {
    id: "js-03",
    module: "js",
    order: 3,
    title: "Variable",
    subtitle: "用变量保存数据",
    estimatedMinutes: 7,
    difficulty: 1,
    type: "lesson",
    objectives: ["认识 let 与 const", "创建变量并赋值", "输出变量的值"],
    intro: { title: "怎样把数据先存起来，之后再使用？", content: "用变量。let 和 const 都可以声明变量，把数据保存下来，后面随时使用。" },
    knowledge: [
      { type: "text", content: "let 声明可以改变的变量，const 声明之后不再改变的值。" },
      { type: "code", language: "js", code: 'let name = "小明";\nconsole.log(name);' },
      { type: "text", content: "变量名要能说明用途，例如 name、score、count。" }
    ],
    starterCode: { html: "", css: "", js: 'let name = "小明";\nconsole.log(name);' },
    tryTask: { description: "把 name 改成你的名字，运行后查看输出。" },
    challenge: {
      title: "输出变量",
      description: "创建一个变量并存一个名字，然后输出它（包含「小明」）。",
      validator: { type: "js", rules: [{ type: "console-output", expected: "小明" }] }
    },
    hints: ["用 let 或 const 声明变量。", "用 = 给变量赋值。", 'let name = "小明";\nconsole.log(name);'],
    summary: ["变量用来保存数据。", "let 可改变，const 不可改变。", "输出变量不需要加引号。"],
    nextLesson: "js-04"
  },

  {
    id: "js-04",
    module: "js",
    order: 4,
    title: "String",
    subtitle: "字符串与拼接",
    estimatedMinutes: 7,
    difficulty: 1,
    type: "lesson",
    objectives: ["认识字符串", "使用 + 拼接字符串", "输出拼接结果"],
    intro: { title: "怎样把几段文字拼在一起？", content: "字符串就是一段文字，用引号包起来。用 + 可以把多个字符串拼接起来。" },
    knowledge: [
      { type: "text", content: "字符串用单引号或双引号包起来，例如 \"Hello\"。" },
      { type: "code", language: "js", code: 'let a = "Hello";\nlet b = "Web";\nconsole.log(a + ", " + b + "!");' },
      { type: "text", content: "用 + 拼接字符串时，注意空格和标点也要写进去。" }
    ],
    starterCode: { html: "", css: "", js: 'let a = "Hello";\nlet b = "Web";\nconsole.log(a + ", " + b + "!");' },
    tryTask: { description: "拼接一句你自己的问候语。" },
    challenge: {
      title: "拼接问候语",
      description: "输出「Hello, Web!」。",
      validator: { type: "js", rules: [{ type: "console-output", expected: "Hello, Web!" }] }
    },
    hints: ["字符串要加引号。", "用 + 拼接。", 'console.log("Hello" + ", " + "Web" + "!");'],
    summary: ["字符串是一段文字。", "用 + 可以拼接字符串。", "空格与标点要手动写出来。"],
    nextLesson: "js-05"
  },

  {
    id: "js-05",
    module: "js",
    order: 5,
    title: "Number",
    subtitle: "数字与运算",
    estimatedMinutes: 6,
    difficulty: 1,
    type: "lesson",
    objectives: ["认识数字类型", "使用 + - * / 运算", "输出计算结果"],
    intro: { title: "怎样在程序里做计算？", content: "数字可以直接参与运算：加法 +、减法 -、乘法 *、除法 /。" },
    knowledge: [
      { type: "text", content: "数字不需要引号，可以直接进行数学运算。" },
      { type: "code", language: "js", code: "let a = 3;\nlet b = 4;\nconsole.log(a + b);" },
      { type: "text", content: "输出的是计算结果，而不是算式本身。" }
    ],
    starterCode: { html: "", css: "", js: "let a = 3;\nlet b = 4;\nconsole.log(a + b);" },
    tryTask: { description: "把 a 和 b 改成别的数字，观察结果。" },
    challenge: {
      title: "计算 3 + 4",
      description: "让 Console 输出 3 + 4 的结果（7）。",
      validator: { type: "js", rules: [{ type: "console-output", expected: "7" }] }
    },
    hints: ["数字不用加引号。", "加法使用 +。", "console.log(3 + 4);"],
    summary: ["数字直接参与运算。", "常用运算符：+ - * /。", "输出的是计算结果。"],
    nextLesson: "js-06"
  },

  {
    id: "js-06",
    module: "js",
    order: 6,
    title: "Boolean",
    subtitle: "真与假",
    estimatedMinutes: 6,
    difficulty: 1,
    type: "lesson",
    objectives: ["认识布尔值", "理解 true 与 false", "用比较得到布尔值"],
    intro: { title: "程序怎样判断“是”与“不是”？", content: "布尔值只有两个：true（真）和 false（假）。比较运算会得到布尔值。" },
    knowledge: [
      { type: "text", content: "布尔值只有 true 和 false 两种，常用于条件判断。" },
      { type: "code", language: "js", code: "let isStudent = true;\nconsole.log(isStudent);" },
      { type: "text", content: "比较运算（如 5 > 3）也会得到布尔值。" }
    ],
    starterCode: { html: "", css: "", js: "let isStudent = true;\nconsole.log(isStudent);" },
    tryTask: { description: "输出 5 > 3 的结果。" },
    challenge: {
      title: "输出一个布尔值",
      description: "让 Console 输出 true。",
      validator: { type: "js", rules: [{ type: "console-output", expected: "true" }] }
    },
    hints: ["布尔值写成 true 或 false，不加引号。", "比较运算会得到布尔值。", "console.log(true);"],
    summary: ["布尔值只有 true 和 false。", "比较运算得到布尔值。", "布尔值常用于判断。"],
    nextLesson: "js-07"
  },

  {
    id: "js-07",
    module: "js",
    order: 7,
    title: "if",
    subtitle: "条件判断",
    estimatedMinutes: 8,
    difficulty: 2,
    type: "lesson",
    objectives: ["认识 if / else", "根据条件执行不同代码", "理解比较运算符"],
    intro: { title: "程序怎样根据情况做出不同反应？", content: "用 if / else。条件成立时执行 if 里的代码，否则执行 else 里的代码。" },
    knowledge: [
      { type: "text", content: "if (条件) { ... } else { ... } 根据条件走不同分支。" },
      { type: "code", language: "js", code: 'let score = 75;\n\nif (score >= 60) {\n  console.log("及格");\n} else {\n  console.log("不及格");\n}' },
      { type: "demo", demo: "condition" }
    ],
    starterCode: { html: "", css: "", js: 'let score = 75;\n\nif (score >= 60) {\n  console.log("及格");\n} else {\n  console.log("不及格");\n}' },
    tryTask: { description: "拖动上面的滑块，观察判断结果的变化。" },
    challenge: {
      title: "判断是否及格",
      description: "当分数不低于 60 时，输出「及格」。",
      validator: { type: "js", rules: [{ type: "console-output", expected: "及格" }] }
    },
    hints: ["使用 if 和 else。", "条件写成 score >= 60。", 'if (score >= 60) {\n  console.log("及格");\n}'],
    summary: ["if / else 用于条件判断。", "条件成立走 if，否则走 else。", "比较运算符有 >=、<=、=== 等。"],
    nextLesson: "js-08"
  },

  {
    id: "js-08",
    module: "js",
    order: 8,
    title: "for",
    subtitle: "循环",
    estimatedMinutes: 8,
    difficulty: 2,
    type: "lesson",
    objectives: ["认识 for 循环", "让代码重复执行", "在循环中累加"],
    intro: { title: "怎样让一段代码重复执行很多次？", content: "用 for 循环。它可以让代码按指定的次数重复运行。" },
    knowledge: [
      { type: "text", content: "for (let i = 1; i <= n; i++) { ... } 会让 i 从 1 变化到 n。" },
      { type: "code", language: "js", code: "let sum = 0;\n\nfor (let i = 1; i <= 3; i++) {\n  sum = sum + i;\n}\nconsole.log(sum);" },
      { type: "demo", demo: "loop" }
    ],
    starterCode: { html: "", css: "", js: "let sum = 0;\n\nfor (let i = 1; i <= 3; i++) {\n  sum = sum + i;\n}\nconsole.log(sum);" },
    tryTask: { description: "点击「下一步」，一步一步看循环的执行过程。" },
    challenge: {
      title: "计算 1 到 3 的和",
      description: "用循环计算 1 + 2 + 3，并输出结果（6）。",
      validator: { type: "js", rules: [{ type: "console-output", expected: "6" }] }
    },
    hints: ["使用 for 循环。", "用 sum = sum + i 累加。", "循环结束后 console.log(sum);"],
    summary: ["for 循环让代码重复执行。", "i 是循环变量。", "累加可以求总和。"],
    nextLesson: "js-09"
  },

  {
    id: "js-09",
    module: "js",
    order: 9,
    title: "Function",
    subtitle: "把代码打包成函数",
    estimatedMinutes: 8,
    difficulty: 2,
    type: "lesson",
    objectives: ["定义函数", "调用函数", "使用 return 返回结果"],
    intro: { title: "有一段代码要反复使用，怎么办？", content: "把它写成一个函数。定义一次，之后可以随时调用。" },
    knowledge: [
      { type: "text", content: "用 function 名字(参数) { ... } 定义函数，用 return 返回结果。" },
      { type: "code", language: "js", code: "function add(a, b) {\n  return a + b;\n}\n\nconsole.log(add(2, 3));" },
      { type: "demo", demo: "func" }
    ],
    starterCode: { html: "", css: "", js: "function add(a, b) {\n  return a + b;\n}\n\nconsole.log(add(2, 3));" },
    tryTask: { description: "调用上面的 greet 函数，改成你自己的名字。" },
    challenge: {
      title: "用函数计算",
      description: "定义函数并输出 add(2, 3) 的结果（5）。",
      validator: { type: "js", rules: [{ type: "console-output", expected: "5" }] }
    },
    hints: ["用 function 定义函数。", "用 return 返回结果。", "function add(a, b) { return a + b; }\nconsole.log(add(2, 3));"],
    summary: ["函数把一段代码打包起来。", "参数是函数的输入。", "return 返回结果。"],
    nextLesson: "js-10"
  },

  {
    id: "js-10",
    module: "js",
    order: 10,
    title: "综合挑战",
    subtitle: "把知识组合起来",
    estimatedMinutes: 15,
    difficulty: 3,
    type: "lesson",
    objectives: ["综合运用变量、条件、循环与函数", "完成 JavaScript 综合挑战"],
    intro: { title: "把学过的 JS 知识串起来", content: "这是 JavaScript 模块的阶段项目：用变量、条件、循环和函数，完成一个综合小程序。" },
    knowledge: [
      { type: "text", content: "任务要求程序依次输出三行：判断结果「及格」、循环求和「6」、函数调用结果「5」。" },
      { type: "text", content: "可以分三段写：先判断，再循环，最后定义并调用函数。" }
    ],
    starterCode: { html: "", css: "", js: 'console.log("开始");' },
    tryTask: { description: "按三个要求逐步输出，让检查全部通过。" },
    challenge: {
      title: "JavaScript 综合挑战",
      description: "输出「及格」、循环计算 1 到 3 的和（6）、以及 add(2, 3) 的结果（5）。",
      validator: { type: "js", rules: [
        { type: "console-output", expected: "及格" },
        { type: "console-output", expected: "6" },
        { type: "console-output", expected: "5" }
      ] }
    },
    hints: ["先用 if 输出「及格」。", "用 for 循环累加 1 到 3，再输出。", "定义 add(a, b) 并输出 add(2, 3)。"],
    summary: ["变量保存数据，条件做判断。", "循环重复执行，函数打包逻辑。", "你已经能写出一个完整的 JS 小程序。"],
    nextLesson: "dom-01"
  }
]);
