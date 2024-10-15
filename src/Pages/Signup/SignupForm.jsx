import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import API from "../../variable";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    profilePicture: null,
    document1: null,
    document2: null,
  });

  const [dynamicLabels, setDynamicLabels] = useState({
    document1Label: "Document 1",
    document2Label: "Document 2",
  });
  
  const { serviceId } = useParams();
  const [serviceName, setServiceName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDynamicFields = async () => {
      try {
        const response = await axios.get(
          `${API}/api/v1/get/signup/form?serviceID=${serviceId}`,
          { headers: { accept: "application/json" } }
        );

        setServiceName(response.data?.name || "");
        setDynamicLabels({
          document1Label: response.data?.Document1_Name || "Document 1",
          document2Label: response.data?.Document2_Name || "Document 2",
        });
      } catch (error) {
        console.error("Error fetching dynamic fields:", error);
      }
    };

    fetchDynamicFields();
  }, [serviceId]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData instance for file and text data
    const requestData = new FormData();
    requestData.append("username", formData.email.split("@")[0]);
    requestData.append("email", formData.email);
    requestData.append("firstName", formData.firstName);
    requestData.append("lastName", formData.lastName);
    requestData.append("dob", formData.dateOfBirth);
    requestData.append("icon", formData.profilePicture); // Append profile picture
    requestData.append("password", formData.password);
    requestData.append("document1", formData.document1); // Correct key as per your API
    requestData.append("document2", formData.document2); // Correct key as per your API
    requestData.append("serviceId", serviceId); // Include the serviceId

    try {
      // Make a POST request to submit the form data
      const response = await axios.post(
        `${API}/api/v1/auth/signup/seller`,
        requestData,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Signup successful:", response.data);
      // Handle successful signup (e.g., redirect or show a success message)
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-4">
      <h2 className="text-4xl font-bold text-white mb-4 text-center">{serviceName}</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        {error && <div className="mb-4 text-red-500">{error}</div>}

        {/* First Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Profile Picture */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Profile Picture</label>
          <input
            type="file"
            name="profilePicture"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Document 1 */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">{dynamicLabels.document1Label}</label>
          <input
            type="file"
            name="document1"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Document 2 */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">{dynamicLabels.document2Label}</label>
          <input
            type="file"
            name="document2"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
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
};

export default SignupForm;
