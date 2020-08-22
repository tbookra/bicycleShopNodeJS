const express = require("express");
const authMiddleware = require("../middleware/auth");
const clients = require('../models/clients');
const app = require("../app");
const router = express.Router();

// router.use(authMiddleware);

/* GET home page. */
router.get("/", async function (req, res, next) {
  try{
    let userList = await clients.selectUsers();
    module.exports.userList = userList[0];
   console.log('this is module.exports.userList',module.exports.userList)
  let productsInfo = await clients.getData('"electric"');
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

router.get("/auth/:product_id", authMiddleware ,(req, res) => {
  let ttt = module.exports.electricInfo
  let place = ttt.find((elm) => elm.product_id == req.params.product_id);
  
  res.render("place_ditales", { ...req.nav, title: place.product_name, place: place });
});

module.exports = router;