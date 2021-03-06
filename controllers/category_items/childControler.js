const Items = require("../../models/mySql/Items");
const Pagination = require("../../models/mySql/pagination");
const mongoose = require("mongoose");
const Reviews = mongoose.model("Reviews");

const childPage = async (req, res) => {
  try {
    let productsInfo = await Pagination.pageItems("child", "asc", 9, 0);
    let arr = productsInfo[0];
    if (req.query.search) {
      arr = productsInfo[0].filter((item) => {
        return item.item_name.search(req.query.search) >= 0;
      });
    }
    res.status(200).render("child", {
      title: "Express",
      ...req.nav,
      childarr: arr,
    });
  } catch (e) {
    res.status(400).json(e);
  }
};

const childPost = async function (req, res, next) {
  try {
    const { limit, offset, sort } = req.body;
    let productsInfo = await Pagination.pageItems("child", sort, limit, offset);
    let arr = productsInfo[0];
    res.status(200).json(arr);
  } catch (e) {
    res.status(400).json(e);
  }
};

const childItem = async (req, res) => {
  try {
    const { item_id } = req.params;
    let itemReview = await Reviews.findOne({ itemId: item_id });
    let place = await Items.getItemByID(req.params.item_id);
    place = place[0][0];
    res.status(200).render("place_ditales", {
      ...req.nav,
      title: place.item_name,
      place: place,
      itemReview,
    });
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports.childPage = childPage;
module.exports.childPost = childPost;
module.exports.childItem = childItem;
