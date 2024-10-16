import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../../variable"; // Adjust the import path to your API configuration
import { useNavigate } from "react-router-dom";

const UserJobs = () => {
  const [jobs, setJobs] = useState([]);
  const serviceid = localStorage.getItem("ServiceID"); // Fetch the category from localStorage
  const navigate = useNavigate()

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API}/api/v1/listings/service/${serviceid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('UserloginToken')}`, // Use the appropriate token
          },
        });
        setJobs(response.data); // Assuming the API returns an array of jobs
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [serviceid]);

  // Handle Apply button
  const handleApply = (jobId) => {
    navigate(`/JobDetails/${jobId}`)
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Available Jobs</h1>

      {/* Job List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">{job.title}</h2>
            <p className="text-gray-700 mb-4">{job.description.slice(0, 100)}...</p>

            <button
              onClick={() => handleApply(job.id)}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserJobs;
