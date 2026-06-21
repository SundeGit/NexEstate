const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);