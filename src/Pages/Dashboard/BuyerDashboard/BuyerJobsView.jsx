import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from '../../../variable'; // Update with your API config
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

function BuyerJobsView() {
  const { id } = useParams(); // Get job ID from params
  const [job, setJob] = useState(null); // Job data
  const [freelancers, setFreelancers] = useState([]); // List of freelancers
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // Fetch job details
        const jobResponse = await axios.get(`${API}/api/v1/job/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('UserToken')}`, // Update as needed
          },
        });

        // Fetch freelancers who applied for the job
        const freelancersResponse = await axios.get(`${API}/api/v1/job/${id}/applicants`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('UserToken')}`,
          },
        });

        setJob(jobResponse.data);
        setFreelancers(freelancersResponse.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setError('Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleAcceptFreelancer = async (freelancerId) => {
    try {
      await axios.post(`${API}/api/v1/job/${id}/accept/${freelancerId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('UserToken')}`,
        },
      });
      alert('Freelancer accepted successfully!');
    } catch (error) {
      console.error('Error accepting freelancer:', error);
    }
  };

  const handleDeleteFreelancer = async (freelancerId) => {
    try {
      await axios.delete(`${API}/api/v1/job/${id}/reject/${freelancerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('UserToken')}`,
        },
      });
      setFreelancers(freelancers.filter((f) => f.id !== freelancerId));
      alert('Freelancer removed successfully!');
    } catch (error) {
      console.error('Error deleting freelancer:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <p className="mb-2"><strong>Description:</strong> {job.description}</p>
      <p className="mb-2"><strong>Requirements:</strong> {job.requirements}</p>
      <p className="mb-2"><strong>Status:</strong> {job.status}</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Freelancers Applied</h2>
      {freelancers.length > 0 ? (
        <ul className="space-y-4">
          {freelancers.map((freelancer) => (
            <li key={freelancer.id} className="flex justify-between items-center p-4 bg-white shadow rounded">
              <div>
                <p className="text-lg font-semibold">{freelancer.name}</p>
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => navigate(`/freelancer/${freelancer.id}`)} // Navigate to freelancer profile
                >
                  View Profile
                </button>
              </div>
              <div className="flex space-x-4">
                <button
                  className="text-green-500 hover:text-green-700"
                  onClick={() => handleAcceptFreelancer(freelancer.id)}
                >
                  <FontAwesomeIcon icon={faCheckCircle} size="lg" />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteFreelancer(freelancer.id)}
                >
                  <FontAwesomeIcon icon={faTrash} size="lg" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No freelancers have applied to this job yet.</p>
      )}
    </div>
  );
}

export default BuyerJobsView;
