const displayPosts = (req, res) => {
  res.json({ title: "my first post", description: "hello world!" });
};

module.exports = { displayPosts };
