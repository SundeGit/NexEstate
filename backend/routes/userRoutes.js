const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  toggleSavedProperty,
  getSavedProperties,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, upload.single("avatar"), updateUserProfile);
router.put("/saved/:id", protect, toggleSavedProperty);
router.get("/saved", protect, getSavedProperties);

module.exports = router;