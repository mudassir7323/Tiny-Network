import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import API from '../../../variable'; // Your API URL
import { useNavigate } from 'react-router-dom';

function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const navigate = useNavigate();

  // Fetch jobs from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API}/api/v1/listings/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminloginToken")}`,
            accept: 'application/json'
          }
        });
        if (response) {
          setJobs(response.data);
        } else {
          setJobs([]);
        }
      } catch (error) {
        setError('Failed to fetch jobs.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleJobClick = (jobId) => {
    navigate(`/AdminJobsView/${jobId}`);
  };

  const confirmDeleteJob = (job) => {
    setJobToDelete(job);
    setShowDeleteConfirm(true);
  };

  const handleDeleteJob = async () => {
    try {
      await axios.delete(`${API}/api/v1/listings/${jobToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminloginToken")}`,
        }
      });
      // Remove the deleted job from the state
      setJobs(jobs.filter(job => job.id !== jobToDelete.id));
      alert('Job deleted successfully!'); // Notify user about successful deletion
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job'); // Notify user about failure
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

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-4 rounded shadow cursor-pointer relative hover:shadow-lg transition duration-200"
            onClick={() => handleJobClick(job.id)} // Pass job ID on click
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p>{job.description}</p>
            <p className="text-gray-500 text-sm">Status: {job.status}</p>
            <p className="text-gray-500 text-sm">Price: ${job.price}</p>
            <p className="text-gray-500 text-sm">Applicants: {job.number_of_applies}</p>

            {/* Delete Job Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event
                confirmDeleteJob(job); // Open confirmation popup
              }}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        ))}
      </div>

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

export default AdminJobs;
