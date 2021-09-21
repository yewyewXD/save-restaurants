const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    googleId: {
      type: String,
      required: false,
    },
    isVerified: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
