const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  originalPositionFor,
  findDeveloper,
  JS_TYPE_LIST,
} = require("./lib/sourcemap");
const ddContrulor = require('./lib/send_dingding');

const port = 3001;

const app = express();

app.use(cors());
app.use(bodyParser.json({ type: "application/json" }));

app.post("/api/report", async function (req, res) {
  const { body } = req;
  if (!body?.type) {
    res.send(
      JSON.stringify({
        seccess: false,
        data: false,
      })
    );
    return ;
  }
  const userAgent = req.headers["user-agent"];
  let reportContent = {
    ...body,
  };
  if (JS_TYPE_LIST.includes(body.type)) {
    // 源码追踪
    const position = await originalPositionFor(body.stack, body.filename);
    // 开发者追踪
    const developer = await findDeveloper(position)
    reportContent = {
      ...reportContent,
      ...position,
      ...developer,
      userAgent
    }
  }
  // 强通知
  await ddContrulor.send2developer(reportContent)
  res.send(
    JSON.stringify({
      seccess: true,
      data: true,
    })
  );
});



// mock-effct
app.post("/api/getMockOptions", function (req, res) {
  res.send(
    JSON.stringify({
      seccess: true,
      data: [
        { label: "react", value: "react" },
        { label: "vue", value: "vue" },
        { label: "webpack", value: "webpack" },
        { label: "jest", value: "jest" },
        { label: "rn", value: "rn" },
        { label: "tarojs", value: "tarojs" },
        { label: "uniapp", value: "uniapp" },
        { label: "vite", value: "vite" },
        { label: "rollup", value: "rollup" },
        { label: "weex", value: "weex" },
      ],
    })
  );
});

app.listen(port, () => {
  console.log(`EOS Server listening at http://localhost:${port}`);
});
