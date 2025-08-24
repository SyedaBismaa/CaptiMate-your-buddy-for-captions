import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PageNotFound from "../pages/PageNotFound";

// AuthRoutes handles authentication-related routes
const AuthRoutes = () => {
  return (
    <Routes>
      {/* Login route */}
      <Route path="/login" element={<Login />} />
      {/* Register route */}
      <Route path="/register" element={<Register />} />
      {/* Fallback for unmatched routes */}
      
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AuthRoutes;