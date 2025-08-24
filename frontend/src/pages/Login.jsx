import React, { useState } from "react";
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

// Login page component
const Login = () => {
  // State for form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate()

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Add authentication logic here

    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        username,
        password,
      })

      if (res.status === 200) {
        toast.success("Login successful ✅")
        // setUsername("")
        // setPassword("")
        navigate("/")
      }
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.message || "Login failed ❌")
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;