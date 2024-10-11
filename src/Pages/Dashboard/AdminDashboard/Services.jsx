import React, { useState } from "react";

const Services = () => {
  const [step, setStep] = useState(1); // Step-based form state
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [numDocuments, setNumDocuments] = useState(0);
  const [documentNames, setDocumentNames] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Function to handle service submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle the service submission logic (e.g., API call)
    console.log("Service Submitted:", {
      serviceName,
      description,
      documentNames,
    });

    // Reset form fields
    setServiceName("");
    setDescription("");
    setNumDocuments(0);
    setDocumentNames([]);
    setSubmitted(true);
    
    // Optionally, set a timeout to clear the submitted message
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  // Handle document name input
  const handleDocumentNameChange = (index, value) => {
    const newDocumentNames = [...documentNames];
    newDocumentNames[index] = value;
    setDocumentNames(newDocumentNames);
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
            <div>
              <label className="block text-gray-700 mb-2">Number of Required Documents</label>
              <input
                type="number"
                value={numDocuments}
                onChange={(e) => {
                  const value = Math.max(0, Number(e.target.value));
                  setNumDocuments(value);
                  setDocumentNames(new Array(value).fill("")); // Reset document names array
                }}
                className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
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
            <h2 className="text-lg font-semibold mb-2">Enter Required Document Names</h2>
            {Array.from({ length: numDocuments }).map((_, index) => (
              <div key={index} className="mb-2">
                <label className="block text-gray-700 mb-1">Document {index + 1} Name</label>
                <input
                  type="text"
                  value={documentNames[index] || ""}
                  onChange={(e) => handleDocumentNameChange(index, e.target.value)}
                  className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </>
        )}
      </form>

      {/* Submission Message */}
      {submitted && (
        <div className="mt-4 text-center text-green-500">
          Service added successfully!
        </div>
      )}
    </div>
  );
};

export default Services;
