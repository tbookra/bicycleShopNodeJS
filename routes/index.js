const express = require("express");
const router = express.Router();

const indexPageController = require("../controllers/index/index");

router.get("/", indexPageController.index);

module.exports = router;
