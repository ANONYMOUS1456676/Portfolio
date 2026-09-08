const express = require("express");

const Project = require("../models/project");
const Blog = require("../models/blog");

const router = express.Router();

// =========================
// GET DASHBOARD STATISTICS
// =========================

router.get("/", async (req, res) => {
  try {
    const totalProjects =
      await Project.countDocuments();

    const totalBlogs =
      await Blog.countDocuments();

    const publishedBlogs =
      await Blog.countDocuments({
        published: true,
      });

    res.json({
      totalProjects,
      totalBlogs,
      publishedBlogs,
    });
  } catch (error) {
    console.error(
      "Error fetching dashboard statistics:",
      error
    );

    res.status(500).json({
      message:
        "Failed to fetch dashboard statistics.",
    });
  }
});

module.exports = router;