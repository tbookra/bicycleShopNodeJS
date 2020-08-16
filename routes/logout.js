const express = require("express");

const usesHandling = require('../controllers/usersHandling');
const router = express.Router();


router.get("/", usesHandling.logout );
module.exports = router;