const express = require("express");
const About = require("../models/about");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// =========================
// GET ABOUT CONTENT
// =========================

router.get("/", async (req, res) => {
  try {
    let about = await About.findOne();

    // Create default About content
    // if it doesn't exist
    if (!about) {
      about = await About.create({});
    }

    res.json(about);
  } catch (error) {
    console.error(
      "Error fetching About content:",
      error
    );

    res.status(500).json({
      message:
        "Failed to fetch About content.",
    });
  }
});

// =========================
// UPDATE ABOUT CONTENT
// =========================

router.put("/", authMiddleware, async (req, res) => {
  try {
    let about = await About.findOne();

    // Create if it doesn't exist
    if (!about) {
      about = await About.create(
        req.body
      );
    } else {
      // Update existing About content
      about =
        await About.findOneAndUpdate(
          {},
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
    }

    res.json({
      message:
        "About content updated successfully!",
      about,
    });
  } catch (error) {
    console.error(
      "Error updating About content:",
      error
    );

    res.status(500).json({
      message:
        "Failed to update About content.",
    });
  }
});

module.exports = router;