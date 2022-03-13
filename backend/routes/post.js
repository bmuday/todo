const router = require("express").Router();
const verify = require("../middlewares/verifyToken");
const { displayPosts } = require("../controllers/post");

// Private routes
router.get("/", verify, displayPosts);

module.exports = router;
