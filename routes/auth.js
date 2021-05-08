const router = require("express").Router();

const User = require("../models/User");

const {
  registerValidation,
  loginValidation,
} = require("./middlewares/validation");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("Welcome to the user api!");
});

// Registration
router.post("/register", async (req, res) => {
  const { error, value } = registerValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const { username, email, password } = value;

  // Checking if the user is already in the database
  const emailExists = await User.findOne({ email });
  if (emailExists) return res.status(400).send("Email already exists");

  // Hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.status(200).send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  const { error, value } = loginValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = value;

  // Checking if the email is already in the database
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Email is not found");

  //Checking if password is correct
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Wrong password");

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);

  res.send("User logged in!");
});

// Private routes

module.exports = router;
