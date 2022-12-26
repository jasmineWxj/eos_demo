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
      const url = target.src;
      console.log("静态资源加载错误:", url);
      // report...
    } else {
      // js runtime 异常上报
      const { stack } = event.error || {};
      // report...
      console.log("js runtime错误:", stack);
    }
  },
  true
);
if (window.PromiseRejectionEvent) {
  window.addEventListener("unhandledrejection", (event) => {
    //promise异常，report...
    console.log("Promise错误:", event.reason.stack);
  });
}

