import React, { useEffect, useState } from "react";

import addonHolidays from "../assets/portfolio/addon-holidays.png";
import dealport from "../assets/portfolio/dealport.png";
import santaProperty from "../assets/portfolio/santa-property.png";

import { useTheme } from "./ThemeProvider";

const Portfolio = () => {
  const { theme } = useTheme();

  const [portfolios, setPortfolios] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://portfolio-m7y8.onrender.com/api/projects")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        return response.json();
      })
      .then((data) => {
        setPortfolios(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching projects:",
          error
        );

        setError("Failed to load projects.");

        setLoading(false);
      });
  }, []);

  const getProjectImage = (title) => {
    if (title === "Addon Holidays") {
      return addonHolidays;
    }

    if (title === "Dealport Dashboard") {
      return dealport;
    }

    if (title === "Santa Property") {
      return santaProperty;
    }

    return "";
  };

  return (
    <div
      name="portfolio"
      className="w-full min-h-screen portfolio"
      style={{
        backgroundColor:
          theme.backgroundColor,

        color:
          theme.textColor,
      }}
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full min-h-screen">

        {/* Portfolio Heading */}

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
            Portfolio
          </p>

          <p
            className="py-6"
            style={{
              color:
                theme.textColor,
            }}
          >
            Check out some of my work right here
          </p>

        </div>

        {/* Loading */}

        {loading && (
          <p
            className="text-center text-lg"
            style={{
              color:
                theme.textColor,
            }}
          >
            Loading projects...
          </p>
        )}

        {/* Error */}

        {error && (
          <p
            className="text-center"
            style={{
              color: "#f87171",
            }}
          >
            {error}
          </p>
        )}

        {/* Project Cards */}

        {!loading && !error && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 sm:px-0">

            {portfolios.map((project) => {
              const image =
                getProjectImage(
                  project.title
                );

              return (
                <div
                  key={project._id}
                  className="relative h-80 rounded-lg overflow-hidden shadow-md group"
                  style={{
                    boxShadow:
                      `0 4px 6px -1px ${theme.primaryColor}`,
                  }}
                >

                  {/* Project Background Image */}

                  {image && (
                    <img
                      src={image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}

                  {/* Dark Overlay */}

                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/70 transition duration-300"></div>

                  {/* Project Content */}

                  <div className="absolute inset-0 flex flex-col justify-end p-5">

                    {/* Project Name */}

                    <h2
                      className="text-2xl font-bold text-center mb-4 drop-shadow-lg"
                      style={{
                        color:
                          theme.textColor,
                      }}
                    >
                      {project.title}
                    </h2>

                    {/* Buttons */}

                    <div className="flex items-center justify-center gap-3">

                      {/* Demo Button */}

                      <button
                        className="w-1/2 px-5 py-3 rounded-md duration-200 hover:scale-105"
                        style={{
                          backgroundColor:
                            theme.primaryColor,

                          color:
                            theme.textColor,
                        }}
                        onClick={() => {
                          if (project.live) {
                            window.open(
                              project.live,
                              "_blank"
                            );
                          }
                        }}
                      >
                        Demo
                      </button>

                      {/* GitHub Button */}

                      <button
                        className="w-1/2 px-5 py-3 rounded-md duration-200 hover:scale-105"
                        style={{
                          backgroundColor:
                            theme.primaryColor,

                          color:
                            theme.textColor,
                        }}
                        onClick={() => {
                          if (project.github) {
                            window.open(
                              project.github,
                              "_blank"
                            );
                          }
                        }}
                      >
                        GitHub
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
};

export default Portfolio;