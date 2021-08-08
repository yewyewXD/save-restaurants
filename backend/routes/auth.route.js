const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  googleLoginUser,
} = require("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware");

// Register user
router.post("/register", registerUser);
router.post("/login", auth, loginUser);
router.post("/google-login", googleLoginUser);

module.exports = router;
