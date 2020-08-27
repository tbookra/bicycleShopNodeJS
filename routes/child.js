const express = require("express");
const authMiddleware = require("../middleware/auth");
const Items = require('../models/mySql/Items');
const router = express.Router();

// router.use(authMiddleware);
//jbjdnbjdnbjd
/* GET home page. */
router.get("/", async function (req, res, next) {
  try{
    let productsInfo = await Items.getItemsByCategory('child');
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

router.get("/:item_id", authMiddleware ,(req, res) => {
  let childInfoArr = module.exports.childInfo
  let place = childInfoArr.find((elm) => elm.item_id == req.params.item_id);
  
  res.render("place_ditales", { ...req.nav, title: place.item_name, place: place });
});

module.exports = router;