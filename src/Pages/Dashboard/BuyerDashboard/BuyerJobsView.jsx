import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from '../../../variable'; // Update with your API config
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function BuyerJobsView() {
  const { ID } = useParams(); // Get job ID from params
  const navigate = useNavigate(); // Hook for navigation

  const [job, setJob] = useState(null); // Job data
  const [applicants, setApplicants] = useState([]); // Freelancer applicants
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [showAcceptConfirm, setShowAcceptConfirm] = useState(false); // Confirm accept modal
  const [freelancerToAccept, setFreelancerToAccept] = useState(null); // Freelancer to accept
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Confirm delete job modal

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // Fetch job details
        const jobResponse = await axios.get(`${API}/api/v1/listings/${ID}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('UserloginToken')}`, // Update as needed
          },
        });

        setJob(jobResponse.data);
        console.log(jobResponse);
        
      } catch (error) {
        console.error('Error fetching job details:', error);
        setError('Failed to fetch job details');
      }
    };

    const fetchApplicants = async () => {
      try {
        // Fetch applicants details
        const applicantsResponse = await axios.get(`${API}/api/v1/owner/listings/${ID}/applicants`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('UserloginToken')}`, // Update as needed
          },
        });
        console.log(applicantsResponse);

        setApplicants(applicantsResponse.data.applicants); // Update applicants with response data
      } catch (error) {
        console.error('Error fetching applicants:', error);
        setError('Failed to fetch applicants');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
    fetchApplicants();
  }, [ID]);

  const handleAcceptFreelancer = async (freelancerID) => {
    try {
      // API call to approve the freelancer for the specific job
      await axios.put(`${API}/api/v1/approve/applicants/${ID}/${freelancerID}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('UserloginToken')}`,
        },
      });
  
      alert('Freelancer accepted successfully!');
    } catch (error) {
      console.error('Error accepting freelancer:', error);
      alert('Failed to accept the freelancer');
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

  // Handle navigation back
  const handleBackNavigation = () => {
    navigate(-1); // Navigate to the previous page
  };

  // Navigate to applicant's profile page
  const navigateToFreelancerProfile = (freelancerID) => {
    navigate(`/UserGeneralProfile3/${freelancerID}`); // Example route for freelancer profile page
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 bg-gradient-to-r from-purple-400 to-blue-400 min-h-screen relative">
      {/* Back Navigation Arrow */}
      <div className="absolute top-4 left-4">
        <button onClick={handleBackNavigation} className="text-purple-800">
          <FontAwesomeIcon icon={faArrowLeft} className="text-2xl hover:text-gray-300 transition duration-200" />
        </button>
      </div>

      <div className="bg-gradient-to-r from-white to-gray-200 p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-purple-800">{job.title}</h1>
        <p className="mb-2 text-center text-gray-700"><strong>Description:</strong> {job.description}</p>
        <p className="mb-2 text-center text-gray-700"><strong>Requirements:</strong> {job.requirements}</p>
        <p className="mb-2 text-center text-gray-700"><strong>Status:</strong> {job.status}</p>
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-4 text-center text-white">Freelancers Applied</h2>
      {applicants && applicants.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {applicants.map((freelancer, index) => (
      <div
        key={index}
        className="bg-white border border-gray-300 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200 cursor-pointer"
        onClick={() => navigateToFreelancerProfile(freelancer.id)} // Use 'id' for navigation
      >
        <h3 className="text-lg font-semibold text-center text-purple-800">{`${freelancer.firstName} ${freelancer.lastName}`}</h3>
        <p className="mb-2 text-center text-gray-700"><strong>Email:</strong> {freelancer.email}</p>
        <p className="mb-2 text-center text-gray-700"><strong>Date of Birth:</strong> {freelancer.dob}</p>
        <div className="flex justify-center">
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              confirmAcceptFreelancer(freelancer.id);
            }}
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
            <h2 className="text-xl font-bold mb-2">Confirm Delete</h2>
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

export default BuyerJobsView;
