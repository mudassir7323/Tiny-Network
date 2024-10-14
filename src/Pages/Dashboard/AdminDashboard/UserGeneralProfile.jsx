import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import API from "../../../variable";

const UserGeneralProfile = () => {
  const { id } = useParams(); // Get the user ID from the URL params
  const [userData, setUserData] = useState(null); // State to store user data
  const [error, setError] = useState(null); // State to handle any errors
  const [loading, setLoading] = useState(true); // State to manage loading

  // Fetch user data when the component mounts or when the 'id' param changes
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${API}/api/v1/getUser/${id}`, {
          headers: { 
            accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem("AdminloginToken")}` // Correctly placed inside headers
          }
        });

        // Set the user data after successful API call
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false); // Move loading state here
      }
    };

    fetchUserProfile();
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Displaying user profile details */}
        <div className="text-center mb-6">
          {/* Show user icon */}
          {userData.icon ? (
            <img
              src={userData.icon}
              alt={`${userData.username}'s Profile`}
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
          )}
          
          {/* Username */}
          <h2 className="text-2xl font-bold">{userData.username || "Unknown User"}</h2>
        </div>

        {/* User Info */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Email</label>
          <p className="text-gray-800">{userData.email || "Not available"}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold">First Name</label>
          <p className="text-gray-800">{userData.firstName || "Not available"}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Last Name</label>
          <p className="text-gray-800">{userData.lastName || "Not available"}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Date of Birth</label>
          <p className="text-gray-800">{userData.dob || "Not available"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserGeneralProfile;
