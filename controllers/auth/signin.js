const joiAuth = require("../../auth/joi");
const clients = require("../../models/clients");
const bcrypt = require("../../auth/bcrypt");
const JWT = require("../../auth//jwt");

const signinPage = async (req, res) => {
  try {
    req.session.loginErr = [];
    req.session.updateErr = [];
    let errArrey = req.session.signinErr ? req.session.signinErr : [];
    let dbusers = await clients.selectUsers();
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
    let dbusers = await clients.selectUsers();
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
      res.redirect("/signin");
    } else {
      // then here we create the new user
      await joiAuth.validateInputAsync(req.body);
      let hash = await bcrypt.hashPassword(password);
      data = await clients.newUser(email, hash, full_name, darkMode);
      await JWT.generateToken(email);
      res.redirect("/auth");
    }
  } catch (e) {
    console.log(e);
    req.session.signinErr = [...e.details.map((item) => item.message)];
    res.redirect("/signin");
  }
};

module.exports.signinPage = signinPage;
module.exports.signin = signin;
