const Sequelize = require("sequelize"); //class
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: false, //기본값 console.log로 바인딩   //추가
}); //객체 생성

const User = sequelize.define("User", {
  //sequelize.define(): 모델 정의

  //속성 만들기
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
});

module.exports = { Sequelize, sequelize, User };
