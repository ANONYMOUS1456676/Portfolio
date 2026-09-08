import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://portfolio-m7y8.onrender.com/api/blogs/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Blog not found");
        }

        return response.json();
      })
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
        setError("Blog not found.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black text-white flex items-center justify-center">
        <p className="text-xl">Loading blog...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black text-white flex flex-col items-center justify-center">
        <p className="text-xl text-red-400 mb-6">
          {error}
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-5 py-3 bg-white text-black rounded-md font-semibold hover:bg-gray-300 duration-200"
        >
          Back to Portfolio
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black text-white">
      <div className="max-w-screen-lg mx-auto px-4 py-16">

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-8 px-5 py-3 bg-gray-700 rounded-md hover:bg-gray-600 duration-200"
        >
          ← Back to Portfolio
        </button>

        {/* Blog */}
        <article className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">

          {/* Image */}
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full max-h-[500px] object-cover"
            />
          )}

          <div className="p-8 md:p-12">

            {/* Category */}
            <p className="text-gray-400 mb-3">
              {blog.category}
            </p>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {blog.title}
            </h1>

            {/* Date */}
            <p className="text-gray-500 mb-8">
              {blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString()
                : ""}
            </p>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="text-gray-300 text-lg leading-8 whitespace-pre-line">
              {blog.content}
            </div>

          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetails;