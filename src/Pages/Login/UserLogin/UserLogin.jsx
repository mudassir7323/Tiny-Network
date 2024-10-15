import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import loginImage from "./User-Login-image.jpg"; // Ensure the path is correct
import axios from "axios";
import API from "../../../variable.js"; // Check if the path is correct
import Navbar from "../../../Components/Navbar.jsx";

// Function to handle login
const LoginFunc = async (credentials) => {
  try {
    const response = await axios.post(`${API}/api/v1/signin`, credentials);
    
    // Save the token and category in localStorage
    localStorage.setItem("UserloginToken", response.data.access_token);
    localStorage.setItem("UserCategory", response.data.category); // Save category for later use
    return { success: true, response }; // Return the entire response for category check
  } catch (error) {
    console.error("Sign-in error:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Sign-in failed",
    };
  }
};

const UserLogin = () => {
  // State variables for email, password, error message, and loading status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error messages
  const [loading, setLoading] = useState(false); // Loader state
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!email || !password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    setErrorMessage(""); // Clear previous error messages
    setLoading(true); // Show loader during submission

    // Prepare credentials for login
    const credentials = { email, password };
    const result = await LoginFunc(credentials);

    if (result.success) {
      const category = result.response.data.category; // Get category from the response
      
      switch (category) {
        case "Buyer":
          navigate("/BuyerDashboard");
          break;
        case "Seller":
          navigate("/UserDashboard");
          break;
        default:
          setErrorMessage("User category is not recognized.");
          break;
      }
    } else {
      setErrorMessage(result.message); // Display error message on failure
    }

    setLoading(false); // Hide loader after attempt
    setEmail(""); // Clear input fields
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600">
      <Navbar />
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex w-4/5 max-w-4xl">
        {/* Left Section: Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">User Login</h2>
          <p className="text-sm text-gray-500 mb-6">
            Don't have an account yet?{" "}
            <span
              className="text-indigo-600 hover:underline cursor-pointer"
              onClick={() => navigate("/Signup")} // Navigate on click
            >
              Sign Up
            </span>
          </p>

          {/* Error message display */}
          {errorMessage && (
            <div className="mb-4 text-red-500">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state on change
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                placeholder="you@example.com"
                required // Ensure field is filled
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state on change
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                placeholder="Enter 6 characters or more"
                required // Ensure field is filled
              />
            </div>
            <div className="flex justify-between items-center mb-6">
              <span
                className="text-indigo-600 hover:underline cursor-pointer"
                onClick={() => navigate("/Forgot")} // Navigate on click
              >
                Forgot Password?
              </span>
            </div>
            <button
              type="submit"
              className={`w-full py-2 rounded-lg transition duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } text-white`}
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 text-white mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Logging in...
                </div>
              ) : (
                "LOGIN"
              )}
            </button>
          </form>
        </div>

        {/* Right Section: Image */}
        <div className="hidden md:block md:w-1/2 bg-gray-100 p-8 justify-center items-center">
          <img
            src={loginImage} // Ensure the path to the image is correct
            alt="login illustration"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
