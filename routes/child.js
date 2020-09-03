const express = require("express");
const authMiddleware = require("../middleware/auth");
const lastLocation = require('../middleware/lastLocation');
const passwordWasModified = require('../middleware/passwordWasModified');
const childControler = require('../controllers/category_items/childControler');

const router = express.Router();





router.get("/", childControler.childPage );

router.post("/", childControler.childPost );

router.get("/:item_id", lastLocation, authMiddleware,passwordWasModified , childControler.childItem );

module.exports = router;