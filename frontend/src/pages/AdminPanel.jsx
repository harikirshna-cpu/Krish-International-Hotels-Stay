import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('hotels');
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingHotel, setEditingHotel] = useState(null);
  const [showAddHotel, setShowAddHotel] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const [hotelsRes, bookingsRes, usersRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/hotels?limit=1000`, config),
        axios.get(`${process.env.REACT_APP_API_URL}/bookings?limit=1000`, config),
        axios.get(`${process.env.REACT_APP_API_URL}/users`, config)
      ]);

      setHotels(hotelsRes.data.hotels || hotelsRes.data);
      setBookings(bookingsRes.data.data?.bookings || bookingsRes.data.data || bookingsRes.data);
      setUsers(usersRes.data.users || usersRes.data);
      
      setStats({
        totalHotels: hotelsRes.data.hotels?.length || hotelsRes.data.length || 0,
        totalBookings: bookingsRes.data.data?.bookings?.length || bookingsRes.data.data?.length || bookingsRes.data.length || 0,
        totalUsers: usersRes.data.users?.length || usersRes.data.length || 0,
        totalRevenue: (bookingsRes.data.data?.bookings || bookingsRes.data.data || bookingsRes.data).reduce((sum, b) => sum + (b.totalPrice || 0), 0)
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setError('Failed to load admin data. Please check your connection and try again.');
      setLoading(false);
    }
  };

  const handleDeleteHotel = async (hotelId) => {
    if (!window.confirm('Are you sure you want to delete this hotel?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/hotels/${hotelId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Hotel deleted successfully!');
      fetchData();
    } catch (error) {
      alert('Failed to delete hotel');
    }
  };

  const handleUpdateHotelStatus = async (hotelId, availableRooms) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/hotels/${hotelId}`,
        { availableRooms },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Hotel updated successfully!');
      fetchData();
    } catch (error) {
      alert('Failed to update hotel');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center particle-bg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-cyan-300 text-xl font-bold">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center particle-bg">
        <div className="text-center">
          <div className="text-red-400 text-xl font-bold mb-4">Error</div>
          <p className="text-gray-300 mb-4">{error}</p>
          <button 
            onClick={() => { setError(null); setLoading(true); fetchData(); }}
            className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-2 rounded-lg font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen particle-bg" style={{background: 'linear-gradient(135deg, #0a0e27 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0a0e27 100%)'}}>
      {/* Admin Header */}
      <div className="glass-dark neon-border border-b-2 border-cyan-500/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-black holographic mb-2">🔐 ADMIN CONTROL CENTER</h1>
              <p className="text-cyan-300 font-semibold">Welcome, {user?.name}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 glass border-2 border-cyan-400/50 text-cyan-300 rounded-xl font-bold hover:border-cyan-400 transition"
              >
                🏠 Back to Site
              </button>
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-bold hover:from-red-600 hover:to-pink-600 transition neon-button"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-dark neon-border rounded-2xl p-6 text-center">
            <div className="text-5xl mb-3">🏨</div>
            <div className="text-4xl font-black holographic mb-2">{stats.totalHotels}</div>
            <div className="text-cyan-300 font-semibold">Total Hotels</div>
          </div>
          <div className="glass-dark neon-border rounded-2xl p-6 text-center">
            <div className="text-5xl mb-3">📋</div>
            <div className="text-4xl font-black holographic mb-2">{stats.totalBookings}</div>
            <div className="text-purple-300 font-semibold">Total Bookings</div>
          </div>
          <div className="glass-dark neon-border rounded-2xl p-6 text-center">
            <div className="text-5xl mb-3">👥</div>
            <div className="text-4xl font-black holographic mb-2">{stats.totalUsers}</div>
            <div className="text-pink-300 font-semibold">Total Users</div>
          </div>
          <div className="glass-dark neon-border rounded-2xl p-6 text-center">
            <div className="text-5xl mb-3">💰</div>
            <div className="text-4xl font-black holographic mb-2">${stats.totalRevenue}</div>
            <div className="text-yellow-300 font-semibold">Total Revenue</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('hotels')}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition ${
              activeTab === 'hotels'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white neon-button'
                : 'glass border-2 border-cyan-400/30 text-cyan-300'
            }`}
          >
            🏨 Hotels Management
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition ${
              activeTab === 'bookings'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white neon-button'
                : 'glass border-2 border-purple-400/30 text-purple-300'
            }`}
          >
            📋 Bookings
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition ${
              activeTab === 'users'
                ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white neon-button'
                : 'glass border-2 border-pink-400/30 text-pink-300'
            }`}
          >
            👥 Users
          </button>
        </div>

        {/* Content */}
        <div className="glass-dark neon-border rounded-2xl p-8">
          {activeTab === 'hotels' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-black holographic">Hotel Management</h2>
                <button
                  onClick={() => setShowAddHotel(true)}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl font-bold neon-button"
                >
                  ➕ Add New Hotel
                </button>
              </div>
              <div className="space-y-4">
                {hotels.map(hotel => (
                  <div key={hotel._id} className="glass border-2 border-cyan-400/20 rounded-xl p-6 hover:border-cyan-400/40 transition">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4 flex-1">
                        <img
                          src={hotel.images?.[0] || 'https://via.placeholder.com/150'}
                          alt={hotel.name}
                          className="w-32 h-32 object-cover rounded-xl"
                        />
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-cyan-300 mb-2">{hotel.name}</h3>
                          <p className="text-purple-200 mb-2">📍 {hotel.location}</p>
                          <p className="text-pink-200 mb-2">💵 ${hotel.price}/night</p>
                          <p className="text-yellow-200">⭐ {hotel.rating} • 🛏️ {hotel.availableRooms}/{hotel.rooms} rooms</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/hotels/${hotel._id}`)}
                          className="px-4 py-2 glass border border-cyan-400/50 text-cyan-300 rounded-lg hover:border-cyan-400 transition"
                        >
                          👁️ View
                        </button>
                        <button
                          onClick={() => handleDeleteHotel(hotel._id)}
                          className="px-4 py-2 bg-red-500/20 border border-red-400/50 text-red-300 rounded-lg hover:bg-red-500/30 transition"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <h2 className="text-3xl font-black holographic mb-6">All Bookings</h2>
              <div className="space-y-4">
                {bookings.map(booking => (
                  <div key={booking._id} className="glass border-2 border-purple-400/20 rounded-xl p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-purple-300 mb-2">
                          {booking.hotel?.name || 'Hotel'}
                        </h3>
                        <p className="text-cyan-200">👤 {booking.user?.name || 'User'}</p>
                        <p className="text-pink-200">📅 {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                        <p className="text-yellow-200">👥 {booking.guests} guests • 💰 ${booking.totalPrice}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-full font-bold text-sm ${
                        booking.bookingStatus === 'confirmed' ? 'bg-green-500/20 text-green-300 border border-green-400/50' :
                        booking.bookingStatus === 'cancelled' ? 'bg-red-500/20 text-red-300 border border-red-400/50' :
                        'bg-yellow-500/20 text-yellow-300 border border-yellow-400/50'
                      }`}>
                        {booking.bookingStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-3xl font-black holographic mb-6">User Management</h2>
              <div className="space-y-4">
                {users.map(u => (
                  <div key={u._id} className="glass border-2 border-pink-400/20 rounded-xl p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-bold text-pink-300 mb-2">👤 {u.name}</h3>
                        <p className="text-cyan-200">📧 {u.email}</p>
                        <p className="text-purple-200">🎭 Role: {u.role}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-full font-bold ${
                        u.role === 'admin' ? 'bg-red-500/20 text-red-300 border border-red-400/50' :
                        'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50'
                      }`}>
                        {u.role.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
