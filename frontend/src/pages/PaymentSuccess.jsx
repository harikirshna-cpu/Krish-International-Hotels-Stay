import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotel, bookingDetails, amount } = location.state || {};

  useEffect(() => {
    if (!hotel) {
      navigate('/');
    }
  }, [hotel, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black text-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-gradient-to-br from-green-800/30 to-emerald-900/30 rounded-3xl p-12 border-2 border-green-500/50 shadow-2xl text-center animate-fade-in">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 animate-bounce-slow">
              <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Payment Successful! 🎉
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your booking has been confirmed
          </p>

          {/* Booking Details */}
          {hotel && bookingDetails && (
            <div className="bg-gray-800/50 rounded-2xl p-6 mb-8 text-left">
              <h2 className="text-2xl font-bold mb-4 text-green-400">📋 Booking Confirmation</h2>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Hotel:</span>
                  <span className="font-semibold">{hotel.name}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Location:</span>
                  <span className="font-semibold">{hotel.location}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Check-in:</span>
                  <span className="font-semibold">{new Date(bookingDetails.checkIn).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Check-out:</span>
                  <span className="font-semibold">{new Date(bookingDetails.checkOut).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Guests:</span>
                  <span className="font-semibold">{bookingDetails.guests}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-green-400 font-bold text-xl">Total Paid:</span>
                  <span className="text-green-400 font-bold text-xl">${amount}</span>
                </div>
              </div>
            </div>
          )}

          {/* Confirmation Message */}
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-4 mb-8">
            <p className="text-blue-300">
              📧 A confirmation email has been sent to your registered email address
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition shadow-lg hover:shadow-green-500/50"
            >
              📊 View My Bookings
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold hover:from-cyan-600 hover:to-blue-600 transition shadow-lg hover:shadow-cyan-500/50"
            >
              🏠 Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
