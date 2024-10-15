import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from '../../../variable'; // Update with your API config
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

function AdminJobsView() {
  const { ID } = useParams(); // Get job ID from params
  
  const [job, setJob] = useState(null); // Job data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [showAcceptConfirm, setShowAcceptConfirm] = useState(false); // Confirm accept modal
  const [freelancerToAccept, setFreelancerToAccept] = useState(null); // Freelancer to accept
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Confirm delete job modal
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // Fetch job details
        const jobResponse = await axios.get(`${API}/api/v1/listings/${ID}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('AdminloginToken')}`, // Update as needed
          },
        });

        setJob(jobResponse.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setError('Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [ID]);

  const handleAcceptFreelancer = async (freelancerID) => {
    try {
      // Your logic to accept freelancer
      console.log(`Accepting freelancer with ID: ${freelancerID}`);
      // Example API call (uncomment and implement)
      // await axios.post(`${API}/api/v1/job/${ID}/accept/${freelancerID}`, null, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('UserToken')}`,
      //   },
      // });
      alert('Freelancer accepted successfully!');
    } catch (error) {
      console.error('Error accepting freelancer:', error);
    } finally {
      setShowAcceptConfirm(false);
      setFreelancerToAccept(null);
    }
  };

  const confirmAcceptFreelancer = (freelancerID) => {
    setShowAcceptConfirm(true);
    setFreelancerToAccept(freelancerID);
  };

  const confirmDeleteJob = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteJob = async () => {
    try {
      console.log(`Deleting job with ID: ${ID}`);
      await axios.delete(`${API}/api/v1/listings/self/${ID}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('UserloginToken')}`,
        },
      });
      alert('Job deleted successfully!');
      navigate('/BuyerDashboard'); // Redirect after deletion
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job');
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const cancelAccept = () => {
    setShowAcceptConfirm(false);
    setFreelancerToAccept(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 bg-gradient-to-r from-purple-400 to-blue-400 min-h-screen">
      <div className="bg-gradient-to-r from-white to-gray-200 p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-purple-800">{job.title}</h1>
        <p className="mb-2 text-center text-gray-700"><strong>Description:</strong> {job.description}</p>
        <p className="mb-2 text-center text-gray-700"><strong>Requirements:</strong> {job.requirements}</p>
        <p className="mb-2 text-center text-gray-700"><strong>Status:</strong> {job.status}</p>
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-4 text-center text-white">Freelancers Applied</h2>
      {job.applicants && job.applicants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {job.applicants.map((freelancer, index) => (
            <div key={index} className="bg-white border border-gray-300 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200">
              <img src={freelancer.icon} alt="Freelancer Icon" className="w-16 h-16 rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-center text-purple-800">{`${freelancer.firstName} ${freelancer.lastName}`}</h3>
              <p className="mb-2 text-center text-gray-700"><strong>Email:</strong> {freelancer.email}</p>
              <div className="flex justify-center">
                <button
                  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200"
                  onClick={() => confirmAcceptFreelancer(freelancer.ID)}
                >
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-4 text-gray-700">No freelancers have applied to this job yet.</p>
      )}

      {/* Delete Job Button */}
      <div className="mt-6 text-center">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
          onClick={confirmDeleteJob}
        >
          <FontAwesomeIcon icon={faTrash} className="mr-2" />
          Delete Job
        </button>
      </div>

      {/* Confirm Accept Modal */}
      {showAcceptConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 sm:w-1/3">
            <h2 className="text-xl font-bold mb-2">Confirm Accept</h2>
            <p>Are you sure you want to accept this freelancer?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => handleAcceptFreelancer(freelancerToAccept)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Accept
              </button>
              <button
                onClick={cancelAccept}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Job Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 sm:w-1/3">
            <h2 className="text-xl font-bold mb-2">Confirm Delete Job</h2>
            <p>Are you sure you want to delete this job?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleDeleteJob}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
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

export default AdminJobsView;
