import React from 'react';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, ArcElement, LineElement, PointElement, BarElement, Tooltip, Legend);

const AdminDashboardCharts = () => {
  // Sample data for the charts
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Users',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const barChartData = {
    labels: ['Total', 'Buyer', 'Seller', 'Services'],
    datasets: [
      {
        label: 'Total Network',
        data: [36000, 12000, 24000, 6],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
      },
    ],
  };

  const donutChartData = {
    labels: ['Visitors', 'Workers', 'professionals'],
    datasets: [
      {
        data: [36000, 24000, 12000],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
      },
    ],
  };

  return (
    <div className="flex flex-col p-6 space-y-6">
      {/* Line Chart - Full Width */}
      <div className="border border-gray-300 rounded-lg shadow-lg p-4" style={{ height: '300px' }}>
        <h2 className="text-lg font-semibold mb-2 text-center">Line Chart</h2>
        <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
      </div>

      {/* Bar and Donut Charts - Side by Side */}
      <div className="flex justify-between space-x-4">
        <div className="border border-gray-300 rounded-lg shadow-lg w-1/2 p-4" style={{ height: '300px' }}>
          <h2 className="text-lg font-semibold mb-2 text-center">Bar Chart</h2>
          <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
        </div>
        <div className="border h-max border-gray-300 rounded-lg shadow-lg w-1/2 p-4" style={{ height: '300px' }}>
          <h2 className="text-lg font-semibold mb-2 text-center">Donut Chart</h2>
          <Doughnut data={donutChartData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardCharts;
