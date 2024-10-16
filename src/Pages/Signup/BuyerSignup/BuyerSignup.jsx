import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../../Components/Navbar";
import API from "../../../variable"; // Ensure this imports your API base URL
import { useNavigate } from "react-router-dom";

function BuyerSignup() {
  const [formData, setFormData] = useState({
    username: "", // Added username field
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    profilePicture: null,
  });

  const [loading, setLoading] = useState(false); // Loader state
  const [fileError, setFileError] = useState(""); // File error state for size check
  const navigate = useNavigate();

  // File size limit in bytes (e.g., 5MB = 5 * 1024 * 1024)
  const MAX_FILE_SIZE = 1 * 1024 * 1024;

  // Handle input changes
  const handleChange = (e) => {
    const { name, type, files } = e.target;
    
    // File input handling
    if (type === "file") {
      const file = files[0];
      if (file && file.size > MAX_FILE_SIZE) {
        setFileError("File size exceeds 5MB.");
        setFormData({ ...formData, [name]: null });
      } else {
        setFileError("");
        setFormData({ ...formData, [name]: file });
      }
    } else {
      setFormData({ ...formData, [name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password === "") {
      alert("Password is required!");
      return;
    }

    if (!formData.profilePicture) {
      alert("Profile picture is required and must be below 5MB.");
      return;
    }

    setLoading(true); // Start loader

    // Create FormData for file uploads and text fields
    const requestData = new FormData();
    requestData.append("username", formData.username); // Added username
    requestData.append("email", formData.email);
    requestData.append("firstName", formData.firstName);
    requestData.append("lastName", formData.lastName);
    requestData.append("dob", formData.dob);
    requestData.append("password", formData.password); // Send password
    requestData.append("icon", formData.profilePicture); // Profile picture

    // Log the requestData for debugging
    for (let pair of requestData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      // Make a POST request to submit the form data
      const response = await axios.post(
        `${API}/api/v1/auth/signup/buyer`,
        requestData,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Signup successful:", response.data);
      navigate("/User-login");
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response) {
        console.error("Response data:", error.response.data); // Log the error response
        alert(
          `Error: ${error.response.data.message || "An error occurred while submitting the form."}`
        );
      } else {
        alert("An error occurred while submitting the form.");
      }
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-4">
      <Navbar />
      <h1 className="text-4xl font-bold text-white mb-4">Tiny Task Networks</h1>
      <h2 className="text-2xl text-white mb-8">Sign Up</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your username"
          />
        </div>

        {/* First Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your first name"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your last name"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your password"
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="dob">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Profile Picture */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="profilePicture">
            Profile Picture
          </label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {fileError && (
            <p className="text-red-500 text-sm mt-2">{fileError}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className={`w-full py-2 rounded-md text-white transition duration-300 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-600"
            }`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BuyerSignup;
