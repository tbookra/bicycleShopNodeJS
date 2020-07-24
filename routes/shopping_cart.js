var express = require("express");
const clients = require('../models/clients');
var router = express.Router();
const app = express();
app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();

});
let erase = "";

router.get("/", async function (req, res, next) {

try {
  let data = await clients.calcOrder( req.nav.loginname );
  let total = await clients.totalOrder( req.nav.loginname );
  res.render("shopping_cart", { title: "shopping cart", ...req.nav, data1: data[0],total:total[0][0].totalCharge });
 
} catch (e) {
  console.log(e);
}
  
});

router.post("/", async (req, res) => {

  try {
    let data = await clients.newOrder(req.nav.loginname ,req.body.itemID, req.body.amount, req.body.r1);
  console.log('order request' ,req.body.order);
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;