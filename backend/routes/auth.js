const router = require("express").Router();
const { registerUser, loginUser, logoutUser } = require("../controllers/auth");

// Registration
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Logout
router.get("/logout", logoutUser);

// router.get("/set-cookies", (req, res) => {
//   //   res.setHeader("Set-Cookie", "newUser=true");
//   res.cookie("newUser", false);
//   res.cookie("isEmployee", true, {
//     maxAge: 1000 * 24 * 60 * 60,
//     secure: true,
//     httpOnly: true,
//   });

//   res.send("You got the cookies!");
// });

// router.get("/get-cookies", (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies);

//   res.json(cookies);
// });

module.exports = router;
