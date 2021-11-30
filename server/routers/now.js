// 실시간 접속자수 알려주기
// (대신, 패스포트 미들웨어를 사용해서)

const express = require("express");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const axios = require("axios");

const router = express.Router();

router.get("/", isLoggedIn, (req, res) => {
  console.log("요기얌");
  console.log(req.user);
  res.json(req.user.length);
});

module.exports = router;
