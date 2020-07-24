const express = require("express");
const router = express.Router();
const { getAllUsers, getUser } = require("../models/mySql/Users");
/* GET users listing. */

//get all users
router.get("/", async (req, res, next) => {
  try {
    let [users] = await getAllUsers();
    res.json(users);
  } catch (e) {
    console.log(e);
  }
});

//get user by id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    let [user] = await getUser(id);
    res.json(user);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
