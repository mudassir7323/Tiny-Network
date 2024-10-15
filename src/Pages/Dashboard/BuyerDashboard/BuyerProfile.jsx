import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from "../../../variable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faDownload } from '@fortawesome/free-solid-svg-icons';

const BuyerProfile = () => {
  const [userData, setUserData] = useState(null); // State for storing user data
  const [error, setError] = useState(null); // State to store errors
  const [loading, setLoading] = useState(true); // State to manage loading
  const [showModal, setShowModal] = useState(false); // State for image modal
  const navigate = useNavigate(); // For navigation
  
  // Fetch user data from API
  useEffect(() => {
    const token = localStorage.getItem('UserloginToken');

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${API}/api/v1/auth/get/user-by-token`, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data); // Set user data after successful API call
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false); // Loading complete
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-gray-100 text-lg text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500 text-xl">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 via-teal-300 to-blue-400 p-10 flex justify-center">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-4xl p-8 relative">
        
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 text-gray-700 hover:text-gray-900">
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </button>

        <div className="flex items-center justify-center">
          {/* User Profile Picture */}
          {userData.base64_icon ? (
            <>
              <img
                src={`data:image/${userData.icon_type};base64,${userData.base64_icon}`}
                alt="User Profile"
                className="w-32 h-32 rounded-full border-4 border-blue-400 shadow-lg mb-4 cursor-pointer"
                onClick={() => setShowModal(true)}
              />
              {/* Image Modal */}
              {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg relative">
                    <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={() => setShowModal(false)}>
                      &times;
                    </button>
                    <img
                      src={`data:image/${userData.icon_type};base64,${userData.base64_icon}`}
                      alt="Full Size Profile"
                      className="max-w-full h-auto rounded-lg"
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="w-32 h-32 bg-gray-300 rounded-full mb-4"></div>
          )}
        </div>

        {/* User Info */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">{userData.firstName} {userData.lastName}</h2>
          <p className="text-xl text-gray-500 mb-4">Username: {userData.username}</p>
        </div>  

        {/* Detailed Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
          <div className="bg-gray-100 p-4 rounded-lg">
            <label className="block text-sm text-gray-600">Email:</label>
            <p className="font-medium">{userData.email}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <label className="block text-sm text-gray-600">Date of Birth:</label>
            <p className="font-medium">{userData.dob}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <label className="block text-sm text-gray-600">Service Name:</label>
            <p className="font-medium">{userData.serviceName || "N/A"}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <label className="block text-sm text-gray-600">User ID:</label>
            <p className="font-medium">{userData.id}</p>
          </div>
        </div>

        {/* Document Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Documents</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Document 1 */}
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <span className="text-gray-600">Document 1</span>
              {userData.base64_document1 ? (
                <a
                  href={`data:application/${userData.document1_type};base64,${userData.base64_document1}`}
                  download="document1.pdf"
                  className="text-blue-600 hover:text-blue-800 transition duration-200"
                >
                  <FontAwesomeIcon icon={faDownload} size="lg" />
                </a>
              ) : (
                <span className="text-gray-500">Not available</span>
              )}
            </div>

            {/* Document 2 */}
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <span className="text-gray-600">Document 2</span>
              {userData.base64_document2 ? (
                <a
                  href={`data:application/${userData.document2_type};base64,${userData.base64_document2}`}
                  download="document2.pdf"
                  className="text-blue-600 hover:text-blue-800 transition duration-200"
                >
                  <FontAwesomeIcon icon={faDownload} size="lg" />
                </a>
              ) : (
                <span className="text-gray-500">Not available</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;
