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
    // Dynamic fields will be added here later
  });

  const [dynamicFields, setDynamicFields] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const { serviceId } = useParams();
  console.log("Service ID:", serviceId);

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

        setDynamicFields(response.data.fields || []);
        setServiceName(response.data.name || "");

        // Initialize formData for dynamic fields
        const initialFormData = { ...formData };
        response.data.fields.forEach((field) => {
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
    // e.preventDefault();
    // if (formData.password !== formData.confirmPassword) {
    //   alert("Passwords do not match!");
    //   return;
    // }
    // try {
    //   const response = await axios.post(`${API}/api/v1/signup`, { ...formData, serviceId });
    //   console.log('Signup successful:', response.data);
    //   // Redirect or show success message here
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    //   // Handle error case, maybe show an error message
    // }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">{serviceName}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="border rounded w-full p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="border rounded w-full p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border rounded w-full p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border rounded w-full p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="border rounded w-full p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="border rounded w-full p-2"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="border rounded w-full p-2"
          />
        </div>

        {/* Render dynamic fields */}
        {dynamicFields.map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              className="border rounded w-full p-2"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
