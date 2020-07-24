const express = require("express");
const authBcript = require('../auth/bcrypt');
const clients = require('../models/clients');
const router = express.Router();

router.get("/", async (req, res) => {
  let userList = await clients.selectUsers();
  module.exports.userList = userList[0];
  res.render("login", { err: req.session.err, ...req.nav });
  req.session.err = undefined;
});
router.post("/", (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    req.session.err = "username or password missing";
    res.redirect("/auth");
    return;
  }
  let ttt = module.exports.userList;
 let user = ttt.filter((user) => user.username == username);
 

  if (user.length == 0) {
    req.session.err = "username or password incorrect";
    res.redirect("/auth");
  } else {
let passAuth = authBcript.checkPassword(password,user[0].password)
    if (passAuth) { // this part is where everything is right
      req.session.name = user[0].name;
      res.redirect("/");
    } else {
      req.session.err = "username or password incorrect";
      res.redirect("/auth");
    }
  }
});
router.get("/logout", (req, res) => {
  req.session.name = undefined;
  res.redirect("/");
});
module.exports = router;