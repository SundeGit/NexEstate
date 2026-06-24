const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error('Nevalidna email adresa');
  }

  if (password.length < 8) {
    res.status(400);
    throw new Error('Lozinka mora imati najmanje 8 karaktera');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Korisnik sa ovim emailom već postoji");
  }

  const user = await User.create({ name, email, password, phone });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
      savedProperties: user.savedProperties,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Nevalidni podaci");
  }
});

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
      savedProperties: user.savedProperties,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Nevalidni email ili lozinka");
  }
});

module.exports = { registerUser, loginUser };