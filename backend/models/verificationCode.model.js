const mongoose = require("mongoose");

const verificationCodeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  expiry: { type: Date, index: { unique: true, expires: "30d" } },
});

module.exports = mongoose.model("VerificationCodes", verificationCodeSchema);
