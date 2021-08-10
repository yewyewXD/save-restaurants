const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  googleLoginUser,
  logoutUser,
} = require("../controllers/auth.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google-login", googleLoginUser);
router.post("/logout", logoutUser);

module.exports = router;
