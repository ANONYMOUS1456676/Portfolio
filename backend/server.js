const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

// =========================
// IMPORT ROUTES
// =========================

const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const contactRoutes = require("./routes/contactRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const portfolioContentRoutes = require("./routes/portfolioContentRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const themeRoutes = require("./routes/themeRoutes");
const statsRoutes = require("./routes/statsRoutes");
const contactMessageRoutes = require("./routes/contactMessageRoutes");

// =========================
// CREATE EXPRESS APP
// =========================

const app = express();

// =========================
// CORS
// =========================

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://portfolio-rho-azure-28.vercel.app",
    ],
  })
);

// =========================
// BODY PARSER
// =========================

app.use(express.json());

// =========================
// API ROUTES
// =========================

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/blogs",
  blogRoutes
);

app.use(
  "/api/contact",
  contactRoutes
);

app.use(
  "/api/upload",
  uploadRoutes
);

app.use(
  "/api/portfolio-content",
  portfolioContentRoutes
);

app.use(
  "/api/about",
  aboutRoutes
);

app.use(
  "/api/theme",
  themeRoutes
);

app.use(
  "/api/stats",
  statsRoutes
);

app.use(
  "/api/contact-messages",
  contactMessageRoutes
);

// =========================
// HOME ROUTE
// =========================

app.get("/", (req, res) => {
  res.json({
    message: "Portfolio Backend is running!",
  });
});

// =========================
// SERVER PORT
// =========================

const PORT =
  process.env.PORT || 5000;

// =========================
// MONGODB CONNECTION
// =========================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(
      "MongoDB Connected Successfully"
    );

    app.listen(PORT, () => {
      console.log(
        `Server is running on http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB Connection Failed:",
      error.message
    );
  });