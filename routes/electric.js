const express = require("express");
const authMiddleware = require("../middleware/auth");
const lastLocation = require('../middleware/lastLocation');
const passwordWasModified = require('../middleware/passwordWasModified');
const electricControler = require('../controllers/category_items/electricControler');
const router = express.Router();



router.get("/", electricControler.electricPage);

router.post("/", electricControler.electricPost);

router.get("/:item_id",lastLocation, authMiddleware, passwordWasModified , electricControler.electricItem);

module.exports = router;