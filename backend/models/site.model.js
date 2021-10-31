const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema(
  {
    netlifyId: {
      type: String,
      required: false,
      unique: true,
    },
    // url after deployment
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

    // main fields
    header: {
      type: Object,
      required: false,
    },
    hero: {
      type: Object,
      required: false,
    },
    about: {
      type: Object,
      required: false,
    },
    menu: {
      type: Object,
      required: false,
    },
    contact: {
      type: Object,
      required: false,
    },
    social: {
      type: Object,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sites", siteSchema);
