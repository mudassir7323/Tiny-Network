import React from 'react';

const AdminDashboardStats = () => {
  // Sample data for freelancer statistics
  const stats = [
    {
      title: 'Users',
      value: 36000,
      backgroundColor: '#4CAF50', // Green
    },
    {
      title: 'Buyers',
      value: 12000,
      backgroundColor: '#2196F3', // Blue
    },
    {
      title: 'Sellers',
      value: 24000,
      backgroundColor: '#FF9800', // Orange
    },
    {
      title: 'Services',
      value: '6',
      backgroundColor: '#9C27B0', // Purple
    },
    // {
    //   title: 'Balance',
    //   value: '$200',
    //   backgroundColor: '#FF5722', // Red
    // },
    // {
    //   title: 'Projects in Progress',
    //   value: 5,
    //   backgroundColor: '#FFC107', // Yellow
    // },
  ];

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
