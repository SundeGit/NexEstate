const express = require("express");
const router = express.Router();

const {
  getUsers,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  toggleSavedProperty,
  getSavedProperties,
} = require("../controllers/userController");

const { protect, admin } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, upload.single("avatar"), updateUserProfile);
router.put("/saved/:id", protect, toggleSavedProperty);
router.get("/saved", protect, getSavedProperties);

router.get("/", protect, admin, getUsers);
router.delete("/:id", protect, admin, deleteUser);

module.exports = router;