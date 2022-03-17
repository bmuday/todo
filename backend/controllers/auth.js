const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const {
  registerValidation,
  loginValidation,
} = require("../middlewares/validation");

// Create and assign a token
const createToken = (id, expiration) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: expiration });
};

const registerUser = asyncHandler(async (req, res) => {
  const { error, value } = registerValidation(req.body);

  if (error) {
    res.status(400);
    throw new Error(error);
  }

  const { username, email, password } = value;

  // Checking if the user is already in the database
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    res.status(400);
    throw new Error("Username already taken");
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    res.status(400);
    throw new Error("Email already exists");
  }

  // Hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user) {
    const maxAge = 15 * 60; // 5min d'expiration
    const token = createToken(user._id, maxAge);
    res.status(201).json({
      id: user._id,
      username: user.username,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { error, value } = loginValidation(req.body);

  if (error) {
    res.status(400);
    throw new Error(error);
  }

  const { email, password } = value;

  // Checking if the email is already in the database
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Email not found");
  }

  //Checking if password is correct
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    res.status(400);
    throw new Error("Wrong password");
  }

  const maxAge = 15 * 60; // 5min d'expiration
  const token = createToken(user._id, maxAge);
  res.status(201).json({
    id: user._id,
    username: user.username,
    token,
  });
});

module.exports = { registerUser, loginUser };
