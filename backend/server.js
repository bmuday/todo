const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config();
const PORT = process.env.PORT || 5000;

// HTTP Request Logger
const logger = require("morgan");

// Enable access to the API to certain IPs
const cors = require("cors");

//Database connection
require("./db");

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
app.use(cors());

app.get("*", checkUser);

// Route middlewares
app.use(authRoute);
app.use("/posts", postRoute);

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("Please set to production.");
  });
}

// Formating errors
app.use(errorHandler);

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
