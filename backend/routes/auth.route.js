const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/user.controller");

// Register user
router.post("/register", registerUser);

module.exports = router;
