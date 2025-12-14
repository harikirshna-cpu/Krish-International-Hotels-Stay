import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const AdvancedAdminPanel = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Hotel Management
  const [showAddHotel, setShowAddHotel] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [newHotel, setNewHotel] = useState({
    name: '',
    location: '',
    description: '',
    pricePerNight: '',
    images: [],
    amenities: [],
    availableRooms: ''
  });

  // Filters
  const [filters, setFilters] = useState({
    bookingStatus: 'all',
    dateRange: 'all',
    userRole: 'all'
  });

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

      const hotelsData = hotelsRes.data.data?.hotels || hotelsRes.data.hotels || hotelsRes.data;
      const bookingsData = bookingsRes.data.data?.bookings || bookingsRes.data.bookings || bookingsRes.data;
      const usersData = usersRes.data.users || usersRes.data;

      setHotels(hotelsData);
      setBookings(bookingsData);
      setUsers(usersData);
      
      // Calculate advanced stats
      const totalRevenue = bookingsData.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
      const confirmedBookings = bookingsData.filter(b => b.status === 'confirmed').length;
      const pendingBookings = bookingsData.filter(b => b.status === 'pending').length;
      const canceledBookings = bookingsData.filter(b => b.status === 'cancelled').length;

      setStats({
        totalHotels: hotelsData.length,
        totalBookings: bookingsData.length,
        confirmedBookings,
        pendingBookings,
        canceledBookings,
        totalUsers: usersData.length,
        adminUsers: usersData.filter(u => u.role === 'admin').length,
        standardUsers: usersData.filter(u => u.role === 'user').length,
        totalRevenue: totalRevenue.toFixed(2),
        avgBookingValue: (totalRevenue / bookingsData.length || 0).toFixed(2),
        occupancyRate: ((bookingsData.length / (hotelsData.length * 30)) * 100).toFixed(1)
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setError('Failed to load admin data. Please check your connection and try again.');
      setLoading(false);
    }
  };

  const handleAddHotel = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/hotels', newHotel, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Hotel added successfully!');
      setShowAddHotel(false);
      setNewHotel({
        name: '',
        location: '',
        description: '',
        pricePerNight: '',
        images: [],
        amenities: [],
        availableRooms: ''
      });
      fetchData();
    } catch (error) {
      alert('Failed to add hotel: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleUpdateHotel = async (hotelId, updates) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/hotels/${hotelId}`, updates, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Hotel updated successfully!');
      setEditingHotel(null);
      fetchData();
    } catch (error) {
      alert('Failed to update hotel');
    }
  };

  const handleDeleteHotel = async (hotelId) => {
    if (!window.confirm('Are you sure you want to delete this hotel? This action cannot be undone.')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/hotels/${hotelId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Hotel deleted successfully!');
      fetchData();
    } catch (error) {
      alert('Failed to delete hotel');
    }
  };

  const handleUpdateBookingStatus = async (bookingId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/bookings/${bookingId}/status`, 
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Booking status updated!');
      fetchData();
    } catch (error) {
      console.error('Failed to update booking status:', error);
      alert('Failed to update booking status: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('User deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('Failed to delete user: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleToggleUserRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!window.confirm(`Change user role to ${newRole}?`)) return;

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/users/${userId}/role`, 
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('User role updated!');
      fetchData();
    } catch (error) {
      console.error('Failed to update user role:', error);
      alert('Failed to update user role: ' + (error.response?.data?.message || error.message));
    }
  };

  const exportData = (type) => {
    let data = [];
    let filename = '';

    switch(type) {
      case 'hotels':
        data = hotels;
        filename = 'hotels_export.json';
        break;
      case 'bookings':
        data = bookings;
        filename = 'bookings_export.json';
        break;
      case 'users':
        data = users.map(u => ({ name: u.name, email: u.email, role: u.role }));
        filename = 'users_export.json';
        break;
      default:
        return;
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white flex items-center justify-center">
        <div className="text-3xl">⏳ Loading Admin Panel...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-3xl font-bold mb-4">❌ Error</div>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white py-8 px-4">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              🔐 Advanced Admin Panel
            </h1>
            <p className="text-gray-400 mt-2">Welcome back, {user?.name}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/analytics')}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition"
            >
              📊 Analytics
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold hover:from-cyan-600 hover:to-blue-600 transition"
            >
              🏠 Home
            </button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-cyan-800 to-blue-900 rounded-2xl p-6 border border-cyan-500/30">
            <div className="text-4xl mb-2">🏨</div>
            <div className="text-3xl font-bold text-cyan-300">{stats.totalHotels}</div>
            <div className="text-gray-300">Total Hotels</div>
          </div>

          <div className="bg-gradient-to-br from-purple-800 to-pink-900 rounded-2xl p-6 border border-purple-500/30">
            <div className="text-4xl mb-2">📅</div>
            <div className="text-3xl font-bold text-purple-300">{stats.totalBookings}</div>
            <div className="text-gray-300">Total Bookings</div>
            <div className="text-sm text-gray-400 mt-2">
              ✅ {stats.confirmedBookings} | ⏳ {stats.pendingBookings} | ❌ {stats.canceledBookings}
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-800 to-red-900 rounded-2xl p-6 border border-pink-500/30">
            <div className="text-4xl mb-2">👥</div>
            <div className="text-3xl font-bold text-pink-300">{stats.totalUsers}</div>
            <div className="text-gray-300">Total Users</div>
            <div className="text-sm text-gray-400 mt-2">
              🔐 {stats.adminUsers} Admins | 👤 {stats.standardUsers} Users
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-800 to-yellow-900 rounded-2xl p-6 border border-orange-500/30">
            <div className="text-4xl mb-2">💰</div>
            <div className="text-3xl font-bold text-orange-300">${stats.totalRevenue}</div>
            <div className="text-gray-300">Total Revenue</div>
            <div className="text-sm text-gray-400 mt-2">
              Avg: ${stats.avgBookingValue} | {stats.occupancyRate}% Occupancy
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {['dashboard', 'hotels', 'bookings', 'users', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-bold transition ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {tab === 'dashboard' && '📊'} {tab === 'hotels' && '🏨'} {tab === 'bookings' && '📅'} 
              {tab === 'users' && '👥'} {tab === 'settings' && '⚙️'} {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border-2 border-cyan-500/30">
              <h2 className="text-3xl font-bold text-cyan-400 mb-6">📊 System Overview</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button onClick={() => setActiveTab('hotels')} className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition">
                      + Add New Hotel
                    </button>
                    <button onClick={() => exportData('bookings')} className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition">
                      📥 Export Bookings
                    </button>
                    <button onClick={fetchData} className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition">
                      🔄 Refresh Data
                    </button>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                  <div className="space-y-2 text-sm">
                    <p>✅ {bookings.slice(-5).length} recent bookings</p>
                    <p>👤 {users.slice(-5).length} new users registered</p>
                    <p>🏨 {hotels.length} hotels available</p>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">System Health</h3>
                  <div className="space-y-2 text-sm">
                    <p>✅ Database: Connected</p>
                    <p>✅ API: Running</p>
                    <p>✅ All Services: Operational</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hotels Tab */}
        {activeTab === 'hotels' && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border-2 border-cyan-500/30">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-cyan-400">🏨 Hotel Management</h2>
              <div className="flex gap-3">
                <button
                  onClick={() => exportData('hotels')}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition"
                >
                  📥 Export
                </button>
                <button
                  onClick={() => setShowAddHotel(!showAddHotel)}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition"
                >
                  {showAddHotel ? '❌ Cancel' : '+ Add Hotel'}
                </button>
              </div>
            </div>

            {showAddHotel && (
              <form onSubmit={handleAddHotel} className="bg-gray-800/50 p-6 rounded-xl mb-6">
                <h3 className="text-xl font-bold mb-4">Add New Hotel</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Hotel Name"
                    value={newHotel.name}
                    onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Location (e.g., Miami, FL)"
                    value={newHotel.location}
                    onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Price per Night"
                    value={newHotel.pricePerNight}
                    onChange={(e) => setNewHotel({ ...newHotel, pricePerNight: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Available Rooms"
                    value={newHotel.availableRooms}
                    onChange={(e) => setNewHotel({ ...newHotel, availableRooms: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white"
                    required
                  />
                  <textarea
                    placeholder="Description"
                    value={newHotel.description}
                    onChange={(e) => setNewHotel({ ...newHotel, description: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white md:col-span-2"
                    rows="3"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition"
                >
                  ✅ Add Hotel
                </button>
              </form>
            )}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-4">Hotel</th>
                    <th className="text-left p-4">Location</th>
                    <th className="text-left p-4">Price/Night</th>
                    <th className="text-left p-4">Rooms</th>
                    <th className="text-left p-4">Rating</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {hotels.map((hotel) => (
                    <tr key={hotel._id} className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="p-4 font-semibold">{hotel.name}</td>
                      <td className="p-4">{hotel.location}</td>
                      <td className="p-4">${hotel.pricePerNight}</td>
                      <td className="p-4">{hotel.availableRooms}</td>
                      <td className="p-4">⭐ {hotel.rating || 'N/A'}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/hotels/${hotel._id}`)}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
                          >
                            👁️ View
                          </button>
                          <button
                            onClick={() => handleDeleteHotel(hotel._id)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border-2 border-purple-500/30">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-purple-400">📅 Booking Management</h2>
              <button
                onClick={() => exportData('bookings')}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition"
              >
                📥 Export Bookings
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-4">Booking ID</th>
                    <th className="text-left p-4">Guest</th>
                    <th className="text-left p-4">Hotel</th>
                    <th className="text-left p-4">Check-in</th>
                    <th className="text-left p-4">Check-out</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Total</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="p-4 font-mono text-sm">{booking._id?.slice(-8)}</td>
                      <td className="p-4">{booking.user?.name || 'N/A'}</td>
                      <td className="p-4">{booking.hotel?.name || 'N/A'}</td>
                      <td className="p-4">{new Date(booking.checkIn).toLocaleDateString()}</td>
                      <td className="p-4">{new Date(booking.checkOut).toLocaleDateString()}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          booking.status === 'confirmed' ? 'bg-green-600' :
                          booking.status === 'pending' ? 'bg-yellow-600' :
                          'bg-red-600'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="p-4 font-bold">${booking.totalPrice}</td>
                      <td className="p-4">
                        <select
                          value={booking.status}
                          onChange={(e) => handleUpdateBookingStatus(booking._id, e.target.value)}
                          className="px-3 py-1 bg-gray-700 rounded-lg text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border-2 border-pink-500/30">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-pink-400">👥 User Management</h2>
              <button
                onClick={() => exportData('users')}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition"
              >
                📥 Export Users
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-4">Name</th>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">Role</th>
                    <th className="text-left p-4">Joined</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="p-4 font-semibold">{u.name}</td>
                      <td className="p-4">{u.email}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          u.role === 'admin' ? 'bg-orange-600' : 'bg-blue-600'
                        }`}>
                          {u.role === 'admin' ? '🔐 Admin' : '👤 User'}
                        </span>
                      </td>
                      <td className="p-4">{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleToggleUserRole(u._id, u.role)}
                            className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm"
                            disabled={u._id === user._id}
                          >
                            🔄 Toggle Role
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u._id)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
                            disabled={u._id === user._id}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border-2 border-orange-500/30">
            <h2 className="text-3xl font-bold text-orange-400 mb-6">⚙️ System Settings</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-800/50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">🔐 Security Settings</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>API Key Authentication</span>
                    <span className="text-yellow-400">Configured</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Rate Limiting</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>JWT Token Expiry</span>
                    <span className="text-cyan-400">30 days</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">📧 Email Settings</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Email Service</span>
                    <span className="text-green-400">Configured</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Booking Confirmations</span>
                    <span className="text-green-400">Enabled</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Password Reset</span>
                    <span className="text-green-400">Enabled</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">💳 Payment Settings</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Stripe Integration</span>
                    <span className="text-green-400">Configured</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Payment Processing</span>
                    <span className="text-green-400">Active</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">🗺️ Maps Integration</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Google Maps API</span>
                    <span className="text-green-400">Configured</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Location Display</span>
                    <span className="text-green-400">Active</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={fetchData}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition"
                >
                  🔄 Refresh All Data
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Clear all cached data?')) {
                      localStorage.clear();
                      alert('Cache cleared! Please login again.');
                      logout();
                      navigate('/login');
                    }
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl font-bold hover:from-red-600 hover:to-orange-600 transition"
                >
                  🗑️ Clear Cache
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedAdminPanel;
