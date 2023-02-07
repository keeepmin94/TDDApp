const express = require("express");
const app = express();
const port = 3000;
var morgan = require("morgan");
const bodyParser = require("body-parser");
var users = [
  { id: 1, name: "alice" },
  { id: 2, name: "bek" },
  { id: 3, name: "chris" },
];

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/users", (req, res) => {
  req.query.limit = req.query.limit || 10; //클라이언트 요청에서 limit이 없는경우 10 할당
  const limit = parseInt(req.query.limit); //문자열임
  if (Number.isNaN(limit)) return res.status(400).end();
  res.json(users.slice(0, limit));
});

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) return res.status(400).end();

  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end();
  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) return res.status(400).end();
  users = users.filter((user) => user.id !== id);
  res.status(204).end();
});

app.post("/users", (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).end();

  const isConflict = users.filter((user) => user.name === name).length;
  if (isConflict) return res.status(409).end();

  const id = Date.now(); //id는 현재 timestamp
  const user = { id, name };
  users.push(user);
  res.status(201).json(user);
});

app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const name = req.params.name;
  // if (Number.isNaN(id)) return res.status(400).end();

  const user = users.filter((user) => user.id === id)[0];
  user.name = name;
  console.log(user);
  res.json(user);
  //res.status(204).end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
