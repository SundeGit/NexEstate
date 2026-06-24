const express = require("express");
const router = express.Router();
const {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getFeaturedProperties,
  getMyProperties,
  getCities,
} = require("../controllers/propertyController");
const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");

router.get("/featured", getFeaturedProperties);
router.get("/my", protect, getMyProperties);
router.get('/cities', getCities);
router.get("/", getProperties);
router.get("/:id", getPropertyById);
router.post("/", protect, upload.array("images", 10), createProperty);
router.put("/:id", protect, updateProperty);
router.delete("/:id", protect, deleteProperty);


module.exports = router;