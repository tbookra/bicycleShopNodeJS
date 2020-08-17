const express = require("express");
const clients = require("../models/clients");
const joiAuth = require("../auth/joi");
const bcrypt = require("../auth/bcrypt");
const JWT = require("../auth/jwt");
const usesHandling = require("../controllers/usersHandling");

const router = express.Router();

// to show client list
router.get("/", usesHandling.signinPage);

// adding new user
router.post("/", usesHandling.signin);

module.exports = router;
