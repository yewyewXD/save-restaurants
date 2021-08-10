const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  googleLoginUser,
} = require("../controllers/auth.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google-login", googleLoginUser);

module.exports = router;
