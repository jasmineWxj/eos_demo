const fetch = require("node-fetch");

const { dd } = require("./config");
const { JS_TYPE_LIST } = require("./sourcemap");
const { phoneMap, group_report_url } = dd;

class DDReport {
  templateJS = ({ time, developer, filename, type, source, userAgent, line }) => {
    let content = `@${phoneMap[developer]} \n`;
    content += `### eos报警: \n`;
    content += `类型: ${type} \n`;
    content += `\n`;
    content += `开发者: ${developer} \n`;
    content += `\n`;
    content += `bundle路径: ${filename} \n`;
    content += `\n`;
    content += `源码文件: ${source}\n`;
    content += `\n`;
    content += `源码错误所在行: ${line}\n`;
    content += `\n`;
    content += `源码最后更改时间: ${time}\n`;
    content += `\n`;
    content += `源码最后更改者: ${developer}\n`;
    content += `\n`;
    content += `userAgent: ${userAgent}\n`;
    content += `\n`;
    content += ``
    return content;
  };
  templateStatic = ({ userAgent, type, url, input, method, body, stack }) => {
    let content = ``;
    content += `### eos报警: \n`;
    content += `type: ${type} \n`;
    content += `\n`;
    if (url) {
      content += `src: ${url} \n`;
      content += `\n`;
    } else {
      content += `url: ${input} `;
      content += `\n`;
      content += `method: ${method}`;
      content += `\n`;
      content += `body: ${body}`;
      content += `\n`;
      content += `stack: ${stack}`;
      content += `\n`;
      content += `userAgent: ${userAgent}`;
      content += `\n`;
    }
    return content;
  };
  send2developer = (reportObject) => {
    const { type, developer } = reportObject;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // title: "线上错误发生了",
        msgtype: "markdown",
        markdown: {
          title: "EOS报警",
          text: JS_TYPE_LIST.includes(type)
            ? this.templateJS(reportObject)
            : this.templateStatic(reportObject),
        },
        at: {
          atMobiles: [phoneMap[developer]],
          // atUserIds: ["user123"],
          isAtAll: developer ? false : true,
        },
      }),
    };
    return fetch(group_report_url, options).catch(console.log);
  };
}

module.exports = new DDReport();
