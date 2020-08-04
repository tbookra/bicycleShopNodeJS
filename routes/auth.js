const express = require("express");

const usesHandling = require('../controllers/usersHandling');
const router = express.Router();

router.get("/", usesHandling.loginPage );
router.post("/",usesHandling.login);
router.get("/logout", usesHandling.logout );
module.exports = router;