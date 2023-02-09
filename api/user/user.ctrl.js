// api 로직
const models = require("../../models");

const index = (req, res) => {
  req.query.limit = req.query.limit || 10; //클라이언트 요청에서 limit이 없는경우 10 할당
  const limit = parseInt(req.query.limit); //문자열임
  if (Number.isNaN(limit)) return res.status(400).end();

  models.User.findAll({}).then((users) => {
    res.json(users);
  });
  // res.json(users.slice(0, limit));
};

const show = (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) return res.status(400).end();

  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end();
  res.json(user);
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) return res.status(400).end();
  users = users.filter((user) => user.id !== id);
  res.status(204).end();
};

const create = (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).end();

  const isConflict = users.filter((user) => user.name === name).length;
  if (isConflict) return res.status(409).end();

  const id = Date.now(); //id는 현재 timestamp
  const user = { id, name };
  users.push(user);
  res.status(201).json(user);
};

const update = (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) return res.status(400).end();
  const name = req.params.name;
  if (!name) return res.status(400).end();

  const isConflict = users.filter((user) => user.name === name).length;
  if (isConflict) return res.status(409).end();

  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end();
  user.name = name;

  res.json(user);
};

// module.exports = {
//   index: index,
//   show: show,
//   destroy: destroy,
//   create: create,
//   update: update
// };

module.exports = {
  index,
  show,
  destroy,
  create,
  update,
};
