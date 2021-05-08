const router = require("express").Router();
const verify = require("./middlewares/verifyToken");

router.get("/", verify, (req, res) => {
  res.json({ title: "my first post", description: "hello world!" });
  console.log(req.user);
});

module.exports = router;
