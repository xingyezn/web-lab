# Web Lab 产品需求文档

Version: 1.0  
Status: Development  
Target: GitHub Pages  
Primary Users: 大学一年级、无 Web 开发基础学生

## 1. 产品定位

Web Lab 是一个纯前端的 Web 程序设计交互式学习平台，服务于大学一年级《Web程序设计》课程。平台不以“阅读知识点”为主，而是通过 **Learn → Try → Debug → Create** 的学习循环，让学生在浏览器中直接编写、修改、运行并调试代码。

最终目标是帮助学生完成从第一个 HTML 页面，到 CSS 样式、页面布局、JavaScript、DOM 交互、Chart.js 数据可视化，再到完整数据项目网页的学习路径。

## 2. 核心学习路径

Web 基础 → HTML → CSS → 页面布局与响应式 → JavaScript → DOM → Chart.js → Data Story → Final Project

## 3. 产品原则

1. 操作优先于阅读。
2. 每个知识点都必须能够立即运行或交互。
3. 允许学生犯错，并提供可理解的错误反馈。
4. 内容从简单到复杂逐步演进。
5. 每一讲都应该形成阶段成果。
6. 学生持续升级同一个作品，而不是完成互不相关的小练习。
7. 平台本身保持简单、透明、可维护，适合教学使用。

## 4. 产品范围

### Module 0：Web 与开发环境
- Web 基本运行机制
- Browser / Server / HTML / CSS / JS 的关系
- VS Code 基本界面
- 项目目录
- 第一个网页

阶段成果：Hello Web

### Module 1：HTML
- HTML 基本结构
- 标题、段落、列表、链接、图片
- 文件路径
- 语义结构

阶段成果：个人主页 V1

### Module 2：CSS
- CSS 基本语法
- 行内、内部、外部 CSS
- 标签、class、id 选择器
- 颜色、字体、背景、边框、圆角
- margin / padding 初体验

阶段成果：个人主页 V2

### Module 3：页面布局与响应式设计
- 盒模型
- width / height
- margin / padding
- display
- Flex
- flex-direction
- justify-content
- align-items
- 导航栏、卡片
- Desktop / Tablet / Mobile 预览

阶段成果：个人主页 V3

### Module 4：JavaScript
- Console
- 变量、字符串、数字、布尔值
- 条件判断
- 循环
- 函数

阶段成果：完成基础 JavaScript 挑战

### Module 5：DOM 与网页交互
- DOM 与 DOM Tree
- querySelector
- textContent
- style
- event / click
- show / hide
- toggle class

阶段成果：个人主页 V4

### Module 6：Web 数据可视化
- Chart.js
- 柱状图、折线图、饼图
- labels、title
- 图表选择
- 误导性图表

阶段成果：Data Dashboard

### Module 7：数据项目网页
- 数据故事
- 研究问题
- 数据来源
- 数据概览
- 数据分析
- 图表
- 主要发现
- 结论
- 页面组织与优化

阶段成果：Data Story V1

### Module 8：Final Project
- 项目检查
- 调试
- 响应式检查
- 内容检查
- Presentation Mode
- 下载代码
- GitHub Pages 发布

阶段成果：完整数据项目网站

## 5. 首页

首页采用学习控制台，至少包括：
- Web Lab 标识
- Learn · Try · Debug · Create
- 当前学习进度
- 最近学习内容
- Continue Learning
- Module Cards
- 最终学习目标
- 课程总路径

## 6. 一级导航

- 课程
- 实验室
- 挑战
- 项目
- 版本
- 帮助

## 7. 核心学习页面

桌面端采用三栏：
- 左侧：课程目录
- 中间：代码编辑器
- 右侧：实时预览
- 底部：当前 Challenge、提示、反馈

编辑器支持 HTML / CSS / JavaScript。

## 8. 课堂模式

提供普通模式、课堂投屏模式、专注模式。

课堂模式要求：
- 放大代码字体
- 放大任务卡片
- 隐藏非必要导航
- 增大 Preview 区域

## 9. Playground

自由实验室不限制任务，支持：
- HTML / CSS / JS
- 运行
- 实时预览
- 清空
- 恢复默认
- 复制代码
- 下载页面

## 10. Challenge Center

分类：HTML、CSS、Layout、JavaScript、DOM、Chart、Debug。

难度：★ / ★★ / ★★★。

## 11. Debug Lab

分类：HTML Bug、CSS Bug、JavaScript Bug、路径 Bug、DOM Bug、Chart Bug。

反馈不能只显示“错误”，需要明确指出未完成项。

## 12. CSS Playground

支持颜色、字号、粗细、背景、圆角、边框、margin、padding 的可视化控制，并同步生成 CSS。

## 13. Box Model Lab

可视化 `margin → border → padding → content`，通过滑块控制 width、padding、border、margin，并同步代码。

## 14. Flex Playground

可交互设置：
- flex-direction
- justify-content
- align-items

预览与代码实时同步。

## 15. Responsive Preview

提供 Desktop / Tablet / Mobile，推荐宽度 1200 / 768 / 375px。

## 16. JavaScript Console

捕获：
- console.log
- console.warn
- console.error
- SyntaxError
- ReferenceError
- TypeError

JavaScript 课程默认手动运行；HTML/CSS 默认实时预览。

## 17. DOM Lab

支持：
- DOM Tree 可视化
- 点击节点高亮页面元素
- querySelector 演示
- textContent 修改
- style 修改
- click 事件
- show / hide
- toggle class

## 18. Chart Lab

支持 Bar / Line / Pie，并允许从简单数据表生成图表。强调“数据 → 配置 → 图表”。

需要提供图表选择挑战和误导性图表示例。

## 19. Data Story Builder

推荐结构：项目名称、研究问题、数据来源、数据概览、数据分析、主要发现、结论、反思。

可添加文本块、图片、数据卡片、柱状图、折线图、饼图、发现卡片、结论卡片。V1 不要求拖拽式页面搭建。

## 20. Final Project 自动检查

自动检查：
- h1
- 至少两个 section
- CSS 使用
- 至少一个 class
- 至少一个 Flex 布局
- 至少一个 JS 事件
- 至少一个图表
- 基础移动端适配

自动检查只评价技术结构，不评价内容质量。

## 21. Presentation Mode

最终项目支持全屏展示，隐藏编辑器和非必要操作，按 section 浏览。

## 22. 版本演进

V0 Hello World → V1 HTML → V2 CSS → V3 Flex → V4 JavaScript / DOM → V5 Data Chart → V6 Data Story → Final Project。

每个版本支持查看页面、查看代码、与上一版本比较。

## 23. 提示系统

三级提示：
1. 方向提示
2. 知识提示
3. 代码结构提示

不得第一次就直接给答案。

## 24. Validator

支持 HTML 结构、CSS 规则、JavaScript 输出、DOM 状态、Chart 类型。HTML 不允许仅通过字符串匹配。

## 25. 学习进度

使用 LocalStorage 保存：
- 当前 Lesson
- Lesson 完成状态
- 每个 Lesson 的代码
- Challenge 状态
- Final Project 代码
- UI 设置

## 26. 数据导入导出

导出为 `web-lab-backup.json`。导入时验证结构，不允许错误 JSON 破坏当前数据。

## 27. 代码下载

至少支持下载 `index.html`、`style.css`、`script.js`。

## 28. GitHub Pages 衔接

Web Lab → 完成项目 → 下载代码 → 创建 GitHub Repository → 上传代码 → GitHub Pages → 网站上线。

## 29. UI 风格

定位：高校课程 + 开发工具 + 轻量交互。

主色建议 `#1677FF`，背景 `#F5F7FA`，正文 `#333333`，辅助文字 `#666666`。

不采用儿童化、游戏大厅化视觉。

## 30. 响应式

桌面：知识 | 代码 | 预览。

移动端：使用 Tab 在“学习 / 代码 / 运行”之间切换。

## 31. V1.0 不做

- 注册登录
- 教师后台
- 学生账号
- 云数据库
- 排行榜
- 评论
- 聊天
- AI Tutor
- 实时协作
- 多人编程
- 云端自动评分

## 32. V1.0 验收

必须满足：
- GitHub Pages 可直接运行
- 无后端
- 刷新不 404
- HTML/CSS/JS 可运行
- iframe 隔离
- Lesson 可切换
- Challenge 可检查
- LocalStorage 可恢复
- 导入导出可用
- 桌面与移动端正常
- 无严重 Console Error
