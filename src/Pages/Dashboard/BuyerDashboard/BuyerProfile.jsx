import React from 'react';

const BuyerProfile = () => {
  const profileData = {
    name: 'John Doe',
    jobTitle: 'Software Engineer',
    location: 'San Francisco, CA',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    profilePicture: 'https://via.placeholder.com/150', // Placeholder image
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="bg-white text-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 overflow-auto">
        <div className="flex flex-col items-center mb-6">
          <img
            src={profileData.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500 mb-4"
          />
          <h2 className="text-3xl font-bold mb-2">{profileData.name}</h2>
          <p className="text-xl mb-4">{profileData.jobTitle}</p>
        </div>
        <div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-500">Location:</span>
            <span>{profileData.location}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-500">Email:</span>
            <span>{profileData.email}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-500">Phone:</span>
            <span>{profileData.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;
