const express = require("express");
const router = express.Router();
const { getUser } = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");

router.get("/", auth, getUser);

module.exports = router;
