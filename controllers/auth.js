const joiAuth = require("../auth/joi");
const bcrypt = require("../auth/bcrypt");
const clients = require("../models/clients");

const signup = async (req, res) => {
  try {
    let data = await joiAuth.validateInputAsync(req.body);
    console.log('data1 ', data);
    // let hash = await bcrypt.generatePassword(data.ps);
    // data = await clients.newUser([data.us, hash,rep.body.name]);
    res.redirect("/");
  } catch (e) {
    // req.session.err = e.details.map((item) => item.message);
    console.log("err",e);
    res.redirect("/");
  }
};

const login = async (req, res) => {
  console.log("req.body", req.body);
  try {
    let data = await joiAuth.validateInputAsync(req.body);
    let table = await clients.selectUser(data.username);
    console.log(table[0]);
    if (table[0].length > 0) {
      let isPass = await bcrypt.checkPassword(
        data.password,
        table[0][0].password
      );
      if (isPass) {
        req.session.idclients = table[0][0].idclients;
        res.redirect("/land");
      } else {
        req.session.err = ["password incorrect"];
        res.redirect("/");
      }
    } else {
      req.session.err = ["username incorrect"];
      res.redirect("/");
    }
  } catch (e) {
    // req.session.err = e.details.map((item) => item.message);
    // console.log("err", req.session.err);
    console.log(e);
    res.redirect("/");
  }
};

const logout = (req, res) => {};

module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;