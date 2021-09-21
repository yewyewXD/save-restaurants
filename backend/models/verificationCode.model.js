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
      type: Number,
      default: get30DaysFromNow(),
      expires: 600,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VerificationCode", verificationCodeSchema);
