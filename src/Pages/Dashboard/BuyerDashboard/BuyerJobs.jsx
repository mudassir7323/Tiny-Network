import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import API from '../../../variable'; // Your API URL

function BuyerJobs() {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({ title: '', description: '', requirements: '' });
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch jobs from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API}/api/v1/jobs`, {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("UserloginToken")}`,
            accept: 'application/json'
          }
        });
        setJobs(response.data);
      } catch (error) {
        setError('Failed to fetch jobs.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/api/v1/jobs`, newJob, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserloginToken")}`,
          accept: 'application/json',
        },
      });
      setJobs([...jobs, response.data]); // Update jobs list
      setNewJob({ title: '', description: '', requirements: '' });
      setShowForm(false);
    } catch (error) {
      setError('Failed to create a new job.');
      console.error(error);
    }
  };

  const confirmDeleteJob = (job) => {
    setShowDeleteConfirm(true);
    setJobToDelete(job);
  };

  const handleDeleteJob = async () => {
    try {
      await axios.delete(`${API}/api/v1/jobs/${jobToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserloginToken")}`,
          accept: 'application/json',
        },
      });
      const updatedJobs = jobs.filter((job) => job.id !== jobToDelete.id);
      setJobs(updatedJobs);
      setSelectedJob(null);
    } catch (error) {
      console.error('Failed to delete job:', error);
    } finally {
      setShowDeleteConfirm(false);
      setJobToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setJobToDelete(null);
  };

  if (loading) return <div className="text-center py-4">Loading jobs...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Buyer Jobs</h1>
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 flex items-center"
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Create New Job
      </button>

      {/* Job Form */}
      {showForm && (
        <form onSubmit={handleFormSubmit} className="mb-4 bg-gray-100 p-4 rounded shadow">
          <div className="mb-2">
            <label className="block text-sm font-medium">Job Title</label>
            <input
              type="text"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={newJob.description}
              onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            ></textarea>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Requirements</label>
            <input
              type="text"
              value={newJob.requirements}
              onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded transform transition duration-300 ease-in-out hover:bg-green-600 hover:scale-105 hover:shadow-lg"
          >
            Submit
          </button>
        </form>
      )}

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-4 rounded shadow cursor-pointer relative hover:shadow-lg transition duration-200"
            onClick={() => handleJobClick(job)}
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p>{job.description}</p>
            <p className="text-gray-500 text-sm">Status: {job.status}</p>

            {/* Delete Job Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event
                confirmDeleteJob(job);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        ))}
      </div>

      {/* Job Details Popup */}
      {selectedJob && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-2">{selectedJob.title}</h2>
            <p><strong>Description:</strong> {selectedJob.description}</p>
            <p><strong>Requirements:</strong> {selectedJob.requirements}</p>
            <p><strong>Status:</strong> {selectedJob.status}</p>
            <button
              onClick={() => setSelectedJob(null)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-2">Confirm Delete</h2>
            <p>Are you sure you want to delete the job "{jobToDelete.title}"?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleDeleteJob}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuyerJobs;
