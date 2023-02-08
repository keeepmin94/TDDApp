//라우팅 설정
const express = require("express");
const router = express.Router();
const ctrl = require("./user.ctrl");

//index.js에서 app.use("/users", user);로 경로 지정해줬기 떄문에 router.get("/users", -> router.get("/",
router.get("/", ctrl.index);
router.get("/:id", ctrl.show);
router.delete("/:id", ctrl.destroy);
router.post("/", ctrl.create);
router.put("/:id", ctrl.update);

module.exports = router;
