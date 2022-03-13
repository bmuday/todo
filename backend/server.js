const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000;

// HTTP Request Logger
const logger = require("morgan");

//Database connection
require("./db");

// Cookies
const cookieParser = require("cookie-parser");

// Managing errors
const { errorHandler } = require("./middlewares/error");

const checkUser = require("./middlewares/checkUser");

// Import routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("tiny"));
app.use(cookieParser());
app.use(errorHandler);

app.get("*", checkUser);
app.get("/", (req, res) => {
  res.send("Welcome to the Todo App!");
});

// Route middlewares
app.use(authRoute);
app.use("/posts", postRoute);

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
