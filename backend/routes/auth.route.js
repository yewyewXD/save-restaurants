const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  googleLoginUser,
  logoutUser,
  verifyUser,
  sendPasswordResetLink,
} = require("../controllers/auth.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google-login", googleLoginUser);
router.post("/logout", logoutUser);

router.post("/verify", verifyUser);
router.get("/reset", sendPasswordResetLink);

module.exports = router;
