const mongoose = require("mongoose");
require("dotenv").config();

const { USERNAME, PASSWORD, DB } = process.env;

mongoose
  .connect(
    `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.nnbxv.mongodb.net/${DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch(() => {
    console.log("Connection to MongoDB failed!");
    process.exit(1);
  });
