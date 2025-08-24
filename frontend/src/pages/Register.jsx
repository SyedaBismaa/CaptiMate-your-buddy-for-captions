import React, { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function Register() {
  // form states
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()


  // handle form submit
  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      // 👇 adjust this URL to match your backend
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        username,
        password,
      })

      if (res.status === 201) {
        toast.success("User registered successfully ✅")
        setUsername("")
        setPassword("")
        navigate("/login");
      }
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.message || "Registration failed ❌")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
        onSubmit={handleRegister}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {/* Username */}
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

        {/* Password */}
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
            autoComplete="new-password"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
