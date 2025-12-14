import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHotel } from '../hooks/useHotel';
import { useAuth } from '../contexts/AuthContext';
import FavoriteButton from '../components/FavoriteButton';
import GoogleMap from '../components/GoogleMap';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hotel, loading } = useHotel(id);
  const { isAuthenticated } = useAuth();
  const [showBooking, setShowBooking] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
    paymentMethod: 'credit_card'
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Calculate nights
    const checkIn = new Date(bookingData.checkInDate);
    const checkOut = new Date(bookingData.checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      alert('Check-out date must be after check-in date');
      return;
    }

    // Navigate to payment page with booking details
    navigate('/payment', {
      state: {
        hotel,
        bookingDetails: {
          checkIn: bookingData.checkInDate,
          checkOut: bookingData.checkOutDate,
          guests: bookingData.guests,
          nights
        }
      }
    });
  };

  if (loading) {
    return <div className="text-center p-8">Loading hotel details...</div>;
  }

  if (!hotel) {
    return <div className="text-center p-8">Hotel not found</div>;
  }

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #0a0e27 0%, #1a1a2e 50%, #0a0e27 100%)'}}>
      {/* Hero Section with Hotel Building Background */}
      <div className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.5)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 py-8 -mt-32 relative z-10">
      {/* Image Gallery */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {hotel.images?.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${hotel.name} ${idx + 1}`}
            className={`${idx === 0 ? 'col-span-3' : ''} w-full h-80 object-cover rounded-2xl shadow-2xl border-2 border-cyan-500/30`}
          />
        ))}
      </div>

      <div className="glass-effect rounded-2xl shadow-2xl p-8 border border-cyan-500/30">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-5xl font-bold mb-3 text-white neon-text">{hotel.name}</h1>
            <p className="text-cyan-300 text-xl">📍 {hotel.location}</p>
          </div>
          <FavoriteButton hotelId={hotel._id} />
        </div>

        <div className="flex items-center gap-6 mb-8">
          <span className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">${hotel.price}/night</span>
          <span className="text-yellow-400 text-2xl">⭐ {hotel.rating} ({hotel.reviewCount} reviews)</span>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-cyan-300">Description</h2>
          <p className="text-gray-300 text-lg leading-relaxed">{hotel.description}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-cyan-300">Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {hotel.amenities?.map((amenity, idx) => (
              <span key={idx} className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-300 px-4 py-2 rounded-xl text-center font-semibold">
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* European Reviews Section */}
        {hotel.europeanReviews && hotel.europeanReviews.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-cyan-300">🌍 Guest Reviews from Europe</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {hotel.europeanReviews.map((review, idx) => (
                <div key={idx} className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-bold text-white text-lg">{review.name}</p>
                      <p className="text-cyan-400 text-sm">📍 {review.country}</p>
                    </div>
                    <div className="text-yellow-400 text-xl">
                      {'⭐'.repeat(review.rating)}
                    </div>
                  </div>
                  <p className="text-gray-300 italic">\"{review.comment}\"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-cyan-300">Availability</h2>
          <p className="text-gray-300 text-lg">{hotel.availableRooms} rooms available</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setShowBooking(true)}
            className="py-5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xl font-bold rounded-xl hover:from-cyan-600 hover:to-purple-600 shadow-lg transform hover:scale-105 transition"
          >
            🎯 Book This Hotel
          </button>
          <button
            onClick={() => {
              if (!isAuthenticated) {
                navigate('/login');
                return;
              }
              // Quick book with default values
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              const dayAfter = new Date();
              dayAfter.setDate(dayAfter.getDate() + 2);
              
              navigate('/payment', {
                state: {
                  hotel,
                  bookingDetails: {
                    checkIn: tomorrow.toISOString().split('T')[0],
                    checkOut: dayAfter.toISOString().split('T')[0],
                    guests: 2,
                    nights: 1
                  }
                }
              });
            }}
            className="py-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xl font-bold rounded-xl hover:from-green-600 hover:to-emerald-600 shadow-lg transform hover:scale-105 transition"
          >
            ⚡ Quick Book (1 Night)
          </button>
        </div>

        {/* Google Maps Location */}
        <div className="mb-8">
          <button
            onClick={() => setShowMap(!showMap)}
            className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-xl hover:from-cyan-500/30 hover:to-purple-500/30 transition mb-4"
          >
            <h2 className="text-2xl font-bold text-cyan-300">📍 Location</h2>
            <span className="text-2xl text-cyan-300">{showMap ? '▼' : '▶'}</span>
          </button>
          {showMap && <GoogleMap location={hotel.location} hotelName={hotel.name} />}
        </div>

        {showBooking && (
          <form onSubmit={handleBooking} className="border-t border-cyan-500/30 pt-8 mt-8">
            <h2 className="text-2xl font-bold mb-6 text-cyan-300">📅 Booking Details</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-medium mb-2 text-cyan-300">Check-in Date</label>
                <input
                  type="date"
                  value={bookingData.checkInDate}
                  onChange={(e) => setBookingData({...bookingData, checkInDate: e.target.value})}
                  className="w-full px-4 py-3 border border-cyan-500/30 rounded-xl bg-gray-800 text-white"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block font-medium mb-2 text-cyan-300">Check-out Date</label>
                <input
                  type="date"
                  value={bookingData.checkOutDate}
                  onChange={(e) => setBookingData({...bookingData, checkOutDate: e.target.value})}
                  className="w-full px-4 py-3 border border-cyan-500/30 rounded-xl bg-gray-800 text-white"
                  required
                  min={bookingData.checkInDate}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2 text-cyan-300">Number of Guests</label>
              <input
                type="number"
                value={bookingData.guests}
                onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value)})}
                className="w-full px-4 py-3 border border-cyan-500/30 rounded-xl bg-gray-800 text-white"
                min="1"
                max="10"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2 text-cyan-300">Payment Method</label>
              <select
                value={bookingData.paymentMethod}
                onChange={(e) => setBookingData({...bookingData, paymentMethod: e.target.value})}
                className="w-full px-4 py-3 border border-cyan-500/30 rounded-xl bg-gray-800 text-white"
                required
              >
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="paypal">PayPal</option>
                <option value="stripe">Stripe</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowBooking(false)}
                className="flex-1 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={bookingLoading}
                className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50"
              >
                {bookingLoading ? '⏳ Processing...' : '✓ Confirm Booking'}
              </button>
            </div>
          </form>
        )}
      </div>
      </div>
    </div>
  );
};

export default HotelDetails;
