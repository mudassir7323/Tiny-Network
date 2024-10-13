import React, { useEffect, useState } from "react";
import API from "../../variable";
import axios from "axios";
import { useParams } from "react-router-dom";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dateOfBirth: "",
    profilePicture: "",
    // Dynamic fields will be added here later
  });

  const [dynamicFields, setDynamicFields] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const { serviceId } = useParams();

  useEffect(() => {
    const fetchDynamicFields = async () => {
      try {
        const response = await axios.get(
          `${API}/api/v1/get/signup/form?serviceID=${serviceId}`,
          {
            headers: {
              accept: "application/json",
            },
          }
        );

        // Set service name from API response
        setServiceName(response.data?.name || "");

        // Extract dynamic fields from the response that start with "Document"
        const documentFields = Object.keys(response.data).filter((key) =>
          key.startsWith("Document")
        );

        // Create an array of objects for dynamic fields
        const dynamicFieldsData = documentFields.map((key) => ({
          name: key,
          label: response.data[key], // Use the value as the label for the input field
          type: "file", // Assuming these are file inputs
        }));

        setDynamicFields(dynamicFieldsData);

        // Initialize formData for dynamic fields
        const initialFormData = { ...formData };
        dynamicFieldsData.forEach((field) => {
          initialFormData[field.name] = ""; // Initialize each dynamic field
        });
        setFormData(initialFormData);
      } catch (error) {
        console.error("Error fetching dynamic fields:", error);
      }
    };

    fetchDynamicFields();
  }, [serviceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation and submission logic here
    try {
      const response = await axios.post(`${API}/api/v1/signup`, { ...formData, serviceId });
      console.log("Signup successful:", response.data);
      // Handle successful signup (e.g., redirect or show a message)
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error case
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-4">
      <h2 className="text-4xl font-bold text-white mb-4 text-center">{serviceName}</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
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

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
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
          />
        </div>

        {/* Dynamic Fields */}
        {dynamicFields.map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        ))}

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
