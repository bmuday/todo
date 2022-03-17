import axios from "axios";
const API_URL = "https://todo-app-bmuday.herokuapp.com";

// Register user
const register = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);

  if (res.data.message) {
    throw new Error(res.data.message);
  } else if (res.data.id) {
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  }
};

// Login user
const login = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);

  if (res.data.message) {
    throw new Error(res.data.message);
  } else if (res.data.id) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = { register, login, logout };

export default authService;
