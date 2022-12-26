export const report = (content) =>
  fetch("http://localhost:3001/api/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(content),
  })
    .catch(()=>{})

window.addEventListener(
  "error",
  (event) => {
    const { target, filename } = event;
    let isElementTarget =
      target instanceof HTMLScriptElement ||
      target instanceof HTMLLinkElement ||
      target instanceof HTMLImageElement;
    if (isElementTarget) {
      // 静态资源加载异常上报
      const url = target?.src;
      // console.log("静态资源加载错误:", url);
      // report...
      report({
        type: "static_src",
        url
      });
    } else {
      // js runtime 异常上报
      const { stack } = event.error || {};
      // report...
      // console.log("js runtime错误:", stack);
      report({
        type: "js",
        stack,
        filename
      });
    }
  },
  true
);
if (window.PromiseRejectionEvent) {
  window.addEventListener("unhandledrejection", (event) => {
    //promise异常，report...
    // console.log("Promise错误:", event.reason.stack);
    report({
      type: "promise",
      stack: event.reason.stack,
      filename: event.filename
    });
  });
}
