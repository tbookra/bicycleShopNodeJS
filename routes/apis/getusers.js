const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    let user = req.session.user;
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get("/with_anonumus", (req, res) => {
  try {
    let user = req.session.user;
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(200).json("anonumus");
    }
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
