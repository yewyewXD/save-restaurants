const mongoose = require("mongoose");

const verificationCodeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
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
