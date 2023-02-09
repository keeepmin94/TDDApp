const Sequelize = require("sequelize"); //class
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
}); //객체 생성
const User = sequelize.define("User", {
  //sequelize.define(): 모델 정의

  //속성 만들기
  name: Sequelize.STRING, //varchar255
});

module.exports = { Sequelize, sequelize, User };
