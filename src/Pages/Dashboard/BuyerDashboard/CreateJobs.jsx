import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../../../variable'; // Your API URL

function CreateJobs() {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    status: 'pending', // default status
    requirements: '',
    price: 0,
    service_id: '' // This will be set by selecting a service
  });
  const [services, setServices] = useState([]); // To store list of services
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch all services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API}/api/v1/service/get-all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("UserloginToken")}`,
            accept: 'application/json',
          },
        });
        console.log(response);
        
        setServices(response.data); // Assuming the response is an array of services
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to load services.');
      }
    };

    fetchServices();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // API request to create a new job
      const response = await axios.post(`${API}/api/v1/listings/`, jobData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserloginToken")}`,
          accept: 'application/json',
        },
      });

      // Reset form and display success message
      setJobData({ title: '', description: '', status: 'pending', requirements: '', price: 0, service_id: '' });
      setSuccessMessage('Job created successfully!');
    } catch (error) {
      setError('Failed to create job. Please try again.');
      console.error('Error creating job:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle service selection
  const handleServiceSelect = (e) => {
    const selectedServiceId = e.target.value;
    setJobData({ ...jobData, service_id: selectedServiceId });
  };

  return (
    <div className="p-4 bg-blue-50 rounded-lg shadow-md max-w-lg mx-auto"> {/* Updated background color here */}
      <h1 className="text-2xl font-bold mb-4">Create a New Job</h1>

      {/* Success Message */}
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Job Creation Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Job Title</label>
          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Requirements</label>
          <input
            type="text"
            name="requirements"
            value={jobData.requirements}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={jobData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Service</label>
          <select
            name="service_id"
            value={jobData.service_id}
            onChange={handleServiceSelect}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="" disabled>Select a Service</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={jobData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white p-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 transition duration-200'}`}
          disabled={loading}
        >
          {loading ? 'Creating Job...' : 'Create Job'}
        </button>
      </form>
    </div>
  );
}

export default CreateJobs;
