const express = require("express");
const connectDB = require("./config/database");
const dotenv = require("dotenv");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const sessionConfig = require("./config/session");

// middleware
dotenv.config();
connectDB();
const app = express();

app.use(sessions(sessionConfig));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);
app.use(compression());
app.use(express.json());
app.use(cookieParser());

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
