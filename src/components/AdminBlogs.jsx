import React, { useEffect, useState } from "react";

const API_URL = "https://portfolio-backend-eight-cyan.vercel.app/api/blogs";
const UPLOAD_API_URL = "https://portfolio-backend-eight-cyan.vercel.app/api/upload";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
    tags: "",
    published: true,
  });

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Image upload states
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Get JWT token
  const getToken = () => {
    return localStorage.getItem("adminToken");
  };

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await response.json();

      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);

      setMessage("Failed to load blogs.");
    }
  };

  // Load blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  // Select image
  const handleImageSelect = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setSelectedImage(null);
      return;
    }

    setSelectedImage(file);

    setMessage("");
  };

  // Upload image to Cloudinary
  const handleImageUpload = async () => {
    if (!selectedImage) {
      setMessage("Please select an image first.");
      return;
    }

    const token = getToken();

    if (!token) {
      setMessage("You are not logged in.");
      return;
    }

    const imageData = new FormData();

    imageData.append("image", selectedImage);

    setUploadingImage(true);
    setMessage("");

    try {
      const response = await fetch(
        UPLOAD_API_URL,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: imageData,
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("adminToken");

        setMessage(
          "Session expired. Please login again."
        );

        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Image upload failed."
        );
      }

      // Save Cloudinary URL in form
      setFormData((previous) => ({
        ...previous,
        image: data.imageUrl,
      }));

      setMessage(
        "Image uploaded successfully!"
      );

      // Clear selected image
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

  // Add / Update blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const token = getToken();

    if (!token) {
      setMessage(
        "You are not logged in."
      );

      setLoading(false);

      return;
    }

    const blogData = {
      title: formData.title,

      content: formData.content,

      image: formData.image,

      category:
        formData.category ||
        "General",

      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(
          (tag) => tag !== ""
        ),

      published:
        formData.published,
    };

    try {
      let response;

      // UPDATE
      if (editingId) {
        response = await fetch(
          `${API_URL}/${editingId}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify(
              blogData
            ),
          }
        );
      }

      // ADD
      else {
        response = await fetch(
          API_URL,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify(
              blogData
            ),
          }
        );
      }

      // Unauthorized
      if (response.status === 401) {
        localStorage.removeItem(
          "adminToken"
        );

        setMessage(
          "Session expired. Please login again."
        );

        return;
      }

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save blog"
        );
      }

      if (editingId) {
        setMessage(
          "Blog updated successfully!"
        );
      } else {
        setMessage(
          "Blog added successfully!"
        );
      }

      // Reset form
      setFormData({
        title: "",
        content: "",
        image: "",
        category: "",
        tags: "",
        published: true,
      });

      setSelectedImage(null);

      setEditingId(null);

      // Refresh blogs
      fetchBlogs();
    } catch (error) {
      console.error(
        "Error saving blog:",
        error
      );

      setMessage(
        error.message ||
          "Failed to save blog."
      );
    } finally {
      setLoading(false);
    }
  };

  // Edit blog
  const handleEdit = (blog) => {
    setEditingId(blog._id);

    setFormData({
      title: blog.title || "",

      content:
        blog.content || "",

      image:
        blog.image || "",

      category:
        blog.category || "",

      tags: blog.tags
        ? blog.tags.join(", ")
        : "",

      published:
        blog.published ?? true,
    });

    setSelectedImage(null);

    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);

    setFormData({
      title: "",
      content: "",
      image: "",
      category: "",
      tags: "",
      published: true,
    });

    setSelectedImage(null);

    setMessage("");
  };

  // Delete blog
  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this blog?"
      );

    if (!confirmDelete) {
      return;
    }

    const token = getToken();

    if (!token) {
      setMessage(
        "You are not logged in."
      );

      return;
    }

    try {
      const response =
        await fetch(
          `${API_URL}/${id}`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      if (response.status === 401) {
        localStorage.removeItem(
          "adminToken"
        );

        setMessage(
          "Session expired. Please login again."
        );

        return;
      }

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete blog"
        );
      }

      setMessage(
        "Blog deleted successfully!"
      );

      fetchBlogs();
    } catch (error) {
      console.error(
        "Error deleting blog:",
        error
      );

      setMessage(
        error.message ||
          "Failed to delete blog."
      );
    }
  };

  return (
    <div className="mt-16">

      {/* ========================= */}
      {/* BLOG MANAGEMENT */}
      {/* ========================= */}

      <h2 className="text-3xl font-bold text-center mb-8">
        Blog Management
      </h2>

      <div className="max-w-2xl mx-auto">

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-8 rounded-lg shadow-lg"
        >

          {/* FORM TITLE */}

          <h3 className="text-2xl font-bold mb-6">
            {editingId
              ? "Edit Blog"
              : "Add New Blog"}
          </h3>

          {/* BLOG TITLE */}

          <label className="block mb-2 font-semibold">
            Blog Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            required
            className="w-full p-3 mb-5 rounded-md bg-gray-800 text-white outline-none"
          />

          {/* CONTENT */}

          <label className="block mb-2 font-semibold">
            Content
          </label>

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your blog content..."
            required
            rows="8"
            className="w-full p-3 mb-5 rounded-md bg-gray-800 text-white outline-none"
          />

          {/* ========================= */}
          {/* BLOG IMAGE */}
          {/* ========================= */}

          <label className="block mb-2 font-semibold">
            Blog Image
          </label>

          <div className="mb-5">

            {/* SELECT IMAGE */}

            <input
              type="file"
              accept="image/*"
              onChange={
                handleImageSelect
              }
              className="w-full p-3 rounded-md bg-gray-800 text-white"
            />

            {/* SELECTED FILE */}

            {selectedImage && (
              <p className="text-gray-400 text-sm mt-2">
                Selected:{" "}
                {selectedImage.name}
              </p>
            )}

            {/* UPLOAD BUTTON */}

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

            {/* IMAGE PREVIEW */}

            {formData.image && (
              <div className="mt-5">

                <p className="text-sm text-green-400 mb-2">
                  Image uploaded successfully
                </p>

                <img
                  src={formData.image}
                  alt="Blog preview"
                  className="w-full max-h-64 object-cover rounded-md"
                />

              </div>
            )}

          </div>

          {/* CATEGORY */}

          <label className="block mb-2 font-semibold">
            Category
          </label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Web Development"
            className="w-full p-3 mb-5 rounded-md bg-gray-800 text-white outline-none"
          />

          {/* TAGS */}

          <label className="block mb-2 font-semibold">
            Tags
          </label>

          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            className="w-full p-3 mb-5 rounded-md bg-gray-800 text-white outline-none"
          />

          {/* PUBLISHED */}

          <label className="flex items-center gap-3 mb-6 cursor-pointer">

            <input
              type="checkbox"
              name="published"
              checked={
                formData.published
              }
              onChange={handleChange}
              className="w-5 h-5"
            />

            <span className="font-semibold">
              Publish this blog
            </span>

          </label>

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
                ? "Update Blog"
                : "Add Blog"}
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

          {/* MESSAGE */}

          {message && (
            <p className="text-center mt-5 text-lg">
              {message}
            </p>
          )}

        </form>

      </div>

      {/* ========================= */}
      {/* EXISTING BLOGS */}
      {/* ========================= */}

      <div className="mt-16">

        <h3 className="text-2xl font-bold mb-8 text-center">
          Existing Blogs
        </h3>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-400">
            No blogs found.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-gray-900 rounded-lg p-6 shadow-lg"
              >

                {/* BLOG IMAGE */}

                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-md mb-5"
                  />
                )}

                {/* TITLE */}

                <h4 className="text-2xl font-bold mb-3">
                  {blog.title}
                </h4>

                {/* CATEGORY */}

                <p className="text-gray-400 mb-3">
                  Category:{" "}
                  {blog.category}
                </p>

                {/* CONTENT */}

                <p className="text-gray-300 mb-4">
                  {blog.content.length >
                  150
                    ? `${blog.content.substring(
                        0,
                        150
                      )}...`
                    : blog.content}
                </p>

                {/* STATUS */}

                <p className="mb-4">
                  Status:{" "}

                  {blog.published ? (
                    <span className="text-green-400">
                      Published
                    </span>
                  ) : (
                    <span className="text-yellow-400">
                      Draft
                    </span>
                  )}
                </p>

                {/* TAGS */}

                {blog.tags &&
                  blog.tags.length >
                    0 && (
                    <div className="flex flex-wrap gap-2 mb-5">

                      {blog.tags.map(
                        (
                          tag,
                          index
                        ) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        )
                      )}

                    </div>
                  )}

                {/* BUTTONS */}

                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      handleEdit(
                        blog
                      )
                    }
                    className="flex-1 px-4 py-2 bg-white text-black rounded-md font-semibold hover:bg-gray-300 duration-200"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        blog._id
                      )
                    }
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 duration-200"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default AdminBlogs;