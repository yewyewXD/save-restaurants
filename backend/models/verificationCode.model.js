const mongoose = require("mongoose");
const { get30DaysFromNow } = require("../utils/day.utils");

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
      expires: 2592000, // expires after 30 days
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VerificationCode", verificationCodeSchema);
