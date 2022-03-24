import axios from "axios";
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://todo-app-bmuday.herokuapp.com"
    : "http://localhost:5000";

// Get all posts
const getPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(`${API_URL}/posts`, config);

  if (res.data.message) {
    console.log("postsError");
    throw new Error(res.data.message);
  }
  return res.data;
};

// Create new post
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(`${API_URL}/posts`, postData, config);

  if (res.data.message) {
    throw new Error(res.data.message);
  } else if (res.data.text) {
    return res.data;
  }
};

// Update post
const updatePost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // postId
  const res = await axios.put(`${API_URL}/posts`, postData, config);

  if (res.data.message) {
    throw new Error(res.data.message);
  } else if (res.data.text) {
    return res.data;
  }
};

// Delete post
const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(`${API_URL}/posts/${postId}`, config);

  if (res.data.message) {
    throw new Error(res.data.message);
  }
  return res.data;
};

const postService = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
};

export default postService;
