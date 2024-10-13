import React, { useState } from "react";
import axios from "axios"; // Import axios
import API from "../../../variable"; // Ensure you have the correct API base URL

const Services = () => {
  const [step, setStep] = useState(1); // Step-based form state
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [document1Name, setDocument1Name] = useState("");
  const [document2Name, setDocument2Name] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null); // State to handle API errors

  // Retrieve the Admin login token from localStorage
  const AdminLoginToken = localStorage.getItem("AdminloginToken");

  // Function to handle service submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before submission

    try {
      const response = await axios.post(
        `${API}/api/v1/service/create`,
        {
          name: serviceName,
          description: description,
          Document1_Name: document1Name,
          Document2_Name: document2Name,
        },
        {
          headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${AdminLoginToken}`, // Include token in Authorization header
          },
        }
      );

      console.log("Service created successfully:", response.data);
      // Reset form fields after successful submission
      setServiceName("");
      setDescription("");
      setDocument1Name("");
      setDocument2Name("");
      setSubmitted(true); // Show success message
    } catch (error) {
      console.error("Error creating service:", error);
      setError("Failed to create service. Please try again."); // Show error message
    }

    // Optionally, clear success message after a few seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Service</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        {/* Step 1: Service Name */}
        {step === 1 && (
          <>
            <div>
              <label className="block text-gray-700 mb-2">Service Name</label>
              <input
                type="text"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Next
            </button>
          </>
        )}

        {/* Step 2: Description */}
        {step === 2 && (
          <>
            <div>
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
              />
            </div>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Next
            </button>
          </>
        )}

        {/* Step 3: Document Names */}
        {step === 3 && (
          <>
            <h2 className="text-lg font-semibold mb-2">Enter Document Names</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Document 1 Name</label>
              <input
                type="text"
                value={document1Name}
                onChange={(e) => setDocument1Name(e.target.value)}
                className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Document 2 Name</label>
              <input
                type="text"
                value={document2Name}
                onChange={(e) => setDocument2Name(e.target.value)}
                className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </>
        )}
      </form>

      {/* Submission Success Message */}
      {submitted && (
        <div className="mt-4 text-center text-green-500">
          Service added successfully!
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 text-center text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};

export default Services;
