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
    let userList = await clients.selectUsers();
    module.exports.userList = userList[0];
    let productsInfo = await Items.getItemsByCategory('electric');
//  let productsInfo = await clients.getData('"electric"');
  let arr = productsInfo[0];
  module.exports.electricInfo = productsInfo[0];
  if (req.query.q) {
    arr = productsInfo[0].filter((item) => {
      return item.product_name.search(req.query.q) >= 0;
    });
  }
    res.render("electric", {
    title: "Express",
    ...req.nav,
    electricarr: arr,
  });
} catch (e) {
  console.log(e);
}

});

router.get("/auth/:item_id", authMiddleware ,(req, res) => {
  let ttt = module.exports.electricInfo
  let place = ttt.find((elm) => elm.item_id == req.params.item_id);
  
  res.render("place_ditales", { ...req.nav, title: place.item_name, place: place });
});

module.exports = router;