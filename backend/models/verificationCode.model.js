const mongoose = require("mongoose");

const verificationCodeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    expiry: {
      type: Date,
      default: Date.now(),
      expires: 600,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VerificationCode", verificationCodeSchema);
