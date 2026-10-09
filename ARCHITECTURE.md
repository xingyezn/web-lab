# Web Lab Technical Architecture

## 1. 架构原则

Web Lab 是纯前端 Single Page Application。

必须满足：
- 无后端
- 无数据库
- 无用户登录
- 支持 GitHub Pages
- 核心功能不依赖远程 API
- 学生代码与主页面隔离
- 学习内容数据化
- 各模块低耦合
- 允许直接打开或通过 Live Server 运行

## 2. 总体架构

User → Hash Router → Page Controller → Lesson Engine → Editor / Preview / Challenge → Storage / Progress

## 3. 页面层

建议：HomePage、CoursePage、LessonPage、PlaygroundPage、ChallengePage、DebugPage、ProjectPage、VersionsPage、ReferencePage。

## 4. Hash Router

推荐：
- `/#/`
- `/#/course`
- `/#/lesson/html-01`
- `/#/lesson/css-01`
- `/#/lesson/layout-01`
- `/#/lesson/js-01`
- `/#/lesson/dom-01`
- `/#/lesson/chart-01`
- `/#/playground`
- `/#/debug`
- `/#/challenge`
- `/#/project`
- `/#/versions`
- `/#/reference`

不要使用依赖服务器 fallback 的 History Router。

## 5. Lesson Engine

职责：
1. 读取 Lesson 数据
2. 渲染知识内容
3. 初始化 Starter Code
4. 加载 Editor
5. 运行 Preview
6. 执行 Challenge Validator
7. 保存代码
8. 更新 Progress
9. 切换 Lesson

不得把每个 Lesson 写成独立 HTML 文件。

## 6. Editor

推荐接口：

```js
Editor.setHTML(code)
Editor.setCSS(code)
Editor.setJS(code)
Editor.getHTML()
Editor.getCSS()
Editor.getJS()
Editor.reset()
Editor.focus(type)
```

V1 首选 `<textarea>`，避免初期引入复杂依赖。

## 7. Preview

使用 `iframe.srcdoc`。

基础模板：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>${css}</style>
</head>
<body>
${html}
<script>${js}</script>
</body>
</html>
```

HTML/CSS Lesson 默认实时预览，debounce 200–300ms。JavaScript Lesson 默认手动运行。

## 8. iframe Sandbox

默认：

```html
sandbox="allow-scripts"
```

禁止：allow-top-navigation、allow-popups、非必要的 allow-same-origin。

## 9. iframe 通信

使用 `window.postMessage()` 返回 Console、Runtime Error、DOM State、Chart State，并验证消息来源。

## 10. Console

通过注入代理脚本捕获：
- console.log
- console.warn
- console.error
- window.onerror
- unhandledrejection

## 11. Storage

所有 LocalStorage 访问必须通过统一模块。

```js
Storage.getState()
Storage.saveState(state)
Storage.getLesson(id)
Storage.saveLesson(id, data)
Storage.getProgress()
Storage.saveProgress(progress)
Storage.exportData()
Storage.importData(json)
Storage.reset()
```

## 12. State

```js
{
  version: 1,
  currentLesson: "html-01",
  progress: {},
  lessons: {},
  project: {},
  achievements: {},
  preferences: {
    classroomMode: false,
    livePreview: true,
    editorFontSize: 16
  }
}
```

## 13. Validator

目录：

```text
src/validation/
  html-validator.js
  css-validator.js
  js-validator.js
  dom-validator.js
  chart-validator.js
```

统一接口：`validate(challenge, context)`。

统一返回：

```js
{
  success: false,
  score: 2,
  total: 3,
  feedback: [
    { success: true, message: "已找到 h1" },
    { success: false, message: "还需要至少 3 个 li" }
  ]
}
```

## 14. HTML Validator

使用 `DOMParser`，禁止简单 `code.includes()`。

## 15. CSS Validator

检查 selector / property / value，并容忍空格、换行、声明顺序差异。

## 16. JavaScript / DOM Validator

执行必须发生在 sandbox iframe 中。DOM 状态通过 iframe 内部验证脚本执行，再经 `postMessage` 返回。

## 17. Chart Validator

支持：Chart 是否创建、chart type、labels、datasets 基础检查。

Chart.js 建议本地化到仓库中，不依赖 CDN。

## 18. 项目目录建议

```text
web-lab/
├── index.html
├── README.md
├── PRD.md
├── ARCHITECTURE.md
├── CONTENT_SPEC.md
├── DATA_SCHEMA.md
├── AGENTS.md
├── TASKS.md
├── TEST_PLAN.md
├── DEVELOPMENT_PLAN.md
├── assets/
│   ├── css/
│   ├── js/
│   ├── icons/
│   └── images/
├── src/
│   ├── app.js
│   ├── router.js
│   ├── pages/
│   ├── editor/
│   ├── preview/
│   ├── validation/
│   ├── storage/
│   └── progress/
├── data/
└── examples/
```

## 19. 职责边界

- router.js：路由
- editor.js：编辑器状态
- preview.js：代码运行
- console.js：输出捕获
- storage.js：本地数据
- progress.js：学习进度
- Validators：任务判断
- Lesson Data：课程内容

禁止超大 `app.js`。

## 20. 性能

目标：
- 首页首次加载 ≤ 2 秒
- Lesson 切换 ≤ 200ms
- HTML/CSS Preview ≤ 300ms
- 不加载大型框架

## 21. 浏览器

重点支持 Chrome、Edge，兼容 Firefox、Safari，不支持 IE。
