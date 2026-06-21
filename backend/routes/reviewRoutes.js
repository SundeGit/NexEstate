const express = require("express");
const router = express.Router();
const { getReviews, createReview, deleteReview } = require("../controllers/reviewController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", getReviews);
router.post("/", createReview);
router.delete("/:id", protect, admin, deleteReview);

module.exports = router;