const express = require("express");
const authMiddleware = require('../middleware/auth');
const usesHandling = require('../controllers/usersHandling');
const router = express.Router();


router.get("/", authMiddleware, usesHandling.updatePage);
  

  // updating user
router.post("/",usesHandling.update);
  
 
  
module.exports = router;