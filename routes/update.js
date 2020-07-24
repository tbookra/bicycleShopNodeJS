const express = require("express");
const clients = require('../models/clients');
const authMiddleware = require('../middleware/auth');
// const detailAuthMiiddleware = require('../middleware/detailauth');
const router = express.Router();


router.get("/", authMiddleware, async (req, res) => {
    let dbusers = await clients.selectUsers();
    res.render("update", {  ...req.nav, dbusers: dbusers[0]});
   
    });
  

  // updating user
  router.post("/", async (req, res) => {
   
    let data = await clients.updateUser(req.body.us,req.body.nps,req.body.nname,req.body.ous);
   
    req.session.name = undefined;
    res.redirect("/");
     
    });
  
  // delete user
  
  // router.delete("/", (req, res) => {
  //     dbusers = dbusers.filter((item) => item.us != req.body.us);
  //     res.json({ msg: "user delete" });
  //   });
  
  
    module.exports = router;