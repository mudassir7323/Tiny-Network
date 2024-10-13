import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../../variable";
import Navbar from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";

const SignupMenu = () => {
  const [services, setServices] = useState([]);  // State to store services from API
  const [error, setError] = useState(null);      // Error state
  const navigate = useNavigate();

  // Function to fetch services from API
  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `${API}/api/v1/service/get-all?start=0&end=10`,
        {
          headers: {  
            'accept': 'application/json',
          },
        }
      );
      setServices(response.data);  // Set the services with the data from API
    } catch (error) {
      console.error("Error fetching services:", error);
      setError("Failed to fetch services. Please try again.");
    }
  };

  // Fetch services when component mounts
  useEffect(() => {
    fetchServices();
  }, []);

  // Function to handle clicking on a service
  const handleServiceClick = (service) => {
    console.log("Service clicked:", service); 
    navigate(`/SignupForm/${service.id}`); // Navigate to the SignupForm with the service ID
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-500 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="container mt-14 mx-auto text-center px-4 py-10">
          <h3 className="text-3xl font-semibold text-white mb-10">Choose Your Service</h3>
          {/* Display error message if fetching services fails */}
          {error && <p className="text-red-500">{error}</p>}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {services.length > 0 ? (
              services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 border-4 border-transparent hover:border-blue-300 hover:border-opacity-60"
                  style={{
                    boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)", // Custom shiny effect
                  }}
                  onClick={() => handleServiceClick(service)}  // Add onClick handler
                >
                  <h4 className="text-xl font-semibold text-gray-800">{service.name}</h4>
                  <p className="mt-2 text-gray-600">{service.description}</p>
                </div>
              ))
            ) : (
              <p className="text-white">Loading services...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupMenu;
