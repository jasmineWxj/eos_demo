const webpack = require("webpack");
const path = require("path");
const runShell = require("./../utils/runShell");

const SOURCE_MAP_PATH = path.resolve(__dirname, "./../dist");
const UPLOAD_PATH = path.resolve(__dirname, "./../server/.maps");

const compiler = webpack(require("./pro.config.js"));
// 打包
compiler.run(() => {
  Promise.all([
    // 1 把dist中的soucemap文件上传到server/.client/maps下。
    runShell(`cp ${SOURCE_MAP_PATH}/*.map ${UPLOAD_PATH}`),
    // 2 把dist中的soucemap文件干掉
    runShell(`rm -f ${SOURCE_MAP_PATH}/*.map`),
  ])
    .then(() => {
      console.info("打包完毕。");
    })
    .catch(console.error);
});
