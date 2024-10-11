import React, { useState } from "react";

const Requests = () => {
  // Dummy requests data
  const [requests, setRequests] = useState([
    { id: 1, user: "Alice Johnson", service: "Web Development" },
    { id: 2, user: "Bob Smith", service: "Graphic Design" },
    { id: 3, user: "Charlie Brown", service: "Data Analysis" },
  ]);

  // Function to handle request acceptance
  const handleAccept = (id) => {
    setRequests(requests.filter((request) => request.id !== id));
    // Logic for accepting a request can go here (e.g., updating a database)
    console.log(`Accepted request from ${id}`);
  };

  // Function to handle request ignoring
  const handleIgnore = (id) => {
    setRequests(requests.filter((request) => request.id !== id));
    // Logic for ignoring a request can go here (e.g., updating a database)
    console.log(`Ignored request from ${id}`);
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
            <div>
              <h2 className="text-xl font-semibold mb-2">{request.user}</h2>
              <p className="text-gray-600 mb-4">Service Requested: {request.service}</p>
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
