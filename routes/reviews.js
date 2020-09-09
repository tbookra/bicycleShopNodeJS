const router = require("express").Router();
const mongoose = require("mongoose");
const Reviews = mongoose.model("Reviews");
router.post("/", async (req, res) => {
  const { title, description, rating, item_id } = req.body;
  try {
    let itemReview = await Reviews.findOne({ itemId: item_id });
    if (itemReview) {
      itemReview.reviews = [
        ...itemReview.reviews,
        { title, description, rating },
      ];
      await itemReview.save();
    } else {
      const review = new Reviews({
        itemId: item_id,
        reviews: [{ title, description, rating }],
      });
      await review.save();
    }
    // console.log(req.session);
    let lastLocation = req.session.lastLocation;
    res.redirect(`/${lastLocation.category}/${lastLocation.item_id}`);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
