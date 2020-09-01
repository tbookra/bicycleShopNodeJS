const Users = require("../models/mySql/Users");

module.exports = async (req, res, next) => {
    const DATE_TO_DAYS = 60*60*24*1000;
    const DAYS_TO_PASSWORD_MODIFFICATION = 180;
    let [user1] = await Users.getUserByEmail(req.body.email);
    let LastPasswordModification = user1[0].last_password_modification / DATE_TO_DAYS;
    let today = new Date()/DATE_TO_DAYS;
    let dif = today - LastPasswordModification;
    if(dif<DAYS_TO_PASSWORD_MODIFFICATION){ // no need to change password
        req.session.changePassword = false
    } else {
        req.session.changePassword = true
    }
    if (!req.session.changePassword) {
      // console.log('req.session.lastLocation',req.session.lastLocation);
      res.redirect('/');
    // req.session.lastLocation ? res.render("place_ditales", { ...req.nav, title: 'express', place: req.session.lastLocation }) : res.redirect('/');
    } else {
      res.redirect("/auth/update");
   
    }
  };