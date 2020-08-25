const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const Items = require("../models/mySql/Items");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    let productsInfo = await Items.getItemsByCategory("mountain");
    // console.log("productsInfo", productsInfo[0]);
    // let productsInfo = await clients.getData('"mountain"');
    let arr = productsInfo[0];
    module.exports.mountainInfo = productsInfo[0];
    if (req.query.q) {
      arr = productsInfo[0].filter((item) => {
        return item.product_name.search(req.query.q) >= 0;
      });
    }
    res.render("mountain", {
      title: "Express",
      ...req.nav,
      mountarr: arr,
    });
  } catch (e) {
    console.log(e);
  }
});

router.get("/auth/:item_id", authMiddleware, (req, res) => {
  let ttt = module.exports.mountainInfo;
  let place = ttt.find((elm) => elm.item_id == req.params.item_id);
  res.render("place_ditales", {
    ...req.nav,
    title: place.item_name,
    place: place,
  });
});

module.exports = router;
