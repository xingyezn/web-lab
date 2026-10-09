# Web Lab Data Schema

## 1. Lesson Schema

```js
{
  id: "html-04",
  module: "html",
  order: 4,
  title: "HTML 列表",
  subtitle: "把多个相关内容组织起来",
  estimatedMinutes: 8,
  difficulty: 1,
  type: "lesson",

  objectives: [
    "认识 ul",
    "认识 li",
    "创建一个无序列表"
  ],

  intro: {
    title: "如果有三个兴趣怎么办？",
    content: "使用列表组织多个相关项目。"
  },

  knowledge: [
    { type: "text", content: "..." },
    { type: "code", language: "html", code: "<ul>...</ul>" }
  ],

  starterCode: {
    html: "",
    css: "",
    js: ""
  },

  tryTask: {
    description: ""
  },

  challenge: {
    title: "",
    description: "",
    validator: {
      type: "html",
      rules: []
    }
  },

  hints: ["...", "...", "..."],
  summary: ["...", "..."],
  nextLesson: "html-05"
}
```

## 2. Module Schema

```js
{
  id: "html",
  title: "HTML 基础",
  order: 1,
  description: "学习网页结构与内容。",
  project: "homepage-v1",
  lessons: ["html-01", "html-02"]
}
```

## 3. Validator Rule：Element Count

```js
{
  type: "element-count",
  selector: "li",
  min: 3
}
```

## 4. Validator Rule：Element Exists

```js
{
  type: "element-exists",
  selector: "h1"
}
```

## 5. Validator Rule：Text Content

```js
{
  type: "text-content",
  selector: "h1",
  contains: "我的主页"
}
```

## 6. Validator Rule：Attribute

```js
{
  type: "attribute",
  selector: "img",
  attribute: "alt",
  required: true
}
```

## 7. Validator Rule：CSS Property

```js
{
  type: "css-property",
  selector: ".title",
  property: "color",
  expected: "blue"
}
```

支持 expected、oneOf、exists、minNumber、maxNumber。

## 8. Validator Rule：Console Output

```js
{
  type: "console-output",
  expected: "Hello"
}
```

## 9. Validator Rule：DOM State

```js
{
  type: "dom-state",
  trigger: {
    type: "click",
    selector: "#btn"
  },
  assert: {
    selector: "#title",
    property: "textContent",
    expected: "Hello"
  }
}
```

## 10. Validator Rule：Chart

```js
{
  type: "chart",
  chartType: "bar"
}
```

可扩展 labels、datasets、title。

## 11. Challenge Schema

```js
{
  id: "html-list-01",
  title: "创建三个兴趣",
  description: "使用无序列表创建至少三个兴趣。",
  difficulty: 1,
  validators: [
    { type: "element-exists", selector: "ul" },
    { type: "element-count", selector: "li", min: 3 }
  ],
  hints: [
    "需要使用列表。",
    "无序列表使用 ul，列表项使用 li。",
    "<ul><li>...</li></ul>"
  ]
}
```

## 12. Project Schema

```js
{
  id: "final-project",
  title: "Final Web Project",
  requirements: [
    {
      id: "html-h1",
      label: "页面包含主标题",
      validator: {
        type: "element-exists",
        selector: "h1"
      }
    },
    {
      id: "section-count",
      label: "至少包含两个内容区域",
      validator: {
        type: "element-count",
        selector: "section",
        min: 2
      }
    }
  ]
}
```

## 13. Storage Schema

```js
{
  version: 1,
  currentLesson: "html-01",
  progress: {
    "html-01": {
      completed: true,
      completedAt: "..."
    }
  },
  lessons: {
    "html-01": {
      html: "...",
      css: "...",
      js: "...",
      updatedAt: "..."
    }
  },
  project: {
    html: "",
    css: "",
    js: ""
  },
  preferences: {
    classroomMode: false,
    livePreview: true,
    editorFontSize: 16
  }
}
```

## 14. Export Schema

```js
{
  format: "web-lab-backup",
  version: 1,
  exportedAt: "...",
  data: {}
}
```

导入时必须校验 format、version、data，禁止直接信任任意 JSON。
