import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signupImage from "../../../assets/signup-image.png"; // Adjust the image path as per your project structure
import { FaUserCircle, FaFileAlt } from 'react-icons/fa'; // Import icons for picture and resume

const TeacherSignup = () => {
  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [experience, setExperience] = useState("");
  const [profession, setProfession] = useState("Teacher");
  const [picture, setPicture] = useState(null);
  const [resume, setResume] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // To show error messages
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation: Check if all fields are filled
    if (!firstName || !lastName || !email || !password || !dob || !experience || !picture || !resume) {
      setErrorMessage("Please fill in all fields.");
    } else if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
    } else {
      // If validation passes, proceed with the signup (for now, just log to the console)
      setErrorMessage("");
      console.log("Signed up with:", {
        firstName,
        lastName,
        email,
        password,
        dob,
        experience,
        picture,
        resume,
        profession,
      });

      // Clear form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setDob("");
      setExperience("");
      setPicture(null);
      setResume(null);

      // Navigate to another page after successful signup
      // navigate('/dashboard');
    }
  };

  // Handle file input for picture and resume
  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex w-4/5 max-w-4xl">
        {/* Left Section: Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Teacher Signup</h2>
          <p className="text-sm text-gray-500 mb-6">
            Already have an account?{" "}
            <span
              className="text-indigo-600 hover:underline cursor-pointer"
              onClick={() => navigate("/User-Login")}
            >
              Login
            </span>
          </p>

          {/* Error message display */}
          {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-gray-600 mb-2">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                placeholder="Enter your first name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="lastName" className="block text-gray-600 mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                placeholder="Enter your last name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                placeholder="Enter 6 characters or more"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="dob" className="block text-gray-600 mb-2">
                Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="experience" className="block text-gray-600 mb-2">
                Years of Experience
              </label>
              <input
                id="experience"
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                placeholder="Enter years of experience"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="picture" className="block text-gray-600 mb-2 flex items-center">
                <FaUserCircle className="mr-2" /> Profile Picture
              </label>
              <input
                id="picture"
                type="file"
                onChange={(e) => handleFileChange(e, setPicture)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="resume" className="block text-gray-600 mb-2 flex items-center">
                <FaFileAlt className="mr-2" /> Resume
              </label>
              <input
                id="resume"
                type="file"
                onChange={(e) => handleFileChange(e, setResume)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              SIGN UP
            </button>
          </form>
        </div>

        {/* Right Section: Image */}
        <div className="hidden md:block md:w-1/2 bg-gray-100 p-0 flex justify-center items-center">
          <img
            src={signupImage} // Correct path to the image
            alt="signup illustration"
            className="w-full h-full object-cover" // Set full width and height
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherSignup;
