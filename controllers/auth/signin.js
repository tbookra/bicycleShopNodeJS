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
    res.status(200).render("signin", {
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
      res.status(401).redirect("/auth/signin");
    } else {
      // then here we create the new user
      await joiAuth.validateInputAsync(req.body);
      let hashPassword = await bcrypt.hashPassword(password);
      data = await Users.createUser({ ...req.body, hashPassword });
      await JWT.generateToken(email);
      let [user] = await Users.getUserByEmail(email);
      req.session.name = user[0].email;
      req.session.user = user[0];
      req.session.justRejistered = true;
      req.session.name = req.body;
      res.status(201).redirect("/");
    }
  } catch (e) {
    console.log(e);
    req.session.signinErr = [...e.details.map((item) => item.message)];
    res.status(401).redirect("/auth/signin");
  }
};

module.exports.signinPage = signinPage;
module.exports.signin = signin;
