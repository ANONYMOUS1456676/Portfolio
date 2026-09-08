const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema(
  {
    primaryColor: {
      type: String,
      default: "#06b6d4",
      trim: true,
    },

    backgroundColor: {
      type: String,
      default: "#000000",
      trim: true,
    },

    textColor: {
      type: String,
      default: "#ffffff",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Theme = mongoose.model(
  "Theme",
  themeSchema
);

module.exports = Theme;