import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminBlogs from "./AdminBlogs";

// =========================
// API URLS
// =========================

const PROJECT_API_URL =
  "http://localhost:5000/api/projects";

const UPLOAD_API_URL =
  "http://localhost:5000/api/upload";

const PORTFOLIO_CONTENT_API_URL =
  "http://localhost:5000/api/portfolio-content";

const ABOUT_API_URL =
  "http://localhost:5000/api/about";

const THEME_API_URL =
  "http://localhost:5000/api/theme";

const STATS_API_URL =
  "http://localhost:5000/api/stats";

const CONTACT_MESSAGES_API_URL =
  "http://localhost:5000/api/contact-messages";

// =========================
// ADMIN COMPONENT
// =========================

const Admin = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  // =========================
  // PROJECT STATES
  // =========================

  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    image: "",
    github: "",
    live: "",
  });

  const [editingId, setEditingId] =
    useState(null);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [uploadingImage, setUploadingImage] =
    useState(false);

  // =========================
  // PORTFOLIO CONTENT STATES
  // =========================

  const [portfolioContent, setPortfolioContent] =
    useState({
      heroTitle: "",
      heroSubtitle: "",
      heroDescription: "",
      resumeUrl: "",
    });

  const [portfolioLoading, setPortfolioLoading] =
    useState(false);

  const [portfolioMessage, setPortfolioMessage] =
    useState("");

  // =========================
  // ABOUT STATES
  // =========================

  const [aboutContent, setAboutContent] =
    useState({
      title: "",
      description: "",
      experience: "",
    });

  const [aboutLoading, setAboutLoading] =
    useState(false);

  const [aboutMessage, setAboutMessage] =
    useState("");

  // =========================
  // THEME STATES
  // =========================

  const [theme, setTheme] = useState({
    primaryColor: "#06b6d4",
    backgroundColor: "#000000",
    textColor: "#ffffff",
  });

  const [themeLoading, setThemeLoading] =
    useState(false);

  const [themeMessage, setThemeMessage] =
    useState("");

  // =========================
  // STATS STATES
  // =========================

  const [stats, setStats] = useState({
    totalProjects: 0,
    totalBlogs: 0,
    publishedBlogs: 0,
  });

  const [statsLoading, setStatsLoading] =
    useState(true);

  // =========================
  // CONTACT MESSAGE STATES
  // =========================

  const [contactMessages, setContactMessages] =
    useState([]);

  const [
    contactMessagesLoading,
    setContactMessagesLoading,
  ] = useState(false);

  const [
    contactMessagesMessage,
    setContactMessagesMessage,
  ] = useState("");

  // =========================
  // GET TOKEN
  // =========================

  const getToken = () => {
    return localStorage.getItem("adminToken");
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

 // =========================
// UNAUTHORIZED
// =========================

const handleUnauthorized = React.useCallback(() => {
  localStorage.removeItem("adminToken");
  navigate("/admin");
}, [navigate]);
  // =========================
  // FETCH PROJECTS
  // =========================

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        PROJECT_API_URL
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch projects."
        );
      }

      const data = await response.json();

      setProjects(data);
    } catch (error) {
      console.error(
        "Error fetching projects:",
        error
      );

      setMessage(
        "Failed to load projects."
      );
    }
  };

  // =========================
  // FETCH PORTFOLIO CONTENT
  // =========================

  const fetchPortfolioContent = async () => {
    try {
      const response = await fetch(
        PORTFOLIO_CONTENT_API_URL
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch portfolio content."
        );
      }

      const data = await response.json();

      setPortfolioContent({
        heroTitle:
          data.heroTitle || "",
        heroSubtitle:
          data.heroSubtitle || "",
        heroDescription:
          data.heroDescription || "",
        resumeUrl:
          data.resumeUrl || "",
      });
    } catch (error) {
      console.error(
        "Error fetching portfolio content:",
        error
      );

      setPortfolioMessage(
        "Failed to load portfolio content."
      );
    }
  };

  // =========================
  // FETCH ABOUT CONTENT
  // =========================

  const fetchAboutContent = async () => {
    try {
      const response = await fetch(
        ABOUT_API_URL
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch About content."
        );
      }

      const data = await response.json();

      setAboutContent({
        title: data.title || "",
        description:
          data.description || "",
        experience:
          data.experience || "",
      });
    } catch (error) {
      console.error(
        "Error fetching About content:",
        error
      );

      setAboutMessage(
        "Failed to load About content."
      );
    }
  };

  // =========================
  // FETCH THEME
  // =========================

  const fetchTheme = async () => {
    try {
      const response = await fetch(
        THEME_API_URL
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch theme."
        );
      }

      const data = await response.json();

      setTheme({
        primaryColor:
          data.primaryColor || "#06b6d4",
        backgroundColor:
          data.backgroundColor || "#000000",
        textColor:
          data.textColor || "#ffffff",
      });
    } catch (error) {
      console.error(
        "Error fetching theme:",
        error
      );

      setThemeMessage(
        "Failed to load theme."
      );
    }
  };

  // =========================
  // FETCH STATS
  // =========================

  const fetchStats = async () => {
    try {
      setStatsLoading(true);

      const response = await fetch(
        STATS_API_URL
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch dashboard statistics."
        );
      }

      const data = await response.json();

      setStats({
        totalProjects:
          data.totalProjects || 0,
        totalBlogs:
          data.totalBlogs || 0,
        publishedBlogs:
          data.publishedBlogs || 0,
      });
    } catch (error) {
      console.error(
        "Error fetching dashboard statistics:",
        error
      );
    } finally {
      setStatsLoading(false);
    }
  };

  // =========================
  // FETCH CONTACT MESSAGES
  // =========================

  const fetchContactMessages = useCallback(async () => {
    try {
      setContactMessagesLoading(true);

      const token = getToken();

      if (!token) {
        handleUnauthorized();
        return;
      }

      const response = await fetch(
        CONTACT_MESSAGES_API_URL,
        {
          method: "GET",
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch contact messages."
        );
      }

      setContactMessages(data);

      setContactMessagesMessage("");
    } catch (error) {
      console.error(
        "Error fetching contact messages:",
        error
      );

      setContactMessagesMessage(
        error.message ||
          "Failed to load contact messages."
      );
    } finally {
      setContactMessagesLoading(false);
    }
  }, [handleUnauthorized]);

  // =========================
  // MARK MESSAGE AS READ
  // =========================

  const handleMarkMessageRead = async (id) => {
    try {
      const token = getToken();

      if (!token) {
        handleUnauthorized();
        return;
      }

      const response = await fetch(
        `${CONTACT_MESSAGES_API_URL}/${id}/read`,
        {
          method: "PUT",
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to mark message as read."
        );
      }

      setContactMessages((previous) =>
        previous.map((item) =>
          item._id === id
            ? {
                ...item,
                read: true,
              }
            : item
        )
      );
    } catch (error) {
      console.error(
        "Error marking message as read:",
        error
      );

      alert(
        error.message ||
          "Failed to mark message as read."
      );
    }
  };

  // =========================
  // DELETE CONTACT MESSAGE
  // =========================

  const handleDeleteContactMessage =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this message?"
        );

      if (!confirmDelete) {
        return;
      }

      try {
        const token = getToken();

        if (!token) {
          handleUnauthorized();
          return;
        }

        const response = await fetch(
          `${CONTACT_MESSAGES_API_URL}/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          handleUnauthorized();
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to delete message."
          );
        }

        setContactMessages(
          (previous) =>
            previous.filter(
              (item) =>
                item._id !== id
            )
        );
      } catch (error) {
        console.error(
          "Error deleting contact message:",
          error
        );

        alert(
          error.message ||
            "Failed to delete message."
        );
      }
    };

  // =========================
  // LOAD ALL DATA
  // =========================

  useEffect(() => {
    fetchProjects();
    fetchPortfolioContent();
    fetchAboutContent();
    fetchTheme();
    fetchStats();
    fetchContactMessages();
  }, [fetchContactMessages]);

  // =========================
  // THEME CHANGE
  // =========================

  const handleThemeChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setTheme((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // SAVE THEME
  // =========================

  const handleThemeSave = async (e) => {
    e.preventDefault();

    setThemeLoading(true);
    setThemeMessage("");

    const token = getToken();

    if (!token) {
      handleUnauthorized();
      return;
    }

    try {
      const response = await fetch(
        THEME_API_URL,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${token}`,
          },
          body: JSON.stringify(theme),
        }
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update theme."
        );
      }

      setThemeMessage(
        "Theme updated successfully!"
      );

      if (data.theme) {
        setTheme({
          primaryColor:
            data.theme.primaryColor ||
            "#06b6d4",
          backgroundColor:
            data.theme.backgroundColor ||
            "#000000",
          textColor:
            data.theme.textColor ||
            "#ffffff",
        });
      }
    } catch (error) {
      console.error(
        "Theme error:",
        error
      );

      setThemeMessage(
        error.message ||
          "Failed to update theme."
      );
    } finally {
      setThemeLoading(false);
    }
  };

  // =========================
  // PROJECT FORM CHANGE
  // =========================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // ABOUT FORM CHANGE
  // =========================

  const handleAboutChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setAboutContent((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // SAVE ABOUT
  // =========================

  const handleAboutSave = async (e) => {
    e.preventDefault();

    setAboutLoading(true);
    setAboutMessage("");

    const token = getToken();

    if (!token) {
      handleUnauthorized();
      return;
    }

    try {
      const response = await fetch(
        ABOUT_API_URL,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${token}`,
          },
          body: JSON.stringify(
            aboutContent
          ),
        }
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update About content."
        );
      }

      setAboutMessage(
        "About content updated successfully!"
      );

      if (data.about) {
        setAboutContent({
          title:
            data.about.title || "",
          description:
            data.about.description ||
            "",
          experience:
            data.about.experience ||
            "",
        });
      }
    } catch (error) {
      console.error(
        "About content error:",
        error
      );

      setAboutMessage(
        error.message ||
          "Failed to update About content."
      );
    } finally {
      setAboutLoading(false);
    }
  };

  // =========================
  // PORTFOLIO FORM CHANGE
  // =========================

  const handlePortfolioChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setPortfolioContent((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // SAVE PORTFOLIO
  // =========================

  const handlePortfolioSave = async (e) => {
    e.preventDefault();

    setPortfolioLoading(true);
    setPortfolioMessage("");

    const token = getToken();

    if (!token) {
      handleUnauthorized();
      return;
    }

    try {
      const response = await fetch(
        PORTFOLIO_CONTENT_API_URL,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${token}`,
          },
          body: JSON.stringify(
            portfolioContent
          ),
        }
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update portfolio content."
        );
      }

      setPortfolioMessage(
        "Portfolio content updated successfully!"
      );

      if (data.content) {
        setPortfolioContent({
          heroTitle:
            data.content.heroTitle ||
            "",
          heroSubtitle:
            data.content.heroSubtitle ||
            "",
          heroDescription:
            data.content.heroDescription ||
            "",
          resumeUrl:
            data.content.resumeUrl ||
            "",
        });
      }
    } catch (error) {
      console.error(
        "Portfolio content error:",
        error
      );

      setPortfolioMessage(
        error.message ||
          "Failed to update portfolio content."
      );
    } finally {
      setPortfolioLoading(false);
    }
  };

  // =========================
  // IMAGE SELECT
  // =========================

  const handleImageSelect = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setSelectedImage(null);
      return;
    }

    setSelectedImage(file);
    setMessage("");
  };

  // =========================
  // IMAGE UPLOAD
  // =========================

  const handleImageUpload = async () => {
    if (!selectedImage) {
      setMessage(
        "Please select an image first."
      );
      return;
    }

    const token = getToken();

    if (!token) {
      handleUnauthorized();
      return;
    }

    const imageData = new FormData();

    imageData.append(
      "image",
      selectedImage
    );

    setUploadingImage(true);
    setMessage("");

    try {
      const response = await fetch(
        UPLOAD_API_URL,
        {
          method: "POST",
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
          body: imageData,
        }
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Image upload failed."
        );
      }

      setFormData((previous) => ({
        ...previous,
        image: data.imageUrl,
      }));

      setMessage(
        "Image uploaded successfully!"
      );

      setSelectedImage(null);
    } catch (error) {
      console.error(
        "Image upload error:",
        error
      );

      setMessage(
        error.message ||
          "Failed to upload image."
      );
    } finally {
      setUploadingImage(false);
    }
  };

  // =========================
  // ADD / UPDATE PROJECT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const token = getToken();

    if (!token) {
      handleUnauthorized();
      return;
    }

    const projectData = {
      title: formData.title,
      description:
        formData.description,

      technologies:
        formData.technologies
          .split(",")
          .map((tech) =>
            tech.trim()
          )
          .filter(
            (tech) => tech !== ""
          ),

      image: formData.image,
      github: formData.github,
      live: formData.live,
    };

    try {
      let response;

      if (editingId) {
        response = await fetch(
          `${PROJECT_API_URL}/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${token}`,
            },
            body: JSON.stringify(
              projectData
            ),
          }
        );
      } else {
        response = await fetch(
          PROJECT_API_URL,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${token}`,
            },
            body: JSON.stringify(
              projectData
            ),
          }
        );
      }

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save project."
        );
      }

      setMessage(
        editingId
          ? "Project updated successfully!"
          : "Project added successfully!"
      );

      setFormData({
        title: "",
        description: "",
        technologies: "",
        image: "",
        github: "",
        live: "",
      });

      setSelectedImage(null);
      setEditingId(null);

      await fetchProjects();
      await fetchStats();
    } catch (error) {
      console.error(
        "Error saving project:",
        error
      );

      setMessage(
        error.message ||
          "Failed to save project."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE PROJECT
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this project?"
      );

    if (!confirmDelete) {
      return;
    }

    const token = getToken();

    if (!token) {
      handleUnauthorized();
      return;
    }

    try {
      const response = await fetch(
        `${PROJECT_API_URL}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete project."
        );
      }

      setMessage(
        "Project deleted successfully!"
      );

      await fetchProjects();
      await fetchStats();
    } catch (error) {
      console.error(
        "Error deleting project:",
        error
      );

      setMessage(
        error.message ||
          "Failed to delete project."
      );
    }
  };

  // =========================
  // EDIT PROJECT
  // =========================

  const handleEdit = (project) => {
    setEditingId(project._id);

    setFormData({
      title: project.title || "",
      description:
        project.description || "",

      technologies:
        project.technologies
          ? project.technologies.join(
              ", "
            )
          : "",

      image: project.image || "",
      github: project.github || "",
      live: project.live || "",
    });

    setSelectedImage(null);
    setMessage("");

    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  // =========================
  // CANCEL EDIT
  // =========================

  const handleCancelEdit = () => {
    setEditingId(null);

    setFormData({
      title: "",
      description: "",
      technologies: "",
      image: "",
      github: "",
      live: "",
    });

    setSelectedImage(null);
    setMessage("");
  };

  // =========================
  // NEW MESSAGE COUNT
  // =========================

  const unreadMessages =
    contactMessages.filter(
      (item) => !item.read
    ).length;

  // =========================
  // RETURN
  // =========================

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-800 text-white p-8">
      <div className="max-w-screen-lg mx-auto">

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="px-5 py-3 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 duration-200"
          >
            Logout
          </button>
        </div>

        {/* ========================= */}
        {/* DASHBOARD OVERVIEW */}
        {/* ========================= */}

        <h2 className="text-3xl font-bold text-center mb-8">
          Dashboard Overview
        </h2>

        <div className="grid md:grid-cols-4 gap-6 mb-16">

          {/* PROJECTS */}

          <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
            <p className="text-gray-400 text-lg mb-2">
              Total Projects
            </p>

            <p className="text-5xl font-bold">
              {statsLoading
                ? "..."
                : stats.totalProjects}
            </p>
          </div>

          {/* BLOGS */}

          <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
            <p className="text-gray-400 text-lg mb-2">
              Total Blogs
            </p>

            <p className="text-5xl font-bold">
              {statsLoading
                ? "..."
                : stats.totalBlogs}
            </p>
          </div>

          {/* PUBLISHED BLOGS */}

          <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
            <p className="text-gray-400 text-lg mb-2">
              Published Blogs
            </p>

            <p className="text-5xl font-bold">
              {statsLoading
                ? "..."
                : stats.publishedBlogs}
            </p>
          </div>

          {/* MESSAGES */}

          <button
            type="button"
            onClick={() => {
              const messagesSection =
                document.getElementById("contact-messages");

              if (messagesSection) {
                messagesSection.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
            className="bg-gray-900 p-6 rounded-lg shadow-lg text-center hover:bg-gray-800 transition duration-200 cursor-pointer"
          >
            <p className="text-gray-400 text-lg mb-2">
              New Messages
            </p>

            <p className="text-5xl font-bold text-cyan-400">
              {contactMessagesLoading
                ? "..."
                : unreadMessages}
            </p>

            <p className="text-gray-500 text-sm mt-3">
              Click to view messages
            </p>
          </button>

        </div>

        {/* ========================= */}
        {/* THEME CUSTOMIZATION */}
        {/* ========================= */}

        <h2 className="text-3xl font-bold text-center mb-8">
          Theme Customization
        </h2>

        <div className="max-w-2xl mx-auto mb-16">

          <form
            onSubmit={handleThemeSave}
            className="bg-gray-900 p-8 rounded-lg shadow-lg"
          >

            <h3 className="text-2xl font-bold mb-6">
              Theme / Appearance
            </h3>

            {/* PRIMARY COLOR */}

            <label className="block mb-2 font-semibold">
              Primary Color
            </label>

            <div className="flex gap-3 items-center mb-5">

              <input
                type="color"
                name="primaryColor"
                value={theme.primaryColor}
                onChange={
                  handleThemeChange
                }
                className="w-14 h-12 bg-gray-800 rounded-md cursor-pointer"
              />

              <input
                type="text"
                name="primaryColor"
                value={theme.primaryColor}
                onChange={
                  handleThemeChange
                }
                className="flex-1 p-3 rounded-md bg-gray-800 text-white outline-none"
              />

            </div>

            {/* BACKGROUND COLOR */}

            <label className="block mb-2 font-semibold">
              Background Color
            </label>

            <div className="flex gap-3 items-center mb-5">

              <input
                type="color"
                name="backgroundColor"
                value={theme.backgroundColor}
                onChange={
                  handleThemeChange
                }
                className="w-14 h-12 bg-gray-800 rounded-md cursor-pointer"
              />

              <input
                type="text"
                name="backgroundColor"
                value={theme.backgroundColor}
                onChange={
                  handleThemeChange
                }
                className="flex-1 p-3 rounded-md bg-gray-800 text-white outline-none"
              />

            </div>

            {/* TEXT COLOR */}

            <label className="block mb-2 font-semibold">
              Text Color
            </label>

            <div className="flex gap-3 items-center mb-6">

              <input
                type="color"
                name="textColor"
                value={theme.textColor}
                onChange={
                  handleThemeChange
                }
                className="w-14 h-12 bg-gray-800 rounded-md cursor-pointer"
              />

              <input
                type="text"
                name="textColor"
                value={theme.textColor}
                onChange={
                  handleThemeChange
                }
                className="flex-1 p-3 rounded-md bg-gray-800 text-white outline-none"
              />

            </div>

            <button
              type="submit"
              disabled={themeLoading}
              className="w-full px-5 py-3 bg-white text-black rounded-md font-semibold hover:bg-gray-300 duration-200 disabled:opacity-50"
            >
              {themeLoading
                ? "Saving..."
                : "Save Theme"}
            </button>

            {themeMessage && (
              <p className="text-center mt-5 text-lg">
                {themeMessage}
              </p>
            )}

          </form>

        </div>

        {/* ========================= */}
        {/* PORTFOLIO CONTENT */}
        {/* ========================= */}

        <h2 className="text-3xl font-bold text-center mb-8">
          Portfolio Content Management
        </h2>

        <div className="max-w-2xl mx-auto mb-16">

          <form
            onSubmit={
              handlePortfolioSave
            }
            className="bg-gray-900 p-8 rounded-lg shadow-lg"
          >

            <h3 className="text-2xl font-bold mb-6">
              Home / Hero Section
            </h3>

            {/* HERO TITLE */}

            <label className="block mb-2 font-semibold">
              Hero Title
            </label>

            <input
              type="text"
              name="heroTitle"
              value={
                portfolioContent.heroTitle
              }
              onChange={
                handlePortfolioChange
              }
              placeholder="Hi, I'm Akash"
              required
              className="w-full p-3 mb-5 rounded-md bg-gray-800 text-white outline-none"
            />

            {/* HERO SUBTITLE */}

            <label className="block mb-2 font-semibold">
              Hero Subtitle
            </label>

            <input
              type="text"
              name="heroSubtitle"
              value={
                portfolioContent.heroSubtitle
              }
              onChange={
                handlePortfolioChange
              }
              placeholder="Full Stack Developer"
              required
              className="w-full p-3 mb-5 rounded-md bg-gray-800 text-white outline-none"
            />

            {/* HERO DESCRIPTION */}

            <label className="block mb-2 font-semibold">
              Hero Description
            </label>

            <textarea
              name="heroDescription"
              value={
                portfolioContent.heroDescription
              }
              onChange={
                handlePortfolioChange
              }
              placeholder="Write your introduction..."
              rows="5"
              required
              className="w-full p-3 mb-5 rounded-md bg-gray-800 text-white outline-none"
            />

            {/* RESUME */}

            <label className="block mb-2 font-semibold">
              Resume URL
            </label>

            <input
              type="url"
              name="resumeUrl"
              value={
                portfolioContent.resumeUrl
              }
              onChange={
                handlePortfolioChange
              }
              placeholder="https://..."
              className="w-full p-3 mb-6 rounded-md bg-gray-800 text-white outline-none"
            />

            <button
              type="submit"
              disabled={
                portfolioLoading
              }
              className="w-full px-5 py-3 bg-white text-black rounded-md font-semibold hover:bg-gray-300 duration-200 disabled:opacity-50"
            >
              {portfolioLoading
                ? "Saving..."
                : "Save Portfolio Content"}
            </button>

            {portfolioMessage && (
              <p className="text-center mt-5 text-lg">
                {portfolioMessage}
              </p>
            )}

          </form>

        </div>

        {/* ========================= */}
        {/* ABOUT CONTENT */}
        {/* ========================= */}

        <h2 className="text-3xl font-bold text-center mb-8">
          About Content Management
        </h2>

        <div className="max-w-2xl mx-auto mb-16">

          <form
            onSubmit={handleAboutSave}
            className="bg-gray-900 p-8 rounded-lg shadow-lg"
          >

            <h3 className="text-2xl font-bold mb-6">
              About Section
            </h3>

            {/* TITLE */}

            <label className="block mb-2 font-semibold">
              About Title
            </label>

            <input
              type="text"
              name="title"
              value={aboutContent.title}
              onChange={
                handleAboutChange
              }
              placeholder="About Me"
              required
              className="w-full p-3 mb-5 rounded-md bg-gray-800 text-white outline-none"
            />

            {/* DESCRIPTION */}

            <label className="block mb-2 font-semibold">
              About Description
            </label>

            <textarea
              name="description"
              value={
                aboutContent.description
              }
              onChange={
                handleAboutChange
              }
              placeholder="Write your About description..."
              rows="5"
              required
              className="w-full p-3 mb-5 rounded-md bg-gray-800 text-white outline-none"
            />

            {/* EXPERIENCE */}

            <label className="block mb-2 font-semibold">
              About Experience
            </label>

            <textarea
              name="experience"
              value={
                aboutContent.experience
              }
              onChange={
                handleAboutChange
              }
              placeholder="Write about your experience..."
              rows="6"
              required
              className="w-full p-3 mb-6 rounded-md bg-gray-800 text-white outline-none"
            />

            <button
              type="submit"
              disabled={aboutLoading}
              className="w-full px-5 py-3 bg-white text-black rounded-md font-semibold hover:bg-gray-300 duration-200 disabled:opacity-50"
            >
              {aboutLoading
                ? "Saving..."
                : "Save About Content"}
            </button>

            {aboutMessage && (
              <p className="text-center mt-5 text-lg">
                {aboutMessage}
              </p>
            )}

          </form>

        </div>

        {/* ========================= */}
        {/* PROJECT MANAGEMENT */}
        {/* ========================= */}

        <h2 className="text-3xl font-bold text-center mb-8">
          Project Management
        </h2>

        <div
          ref={formRef}
          className="max-w-2xl mx-auto"
        >

          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 p-8 rounded-lg shadow-lg"
          >

            <h3 className="text-2xl font-bold mb-6">
              {editingId
                ? "Edit Project"
                : "Add New Project"}
            </h3>

            {/* TITLE */}

            <label className="block mb-2 font-semibold">
              Project Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter project title"
              required
              className="w-full p-3 mb-5 rounded-md bg-gray-800 text-white outline-none"
            />

            {/* DESCRIPTION */}

            <label className="block mb-2 font-semibold">
              Description
            </label>

            <textarea
              name="description"
              value={
                formData.description
              }
              onChange={handleChange}
              placeholder="Enter project description"
              required
              rows="4"
              className="w-full p-3 mb-5 rounded-md bg-gray-800 text-white outline-none"
            />

            {/* TECHNOLOGIES */}

            <label className="block mb-2 font-semibold">
              Technologies
            </label>

            <input
              type="text"
              name="technologies"
              value={
                formData.technologies
              }
              onChange={handleChange}
              placeholder="React, JavaScript, CSS"
              className="w-full p-3 mb-5 rounded-md bg-gray-800 text-white outline-none"
            />

            {/* IMAGE */}

            <label className="block mb-2 font-semibold">
              Project Image
            </label>

            <div className="mb-5">

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleImageSelect
                }
                className="w-full p-3 rounded-md bg-gray-800 text-white"
              />

              {selectedImage && (
                <p className="text-gray-400 text-sm mt-2">
                  Selected:{" "}
                  {selectedImage.name}
                </p>
              )}

              <button
                type="button"
                onClick={
                  handleImageUpload
                }
                disabled={
                  !selectedImage ||
                  uploadingImage
                }
                className="mt-3 px-5 py-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploadingImage
                  ? "Uploading..."
                  : "Upload Image"}
              </button>

              {formData.image && (
                <div className="mt-5">

                  <p className="text-sm text-green-400 mb-2">
                    Image uploaded successfully
                  </p>

                  <img
                    src={formData.image}
                    alt="Project preview"
                    className="w-full max-h-64 object-cover rounded-md"
                  />

                </div>
              )}

            </div>

            {/* GITHUB */}

            <label className="block mb-2 font-semibold">
              GitHub URL
            </label>

            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/..."
              className="w-full p-3 mb-5 rounded-md bg-gray-800 text-white outline-none"
            />

            {/* LIVE */}

            <label className="block mb-2 font-semibold">
              Live Demo URL
            </label>

            <input
              type="url"
              name="live"
              value={formData.live}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full p-3 mb-6 rounded-md bg-gray-800 text-white outline-none"
            />

            {/* BUTTONS */}

            <div className="flex gap-3">

              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-5 py-3 bg-white text-black rounded-md font-semibold hover:bg-gray-300 duration-200 disabled:opacity-50"
              >
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update Project"
                  : "Add Project"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={
                    handleCancelEdit
                  }
                  className="flex-1 px-5 py-3 bg-gray-700 text-white rounded-md font-semibold hover:bg-gray-600 duration-200"
                >
                  Cancel
                </button>
              )}

            </div>

            {message && (
              <p className="text-center mt-5 text-lg">
                {message}
              </p>
            )}

          </form>

        </div>

        {/* ========================= */}
        {/* EXISTING PROJECTS */}
        {/* ========================= */}

        <div className="mt-16">

          <h3 className="text-3xl font-bold mb-8 text-center">
            Existing Projects
          </h3>

          {projects.length === 0 ? (
            <p className="text-center text-gray-400">
              No projects found.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">

              {projects.map(
                (project) => (
                  <div
                    key={project._id}
                    className="bg-gray-900 rounded-lg p-6 shadow-lg"
                  >

                    {project.image && (
                      <img
                        src={project.image}
                        alt={
                          project.title
                        }
                        className="w-full h-48 object-cover rounded-md mb-5"
                      />
                    )}

                    <h4 className="text-2xl font-bold mb-3">
                      {project.title}
                    </h4>

                    <p className="text-gray-300 mb-4">
                      {
                        project.description
                      }
                    </p>

                    {project.technologies &&
                      project
                        .technologies
                        .length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">

                          {project.technologies.map(
                            (
                              technology,
                              index
                            ) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                              >
                                {
                                  technology
                                }
                              </span>
                            )
                          )}

                        </div>
                      )}

                    <div className="flex gap-3">

                      <button
                        onClick={() =>
                          handleEdit(
                            project
                          )
                        }
                        className="flex-1 px-4 py-2 bg-white text-black rounded-md font-semibold hover:bg-gray-300 duration-200"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            project._id
                          )
                        }
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 duration-200"
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </div>

        {/* ========================= */}
        {/* CONTACT MESSAGES */}
        {/* ========================= */}

        <div
          id="contact-messages"
          className="mt-16"
        >

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-3xl font-bold">
              Contact Messages
            </h2>

            <button
              onClick={
                fetchContactMessages
              }
              disabled={
                contactMessagesLoading
              }
              className="px-5 py-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 duration-200 disabled:opacity-50"
            >
              {contactMessagesLoading
                ? "Refreshing..."
                : "Refresh"}
            </button>

          </div>

          {contactMessagesMessage && (
            <p className="text-center text-red-400 mb-6">
              {contactMessagesMessage}
            </p>
          )}

          {contactMessagesLoading ? (
            <p className="text-center text-gray-400">
              Loading messages...
            </p>
          ) : contactMessages.length === 0 ? (
            <div className="bg-gray-900 rounded-lg p-8 text-center">
              <p className="text-gray-400 text-lg">
                No contact messages yet.
              </p>
            </div>
          ) : (
            <div className="space-y-6">

              {contactMessages.map(
                (contactMessage) => (
                  <div
                    key={
                      contactMessage._id
                    }
                    className={`bg-gray-900 rounded-lg p-6 shadow-lg border ${
                      contactMessage.read
                        ? "border-gray-700"
                        : "border-cyan-500"
                    }`}
                  >

                    {/* MESSAGE HEADER */}

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">

                      <div>

                        <h3 className="text-2xl font-bold">
                          {
                            contactMessage.name
                          }
                        </h3>

                        <p className="text-gray-400">
                          {
                            contactMessage.email
                          }
                        </p>

                      </div>

                      <div>

                        {contactMessage.read ? (
                          <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                            Read
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-cyan-500 text-black rounded-full text-sm font-semibold">
                            New
                          </span>
                        )}

                      </div>

                    </div>

                    {/* MESSAGE */}

                    <div className="bg-gray-800 rounded-md p-5 mb-5">

                      <p className="text-gray-200 whitespace-pre-wrap">
                        {
                          contactMessage.message
                        }
                      </p>

                    </div>

                    {/* DATE */}

                    <p className="text-gray-500 text-sm mb-5">
                      {contactMessage.createdAt
                        ? new Date(
                            contactMessage.createdAt
                          ).toLocaleString()
                        : ""}
                    </p>

                    {/* ACTIONS */}

                    <div className="flex gap-3">

                      {!contactMessage.read && (
                        <button
                          onClick={() =>
                            handleMarkMessageRead(
                              contactMessage._id
                            )
                          }
                          className="px-5 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 duration-200"
                        >
                          Mark as Read
                        </button>
                      )}

                      <button
                        onClick={() =>
                          handleDeleteContactMessage(
                            contactMessage._id
                          )
                        }
                        className="px-5 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 duration-200"
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </div>

        {/* ========================= */}
        {/* BLOG MANAGEMENT */}
        {/* ========================= */}

        <div className="mt-16">

          <AdminBlogs />

        </div>

      </div>
    </div>
  );
};

export default Admin;