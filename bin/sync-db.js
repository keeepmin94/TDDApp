const models = require("../models");

module.exports = () => {
  return models.sequelize.sync({ force: true });
  //sequelize.sync(): 데이터베이스 연동
  //force: true => 기존의 db있더라도 날려버리고 새로 만든다.
};
