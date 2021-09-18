const express = require("express");
const router = express.Router();
const { getUserMe } = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");

router.get("/me", auth, getUserMe);

module.exports = router;
