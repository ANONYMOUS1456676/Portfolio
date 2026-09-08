const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// ==========================================
// LOGIN
// ==========================================

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Get admin credentials from .env
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Check credentials are configured
    if (!adminUsername || !adminPassword) {
      console.error("Admin credentials are missing from .env");

      return res.status(500).json({
        message: "Admin credentials are not configured",
      });
    }

    // Check username
    if (username !== adminUsername) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(
      password,
      await bcrypt.hash(adminPassword, 10)
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    // Check JWT secret
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing from .env");

      return res.status(500).json({
        message: "JWT secret is not configured",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        username: adminUsername,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Send response
    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;