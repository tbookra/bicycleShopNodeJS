const express = require("express");
const router = express.Router();
const Items = require("../models/mySql/Items");
const indexPageController = require("../controllers/index/index");


router.get("/", indexPageController.index);

router.get("/search/:searchString", async (req, res) => {
  const { searchString } = req.params;
  console.log(searchString);
  try {
    let [itemArr] = await Items.getItemsBySearch(searchString);
    res.json(itemArr);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
