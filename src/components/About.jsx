import React, {
  useEffect,
  useState,
} from "react";

import { useTheme } from "./ThemeProvider";

const About = () => {
  const { theme } = useTheme();

  const [about, setAbout] =
    useState({
      title: "About Me",

      description:
        "I am a web developer, working in both, backend and frontend programming. Excited for improving my skills and learning new technologies.",

      experience:
        "I like to code matters from scratch and love the idea of bringing thoughts to life.",
    });

  useEffect(() => {
    fetch(
      "https://portfolio-backend-eight-cyan.vercel.app/api/about"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to fetch About content"
          );
        }

        return response.json();
      })
      .then((data) => {
        setAbout(data);
      })
      .catch((error) => {
        console.error(
          "Error fetching About content:",
          error
        );
      });
  }, []);

  return (
    <div
      name="about"
      className="w-full h-100 about"
      style={{
        backgroundColor:
          theme.backgroundColor,

        color:
          theme.textColor,
      }}
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">

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
            {about.title}
          </p>

        </div>

        <p
          className="text-xl mt-5"
          style={{
            color:
              theme.textColor,
          }}
        >
          {about.description}
        </p>

        <br />

        <p
          className="text-xl"
          style={{
            color:
              theme.textColor,
          }}
        >
          {about.experience}
        </p>

      </div>
    </div>
  );
};

export default About;