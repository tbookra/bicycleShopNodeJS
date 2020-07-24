const express = require("express");
const clients = require('../models/clients');
const joiAuth = require("../auth/joi");
const bcrypt = require("../auth/bcrypt");
const authJoiMiddleware = require('../controllers/auth');
const router = express.Router();

// to show client list
router.get("/", async (req, res) => {
  let dbusers = await clients.selectUsers();
  res.render("signin", {  ...req.nav, dbusers: dbusers[0],err: req.session.err});
  });

  // adding new user
  router.post("/", async (req, res) => {
   
    let dbusers = await clients.selectUsers();
  
  let us = false;
  for (let user of dbusers[0]) {
    if (req.body.us && req.body.us == user.username) { //finds if a user already exsists in the database
      us = true;
      break;
    }
  }
  if (us) {
  req.session.err =  "user already exist";
  } else {      // then here we creat the new user
    console.log('i have got this far.....');
    console.log('req.body.name', req.body.name);
      try {
        let data = await joiAuth.validateInputAsync(req.body);
        console.log('data1 ', data);
        let hash = await bcrypt.generatePassword(data.ps);
        console.log('hash ', hash);
        data = await clients.newUser(data.us, hash,req.body.name);
        console.log('data2 ', data);
      } catch (e) {
        // req.session.err = e.details.map((item) => item.message);
        console.log("err", e);
        res.redirect("/");
      }
    

    // let data = await clients.newUser(req.body.us ,req.body.ps, req.body.name);
    res.redirect("/auth");
  }
});

module.exports = router;