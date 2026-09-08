import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { useTheme } from "./ThemeProvider";

const Blogs = () => {
  const navigate = useNavigate();

  const { theme } = useTheme();

  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    fetch(
      "http://localhost:5000/api/blogs"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to fetch blogs"
          );
        }

        return response.json();
      })
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching blogs:",
          error
        );

        setError(
          "Failed to load blogs."
        );

        setLoading(false);
      });
  }, []);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div
        name="blogs"
        className="w-full min-h-screen"
        style={{
          backgroundColor:
            theme.backgroundColor,

          color:
            theme.textColor,
        }}
      >
        <div className="max-w-screen-lg mx-auto p-4 py-24">

          <h2
            className="text-4xl font-bold inline border-b-4"
            style={{
              borderColor:
                theme.primaryColor,
            }}
          >
            Blogs
          </h2>

          <p
            className="text-center mt-10 text-lg"
            style={{
              color:
                theme.textColor,
            }}
          >
            Loading blogs...
          </p>

        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div
        name="blogs"
        className="w-full min-h-screen"
        style={{
          backgroundColor:
            theme.backgroundColor,

          color:
            theme.textColor,
        }}
      >
        <div className="max-w-screen-lg mx-auto p-4 py-24">

          <h2
            className="text-4xl font-bold inline border-b-4"
            style={{
              borderColor:
                theme.primaryColor,
            }}
          >
            Blogs
          </h2>

          <p
            className="text-center mt-10"
            style={{
              color: "#f87171",
            }}
          >
            {error}
          </p>

        </div>
      </div>
    );
  }

  // =========================
  // PUBLISHED BLOGS
  // =========================

  const publishedBlogs =
    blogs.filter(
      (blog) =>
        blog.published
    );

  return (
    <div
      name="blogs"
      className="w-full min-h-screen"
      style={{
        backgroundColor:
          theme.backgroundColor,

        color:
          theme.textColor,
      }}
    >
      <div className="max-w-screen-lg mx-auto p-4 py-24">

        {/* Section Heading */}

        <div className="pb-8">

          <h2
            className="text-4xl font-bold inline border-b-4"
            style={{
              borderColor:
                theme.primaryColor,

              color:
                theme.textColor,
            }}
          >
            Blogs
          </h2>

          <p
            className="py-6"
            style={{
              color:
                theme.textColor,
            }}
          >
            Read my latest articles and
            thoughts.
          </p>

        </div>

        {/* No Blogs */}

        {publishedBlogs.length ===
        0 ? (
          <p
            className="text-center"
            style={{
              color:
                theme.textColor,
            }}
          >
            No blogs available yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {publishedBlogs.map(
              (blog) => (
                <article
                  key={blog._id}
                  onClick={() =>
                    navigate(
                      `/blog/${blog._id}`
                    )
                  }
                  className="rounded-lg overflow-hidden shadow-lg hover:scale-105 duration-300 cursor-pointer"
                  style={{
                    backgroundColor:
                      theme.backgroundColor,

                    boxShadow:
                      `0 4px 6px -1px ${theme.primaryColor}`,
                  }}
                >

                  {/* Blog Image */}

                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={
                        blog.title
                      }
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-48 flex items-center justify-center"
                      style={{
                        backgroundColor:
                          theme.primaryColor,
                      }}
                    >
                      <span
                        style={{
                          color:
                            theme.textColor,
                        }}
                      >
                        No Image
                      </span>
                    </div>
                  )}

                  {/* Blog Content */}

                  <div className="p-6">

                    {/* Category */}

                    <p
                      className="text-sm mb-2"
                      style={{
                        color:
                          theme.primaryColor,
                      }}
                    >
                      {blog.category}
                    </p>

                    {/* Title */}

                    <h3
                      className="text-2xl font-bold mb-3"
                      style={{
                        color:
                          theme.textColor,
                      }}
                    >
                      {blog.title}
                    </h3>

                    {/* Description */}

                    <p
                      className="mb-5 line-clamp-3"
                      style={{
                        color:
                          theme.textColor,
                      }}
                    >
                      {blog.content}
                    </p>

                    {/* Tags */}

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
                                key={
                                  index
                                }
                                className="px-3 py-1 rounded-full text-sm"
                                style={{
                                  backgroundColor:
                                    theme.primaryColor,

                                  color:
                                    theme.textColor,
                                }}
                              >
                                {tag}
                              </span>
                            )
                          )}

                        </div>
                      )}

                    {/* Date */}

                    <p
                      className="text-sm mb-4"
                      style={{
                        color:
                          theme.textColor,
                      }}
                    >
                      {blog.createdAt
                        ? new Date(
                            blog.createdAt
                          ).toLocaleDateString()
                        : ""}
                    </p>

                    {/* Read More */}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        navigate(
                          `/blog/${blog._id}`
                        );
                      }}
                      className="px-4 py-2 rounded-md font-semibold duration-200 hover:scale-105"
                      style={{
                        backgroundColor:
                          theme.primaryColor,

                        color:
                          theme.textColor,
                      }}
                    >
                      Read More →
                    </button>

                  </div>

                </article>
              )
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default Blogs;