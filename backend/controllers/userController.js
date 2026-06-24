const expressAsyncHandler = require("express-async-handler");
const User = require("../models/User");
const Property = require("../models/Property");

const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const getUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password');
    res.json(users);
});

const deleteUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error('Korisnik nije pronađen');
    }
    await Property.deleteMany({ owner: user._id });
    await user.deleteOne();
    res.json({ message: 'Korisnik obrisan' });
});

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
  user.phone = req.body.phone || user.phone;
  
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
    phone: updatedUser.phone,
    avatar: updatedUser.avatar,
    isAdmin: updatedUser.isAdmin,
    savedProperties: updatedUser.savedProperties,
    token: generateToken(updatedUser._id),
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
  getUsers,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  toggleSavedProperty,
  getSavedProperties,
};