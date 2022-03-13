const jwt = require("jsonwebtoken");

const verify = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).send("Access Denied");

  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};

module.exports = verify;
