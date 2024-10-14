import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  // Dummy job details data (this should come from an API in a real-world app)
  const dummyJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      description: "We are looking for a skilled React developer to build modern UIs.",
      requirements: [
        "Proficient in React.js",
        "Experience with Tailwind CSS",
        "Strong understanding of state management (Redux or Context API)",
      ],
      salary: "$60,000 - $80,000",
      location: "Remote",
      company: "Tech Corp",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      description: "Create user-centered designs for our web and mobile platforms.",
      requirements: [
        "Experience in UI/UX design",
        "Proficient with Figma or Sketch",
        "Knowledge of design systems",
      ],
      salary: "$50,000 - $70,000",
      location: "New York, NY",
      company: "Creative Studios",
    },
    // Add more dummy jobs if needed
  ];

  // Fetch job details by ID
  useEffect(() => {
    const jobDetails = dummyJobs.find(job => job.id === parseInt(jobId));
    setJob(jobDetails);
  }, [jobId]);

  // If job is not found, show an error or redirect
  if (!job) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold text-red-600">Job not found!</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-6 hover:bg-blue-600"
      >
        Back to Jobs
      </button>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
        <p className="text-gray-700 mb-4">{job.description}</p>

        <div className="mb-4">
          <h3 className="text-2xl font-bold">Requirements:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold">Salary:</h3>
          <p className="text-gray-700">{job.salary}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold">Location:</h3>
          <p className="text-gray-700">{job.location}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold">Company:</h3>
          <p className="text-gray-700">{job.company}</p>
        </div>

        <button
          onClick={() => alert("Applied to the job!")}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
