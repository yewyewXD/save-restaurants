const express = require("express");
const connectDB = require("./config/database");
const dotenv = require("dotenv");

// middleware
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.send("welcome");
});

// port
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server is running in ${
      process.env.NODE_ENV || "development"
    } on port ${PORT}`
  )
);
