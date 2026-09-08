const mongoose = require("mongoose");

const portfolioContentSchema = new mongoose.Schema(
  {
    heroTitle: {
      type: String,
      default: "Hi, I'm Akash",
      trim: true,
    },

    heroSubtitle: {
      type: String,
      default: "Full Stack Developer",
      trim: true,
    },

    heroDescription: {
      type: String,
      default:
        "I build modern and responsive web applications.",
      trim: true,
    },

    resumeUrl: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const PortfolioContent = mongoose.model(
  "PortfolioContent",
  portfolioContentSchema
);

module.exports = PortfolioContent;