import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../../../variable";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to fetch user requests from the API
  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        `${API}/api/v1/users/unauthorized/all`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("AdminloginToken")}`, // Assuming token is stored in localStorage
          },
        }
      );

      console.log(response);

      // Map the API response to the requests state
      const formattedRequests = response.data.map((user) => ({
        id: user.id, // Using the user ID from the API response
        username: user.username,
        createdOn: new Date(user.created_on).toLocaleString(), // Format the date for display
        icon: user.icon, // Assuming this is a URL to the user's profile picture
        service: user.service || "No service listed",
      }));

      setRequests(formattedRequests);
    } catch (error) {
      setError("Failed to fetch user requests.");
      console.error("Error fetching user requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Function to handle request acceptance
  const handleAccept = async (userId) => {
    try {
      await axios.post(
        `${API}/api/v1/user/authorise?user_id=${userId}`,
        {},
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("AdminloginToken")}`,
          },
        }
      );
      setRequests(requests.filter((request) => request.id !== userId)); // Update state by removing the accepted request
      console.log(`Accepted request from user ${userId}`);
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  // Function to handle request ignoring
  const handleIgnore = async (userId) => {
    try {
      await axios.delete(
        `${API}/api/v1/unauthorized/${userId}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("AdminloginToken")}`,
          },
        }
      );
      setRequests(requests.filter((request) => request.id !== userId)); // Update state by removing the ignored request
      console.log(`Ignored request from user ${userId}`);
    } catch (error) {
      console.error("Error ignoring request:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleClickUser = (id) => {
    navigate(`/UserGeneralProfile/${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">User Requests</h1>

      {/* Requests List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
          >
            <div className="cursor-pointer" onClick={() => handleClickUser(request.id)}>
              <h2 className="text-xl font-semibold mb-2">{request.username}</h2>
              <p className="text-gray-600 mb-4">
                Service Requested: {request.service}
              </p>
              <p className="text-gray-600 mb-4">
                Created On: {request.createdOn}
              </p>
              {request.icon && (
                <img src={request.icon} alt={`${request.username}'s icon`} className="w-12 h-12 rounded-full" />
              )}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleAccept(request.id)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Accept
              </button>
              <button
                onClick={() => handleIgnore(request.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Ignore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
