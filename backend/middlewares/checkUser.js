const jwt = require("jsonwebtoken");
const User = require("../models/User");

const checkUser = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      const payload = jwt.verify(token, process.env.TOKEN_SECRET);
      let user = await User.findById(payload.id);
      res.locals.user = user;
      console.log(res.locals);
      next();
    } catch (err) {
      console.log(err.message);
      res.locals.user = null;
      next();
    }
  }

  if (!token) {
    res.locals.user = null;
    console.log(res.locals);
    next();
  }
};

module.exports = checkUser;
