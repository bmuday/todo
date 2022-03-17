const router = require("express").Router();
const verify = require("../middlewares/verifyToken");
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post");

// Private routes
router.get("/", verify, getPosts);
router.post("/", verify, createPost);
router.put("/:id", verify, updatePost);
router.delete("/:id", verify, deletePost);

module.exports = router;
