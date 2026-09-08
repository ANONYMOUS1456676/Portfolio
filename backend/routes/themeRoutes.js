const express = require("express");
const Theme = require("../models/theme");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// =========================
// GET THEME
// =========================

router.get("/", async (req, res) => {
  try {
    let theme = await Theme.findOne();

    // Create default theme if it doesn't exist
    if (!theme) {
      theme = await Theme.create({});
    }

    res.json(theme);
  } catch (error) {
    console.error(
      "Error fetching theme:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch theme.",
    });
  }
});

// =========================
// UPDATE THEME
// =========================

router.put("/", authMiddleware, async (req, res) => {
  try {
    let theme = await Theme.findOne();

    if (!theme) {
      theme = await Theme.create(
        req.body
      );
    } else {
      theme =
        await Theme.findOneAndUpdate(
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
        "Theme updated successfully!",
      theme,
    });
  } catch (error) {
    console.error(
      "Error updating theme:",
      error
    );

    res.status(500).json({
      message: "Failed to update theme.",
    });
  }
});

module.exports = router;