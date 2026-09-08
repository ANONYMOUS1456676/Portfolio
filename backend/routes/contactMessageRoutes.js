const express = require("express");
const ContactMessage = require("../models/contactMessage");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// =========================
// GET ALL CONTACT MESSAGES
// =========================

router.get("/", authMiddleware, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({
      createdAt: -1,
    });

    res.json(messages);
  } catch (error) {
    console.error(
      "Error fetching contact messages:",
      error
    );

    res.status(500).json({
      message:
        "Failed to fetch contact messages.",
    });
  }
});

// =========================
// MARK MESSAGE AS READ
// =========================

router.put(
  "/:id/read",
  authMiddleware,
  async (req, res) => {
    try {
      const message =
        await ContactMessage.findByIdAndUpdate(
          req.params.id,
          { read: true },
          {
            new: true,
            runValidators: true,
          }
        );

      if (!message) {
        return res.status(404).json({
          message:
            "Contact message not found.",
        });
      }

      res.json({
        message:
          "Message marked as read.",
        contactMessage: message,
      });
    } catch (error) {
      console.error(
        "Error marking message as read:",
        error
      );

      res.status(500).json({
        message:
          "Failed to mark message as read.",
      });
    }
  }
);

// =========================
// DELETE CONTACT MESSAGE
// =========================

router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const message =
        await ContactMessage.findByIdAndDelete(
          req.params.id
        );

      if (!message) {
        return res.status(404).json({
          message:
            "Contact message not found.",
        });
      }

      res.json({
        message:
          "Contact message deleted successfully.",
      });
    } catch (error) {
      console.error(
        "Error deleting contact message:",
        error
      );

      res.status(500).json({
        message:
          "Failed to delete contact message.",
      });
    }
  }
);

module.exports = router;