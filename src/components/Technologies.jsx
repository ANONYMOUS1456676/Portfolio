import React from "react";

import html from "../assets/html.png";
import css from "../assets/css.png";
import javascript from "../assets/javascript.png";
import reactImage from "../assets/react.png";
import nextjs from "../assets/nextjs.png";
import github from "../assets/github.png";
import tailwind from "../assets/tailwind.png";
import node from "../assets/node.png";
import express from "../assets/express.png";
import mongodb from "../assets/mongodb.png";

import { useTheme } from "./ThemeProvider";

const Technologies = () => {
  const { theme } = useTheme();

  const techs = [
    {
      id: 1,
      src: html,
      title: "HTML",
    },
    {
      id: 2,
      src: css,
      title: "CSS",
    },
    {
      id: 3,
      src: javascript,
      title: "JavaScript",
    },
    {
      id: 4,
      src: reactImage,
      title: "React",
    },
    {
      id: 5,
      src: node,
      title: "Node.js",
    },
    {
      id: 6,
      src: nextjs,
      title: "Next.js",
    },
    {
      id: 7,
      src: github,
      title: "GitHub",
    },
    {
      id: 8,
      src: tailwind,
      title: "Tailwind CSS",
    },
    {
      id: 9,
      src: express,
      title: "Express",
    },
    {
      id: 10,
      src: mongodb,
      title: "MongoDB",
    },
  ];

  return (
    <div
      id="technologies"
      className="w-full min-h-screen"
      style={{
        backgroundColor:
          theme.backgroundColor,
        color: theme.textColor,
      }}
    >
      <div
        className="flex flex-col justify-center w-full min-h-screen max-w-screen-lg p-4 mx-auto"
      >
        {/* Section Header */}

        <div>
          <p
            className="inline-block p-2 text-4xl font-bold border-b-4"
            style={{
              borderColor:
                theme.primaryColor,

              color:
                theme.textColor,
            }}
          >
            Technologies
          </p>

          <p
            className="py-6"
            style={{
              color:
                theme.textColor,
            }}
          >
            These are the technologies I've
            worked with and used in my
            projects.
          </p>
        </div>

        {/* Technologies Grid */}

        <div className="grid w-full grid-cols-2 gap-8 px-12 py-8 text-center sm:grid-cols-3 sm:px-0">
          {techs.map(
            ({
              id,
              src,
              title,
            }) => (
              <div
                key={id}
                className="py-2 rounded-lg shadow-md hover:scale-105 duration-500"
                style={{
                  boxShadow:
                    `0 4px 6px -1px ${theme.primaryColor}`,
                }}
              >
                <img
                  src={src}
                  alt={title}
                  className="w-20 mx-auto"
                />

                <p
                  className="mt-4 font-semibold"
                  style={{
                    color:
                      theme.textColor,
                  }}
                >
                  {title}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Technologies;