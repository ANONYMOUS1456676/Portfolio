import React, { useState } from "react";
import { useTheme } from "./ThemeProvider";

const Contact = () => {
  const { theme } = useTheme();

  const [result, setResult] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setResult("");

    const formData =
      new FormData(e.target);

    const contactData = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            contactData
          ),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to send message."
        );
      }

      setResult(
        "Message sent successfully! Thank you."
      );

      e.target.reset();
    } catch (error) {
      console.error(
        "Contact form error:",
        error
      );

      setResult(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      name="contact"
      className="w-full min-h-screen"
      style={{
        backgroundColor:
          theme.backgroundColor,

        color:
          theme.textColor,
      }}
    >
      <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full min-h-screen">

        {/* Heading */}

        <div className="pb-8">

          <p
            className="text-4xl font-bold inline border-b-4"
            style={{
              borderColor:
                theme.primaryColor,

              color:
                theme.textColor,
            }}
          >
            Contact
          </p>

          <p
            className="py-6"
            style={{
              color:
                theme.textColor,
            }}
          >
            Submit the form below to get in
            touch with me.
          </p>

        </div>

        {/* Contact Form */}

        <div className="flex justify-center items-center">

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full md:w-1/2"
          >

            {/* Name */}

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="p-2 bg-transparent border-2 rounded-md focus:outline-none"
              style={{
                borderColor:
                  theme.primaryColor,

                color:
                  theme.textColor,
              }}
            />

            {/* Email */}

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="my-4 p-2 bg-transparent border-2 rounded-md focus:outline-none"
              style={{
                borderColor:
                  theme.primaryColor,

                color:
                  theme.textColor,
              }}
            />

            {/* Message */}

            <textarea
              name="message"
              placeholder="Enter your message"
              rows="8"
              required
              className="p-2 bg-transparent border-2 rounded-md focus:outline-none"
              style={{
                borderColor:
                  theme.primaryColor,

                color:
                  theme.textColor,
              }}
            ></textarea>

            {/* Submit Button */}

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor:
                  theme.primaryColor,

                color:
                  theme.textColor,
              }}
            >
              {loading
                ? "Sending..."
                : "Let's Collaborate"}
            </button>

            {/* Result Message */}

            {result && (
              <p
                className="text-center"
                style={{
                  color:
                    theme.primaryColor,
                }}
              >
                {result}
              </p>
            )}

          </form>

        </div>

      </div>
    </div>
  );
};

export default Contact;