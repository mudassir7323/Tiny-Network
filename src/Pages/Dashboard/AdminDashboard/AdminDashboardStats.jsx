import React, { useEffect, useState } from "react";
import axios from "axios"; // Importing axios
import API from "../../../variable";

const AdminDashboardStats = () => {
  // State for stats and error
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); // Initialize error state
  const AdminLoginToken = localStorage.getItem("AdminloginToken");

  const getStats = async () => {
    try {
      const response = await axios.get(`${API}/api/v1/seller-buyer/count`, {
        headers: {
          'accept': 'application/json', // Set the accept header
          'Authorization': `Bearer ${AdminLoginToken}` // Include the token in the Authorization header
        }
      });

      // Set fetched data if available
      setData(response.data);
    } catch (err) {
      setError(err.message); // Capture the error message
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  // Use fetched data if available, otherwise fallback to hardcoded stats
  const stats = data ? [
    {
      title: "Users",
      value: data.user_count || 0, // Use the API response
      backgroundColor: "#4CAF50", // Green
    },
    {
      title: "Buyers",
      value: data.buyer_count || 0, // Use the API response
      backgroundColor: "#2196F3", // Blue
    },
    {
      title: "Sellers",
      value: data.seller_count || 0, // Use the API response
      backgroundColor: "#FF9800", // Orange
    },
    {
      title: "Services",
      value: data.service_count || 0, // Use the API response
      backgroundColor: "#9C27B0", // Purple
    },
  ] : []; // Fallback to empty array if data is not yet available

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-6 p-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="p-4 rounded-lg shadow-lg text-white"
          style={{ backgroundColor: stat.backgroundColor }}
        >
          <h3 className="text-xl font-semibold">{stat.title}</h3>
          <p className="text-2xl font-bold mt-2">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboardStats;
