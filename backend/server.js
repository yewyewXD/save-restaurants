const express = require("express");
const connectDB = require("./config/database");
const dotenv = require("dotenv");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");

// middleware
dotenv.config();
connectDB();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(compression());
app.use(express.json());
app.use(cookieParser());

// ejs middleware
app.use(express.static("assets"));
app.use("/css", express.static(__dirname + "assets/css"));
app.use("/img", express.static(__dirname + "assets/img"));
app.use("/js", express.static(__dirname + "assets/js"));
app.set("views", "./views");
app.set("view engine", "ejs");

// routes
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const siteRoute = require("./routes/site.route");
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/site", siteRoute);

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
