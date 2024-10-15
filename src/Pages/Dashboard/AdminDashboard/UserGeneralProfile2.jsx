import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from "../../../variable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faDownload } from '@fortawesome/free-solid-svg-icons'; // Import icons

const UserGeneralProfile2 = () => {
  const { id } = useParams(); // Get the user ID from the URL params
  const [userData, setUserData] = useState(null); // State to store user data
  const [error, setError] = useState(null); // State to handle any errors
  const [loading, setLoading] = useState(true); // State to manage loading
  const [showModal, setShowModal] = useState(false); // State for handling image popup
  const navigate = useNavigate(); // For navigating back to the previous page

  // Fetch user data when the component mounts or when the 'id' param changes
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log(id);
        
        const response = await axios.get(`${API}/api/v1/users/unauthorized/${id}`, {
          headers: { 
            accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem("AdminloginToken")}`
          }
        });
        console.log(id);
        
        // Set the user data after successful API call
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-gray-50 text-lg text-gray-700 animate-pulse">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500 text-xl">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8 relative">
      
      {/* Back Button at the Top */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate(-1)} // Go back to the previous page
          className="text-blue-600 hover:text-blue-800 text-3xl"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg transition duration-300 transform hover:scale-105">
        <div className="text-center mb-8">
          {/* Show user icon */}
          {userData.base64_icon ? (
            <>
              <img
                src={`data:image/${userData.icon_type};base64,${userData.base64_icon}`}
                alt={`${userData.username}'s Profile`}
                className="w-36 h-36 rounded-full mx-auto mb-4 border-4 border-blue-400 shadow-lg cursor-pointer"
                onClick={() => setShowModal(true)} // Open modal on click
              />
              {/* Image Modal */}
              {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-4 rounded-lg shadow-lg relative">
                    <button
                      className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                      onClick={() => setShowModal(false)} // Close modal on click
                    >
                      &times;
                    </button>
                    <img
                      src={`data:image/${userData.icon_type};base64,${userData.base64_icon}`}
                      alt={`${userData.username}'s Full-Size Profile`}
                      className="max-w-full h-auto rounded-lg"
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="w-36 h-36 bg-gray-300 rounded-full mx-auto mb-4"></div>
          )}

          {/* Username */}
          <h2 className="text-4xl font-extrabold text-blue-800 mb-2">{userData.username || "Unknown User"}</h2>
          <p className="text-sm text-gray-500">User ID: {id}</p>
        </div>

        {/* User Info */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="block text-gray-600 font-semibold">Email</label>
            <p className="text-gray-900 bg-gray-100 px-4 py-2 rounded-md">{userData.email || "Not available"}</p>
          </div>

          <div className="flex justify-between">
            <label className="block text-gray-600 font-semibold">First Name</label>
            <p className="text-gray-900 bg-gray-100 px-4 py-2 rounded-md">{userData.firstName || "Not available"}</p>
          </div>

          <div className="flex justify-between">
            <label className="block text-gray-600 font-semibold">Last Name</label>
            <p className="text-gray-900 bg-gray-100 px-4 py-2 rounded-md">{userData.lastName || "Not available"}</p>
          </div>

          <div className="flex justify-between">
            <label className="block text-gray-600 font-semibold">Date of Birth</label>
            <p className="text-gray-900 bg-gray-100 px-4 py-2 rounded-md">{userData.dob || "Not available"}</p>
          </div>

          <div className="flex justify-between">
            <label className="block text-gray-600 font-semibold">Service Name</label>
            <p className="text-gray-900 bg-gray-100 px-4 py-2 rounded-md">{userData.serviceName || "Not available"}</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        {/* Documents Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-gray-600 font-semibold">Document 1</label>
            {userData.base64_document1 ? (
              <a
                href={`data:application/${userData.document1_type};base64,${userData.base64_document1}`}
                download="document1.pdf"
                className="text-blue-600 hover:text-blue-800 transition duration-200"
              >
                <FontAwesomeIcon icon={faDownload} size="lg" />
              </a>
            ) : (
              <p className="text-gray-900">Not available</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <label className="block text-gray-600 font-semibold">Document 2</label>
            {userData.base64_document2 ? (
              <a
                href={`data:application/${userData.document2_type};base64,${userData.base64_document2}`}
                download="document2.pdf"
                className="text-blue-600 hover:text-blue-800 transition duration-200"
              >
                <FontAwesomeIcon icon={faDownload} size="lg" />
              </a>
            ) : (
              <p className="text-gray-900">Not available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGeneralProfile2;
