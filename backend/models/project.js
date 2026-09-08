const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    technologies: {
      type: [String],
      default: []
    },

    image: {
      type: String,
      default: ""
    },

    github: {
      type: String,
      default: ""
    },

    live: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;