# Web Lab Test Plan

## 1. Core

- [ ] 首页正常打开
- [ ] GitHub Pages 正常运行
- [ ] Hash Router 刷新不 404
- [ ] Lesson 可以切换
- [ ] HTML 可以运行
- [ ] CSS 可以运行
- [ ] JavaScript 可以运行
- [ ] HTML/CSS 实时预览有效
- [ ] JS 手动运行有效

## 2. Lesson

- [ ] Starter Code 正确加载
- [ ] Lesson 内容正确显示
- [ ] Previous / Next 正常
- [ ] 完成状态正确
- [ ] 刷新后仍保留当前 Lesson

## 3. Editor

- [ ] HTML Tab
- [ ] CSS Tab
- [ ] JS Tab
- [ ] Reset
- [ ] Copy
- [ ] Ctrl + S
- [ ] Ctrl + Enter
- [ ] Font Size
- [ ] Classroom Mode

## 4. Preview

- [ ] HTML 更新
- [ ] CSS 更新
- [ ] JS 执行
- [ ] Live Preview debounce
- [ ] Runtime Error 不导致主页面崩溃
- [ ] Desktop / Tablet / Mobile Preview

## 5. Validator

- [ ] 正确答案通过
- [ ] 错误答案不通过
- [ ] HTML 不依赖字符串匹配
- [ ] CSS 容忍空格差异
- [ ] CSS 容忍属性顺序差异
- [ ] DOM 事件可验证
- [ ] JS Console 可验证
- [ ] Chart 类型可验证
- [ ] 反馈信息具体

## 6. HTML Validator Cases

`<h1 class="title">Hello</h1>` 必须被 `h1` 检测识别。

多个 `li` 在 `min: 3` 时应正确通过或失败。

## 7. CSS Validator Cases

以下写法应视为等价：

```css
h1 { color: blue; }
```

```css
h1 {
  color: blue;
}
```

CSS 属性顺序不同不应导致失败。

## 8. Console

- [ ] console.log
- [ ] console.warn
- [ ] console.error
- [ ] SyntaxError
- [ ] ReferenceError
- [ ] TypeError
- [ ] 清空 Console

## 9. Sandbox Security

学生代码：

```js
parent.document.body.innerHTML = "";
```

不得影响主页面。

`window.open(...)` 不得正常弹出 popup，学生代码不得触发 top navigation。

## 10. Storage

- [ ] 完成 Lesson 后刷新仍然完成
- [ ] 编辑中的代码刷新后保留
- [ ] Reset 恢复 Starter Code
- [ ] Preferences 保存
- [ ] Final Project 保存
- [ ] Export JSON
- [ ] Import JSON
- [ ] 错误 JSON 不破坏已有数据
- [ ] Storage version 正确

## 11. Progress

- [ ] 模块进度正确
- [ ] 首页进度正确
- [ ] Continue Learning 指向正确
- [ ] 最近学习正确

## 12. Responsive

至少测试：
- 1920 × 1080
- 1366 × 768
- 768 × 1024
- 390 × 844

确认：
- 无严重横向溢出
- 代码区域可操作
- Preview 可访问
- 导航可使用

## 13. Classroom Mode

- [ ] 代码字号清晰
- [ ] 任务字号清晰
- [ ] Preview 足够大
- [ ] 非必要 UI 隐藏
- [ ] 可正常退出课堂模式

## 14. CSS Playground

- [ ] color picker
- [ ] font size
- [ ] background
- [ ] border
- [ ] radius
- [ ] margin
- [ ] padding
- [ ] 控件同步代码
- [ ] 代码同步 Preview

## 15. Box Model Lab

- [ ] width slider
- [ ] padding slider
- [ ] border slider
- [ ] margin slider
- [ ] 图示同步
- [ ] CSS 同步

## 16. Flex Playground

- [ ] flex-direction
- [ ] justify-content
- [ ] align-items
- [ ] 实时预览
- [ ] 代码同步

## 17. DOM

- [ ] DOM Tree
- [ ] Selector highlight
- [ ] textContent
- [ ] style
- [ ] click
- [ ] show/hide
- [ ] toggle class

## 18. Chart

- [ ] Chart.js 本地加载
- [ ] Bar
- [ ] Line
- [ ] Pie
- [ ] Labels
- [ ] Title
- [ ] 类型切换
- [ ] 误导图表示例

## 19. Final Project

- [ ] 项目可编辑
- [ ] 自动检查
- [ ] 至少一个 h1
- [ ] section 检查
- [ ] CSS 检查
- [ ] Flex 检查
- [ ] JS event 检查
- [ ] Chart 检查
- [ ] Presentation Mode
- [ ] 文件下载

## 20. Accessibility

- [ ] 关键按钮有文字或 aria-label
- [ ] 成功/失败不只依赖颜色
- [ ] 图片支持 alt
- [ ] 键盘基本可操作
- [ ] 代码字号不少于 14px

## 21. Performance

目标：
- 首页首次加载 ≤ 2 秒
- Lesson 切换 ≤ 200ms
- HTML/CSS 预览 ≤ 300ms
- 无大型前端框架

## 22. Release Gate

发布前必须满足：
- [ ] 无严重 Console Error
- [ ] GitHub Pages 可用
- [ ] 核心 Lesson 可完成
- [ ] Validator 可用
- [ ] Storage 可用
- [ ] Sandbox 生效
- [ ] 桌面端可用
- [ ] 移动端可用
