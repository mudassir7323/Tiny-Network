import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedCategory] = useState("tech"); // Pre-defined category
  const [appliedJobs, setAppliedJobs] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [jobToCancel, setJobToCancel] = useState(null);
  const navigate = useNavigate();

  // Dummy jobs data with categories
  useEffect(() => {
    const dummyJobs = [
      {
        id: 1,
        title: "Frontend Developer",
        description: "React developer needed for building dynamic UIs.",
        category: "tech",
      },
      {
        id: 2,
        title: "UI/UX Designer",
        description: "Design stunning interfaces for web and mobile applications.",
        category: "design",
      },
      {
        id: 1,
        title: "Digital Marketing Specialist",
        description: "Manage social media and digital campaigns.",
        category: "marketing",
      },
      {
        id: 2,
        title: "Backend Developer",
        description: "Develop scalable APIs and services using Node.js.",
        category: "tech",
      },
      {
        id: 1,
        title: "Graphic Designer",
        description: "Create engaging visuals for brands and products.",
        category: "design",
      },
    ];
    setJobs(dummyJobs);
  }, []);

  // Filter jobs based on pre-selected category
  const filteredJobs = jobs.filter(job => job.category === selectedCategory);

  // Handle Apply button toggle
  const handleApply = (jobId) => {
    setAppliedJobs(prev => ({
      ...prev,
      [jobId]: true,
    }));
  };

  // Handle Cancel button (show popup)
  const handleCancel = (jobId) => {
    setJobToCancel(jobId);
    setShowPopup(true);
  };

  // Confirm Cancel action
  const confirmCancel = () => {
    setAppliedJobs(prev => ({
      ...prev,
      [jobToCancel]: false,
    }));
    setShowPopup(false);
  };

  // Navigate to job details
  const handleViewDetails = (jobId) => {
    navigate(`/Jobdetails/${jobId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Available Jobs in Tech</h1>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">{job.title}</h2>
            <p className="text-gray-700 mb-4">{job.description.slice(0, 100)}...</p>

            <div className="flex justify-between items-center">
              <button
                onClick={() => handleViewDetails(job.id)}
                className="text-blue-500 hover:underline"
              >
                View Details
              </button>

              {!appliedJobs[job.id] ? (
                <button
                  onClick={() => handleApply(job.id)}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                >
                  Apply
                </button>
              ) : (
                <button
                  onClick={() => handleCancel(job.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                  Cancel Application
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cancel Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Confirm Cancel</h3>
            <p>Are you sure you want to cancel your application?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={confirmCancel}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 mr-2"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserJobs;
