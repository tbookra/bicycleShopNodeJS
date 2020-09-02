const express = require("express");
const authMiddleware = require("../middleware/auth");
const lastLocation = require('../middleware/lastLocation');
const passwordWasModified = require('../middleware/passwordWasModified');
const mountainControler = require('../controllers/category_items/mountainControler');
const router = express.Router();



router.get("/", mountainControler.mountainPage );

router.post("/", mountainControler.mountainPost);

router.get("/:item_id", lastLocation, authMiddleware, passwordWasModified , mountainControler.mountainItem);

module.exports = router;

