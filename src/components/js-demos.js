// JavaScript interactive demos: condition, loop and function.
// These are our own teaching widgets (not student code), so they run in the
// main document to stay simple and readable.
window.WebLab = window.WebLab || {};

(function (WebLab) {
  "use strict";

  function code(sample) {
    return WebLab.utils.codeBlock("js", sample);
  }

  function markup(type) {
    if (type === "condition") {
      return (
        '<div class="js-demo" data-demo="condition">' +
          '<div class="js-demo__controls">' +
            '<label for="demo-condition">score：<output data-demo-value>75</output></label>' +
            '<input id="demo-condition" type="range" min="0" max="100" value="75" data-demo-input>' +
          "</div>" +
          code('let score = 75;\n\nif (score >= 60) {\n  console.log("及格");\n} else {\n  console.log("不及格");\n}') +
          '<div class="js-demo__output">判断结果：<strong data-demo-result>及格</strong></div>' +
        "</div>"
      );
    }
    if (type === "loop") {
      return (
        '<div class="js-demo" data-demo="loop">' +
          '<div class="js-demo__controls">' +
            '<label for="demo-loop">循环次数 n：<output data-demo-value>3</output></label>' +
            '<input id="demo-loop" type="range" min="1" max="8" value="3" data-demo-input>' +
            '<button class="btn btn--ghost btn--sm" type="button" data-demo-next>下一步</button>' +
            '<button class="btn btn--ghost btn--sm" type="button" data-demo-reset>重置</button>' +
          "</div>" +
          code('let sum = 0;\n\nfor (let i = 1; i <= n; i++) {\n  sum = sum + i;\n  console.log("第 " + i + " 次：sum = " + sum);\n}') +
          '<ul class="js-demo__lines" data-demo-lines></ul>' +
        "</div>"
      );
    }
    if (type === "func") {
      return (
        '<div class="js-demo" data-demo="func">' +
          '<div class="js-demo__controls">' +
            '<label for="demo-func">name：<input id="demo-func" type="text" value="小明" data-demo-input></label>' +
            '<button class="btn btn--ghost btn--sm" type="button" data-demo-call>调用函数</button>' +
          "</div>" +
          code('function greet(name) {\n  return "Hello, " + name + "!";\n}\n\nconsole.log(greet("小明"));') +
          '<div class="js-demo__output">返回：<strong data-demo-result></strong></div>' +
        "</div>"
      );
    }
    return "";
  }

  function initCondition(root) {
    var input = root.querySelector("[data-demo-input]");
    var valueOut = root.querySelector("[data-demo-value]");
    var result = root.querySelector("[data-demo-result]");

    function update() {
      var score = Number(input.value);
      var pass = score >= 60;
      if (valueOut) { valueOut.textContent = String(score); }
      if (result) {
        result.textContent = pass ? "及格" : "不及格";
        result.className = pass ? "is-true" : "is-false";
      }
    }

    if (input) { input.addEventListener("input", update); }
    update();
  }

  function initLoop(root) {
    var input = root.querySelector("[data-demo-input]");
    var valueOut = root.querySelector("[data-demo-value]");
    var nextButton = root.querySelector("[data-demo-next]");
    var resetButton = root.querySelector("[data-demo-reset]");
    var linesEl = root.querySelector("[data-demo-lines]");
    var current = 0;
    var sum = 0;

    function total() {
      return Number(input.value);
    }

    function render() {
      if (valueOut) { valueOut.textContent = String(total()); }
      if (nextButton) { nextButton.disabled = current >= total(); }
    }

    function reset() {
      current = 0;
      sum = 0;
      if (linesEl) { linesEl.innerHTML = ""; }
      render();
    }

    function step() {
      if (current >= total() || !linesEl) {
        return;
      }
      current++;
      sum += current;
      var li = linesEl.ownerDocument.createElement("li");
      li.className = "js-demo__line";
      li.textContent = "第 " + current + " 次：sum = " + sum;
      linesEl.appendChild(li);
      render();
    }

    if (input) {
      input.addEventListener("input", reset);
    }
    if (nextButton) { nextButton.addEventListener("click", step); }
    if (resetButton) { resetButton.addEventListener("click", reset); }
    reset();
  }

  function initFunc(root) {
    var input = root.querySelector("[data-demo-input]");
    var button = root.querySelector("[data-demo-call]");
    var result = root.querySelector("[data-demo-result]");

    function call() {
      if (result) {
        result.textContent = "Hello, " + (input ? input.value : "") + "!";
      }
    }

    if (button) { button.addEventListener("click", call); }
    call();
  }

  function create(root) {
    var type = root.getAttribute("data-demo");
    if (type === "condition") { initCondition(root); }
    else if (type === "loop") { initLoop(root); }
    else if (type === "func") { initFunc(root); }
    return root;
  }

  WebLab.JsDemos = { markup: markup, create: create, types: ["condition", "loop", "func"] };
})(window.WebLab);
