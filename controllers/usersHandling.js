const express = require("express");
const clients = require('../models/clients');
const joiAuth = require("../auth/joi");
const bcrypt = require("../auth/bcrypt");
const JWT = require("../auth/jwt");
const authJoiMiddleware = require('../controllers/auth');


const loginPage = async (req, res) => {
    req.session.signinErr = [];
    req.session.updateErr = [];
    let errArrey = req.session.loginErr ? req.session.loginErr : [];
    let userList = await clients.selectUsers();
    module.exports.userList = userList[0];
    res.render("login", { errArrey: errArrey, ...req.nav });
    req.session.err = undefined;
  };

const login = async (req, res) => {
    let { username, password } = req.body;
    if (!username || !password) { // handles with if no name was asigned
      req.session.loginErr = ["username or password missing"];
      res.redirect("/auth");
      return;
    };
    let ttt = module.exports.userList;
    let user = ttt.filter((user) => user.email == username);
    console.log('user', user);
    if (user.length == 0) {  // if there is no such user in the database
      req.session.loginErr = ["the username not exist"];
      res.redirect("/auth");
    } else {
    let passAuth =await bcrypt.checkPassword(password,user[0].password);
        if (passAuth) { // this part is where everything is right
        req.session.name = user[0].full_name;
       
        res.redirect("/");
      } else {  // if user exists but a wrong password
        req.session.loginErr = ["username or password incorrect"];
      
        res.redirect("/auth");
       
      }
    }
  };

const logout = (req, res) => {
    req.session.name = undefined;
    res.redirect("/");
  };

const signinPage = async (req, res) => { 
    req.session.loginErr = [];
    req.session.updateErr = [];
    let errArrey = req.session.signinErr ? req.session.signinErr : [];
    let dbusers = await clients.selectUsers();
    res.render("signin", {  ...req.nav, dbusers: dbusers[0],errArrey: errArrey});
    };

const signin = async (req, res) => {
  let dbusers = await clients.selectUsers();
  let us = false;
  for (let user of dbusers[0]) {
    if (req.body.us && req.body.us == user.email) { //finds if a user already exsists in the database
      us = true;
      break;
    }
  }
  if (us) {
  req.session.signinErr =  ["user already exist"];
  res.redirect('/signin');
  } else {      // then here we creat the new user
    console.log('i have got this far.....');
      try {
        let data = await joiAuth.validateInputAsync({us:req.body.us, ps: req.body.ps, name: req.body.name});
        // console.log('joi data ',data);
        let hash = await bcrypt.generatePassword(data.ps);
        // console.log('hash', hash);
        data = await clients.newUser(data.us, hash,req.body.name,req.body.darkMode);
        let data1 = await JWT.generateToken(req.body.us);
        } catch (e) {
          // console.log(e);
        req.session.signinErr = [...e.details.map((item) => item.message)];
        res.redirect("/signin");
      }
    

    // let data = await clients.newUser(req.body.us ,req.body.ps, req.body.name);
    res.redirect("/auth");
  }
};

const updatePage = async (req, res) => {
  req.session.signinErr = [];
  req.session.loginErr = [];
    let errArrey = req.session.updateErr ? req.session.updateErr : [];
    let dbusers = await clients.selectUsers();
    res.render("update", {  ...req.nav, dbusers: dbusers[0], errArrey: errArrey});
    req.session.err = undefined;
    };

const update =  async (req, res) => { 
    try{
      let data1 = await joiAuth.validateInputAsync({us:req.body.us, ps: req.body.nps, name: req.body.nname});
      let cryptPassword = await bcrypt.generatePassword(req.body.nps);
      let data = await clients.updateUser(req.body.us,cryptPassword,req.body.nname,req.body.ous);
    }catch (e) {
      req.session.updateErr = [...e.details.map((item) => item.message)];
      res.redirect("/update");
    }
    req.session.name = undefined;
    req.session.updateErr = [];
    res.redirect("/");
     
    }

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signinPage = signinPage;
module.exports.signin = signin;
module.exports.updatePage = updatePage;
module.exports.update = update;