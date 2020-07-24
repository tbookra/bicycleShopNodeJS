var express = require("express");
const clients = require('../models/clients');
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  let userList = await clients.selectUsers();
  module.exports.userList = userList[0];
  console.log(module.exports.electricInfo);
  res.render("index", { title: "Express", ...req.nav, userList: userList[0]});
});


module.exports = router;