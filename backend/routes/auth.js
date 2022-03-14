const router = require("express").Router();
const { registerUser, loginUser, logoutUser } = require("../controllers/auth");

// Registration
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Logout
router.get("/logout", logoutUser);

module.exports = router;
