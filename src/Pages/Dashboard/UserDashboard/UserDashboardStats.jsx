import React from 'react';

const UserDashboardStats = () => {
  // Sample data for freelancer statistics
  const stats = [
    {
      title: 'Jobs Availed',
      value: 15,
      backgroundColor: '#4CAF50', // Green
    },
    {
      title: 'Jobs Completed',
      value: 25,
      backgroundColor: '#2196F3', // Blue
    },
    {
      title: 'Rating',
      value: 4.9,
      backgroundColor: '#FF9800', // Orange
    },
    {
      title: 'Time Taken',
      value: '30 hrs',
      backgroundColor: '#9C27B0', // Purple
    },
    {
      title: 'Balance',
      value: '$200',
      backgroundColor: '#FF5722', // Red
    },
    {
      title: 'Projects in Progress',
      value: 5,
      backgroundColor: '#FFC107', // Yellow
    },
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

export default UserDashboardStats;
