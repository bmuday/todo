const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user.id });

  res.status(200).json(posts);
});

const createPost = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400);
    throw new Error("Please add a text field.");
  }

  const post = await Post.create({
    user: req.user.id,
    text,
  });

  res.status(200).json(post);
});

const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text) {
    res.status(400);
    throw new Error("Please add a text field to update your post.");
  }

  const post = await Post.findById(id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found.");
  }

  const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });

  res.status(201).json(updatedPost);
});

const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found.");
  }

  await post.remove();
  console.log("deletedPost", post);
  res.status(201).json(post);
});

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
