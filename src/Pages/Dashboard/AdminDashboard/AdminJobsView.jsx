import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from '../../../variable'; // Update with your API config
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function AdminJobsView() {
  const { ID } = useParams(); // Get job ID from params
  const [job, setJob] = useState(null); // Job data
  const [applicants, setApplicants] = useState([]); // Applicants data
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

        // Fetch applicants
        const applicantsResponse = await axios.get(`${API}/api/v1/admin/listings/${ID}/applicants`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('AdminloginToken')}`, // Use same token for authorization
          },
        });
        
        setApplicants(applicantsResponse.data); // Assuming the response data contains the applicants
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
      await axios.delete(`${API}/api/v1/listings/self/${ID}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('AdminloginToken')}`,
        },
      });
      alert('Job deleted successfully!');
      navigate('/AdminDashboard'); // Redirect after deletion
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
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Back Button */}
      <button className="mb-4 text-blue-600" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} size="lg" /> Back
      </button>

      {/* Job Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{job.title}</h1>
        <p className="text-gray-700"><strong>Description:</strong> {job.description}</p>
        <p className="text-gray-700"><strong>Requirements:</strong> {job.requirements || 'None specified'}</p>
        <p className="text-gray-700"><strong>Status:</strong> {job.status}</p>
      </div>

      {/* Freelancers Section */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Freelancers Applied</h2>
      {applicants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {applicants.map((freelancer, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">{`${freelancer.firstName} ${freelancer.lastName}`}</h3>
              <p className="text-gray-700"><strong>Email:</strong> {freelancer.email}</p>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-green-600"
                onClick={() => confirmAcceptFreelancer(freelancer.ID)}
              >
                <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                Accept
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700">No freelancers have applied to this job yet.</p>
      )}

      {/* Delete Job Button */}
      <div className="text-center mt-6">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          onClick={confirmDeleteJob}
        >
          <FontAwesomeIcon icon={faTrash} className="mr-2" />
          Delete Job
        </button>
      </div>

      {/* Confirm Accept Modal */}
      {showAcceptConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">Confirm Accept</h2>
            <p>Are you sure you want to accept this freelancer?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => handleAcceptFreelancer(freelancerToAccept)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Confirm
              </button>
              <button
                onClick={cancelAccept}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
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
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">Confirm Delete Job</h2>
            <p>Are you sure you want to delete this job?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleDeleteJob}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
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
