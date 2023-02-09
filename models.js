const Sequelize = require("sequelize"); //class
const sequelize = new sequelize({
  dialect: "sqlite",
  db: "./db.sqlite",
}); //객체 생성
const User = sequelize.define("User", {
  //속성 만들기
  name: Sequelize.STRING, //varchar255
});

module.exports = { Sequelize, sequelize, User };
