const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema(
  {
    siteId: {
      type: String,
      required: false,
      unique: true,
    },
    url: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sites", siteSchema);
