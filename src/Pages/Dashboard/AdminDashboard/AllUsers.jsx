import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../../../variable"; // Ensure this is the correct import for your API base URL
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const [users, setUsers] = useState([]); // Initialize users as an empty array
  const [filter, setFilter] = useState("all"); // State to manage filter selection
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State for error handling
  const AdminLoginToken = localStorage.getItem("AdminloginToken");
  const navigate = useNavigate();

  // Function to fetch users from API
  const fetchUsers = async () => {
    setLoading(true); // Set loading to true when fetching starts
    setError(null); // Reset any previous error

    try {
      const response = await axios.get(`${API}/api/v1/user/category/all`, {
        headers: {
          Authorization: `Bearer ${AdminLoginToken}`, // Include the token in the Authorization header
          accept: "application/json", // Set the accept header
        },
      });

      console.log(response);

      // Ensure we safely access the data and set it
      setUsers(response.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again."); // Set error state
    } finally {
      setLoading(false); // Set loading to false when fetching completes
    }
  };

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to delete a user with confirmation
  const deleteUser = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this user?");
    if (!confirmation) return;

    try {
      setLoading(true); // Set loading to true before making the request
      await axios.delete(`${API}/api/v1/${id}`, {
        headers: {
          Authorization: `Bearer ${AdminLoginToken}`, // Include the token in the Authorization header
          accept: "application/json", // Set the accept header
        },
      });

      // After successful deletion, update the local state by removing the deleted user
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user. Please try again."); // Set error state
    } finally {
      setLoading(false); // Set loading to false when operation completes
    }
  };

  // Navigate to the user profile on clicking
  const handleClickUser = (id) => {
    navigate(`/UserGeneralProfile/${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Users</h1>

      {/* Filter Options */}
      <div className="mb-6 flex justify-center space-x-4">
        {["all", "buyer", "seller"].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              filter === category
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
            onClick={() => setFilter(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1) + "s"}
          </button>
        ))}
      </div>

      {/* Loading and Error Handling */}
      {loading && <p className="text-center">Loading users...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.length > 0 ? (
          users.map((user) => {
            // Render users based on the selected filter
            if (filter === "all" || user.category.toLowerCase() === filter) {
              return (
                <div
                  key={user.id}
                  className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between h-full"
                >
                  <div onClick={() => handleClickUser(user.id)} className="cursor-pointer">
                    <h2 className="text-xl font-semibold mb-2">
                      {user.username || "Unknown User"}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Category: {user.category || "Unknown"}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              );
            }
            return null; // Return null for users that don't match the filter
          })
        ) : (
          <p className="text-center text-gray-600">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
