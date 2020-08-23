const express = require("express");
const authMiddleware = require("../middleware/auth");
const clients = require('../models/mySql/clients');
const Items = require('../models/mySql/Items');
const app = require("../app");
const router = express.Router();



// router.use(authMiddleware);

/* GET home page. */
router.get("/", async function (req, res, next) {
    try{
    let productsInfo = await Items.getItemsByCategory('child');
    // let productsInfo = await clients.getData('"child"');
    console.log('productsInfo: '+ productsInfo[0][0].product_name);
    let arr = productsInfo[0];
    module.exports.childInfo = productsInfo[0];
    if (req.query.q) {
      arr = productsInfo[0].filter((item) => {
        return item.product_name.search(req.query.q) >= 0;
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

router.get("/auth/:product_id", authMiddleware ,(req, res) => {
  let ttt = module.exports.childInfo
  let place = ttt.find((elm) => elm.item_id == req.params.item_id);
  res.render("place_ditales", { ...req.nav, title: place.item_name, place: place });
});

module.exports = router;