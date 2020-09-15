const Users = require("../models/mySql/Users");

module.exports = async (req, res, next) => {
  const DATE_TO_DAYS = 60 * 60 * 24 * 1000;
  const DAYS_TO_PASSWORD_MODIFFICATION = 180;
  let [user1] = await Users.getUserByEmail(req.body.email);
  let LastPasswordModification =
    user1[0].last_password_modification / DATE_TO_DAYS;
  let today = new Date() / DATE_TO_DAYS;
  let dif = today - LastPasswordModification;
  if (dif < DAYS_TO_PASSWORD_MODIFFICATION) {
    // true meens no need to change password
    req.session.changePassword = false; // meens no need to change password
  } else {
    req.session.changePassword = true; // meens that password should change
  }
  if (!req.session.changePassword) {
    // meens no need to change password = true
    if (req.session.lastLocation) {
      res.redirect(`/${item_obj.category}/${item_obj.item_id}`);
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/auth/update");
  }
};
