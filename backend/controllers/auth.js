const User = require("../models/User");
const {
  registerValidation,
  loginValidation,
} = require("../middlewares/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create and assign a token
const createToken = (id, expiration) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: expiration });
};

const registerUser = async (req, res) => {
  const { error, value } = registerValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const { username, email, password } = value;

  // Checking if the user is already in the database
  const usernameExists = await User.findOne({ username });
  if (usernameExists) return res.status(400).send("Username already taken");

  const emailExists = await User.findOne({ email });
  if (emailExists) return res.status(400).send("Email already exists");

  // Hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    if (user) {
      const maxAge = 5 * 60; // 5min d'expiration
      const token = createToken(user._id, maxAge);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).send(`User ${user} registered with token ${token}`);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

const loginUser = async (req, res) => {
  const { error, value } = loginValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = value;

  // Checking if the email is already in the database
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Email is not found");

  //Checking if password is correct
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Wrong password");
  const maxAge = 5 * 60; // 5min d'expiration
  const token = createToken(user._id, maxAge);
  res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
  res.status(201).send(`User ${user} logged in with token ${token}`);
};

const logoutUser = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = { registerUser, loginUser, logoutUser };
