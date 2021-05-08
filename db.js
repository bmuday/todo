const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const credentials = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  port: 27017,
};

mongoose.connect(
  `mongodb+srv://${credentials.user}:${credentials.password}@cluster0.nnbxv.mongodb.net/${credentials.database}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!");
});
