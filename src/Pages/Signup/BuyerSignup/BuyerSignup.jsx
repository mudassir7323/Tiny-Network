import React, { useState } from "react";
import Navbar from "../../../Components/Navbar"

function BuyerSignup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Handle form submission, e.g., send data to the backend
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-4">
      {/* Main Title */}
      <Navbar/>
      <h1 className="text-4xl font-bold text-white mb-4">Tiny Task Networks</h1>

      {/* Subtitle */}
      <h2 className="text-2xl text-white mb-8">Sign Up</h2>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        {/* First Name */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="firstName"
          >
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
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="lastName"
          >
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
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
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

        {/* Confirm Password */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Confirm your password"
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

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default BuyerSignup;
