const Users = require("../../models/mySql/Users"); 
const joiAuthUpdate = require("../../auth/joiUpdate");
const bcrypt = require("../../auth/bcrypt");

const updatePage = async (req, res) => {
  try {
    req.session.signinErr = [];
    req.session.loginErr = [];
    let errArrey = req.session.updateErr ? req.session.updateErr : [];
    //שאילתה למשתמש ספציפי
    let dbusers = await Users.getAllUsers();
    res.render("update", {
      ...req.nav,
      dbusers: dbusers[0],
      errArrey: errArrey,
    });
    req.session.err = undefined;
  } catch (e) {
    console.log(e);
  }
};
const update = async (req, res) => {
  const { email, password, full_name } = req.body;
  try {
    await joiAuthUpdate.validateInputAsync(password, full_name);
    let hashPassword = await bcrypt.hashPassword(password);
    await Users.updateUser(hashPassword, full_name, email);
    req.session.name = req.body;
    req.session.justRejistered = true;
  } catch (e) {
    console.log(e); 
    req.session.updateErr = [...e.details.map((item) => item.message)];
    res.redirect("/update");
  }
  req.session.name = undefined;
  req.session.updateErr = [];
  res.redirect("/");
};

module.exports.updatePage = updatePage;
module.exports.update = update;
