# AGENTS.md

## Project

Web Lab is a browser-based interactive Web programming learning platform.

The primary users are first-year university students with little or no Web programming experience.

## Main Principle

Teaching clarity is more important than technical sophistication.

Always prefer simple, readable, maintainable and teachable solutions over abstract, clever, complex or over-engineered implementations.

## Technology Constraints

Use:
- HTML5
- CSS3
- Vanilla JavaScript

Do not introduce:
- React
- Vue
- Angular
- Next.js
- backend services
- databases
- authentication systems

Do not silently add npm/build requirements unless explicitly approved.

## Deployment

The project must work on GitHub Pages. Use Hash Router. Do not require server-side route fallback.

## Dependencies

Core features should work without external APIs. Avoid required CDN dependencies. If Chart.js or another library is needed, prefer a local static copy.

## Before Modifying Code

Before every substantial task:
1. Read `PRD.md`
2. Read `ARCHITECTURE.md`
3. Read relevant sections of `CONTENT_SPEC.md`
4. Inspect current implementation
5. Preserve existing working behavior
6. Implement the smallest coherent change
7. Test the changed flow

## Forbidden Behaviors

Do not:
- rewrite the whole project to add one feature
- delete working lessons
- change lesson IDs casually
- change storage schema without migration
- move everything into one JS file
- introduce a framework because it is “more modern”
- add a backend
- require cloud services
- make core lessons dependent on network access
- allow student code to access the main Web Lab DOM

## Code Organization

Keep responsibilities separated:
- router: routing
- editor: code input
- preview: execution
- validator: validation
- storage: persistence
- progress: learning progress
- lesson data: content

Avoid files larger than necessary. Do not create a 3000-line `app.js`.

## Teaching Code Style

Example code shown to students must be short, explicit, beginner friendly and easy to explain in class.

Prefer:

```js
const button = document.querySelector("#button");

button.addEventListener("click", function () {
  console.log("Hello");
});
```

Avoid unnecessary compactness or advanced syntax.

## Validators

HTML validation must use DOM parsing rather than raw substring matching. CSS validation must tolerate whitespace and declaration order. DOM/JS validation must execute inside the sandbox iframe.

## iframe Safety

Student code must execute inside a sandbox iframe. Do not enable top navigation, popups or unrestricted same-origin access.

## Storage

All persistent data must go through the Storage module. Do not access `localStorage` from arbitrary components.

## Content

Lesson content belongs in data files. Do not hard-code large lesson content directly into page components.

## Accessibility

Buttons must have text labels or accessible names. Do not rely on color alone for success/error feedback.

## Responsive

Every page change must be checked on desktop, tablet and mobile.

## Completion

A task is not complete until:
- feature works
- no obvious regressions
- no severe console errors
- relevant tests/manual checks are performed
