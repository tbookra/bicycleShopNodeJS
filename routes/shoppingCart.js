const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const Items = require("../models/mySql/Items");

router.get("/getCart", async (req, res, next) => {
  try {
    if (!req.session.cart) {
      return res.render("shoppingCart", {
        ...req.nav,
        products: null,
      });
    }
    let cart = await new Cart(req.session.cart);
    let products = await cart.getItems();
    res.render("shoppingCart", {
      ...req.nav,
      products: products,
      totalPrice: cart.totalPrice,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/add/:id", async (req, res, next) => {
  try {
    let productId = req.params.id;
    console.log("add to cart product id = " + productId);
    let cart = await new Cart(req.session.cart ? req.session.cart : {});
    let [product] = await Items.getItemByID(productId);
    console.log("cart product", product[0]);
    // let [products] = await getAllItems();
    // let product = products.filter((item) => {
    //   return item.item_id == productId;
    // });
    cart.add(product[0], productId);
    req.session.cart = cart;
    res.redirect("/");
    console.log("after redirect");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/remove/:id", async (req, res, next) => {
  try {
    let productId = req.params.id;
    let cart = await new Cart(req.session.cart ? req.session.cart : {});
    await cart.remove(productId);
    req.session.cart = cart;
    res.redirect("/shoppingCart/getCart");
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.get("/checkout", (req, res) => {
//   res.render("shop/checkout", {
//     cart: req.session.cart,
//   });
// });

module.exports = router;
