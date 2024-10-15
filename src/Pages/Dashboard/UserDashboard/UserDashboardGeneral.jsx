import React from 'react';
import UserDashboardStats from './UserDashboardStats';

const UserDashboardGeneral = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Freelancer Overview
      </h2>

      {/* Stats Cards */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Statistics
        </h3>
        <UserDashboardStats />
      </div>
    </div>
  );
};

export default UserDashboardGeneral;
