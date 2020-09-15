const express = require("express");
const router = express.Router();
const Users = require("../models/mySql/Users");
const Orders = require("../models/mySql/Orders");
const Cart = require("../models/cart");
router.get("/userInfo/:id", async (req, res) => {
  const { id } = req.params;
  let userInfoValidation = req.session.userInfoValidation
    ? req.session.userInfoValidation[0]
    : false;
  req.session.userInfoFormError;
  let userInfoFormError = req.session.userInfoFormError
    ? req.session.userInfoFormError[0]
    : false;

  try {
    const [userInfo] = await Users.getUserInfo(id);

    res.render("checkout", {
      cart: req.session.cart,
      userInfo: userInfo[0],
      userID: id,
      userInfoValidation,
      userInfoFormError,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/userInfo", async (req, res) => {
  const { user_id } = req.body;
  let bodyIsWithData = Object.keys(req.body).every((k) => {
    return req.body[k];
  });
  if (!bodyIsWithData) {
    req.session.userInfoFormError = ["please fill all form inputs"];
    return res.redirect(`/orders/userInfo/${user_id}`);
  }
  try {
    await Users.insertUserInfo(req.body);

    res.redirect(`/orders/userInfo/${parseInt(user_id)}`);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/placeOrder", async (req, res) => {
  const { user, cart } = req.session;
  const currectInfo = req.body.currectInfo || false;
  const needToUpdateInfo = req.body.needToUpdateInfo || false;
  try {
    if (!needToUpdateInfo && !currectInfo) {
      req.session.userInfoValidation = ["please choose an option"];
      res.redirect(`/orders/userInfo/${user.user_id}`);
    } else if (needToUpdateInfo && currectInfo) {
      req.session.userInfoValidation = ["you cant choose both"];
      res.redirect(`/orders/userInfo/${user.user_id}`);
    } else if (needToUpdateInfo && !currectInfo) {
      await Users.deleteUserInfo(user.user_id);
      req.session.userInfoValidation = [];
      res.redirect(`/orders/userInfo/${user.user_id}`);
    } else if (!needToUpdateInfo && currectInfo) {
      await Orders.createOrder(user.user_id, cart.totalPrice);
      let [newOrder] = await Orders.getOrdersByUserID(user.user_id);
      const order_id = newOrder[newOrder.length - 1].order_id;

      let currentCartItems = await new Cart(cart).getItems();

      for (let product of currentCartItems) {
        await Orders.insertIntoOrderItem(
          order_id,
          product.item.item_id,
          product.quantity
        );
      }
      req.session.cart = {};
      req.session.userInfoValidation = [];
      res.status(201).render("afterOrder");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
