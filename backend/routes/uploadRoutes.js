const express = require("express");
const multer = require("multer");
const path = require("path");
const cloudinary = require("../config/cloudinary");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Store uploaded file temporarily in memory
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },

  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    const allowedExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".gif",
    ];

    const extension = path
      .extname(file.originalname)
      .toLowerCase();

    if (
      allowedMimeTypes.includes(file.mimetype) ||
      allowedExtensions.includes(extension)
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed."));
    }
  },
});

// Upload image
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No image file provided.",
        });
      }

      const uploadStream =
        cloudinary.uploader.upload_stream(
          {
            folder: "portfolio",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              console.error(
                "Cloudinary upload error:",
                error
              );

              return res.status(500).json({
                message: "Failed to upload image.",
              });
            }

            return res.status(201).json({
              message: "Image uploaded successfully!",
              imageUrl: result.secure_url,
            });
          }
        );

      uploadStream.end(req.file.buffer);
    } catch (error) {
      console.error(
        "Upload error:",
        error
      );

      return res.status(500).json({
        message: "Failed to upload image.",
      });
    }
  }
);

// Handle upload errors
router.use((error, req, res, next) => {
  console.error("Upload middleware error:", error.message);

  return res.status(400).json({
    message: error.message || "Image upload failed.",
  });
});

module.exports = router;