const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/auth");

// Registration
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

module.exports = router;
