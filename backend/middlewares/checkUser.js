const jwt = require("jsonwebtoken");
const User = require("../models/User");

const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.TOKEN_SECRET);
      let user = await User.findById(payload.id);
      res.locals.user = user;
      console.log("res.locals", res.locals);
      next();
    } catch (err) {
      console.log(err.message);
      res.locals.user = null;
      next();
    }
  } else {
    res.locals.user = null;
    console.log(res.locals);
    next();
  }
};

module.exports = checkUser;
