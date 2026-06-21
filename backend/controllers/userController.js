const expressAsyncHandler = require("express-async-handler");
const User = require("../models/User");
const Property = require("../models/Property");

const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("Korisnik nije pronađen");
  }
});

const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("Korisnik nije pronađen");
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) {
    user.password = req.body.password;
  }
  if (req.file) {
    user.avatar = req.file.path;
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    avatar: updatedUser.avatar,
    isAdmin: updatedUser.isAdmin,
    savedProperties: updatedUser.savedProperties,
  });
});

const toggleSavedProperty = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const propertyId = req.params.id;

  const isSaved = user.savedProperties.includes(propertyId);

  if (isSaved) {
    user.savedProperties = user.savedProperties.filter(
      (id) => id.toString() !== propertyId
    );
  } else {
    user.savedProperties.push(propertyId);
  }

  await user.save();
  res.json({ savedProperties: user.savedProperties });
});

const getSavedProperties = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("savedProperties");
  res.json(user.savedProperties);
});

module.exports = {
  getUserProfile,
  updateUserProfile,
  toggleSavedProperty,
  getSavedProperties,
};