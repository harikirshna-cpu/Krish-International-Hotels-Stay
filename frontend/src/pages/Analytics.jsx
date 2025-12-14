import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    totalUsers: 0,
    totalHotels: 0,
    monthlyRevenue: [],
    bookingsByHotel: [],
    userGrowth: [],
    revenueByMonth: []
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchAnalytics();
  }, [user, navigate]);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/analytics', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  // Revenue Chart Data
  const revenueChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: analytics.monthlyRevenue,
        backgroundColor: 'rgba(34, 211, 238, 0.5)',
        borderColor: 'rgba(34, 211, 238, 1)',
        borderWidth: 2
      }
    ]
  };

  // Bookings by Hotel Chart Data
  const bookingsByHotelData = {
    labels: analytics.bookingsByHotel.map(h => h.name),
    datasets: [
      {
        label: 'Bookings',
        data: analytics.bookingsByHotel.map(h => h.count),
        backgroundColor: [
          'rgba(34, 211, 238, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(34, 197, 94, 0.8)',
        ]
      }
    ]
  };

  // User Growth Chart Data
  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'New Users',
        data: analytics.userGrowth,
        borderColor: 'rgba(168, 85, 247, 1)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#fff'
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(75, 85, 99, 0.3)' }
      },
      y: {
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(75, 85, 99, 0.3)' }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#fff'
        },
        position: 'bottom'
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white flex items-center justify-center">
        <div className="text-3xl">⏳ Loading Analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          📊 Business Analytics
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-cyan-800 to-blue-900 rounded-2xl p-6 border border-cyan-500/30">
            <div className="text-4xl mb-2">💰</div>
            <div className="text-3xl font-bold text-cyan-300">${analytics.totalRevenue}</div>
            <div className="text-gray-300">Total Revenue</div>
          </div>

          <div className="bg-gradient-to-br from-purple-800 to-pink-900 rounded-2xl p-6 border border-purple-500/30">
            <div className="text-4xl mb-2">📅</div>
            <div className="text-3xl font-bold text-purple-300">{analytics.totalBookings}</div>
            <div className="text-gray-300">Total Bookings</div>
          </div>

          <div className="bg-gradient-to-br from-pink-800 to-red-900 rounded-2xl p-6 border border-pink-500/30">
            <div className="text-4xl mb-2">👥</div>
            <div className="text-3xl font-bold text-pink-300">{analytics.totalUsers}</div>
            <div className="text-gray-300">Total Users</div>
          </div>

          <div className="bg-gradient-to-br from-orange-800 to-yellow-900 rounded-2xl p-6 border border-orange-500/30">
            <div className="text-4xl mb-2">🏨</div>
            <div className="text-3xl font-bold text-orange-300">{analytics.totalHotels}</div>
            <div className="text-gray-300">Total Hotels</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Revenue Chart */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 border-2 border-cyan-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">📈 Monthly Revenue</h2>
            <Bar data={revenueChartData} options={chartOptions} />
          </div>

          {/* User Growth Chart */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 border-2 border-purple-500/30">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">👥 User Growth</h2>
            <Line data={userGrowthData} options={chartOptions} />
          </div>

          {/* Bookings by Hotel Chart */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 border-2 border-pink-500/30 lg:col-span-2">
            <h2 className="text-2xl font-bold text-pink-400 mb-4">🏨 Bookings by Hotel</h2>
            <div className="max-w-md mx-auto">
              <Doughnut data={bookingsByHotelData} options={doughnutOptions} />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border-2 border-cyan-500/30">
          <h2 className="text-3xl font-bold text-cyan-400 mb-6">🔔 Recent Activity</h2>
          <div className="space-y-4">
            <div className="bg-gray-800/50 p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">New booking received</p>
                <p className="text-gray-400 text-sm">Ocean View Resort - 3 nights</p>
              </div>
              <span className="text-gray-500">2 hours ago</span>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">New user registered</p>
                <p className="text-gray-400 text-sm">john.doe@example.com</p>
              </div>
              <span className="text-gray-500">5 hours ago</span>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">Review submitted</p>
                <p className="text-gray-400 text-sm">5 stars for Tokyo Skyline</p>
              </div>
              <span className="text-gray-500">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
