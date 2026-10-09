// Simple line-based diff (LCS) used by the Versions page.
window.WebLab = window.WebLab || {};
window.WebLab.utils = window.WebLab.utils || {};

(function (utils) {
  "use strict";

  function diffLines(oldText, newText) {
    var a = String(oldText || "").split("\n");
    var b = String(newText || "").split("\n");
    var n = a.length;
    var m = b.length;
    var dp = [];
    var i;
    var j;

    for (i = 0; i <= n; i++) {
      dp.push(new Array(m + 1).fill(0));
    }
    for (i = n - 1; i >= 0; i--) {
      for (j = m - 1; j >= 0; j--) {
        dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }

    var result = [];
    i = 0;
    j = 0;
    while (i < n && j < m) {
      if (a[i] === b[j]) {
        result.push({ type: "same", text: a[i] });
        i++;
        j++;
      } else if (dp[i + 1][j] >= dp[i][j + 1]) {
        result.push({ type: "remove", text: a[i] });
        i++;
      } else {
        result.push({ type: "add", text: b[j] });
        j++;
      }
    }
    while (i < n) { result.push({ type: "remove", text: a[i] }); i++; }
    while (j < m) { result.push({ type: "add", text: b[j] }); j++; }
    return result;
  }

  utils.diffLines = diffLines;
})(window.WebLab.utils);
