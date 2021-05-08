const express = require("express");
const app = express();

// HTTP Request Logger
const logger = require("morgan");

//Database connection
const db = require("./db");

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("tiny"));

// Import routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

// Route middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
