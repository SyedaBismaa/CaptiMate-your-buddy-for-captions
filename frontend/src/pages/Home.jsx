import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

// Home page component
const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [isCaptionGenerated, setIsCaptionGenerated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/posts/", {
          withCredentials: true,
        });
        setIsAuthenticated(true);
        console.log("Auth check:", res.data.message);
      } catch (err) {
        setIsAuthenticated(false);
        console.log("Not authenticated");
      }
    };
    checkAuth();
  }, []);

  // Handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setGeneratedCaption("");
      setIsCaptionGenerated(false);
    }
  };

  // Handle caption generation
  const handleGenerateCaption = async () => {
    if (!selectedImage) {
      toast.error("Please select an image!");
      return;
    }
    if (!isAuthenticated) {
      toast.error("You must be logged in to generate captions!");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      // POST request to generate caption
      const res = await axios.post(
        "http://localhost:3000/api/posts/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      setGeneratedCaption(res.data.post.caption);
      setIsCaptionGenerated(true);
      toast.success("Caption generated successfully!");
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        toast.error("Authentication failed. Please login first.");
        setIsAuthenticated(false);
      } else {
        toast.error(err.response?.data?.message || "Failed to generate caption.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Copy caption to clipboard
  const handleCopyCaption = () => {
    if (!generatedCaption) return;
    navigator.clipboard.writeText(generatedCaption)
      .then(() => toast.success("Caption copied to clipboard! 📋"))
      .catch(() => toast.error("Failed to copy caption ❌"));
  };

  // Clear selection
  const handleClear = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setGeneratedCaption("");
    setIsCaptionGenerated(false);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/logout', {}, {
        withCredentials: true
      })
      toast.success('Logged out successfully! 👋')
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Logout failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <div></div> {/* Empty div for spacing */}
            <div className="flex items-center gap-3">
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-5 py-1 bg-red-200 rounded-full hover:bg-red-400 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Snapcap 
            <span className="text-gray-600  text-3xl  font-medium"> — your buddy for captions!</span>
          </h1>
          <p className="text-gray-600 pt-3 pb-2">Upload an image and let AI create a creative caption for you!</p>
        </div>

        {/* Auth Status */}
        <div className="text-center mb-6">
          {isAuthenticated ? (
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
              Logged In
            </span>
          ) : (
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full">
              Not Logged In <span className="rounded-full px-2 bg-red-200"><a href="/login">Click here to Login</a></span>
            </span>
          )}
        </div>

        {/* Image Upload Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Image</label>
          <div className="flex justify-center">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-gray-100 bg-gray-50">
              {imagePreview ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-48 max-w-full object-contain rounded"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={handleClear}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center mt-20">
                  Click to upload or drag & drop
                </p>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleImageSelect} />
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-center mt-4">
            <button
              onClick={handleGenerateCaption}
              disabled={!selectedImage || isLoading}
              className={`px-6 py-2 rounded-lg text-white font-medium ${
                !selectedImage || isLoading ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Generating..." : "Generate Caption"}
            </button>
          </div>
        </div>

        {/* Generated Caption */}
        {isCaptionGenerated && (
          <div className="bg-white px-6 py-1 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-2">Generated Caption</h2>
            <p className="italic text-gray-700 mb-4">{generatedCaption}</p>
            <button
  onClick={() => {
    navigator.clipboard.writeText(generatedCaption);
    toast.success('Caption copied to clipboard! 📋');
  }}
  className="mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center"
>
  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
  </svg>
  Copy Caption
</button>

          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
