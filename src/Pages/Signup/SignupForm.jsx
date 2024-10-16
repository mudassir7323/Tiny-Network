import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import API from "../../variable";
import Navbar from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const [dynamicLabels, setDynamicLabels] = useState({
    document1Label: "Document 1",
    document2Label: "Document 2",
  });

  const { serviceId } = useParams();
  const [serviceName, setServiceName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

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
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      
      // Limit file size to 2MB (2 * 1024 * 1024 bytes)
      if (file && file.size > 0.3 * 1024 * 1024) {
        alert("File size exceeds 300KB limit. Please upload a smaller file.");
        return;
      }

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
    
    setLoading(true); // Set loading state to true
    
    const requestData = new FormData();
    requestData.append("username", formData.email.split("@")[0]);
    requestData.append("email", formData.email);
    requestData.append("firstName", formData.firstName);
    requestData.append("lastName", formData.lastName);
    requestData.append("dob", formData.dateOfBirth);
    requestData.append("icon", formData.profilePicture);
    requestData.append("password", formData.password);
    requestData.append("document1", formData.document1);
    requestData.append("document2", formData.document2);
    requestData.append("serviceId", serviceId);

    try {
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
      navigate("/User-login");
      
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred while submitting the form.");
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-4">
      <Navbar />
      <h2 className="text-4xl font-bold pt-14 text-white mb-4 text-center">{serviceName}</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        {error && <div className="mb-4 text-red-500">{error}</div>}

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

        <div className="mb-4">
          <button
            type="submit"
            className={`w-full bg-purple-500 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
