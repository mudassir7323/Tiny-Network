import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import loginImage from "./Admin-Login-image.jpg"; // Adjust the image path as per your project structure

const AdminLogin = () => {
  // State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // To show error messages
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation: Check if email and password fields are filled
    if (!email || !password) {
      setErrorMessage("Please fill in both fields.");
    } else if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
    } else {
      // If validation passes, proceed with the login
      setErrorMessage("");
      console.log("Logged in with:", { email, password });

      // Clear form
      setEmail("");
      setPassword("");

      // Navigate to the dashboard or another page after login
      // navigate('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex w-4/5 max-w-4xl">
        {/* Left Section: Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Admin Login</h2>
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
              />
            </div>
            <div className="flex justify-between items-center mb-6">
              <span
                className="text-indigo-600 hover:underline cursor-pointer"
                onClick={() => navigate("/Forgot")} // Navigate on click
              >
                Forgot Password
              </span>
            </div>
            <div className="flex items-center mb-6">
              <input
                id="remember"
                type="checkbox"
                className="mr-2 leading-tight"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              LOGIN
            </button>
          </form>
        </div>

        {/* Right Section: Image */}
        <div className="hidden md:block md:w-1/2 bg-gray-100 p-8 justify-center items-center">
          <img
            src={loginImage} // Correct path to the image
            alt="login illustration"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
