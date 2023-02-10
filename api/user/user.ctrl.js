// api 로직
const models = require("../../models");

const index = (req, res) => {
  req.query.limit = req.query.limit || 10; //클라이언트 요청에서 limit이 없는경우 10 할당
  const limit = parseInt(req.query.limit); //문자열임
  if (Number.isNaN(limit)) return res.status(400).end();

  models.User.findAll({ limit: limit }).then((users) => {
    res.json(users);
  });
  // res.json(users.slice(0, limit));
};

const show = (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) return res.status(400).end();

  models.User.findOne({
    where: {
      id: id,
    },
  }).then((user) => {
    if (!user) return res.status(404).end();
    res.json(user);
  });
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) return res.status(400).end();
  models.User.destroy({
    where: { id },
  }).then(() => {
    res.status(204).end();
  });
};

const create = (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).end();

  models.User.create({ name })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      if (err.name === "SequelizeUniqueConstraintError") {
        res.status(409).end();
      }
      res.status(500).end;
    });
};

// const update = (req, res) => {
//   const id = parseInt(req.params.id);
//   if (Number.isNaN(id)) return res.status(400).end();
//   const name = req.params.name;
//   if (!name) return res.status(400).end();

//   // if (isConflict) return res.status(409).end();

//   // if (!user) return res.status(404).end();

//   models.User.findOne({ where: { id } }).then((user) => {
//     if (!user) return res.status(404).end();

//     user.name = name;
//     user
//       .save()
//       .then((_) => {
//         res.json(user);
//       })
//       .catch((err) => {
//         if (err.name === "SequelizeUniqueConstraintError") {
//           res.status(409).end();
//         }
//         res.status(500).end;
//       });
//   });
// };
const update = (req, res) => {
  const id = parseInt(req.params.id, 10); // 문자열 id를 숫자열로 반환
  if (Number.isNaN(id)) return res.status(400).end(); // 숫자열 변호나 실패시 NaN이 되므로 400 반환

  const name = req.body.name;
  if (!name) return res.status(400).end(); // Name값이 비어있는 경우 400 리턴

  // SELECT * FROM users WHERE id = 3;
  models.User.findOne({ where: { id: id } }).then((user) => {
    if (!user) return res.status(404).end(); // 사용자가 없는 경우 404 리턴

    if (user.name === name) return res.status(409).end(); // 이름이 중복되는 경우 409 리턴

    // UPDATE users SET name = chenn WHERE id = 3
    // 위 WHERE 조건은 findOne에 의해 검증되었다.
    user.name = name;
    user
      .save()
      .then((user) => {
        res.json(user); // 사용자가 갱신된 경우 사용자 문자열 리턴
      })
      .catch((err) => {
        console.log(err);
        /*
        if (err.name === "SequelizeUniqueConstraintError")
          return res.status(409).end();
        else return res.status(500).end();
        */
      });
  });
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
