const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  rating: {
    type: String,
  },
});

const reviewsSchema = new mongoose.Schema({
  itemId: {
    type: Number,
    require: true,
  },
  reviews: [reviewSchema],
});

mongoose.model("Reviews", reviewsSchema);
