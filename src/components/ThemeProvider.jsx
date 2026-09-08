import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    primaryColor: "#06b6d4",
    backgroundColor: "#000000",
    textColor: "#ffffff",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/theme"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch theme"
          );
        }

        const data = await response.json();

        setTheme({
          primaryColor:
            data.primaryColor ||
            "#06b6d4",

          backgroundColor:
            data.backgroundColor ||
            "#000000",

          textColor:
            data.textColor ||
            "#ffffff",
        });
      } catch (error) {
        console.error(
          "Error loading theme:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTheme();
  }, []);

  useEffect(() => {
    // Store theme colors as CSS variables
    document.documentElement.style.setProperty(
      "--primary-color",
      theme.primaryColor
    );

    document.documentElement.style.setProperty(
      "--background-color",
      theme.backgroundColor
    );

    document.documentElement.style.setProperty(
      "--text-color",
      theme.textColor
    );

    // Apply background and text color
    document.body.style.backgroundColor =
      theme.backgroundColor;

    document.body.style.color =
      theme.textColor;
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        loading,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;