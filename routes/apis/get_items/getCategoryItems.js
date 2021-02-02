const express = require("express");
const Items = require("../../../models/mySql/Items");
const pagination = require("../../../models/mySql/pagination");
const router = express.Router();

router.get("/getchild", async (req, res) => {
  try {
    let items = await Items.getItemsByCategory("child");
    res.status(200).json(items);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get("/getmountain", async (req, res) => {
  try {
    let items = await Items.getItemsByCategory("mountain");
    res.status(200).json(items);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get("/getelectric", async (req, res) => {
  try {
    let items = await Items.getItemsByCategory("electric");
    res.status(200).json(items);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get("/getall", async (req, res) => {
  try {
    let items = await Items.getAllItems();
    res.status(200).json(items);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post("/", async (req, res) => {
  try {
    let { str, category } = req.body;
    if ((str.length = 0)) {
      res.status(200).json(0);
    } else {
      let search = await Items.getItemsByitemAndCategoty(str, category);
      search = search[0];
      res.status(200).json(search);
    }
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post("/getall", async (req, res) => {
  try {
    let str = req.body.str;
    if ((str.length = 0)) {
      res.status(200).json(0);
    } else {
      let search = await Items.getItemsBySearch(str);
      search = search[0];
      res.status(200).json(search);
    }
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post("/getsort", async (req, res) => {
  try {
    const { category, sort } = req.body;
    let items = await pagination.pageItems(category, sort, 9, 0);
    res.status(200).json(items);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post("/get_item_by_id", async (req, res) => {
  try {
    let { item_id } = req.body;

    let item_obj = await Items.getItemByID(item_id);
    item_obj = item_obj[0];
    res.status(200).json(item_obj);
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
