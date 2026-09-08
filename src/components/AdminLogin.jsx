import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save login token
      localStorage.setItem("adminToken", data.token);

      // Go to admin dashboard
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-800 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleLogin}
          className="bg-gray-900 p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-3xl font-bold text-center mb-8">
            Admin Login
          </h1>

          {/* Username */}
          <label className="block mb-2 font-semibold">
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
            className="w-full p-3 mb-5 rounded-md bg-gray-800 text-white outline-none"
          />

          {/* Password */}
          <label className="block mb-2 font-semibold">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            className="w-full p-3 mb-6 rounded-md bg-gray-800 text-white outline-none"
          />

          {/* Error */}
          {error && (
            <p className="text-red-400 text-center mb-5">
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-5 py-3 bg-white text-black rounded-md font-semibold hover:bg-gray-300 duration-200 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;