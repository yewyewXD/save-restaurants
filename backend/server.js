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
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

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
