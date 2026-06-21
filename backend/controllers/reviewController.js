const expressAsyncHandler = require("express-async-handler");
const Review = require("../models/Review");

const getReviews = expressAsyncHandler(async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json(reviews);
});

const createReview = expressAsyncHandler(async (req, res) => {
  const { fullName, text } = req.body;

  if (!fullName || !text) {
    res.status(400);
    throw new Error("Sva polja su obavezna");
  }

  const review = await Review.create({ fullName, text });
  res.status(201).json(review);
});

const deleteReview = expressAsyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error("Recenzija nije pronađena");
  }

  await review.deleteOne();
  res.json({ message: "Recenzija obrisana" });
});

module.exports = { getReviews, createReview, deleteReview };