const joiAuth = require("../../auth/joi");
const Users = require("../../models/mySql/Users");
const bcrypt = require("../../auth/bcrypt");
const JWT = require("../../auth/jwt");

const signinPage = async (req, res) => {
  try {
    req.session.loginErr = [];
    req.session.updateErr = [];
    let errArrey = req.session.signinErr ? req.session.signinErr : [];
    let dbusers = await Users.getAllUsers();
    res.render("signin", {
      ...req.nav,
      dbusers: dbusers[0],
      errArrey: errArrey,
    });
  } catch (e) {
    console.log(e);
  }
};

const signin = async (req, res) => {
  const { email, password, full_name, darkMode } = req.body;
  try {
    let dbusers = await Users.getAllUsers();
    let user_exist = false;
    for (let user of dbusers[0]) {
      if (email && email == user.email) {
        //finds if a user already exsists in the database
        user_exist = true;
        break;
      }
    }
    if (user_exist) {
      req.session.signinErr = ["user already exist"];
      res.redirect("/auth/signin");
    } else {
      // then here we create the new user
      await joiAuth.validateInputAsync(req.body);
      let hashPassword = await bcrypt.hashPassword(password);
      console.table({ ...req.body, hashPassword });
      data = await Users.createUser({ ...req.body, hashPassword });
      // data = await Users.createUser(email, hashPassword, full_name, darkMode);
      await JWT.generateToken(email);
      res.redirect("/");
    }
  } catch (e) {
    console.log(e);
    req.session.signinErr = [...e.details.map((item) => item.message)];
    res.redirect("/auth/signin");
  }
};

module.exports.signinPage = signinPage;
module.exports.signin = signin;
