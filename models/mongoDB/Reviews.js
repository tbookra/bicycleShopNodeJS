const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
  itemId: {
    type: Number,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
});

mongoose.model("Reviews", reviewsSchema);
