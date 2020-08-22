const express = require("express");
const authMiddleware = require("../middleware/auth");
const clients = require('../models/clients');
const app = require("../app");
const router = express.Router();

// router.use(authMiddleware);

/* GET home page. */
router.get("/", async function (req, res, next) {
  try{
  let productsInfo = await clients.getData('"mountain"');
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

router.get("/auth/:product_id", authMiddleware ,(req, res) => {
  let ttt = module.exports.mountainInfo
  let place = ttt.find((elm) => elm.product_id == req.params.product_id);
  res.render("place_ditales", { ...req.nav, title: place.product_name, place: place });
});

module.exports = router;