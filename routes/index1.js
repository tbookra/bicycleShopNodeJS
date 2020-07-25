const express = require("express");
const router = express.Router();

/* GET home page. */

router.get("/", async (req, res, next) => {
  try {
    res.json({ msg: "nodeProject" });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
