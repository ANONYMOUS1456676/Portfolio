import React, {
  useEffect,
  useState,
} from "react";

import HeroImage from "../assets/heroImage.png";
import { useTheme } from "./ThemeProvider";

const Home = () => {
  const { theme } = useTheme();

  const [content, setContent] =
    useState({
      heroTitle:
        "I'm a Full Stack Web Developer",

      heroSubtitle: "",

      heroDescription:
        "I have 2 years of experience building websites and designing software. I love to work on web applications using technologies like React, Tailwind, Next JS.",

      resumeUrl: "",
    });

  useEffect(() => {
    fetch(
      "http://localhost:5000/api/portfolio-content"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to fetch portfolio content"
          );
        }

        return response.json();
      })
      .then((data) => {
        setContent(data);
      })
      .catch((error) => {
        console.error(
          "Error fetching portfolio content:",
          error
        );
      });
  }, []);

  return (
    <div
      name="home"
      className="home h-screen w-full"
      style={{
        background:
          `linear-gradient(to bottom, ${theme.backgroundColor}, ${theme.backgroundColor}, #374151)`,
        color: theme.textColor,
      }}
    >
      <div className="mx-auto flex h-full max-w-screen-lg flex-col items-center justify-center px-4 md:flex-row">

        {/* SMALL SCREEN IMAGE */}

        <div className="small-screen hidden">
          <img
            src={HeroImage}
            alt="profile"
            className="mx-auto w-2/3 rounded-2xl md:w-full"
          />
        </div>

        {/* HERO CONTENT */}

        <div className="flex h-full flex-col justify-center">

          <h2
            className="text-4xl font-bold sm:text-7xl"
            style={{
              color: theme.textColor,
            }}
          >
            {content.heroTitle}
          </h2>

          {content.heroSubtitle && (
            <h3
              className="mt-4 text-3xl font-bold sm:text-5xl"
              style={{
                color: theme.primaryColor,
              }}
            >
              {content.heroSubtitle}
            </h3>
          )}

          <p
            className="max-w-md py-4"
            style={{
              color: theme.textColor,
            }}
          >
            {content.heroDescription}
          </p>

          {content.resumeUrl && (
            <a
              href={content.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="w-fit rounded-md px-6 py-3 text-white duration-300 hover:scale-105"
              style={{
                background:
                  `linear-gradient(to right, ${theme.primaryColor}, #2563eb)`,
              }}
            >
              Resume
            </a>
          )}

        </div>

        {/* LARGE SCREEN IMAGE */}

        <div className="big-screen">
          <img
            src={HeroImage}
            alt="profile"
            className="mx-auto w-2/3 rounded-2xl md:w-full"
          />
        </div>

      </div>
    </div>
  );
};

export default Home;