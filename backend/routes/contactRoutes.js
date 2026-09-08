const express = require("express");
const nodemailer = require("nodemailer");
const ContactMessage = require("../models/contactMessage");

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        message:
          "Name, email and message are required.",
      });
    }

    // =========================
    // SAVE MESSAGE TO MONGODB
    // =========================

    const contactMessage =
      await ContactMessage.create({
        name,
        email,
        message,
      });

    // =========================
    // SEND EMAIL
    // =========================

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,

      subject: `Portfolio Contact: Message from ${name}`,

      text: `
You received a new message from your portfolio website.

Name: ${name}
Email: ${email}

Message:
${message}
      `,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
          "
        >
          <h2>
            New Portfolio Contact Message
          </h2>

          <p>
            <strong>Name:</strong>
            ${name}
          </p>

          <p>
            <strong>Email:</strong>
            ${email}
          </p>

          <hr />

          <p>
            <strong>Message:</strong>
          </p>

          <p>
            ${message.replace(
              /\n/g,
              "<br />"
            )}
          </p>
        </div>
      `,
    };

    await transporter.sendMail(
      mailOptions
    );

    console.log(
      "Contact message saved and email sent successfully!"
    );

    res.status(201).json({
      message:
        "Message sent successfully!",
      contactMessage,
    });
  } catch (error) {
    console.error(
      "Contact message error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to send message. Please try again.",
    });
  }
});

module.exports = router;