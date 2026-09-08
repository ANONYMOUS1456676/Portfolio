import React, { useState } from "react";

import {
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { Link } from "react-scroll";

import { useTheme } from "./ThemeProvider";

const NavBar = () => {
  const [nav, setNav] =
    useState(false);

  const { theme } = useTheme();

  const links = [
    {
      id: 1,
      link: "home",
    },
    {
      id: 2,
      link: "about",
    },
    {
      id: 3,
      link: "portfolio",
    },
    {
      id: 4,
      link: "technologies",
    },
    {
      id: 5,
      link: "contact",
    },
  ];

  return (
    <nav
      className="fixed z-50 flex h-20 w-full items-center justify-between px-4"
      style={{
        backgroundColor:
          theme.backgroundColor,

        color:
          theme.textColor,
      }}
    >
      {/* Logo / Name */}

      <div>
        <h1
          className="ml-2 text-3xl font-bold"
          style={{
            color:
              theme.textColor,
          }}
        >
          Akash{" "}
          <span
            style={{
              color:
                theme.primaryColor,
            }}
          >
            Dhiman
          </span>
        </h1>
      </div>

      {/* Desktop Menu */}

      <ul className="hidden md:flex">
        {links.map(
          ({
            id,
            link,
          }) => (
            <li
              key={id}
              className="nav-links cursor-pointer px-4 font-medium capitalize duration-200 hover:scale-105"
              style={{
                color:
                  theme.textColor,
              }}
            >
              <Link
                to={link}
                smooth={true}
                duration={500}
                offset={-80}
              >
                {link}
              </Link>
            </li>
          )
        )}
      </ul>

      {/* Mobile Menu Button */}

      <div
        onClick={() =>
          setNav(!nav)
        }
        className="z-50 cursor-pointer pr-4 md:hidden"
        style={{
          color:
            theme.primaryColor,
        }}
      >
        {nav ? (
          <FaTimes size={30} />
        ) : (
          <FaBars size={30} />
        )}
      </div>

      {/* Mobile Menu */}

      {nav && (
        <ul
          className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center"
          style={{
            backgroundColor:
              theme.backgroundColor,

            color:
              theme.textColor,
          }}
        >
          {links.map(
            ({
              id,
              link,
            }) => (
              <li
                key={id}
                className="cursor-pointer px-4 py-6 text-4xl capitalize"
                style={{
                  color:
                    theme.textColor,
                }}
              >
                <Link
                  to={link}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  onClick={() =>
                    setNav(false)
                  }
                >
                  {link}
                </Link>
              </li>
            )
          )}
        </ul>
      )}
    </nav>
  );
};

export default NavBar;