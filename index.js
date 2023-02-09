const express = require("express");
const app = express();
const port = 3000;
var morgan = require("morgan");
const bodyParser = require("body-parser");
var user = require("./api/user"); //require("./api/user/index.js"); index.js 생략 가능

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", user); ///users로 오는 모든 api요청은 user모듈이 담당

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

module.exports = app;
