const express = require("express");
const authMiddleware = require("../middleware/auth");
const Items = require('../models/mySql/Items');
const Pagination = require('../models/mySql/pagination');
const router = express.Router();

// router.use(authMiddleware);
const passwordWasModified = require('../middleware/passwordWasModified');

/* GET home page. */
router.get("/", async function (req, res, next) {
  try{
  let productsInfo = await Pagination.pageItems('mountain',9,0);
  let arr = productsInfo[0];
  module.exports.mountainInfo = productsInfo[0];
  if (req.query.search) {
    arr = productsInfo[0].filter((item) => {
      return item.item_name.search(req.query.search) >= 0;
    });
  }

  router.post("/", async function (req, res, next) {
    try{
      const {limit,offset} = req.body;
      let productsInfo = await Pagination.pageItems('mountain',limit,offset);
      let arr = productsInfo[0];
      res.json(arr);
  } catch (e) {
    console.log(e);
  }
  
  });

  res.render("mountain", {
    title: "Express",
    ...req.nav,
    mountarr: arr,
  });
} catch (e) {
  console.log(e);
}

});



router.get("/:item_id", authMiddleware, passwordWasModified ,(req, res) => {
  let mountainInfoArr = module.exports.mountainInfo
  let place = mountainInfoArr.find((elm) => elm.item_id == req.params.item_id);
  res.render("place_ditales", { ...req.nav, title: place.item_name, place: place });
});

module.exports = router;

