import React from 'react';
import UserDashboardStats from './UserDashboardStats';
import UserDashboardCharts from './UserDashboardCharts';

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

      {/* Charts Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Performance Charts
        </h3>
        <UserDashboardCharts />
      </div>
    </div>
  );
};

export default UserDashboardGeneral;
