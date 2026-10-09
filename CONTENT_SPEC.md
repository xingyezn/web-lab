# Web Lab Content Specification

## 1. 核心教学原则

Web Lab 的核心不是代码编辑器，而是课程。

所有 Lesson 统一遵循：**Learn → Try → Debug → Create**。

每个知识点必须尽快进入操作，禁止连续堆叠大段理论。

## 2. Lesson 固定结构

每个 Lesson 建议包括：
1. Hook
2. Objectives
3. Knowledge
4. Example
5. Try
6. Challenge
7. Hints
8. Feedback
9. Summary
10. Next

## 3. 内容篇幅

- 单个 Lesson 知识说明以 100–300 字为主
- 单个 Lesson 尽量只介绍 1–2 个核心概念
- 每出现一个新概念，都应尽快安排操作
- 示例代码必须短、可运行、可修改

## 4. MODULE 0：Web Foundations

### web-01 Web 是什么
理解网页、网站、浏览器基本概念。

### web-02 浏览器与服务器
理解 Request / Response 和浏览器获取网页资源。

### web-03 HTML / CSS / JS
HTML：内容与结构；CSS：外观与样式；JS：行为与交互。

### web-04 项目目录
理解 `index.html`、`css/`、`js/`、`images/`。

### web-05 VS Code
Explorer、Editor、Search、Extensions、Terminal、Emmet、Format、Live Server。

阶段成果：Hello Web。

## 5. MODULE 1：HTML

### html-01 Hello HTML
第一个标签 `<h1>`。

### html-02 HTML 基本结构
DOCTYPE、html、head、body、title、meta charset。

### html-03 标题
h1、h2、h3。

### html-04 段落
p。

### html-05 列表
ul、li。

### html-06 超链接
a、href。

### html-07 图片
img、src、alt。

### html-08 文件路径
相对路径与文件夹结构挑战。

### html-09 语义结构
header、main、section、footer。

### html-10 HTML 综合挑战

阶段项目：个人主页 V1。

要求：
- 一个 h1
- 至少两个 h2
- 至少两个 p
- 一个 ul
- 至少三个 li
- 一个链接
- 一张图片

## 6. MODULE 2：CSS

### css-01 CSS 是什么
### css-02 CSS 基本语法
核心表达：选择谁 → 改什么 → 改成什么。
### css-03 行内 CSS
### css-04 内部 CSS
### css-05 外部 CSS
### css-06 标签选择器
### css-07 class
### css-08 id
### css-09 color
### css-10 font-size / font-weight / text-align
### css-11 background-color
### css-12 border
### css-13 border-radius
### css-14 margin / padding 初体验
### css-15 CSS Debug

阶段项目：个人主页 V2。

要求：外部 CSS、背景、标题颜色、正文样式、头像尺寸、圆角、至少一个 class、至少一个边框或卡片效果。

## 7. MODULE 3：Layout

### layout-01 盒模型
### layout-02 width / height
### layout-03 margin
### layout-04 padding
### layout-05 display
### layout-06 Flex
### layout-07 flex-direction
### layout-08 justify-content
### layout-09 align-items
### layout-10 Navigation
### layout-11 Card
### layout-12 Responsive

阶段项目：个人主页 V3。

推荐结构：header、nav、main、cards、footer。

## 8. MODULE 4：JavaScript

本模块只教授后续 DOM 交互需要的基础，不扩展为完整算法课程。

### js-01 JavaScript 是什么
### js-02 Console
### js-03 Variable
### js-04 String
### js-05 Number
### js-06 Boolean
### js-07 if
### js-08 for
### js-09 Function
### js-10 综合挑战

建议掌握：const、let、基本运算、条件判断、简单循环、函数调用。

## 9. MODULE 5：DOM

### dom-01 DOM 是什么
### dom-02 DOM Tree
### dom-03 querySelector
### dom-04 textContent
### dom-05 style
### dom-06 Event
### dom-07 Click
### dom-08 Show / Hide
### dom-09 Toggle Class
### dom-10 综合挑战

阶段项目：个人主页 V4。

至少实现一个按钮、一个点击事件、一处文字变化或内容显示隐藏。

## 10. MODULE 6：Visualization

### chart-01 数据与网页
### chart-02 Chart.js
### chart-03 Bar
### chart-04 Line
### chart-05 Pie
### chart-06 Labels
### chart-07 Title
### chart-08 图表选择
### chart-09 误导性图表
### chart-10 综合挑战

阶段项目：Data Dashboard。

要求：至少一个图表、标题、标签、数据说明，并保证图表与问题匹配。

## 11. MODULE 7：Data Story

### project-01 什么是数据故事
### project-02 研究问题
### project-03 数据来源
### project-04 数据概览
### project-05 图表
### project-06 数据发现
### project-07 结论
### project-08 页面组织
### project-09 页面优化

阶段项目：Data Story V1。

推荐结构：项目名称、研究问题、数据来源、数据概览、数据分析、图表、主要发现、结论、反思。

## 12. MODULE 8：Final Project

### final-01 Project Check
### final-02 Debug
### final-03 Responsive
### final-04 Content Review
### final-05 Presentation
### final-06 GitHub Pages

最终项目：完整数据项目网站。

## 13. Debug 内容规范

每个 Debug Lesson：
- 一个明确目标
- 1–3 个错误
- 错误不依赖高级知识
- 修复后页面应有明显变化

示例错误：

```css
h1 {
  color blue;
  font-size: 30;
}
```

修复目标：

```css
h1 {
  color: blue;
  font-size: 30px;
}
```

## 14. Hint 规范

Hint 1：指出方向。  
Hint 2：指出知识点。  
Hint 3：给代码结构。

避免第一次直接给完整答案。

## 15. Feedback 规范

不推荐：“错误”。

推荐：“当前页面中只有 2 个 `<li>`，任务要求至少 3 个。再增加一个列表项试试看。”

## 16. 项目演进

Hello World → 个人主页 V1 → V2 → V3 → V4 → Data Dashboard → Data Story → Final Project。
