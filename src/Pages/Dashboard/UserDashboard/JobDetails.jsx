import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../../variable"; // Adjust the import path to your API configuration

const JobDetails = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const [job, setJob] = useState(null); // State to store the job details
  const [showPopup, setShowPopup] = useState(false); // State to manage the apply popup visibility
  const navigate = useNavigate(); // Hook to navigate between routes

  // Fetch job details from API when component mounts
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`${API}/api/v1/listings/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('UserloginToken')}`,
          },
        });
        setJob(response.data); // Assuming the API returns the job details
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [id]);

  // Handle the apply button click to show the confirmation popup
  const handleApplyClick = () => {
    setShowPopup(true);
  };

  // Confirm the application (API call to apply for the job)
  const confirmApply = async () => {
    try {
      await axios.post(
        `${API}/api/v1/listings/${id}/apply`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('UserloginToken')}`,
          },
        }
      );
      setShowPopup(false);
      alert("You have successfully applied for the job!"); // Success feedback
    } catch (error) {
      console.error("Error applying for the job:", error);
      alert("There was an error applying for the job.");
      navigate("/UserDashboard")
    }
  };

  // If job is not found, show an error message
  if (!job) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold text-red-600">Job not found!</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-6 hover:bg-blue-600"
      >
        Back to Jobs
      </button>

      {/* Job details */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
        <p className="text-gray-700 mb-4">{job.description}</p>

        {/* Requirements section with array check */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold">Requirements:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {job.requirements}
          </ul>
        </div>

        {/* Additional job details */}
        <div className="mb-4">
          <h3 className="text-xl font-bold">Salary:</h3>
          <p className="text-gray-700">{job.price}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold">Location:</h3>
          <p className="text-gray-700">{job.location || "None"}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold">Company:</h3>
          <p className="text-gray-700">{job.company || "Not Mentioned"}</p>
        </div>

        {/* Apply button */}
        <button
          onClick={handleApplyClick}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
        >
          Apply Now
        </button>
      </div>

      {/* Apply confirmation popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Confirm Application</h3>
            <p>Are you sure you want to apply for this job?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={confirmApply}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 mr-2"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
