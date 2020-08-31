const express = require("express");
const authMiddleware = require("../middleware/auth");
const Items = require('../models/mySql/Items');
const Pagination = require('../models/mySql/pagination');
const router = express.Router();

const passwordWasModified = require('../middleware/passwordWasModified');



router.get("/", async function (req, res, next) {
  try{
    let productsInfo = await Pagination.pageItems('child',9,0);
    let arr = productsInfo[0];
    module.exports.childInfo = productsInfo[0];
    if (req.query.search) {
    arr = productsInfo[0].filter((item) => {
    return item.item_name.search(req.query.search) >= 0;
    });
  }
    res.render("child", {
    title: "Express",
    ...req.nav,
    childarr: arr,
  });
} catch (e) {
  console.log(e);
}

});

router.post("/", async function (req, res, next) {
  try{
    const {limit,offset} = req.body;
    let productsInfo = await Pagination.pageItems('child',limit,offset);
    let arr = productsInfo[0];
    res.json(arr);
} catch (e) {
  console.log(e);
}

});

router.get("/:item_id", authMiddleware,passwordWasModified ,(req, res) => {
  let childInfoArr = module.exports.childInfo
  let place = childInfoArr.find((elm) => elm.item_id == req.params.item_id);
  
  res.render("place_ditales", { ...req.nav, title: place.item_name, place: place });
});

module.exports = router;