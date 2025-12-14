import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookings } from '../hooks/useBookings';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { bookings, loading, cancelBooking } = useBookings();

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await cancelBooking(bookingId);
        alert('Booking cancelled successfully');
      } catch (error) {
        alert('Failed to cancel booking');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            📊 My Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">👋 Welcome, {user?.name}</span>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl"
            >
              🏨 Browse Hotels
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition shadow-lg hover:shadow-xl"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* User Info */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-3xl">👤</span>
            Profile Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <p className="text-gray-600 mb-2 flex items-center gap-2">
                <span className="text-xl">📧</span>
                Email
              </p>
              <p className="font-bold text-lg text-gray-800">{user?.email}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
              <p className="text-gray-600 mb-2 flex items-center gap-2">
                <span className="text-xl">🎭</span>
                Role
              </p>
              <p className="font-bold text-lg text-gray-800 capitalize">{user?.role}</p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl">
              <p className="text-gray-600 mb-2 flex items-center gap-2">
                <span className="text-xl">📅</span>
                Total Bookings
              </p>
              <p className="font-bold text-lg text-gray-800">{bookings.length}</p>
            </div>
          </div>
        </div>

        {/* Bookings */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-3xl">🎫</span>
            My Bookings
          </h2>
          
          {bookings.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
              <span className="text-6xl mb-4 block">🏨</span>
              <p className="text-gray-500 text-lg mb-6">You don't have any bookings yet</p>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl"
              >
                Start Exploring Hotels
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div key={booking._id} className="border-2 border-gray-100 rounded-2xl p-6 hover:shadow-xl transition bg-gradient-to-br from-white to-gray-50">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <img
                      src={booking.hotel?.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'}
                      alt={booking.hotel?.name}
                      className="w-full md:w-32 h-32 object-cover rounded-xl shadow-md hover:scale-105 transition"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400';
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-2xl mb-2 text-gray-800">{booking.hotel?.name}</h3>
                      <p className="text-gray-600 flex items-center gap-2 mb-2">
                        <span className="text-xl">📍</span>
                        {booking.hotel?.location}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-2 mb-2">
                        <span className="text-lg">📅</span>
                        {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm flex items-center gap-2">
                        <span className={`px-4 py-1 rounded-full font-bold text-sm ${
                          booking.bookingStatus === 'confirmed' ? 'bg-green-100 text-green-700' :
                          booking.bookingStatus === 'cancelled' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {booking.bookingStatus === 'confirmed' ? '✓ CONFIRMED' :
                           booking.bookingStatus === 'cancelled' ? '✗ CANCELLED' :
                           booking.bookingStatus.toUpperCase()}
                        </span>
                      </p>
                    </div>
                    <div className="text-center md:text-right">
                      <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        ${booking.totalPrice}
                      </p>
                      <p className="text-sm text-gray-500 mb-3 flex items-center gap-1 justify-center md:justify-end">
                        <span className="text-lg">👥</span>
                        {booking.guests} guest(s)
                      </p>
                      {booking.bookingStatus === 'confirmed' && (
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition shadow-md hover:shadow-lg"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
