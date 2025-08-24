import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [isCaptionGenerated, setIsCaptionGenerated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  // Clear selection
  const handleClear = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setGeneratedCaption("");
    setIsCaptionGenerated(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">AI Caption Generator</h1>
        <p className="text-center text-gray-600 mb-8">
          Upload an image and get a creative caption generated automatically.
        </p>

        {/* Auth Status */}
        <div className="text-center mb-6">
          {isAuthenticated ? (
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
              Logged In
            </span>
          ) : (
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full">
              Not Logged In
            </span>
          )}
        </div>

        {/* Image Upload Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Image</label>
          <div className="flex justify-center">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 bg-gray-50">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-48 max-w-full object-contain rounded"
                />
              ) : (
                <p className="text-gray-500 text-center mt-20">
                  Click to upload or drag & drop
                </p>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleImageSelect} />
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handleGenerateCaption}
              disabled={!selectedImage || isLoading}
              className={`px-6 py-2 rounded-lg text-white font-medium ${
                !selectedImage || isLoading ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Generating..." : "Generate Caption"}
            </button>
            {selectedImage && (
              <button
                onClick={handleClear}
                className="px-6 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Generated Caption */}
        {isCaptionGenerated && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">Generated Caption</h2>
            <p className="italic text-gray-700">{generatedCaption}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
