const express = require("express");
const PortfolioContent = require("../models/portfolioContent");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get portfolio content
router.get("/", async (req, res) => {
  try {
    let content = await PortfolioContent.findOne();

    // Create default content if none exists
    if (!content) {
      content = await PortfolioContent.create({});
    }

    res.json(content);
  } catch (error) {
    console.error(
      "Error fetching portfolio content:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch portfolio content.",
    });
  }
});

// Update portfolio content
router.put("/", authMiddleware, async (req, res) => {
  try {
    let content = await PortfolioContent.findOne();

    if (!content) {
      content = await PortfolioContent.create(
        req.body
      );
    } else {
      content = await PortfolioContent.findOneAndUpdate(
        {},
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
    }

    res.json({
      message: "Portfolio content updated successfully!",
      content,
    });
  } catch (error) {
    console.error(
      "Error updating portfolio content:",
      error
    );

    res.status(500).json({
      message: "Failed to update portfolio content.",
    });
  }
});

module.exports = router;