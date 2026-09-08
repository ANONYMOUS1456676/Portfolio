import React from "react";
import { useTheme } from "./ThemeProvider";

function Footer() {
  const { theme } = useTheme();

  return (
    <div
      className="text-center p-6 footer"
      style={{
        backgroundColor:
          theme.backgroundColor,

        color:
          theme.textColor,
      }}
    >
      <span
        className="font-bold"
        style={{
          color:
            theme.textColor,
        }}
      >
        Akash Dhiman
      </span>
    </div>
  );
}

export default Footer;