const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verify = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      const payload = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = await User.findById(payload.id).select("-password");
      next();
    } catch (err) {
      console.log(err);
      res.status(401).redirect("/login");
      throw new Error("Invalid token. Please login.");
    }
  }

  if (!token) {
    res.status(401).redirect("/login");
    throw new Error("Not authorized. Please login.");
  }
});

module.exports = verify;
