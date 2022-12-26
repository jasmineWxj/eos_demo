const fs = require("fs");
const path = require("path");
const { SourceMapConsumer } = require("source-map-js");
const runShell = require("./runShell");

const devpathReg = /(?<=.*\d{4}\/).*/g;
const errorReg = /(?<=.*:)\d+:\d+/g;
const stackPathReg = /(?<=.*\d{4}\/).*(?=:\d+:\d+)/g;
const sourceReg = /(?<=.*client).*/g;
const developerReg = /(?<=\().*\d{4}-\d{2}-\d{2} \d+:\d+:\d+/g

const JS_TYPE_LIST = ["js", "promise"];

const { readFileSync } = fs;

const findPostionMsg = (stack) => {
  const matchPosition = stack.match(errorReg);
  if (Array.isArray(matchPosition) && matchPosition[0]) {
    return matchPosition[0].split(":");
  }
  return null;
};



const originalPositionFor = async (stack, sourceFilePath) => {
  const [lineNo, colNo] = findPostionMsg(stack) || [];
  const RealPath = sourceFilePath
  ? sourceFilePath.match(devpathReg)[0]
  : stack.match(stackPathReg)[0];
  
  let rawSourceMap = {};
  let mapfilepath;
  try {
    mapfilepath = path.resolve(
      __dirname,
      `../.maps/${RealPath}.map`
    );
    rawSourceMap = readFileSync(mapfilepath, 'utf-8');
    const consumer = new SourceMapConsumer(JSON.parse(rawSourceMap));
    const pos = lineNo
    ? consumer.originalPositionFor({
        line: +lineNo,
        column: +colNo,
      })
    : null;
    return pos;
  } catch (error) {
    console.error(`error:source-map-path: ${RealPath}`);
  }

}
const findDeveloper = ({source, line}) => {
  if(!source || !line){
    return ;
  }
  const cuSource = source.match(sourceReg);
  return runShell(`git blame ./client${cuSource && cuSource[0]} -L ${line},${line}`).then((res) => {
    const data = res.match(developerReg)[0]?.split(' ');
    return {
      developer: data[0],
      time: `${data[1]} ${data[2]}`
    };
  });
};

module.exports = {
  originalPositionFor,
  findDeveloper,
  JS_TYPE_LIST,
};
