const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "About Me",
      trim: true,
    },

    description: {
      type: String,
      default:
        "I'm a passionate Full-Stack Developer who enjoys building modern, responsive, and user-friendly web applications.",
      trim: true,
    },

    experience: {
      type: String,
      default:
        "I have experience working with React.js, JavaScript, Next.js, Node.js, MongoDB, and Tailwind CSS.",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const About = mongoose.model(
  "About",
  aboutSchema
);

module.exports = About;