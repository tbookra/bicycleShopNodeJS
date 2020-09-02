const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const Items = require("../models/mySql/Items");

const passwordWasModified = require("../middleware/passwordWasModified");

router.get("/getCart", passwordWasModified, async (req, res, next) => {
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
      userID: req.session.user.user_id,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/add/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;
    let cart = await new Cart(req.session.cart ? req.session.cart : {});
    let [product] = await Items.getItemByID(productId);
    cart.add(product[0], productId);
    req.session.cart = cart;
    res.redirect("/");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/remove/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;
    let cart = await new Cart(req.session.cart ? req.session.cart : {});
    await cart.remove(productId);
    req.session.cart = cart;
    res.redirect("/shoppingCart/getCart");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
