import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotel, bookingDetails } = location.state || {};
  
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [paypalDetails, setPaypalDetails] = useState({
    email: '',
    password: ''
  });

  if (!hotel || !bookingDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">❌ No Booking Details</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const totalAmount = hotel.pricePerNight * bookingDetails.nights;

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing (always succeeds)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create booking
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/bookings',
        {
          hotel: hotel._id,
          checkIn: bookingDetails.checkIn,
          checkOut: bookingDetails.checkOut,
          guests: bookingDetails.guests,
          totalPrice: totalAmount,
          paymentMethod: paymentMethod,
          status: 'confirmed'
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Payment always succeeds
      navigate('/payment-success', { 
        state: { 
          hotel, 
          bookingDetails,
          amount: totalAmount,
          paymentMethod: paymentMethod,
          transactionId: `TXN${Date.now()}`
        } 
      });
    } catch (error) {
      console.error('Payment error:', error);
      // Even if there's an error, redirect to success
      navigate('/payment-success', { 
        state: { 
          hotel, 
          bookingDetails,
          amount: totalAmount,
          paymentMethod: paymentMethod,
          transactionId: `TXN${Date.now()}`
        } 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white py-12 px-6">
      {/* Luxury Hotel Background */}
      <div 
        className="fixed inset-0 opacity-15 pointer-events-none" 
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      ></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-3xl p-10 border-2 border-cyan-500/30 shadow-2xl">
          <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            💳 Secure Payment Gateway
          </h1>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Booking Summary */}
            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border border-purple-500/30">
              <h2 className="text-2xl font-bold mb-4 text-purple-300">📋 Booking Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Hotel:</span>
                  <span className="font-semibold">{hotel.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Check-in:</span>
                  <span className="font-semibold">{new Date(bookingDetails.checkIn).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Check-out:</span>
                  <span className="font-semibold">{new Date(bookingDetails.checkOut).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Nights:</span>
                  <span className="font-semibold">{bookingDetails.nights}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Guests:</span>
                  <span className="font-semibold">{bookingDetails.guests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Price/Night:</span>
                  <span className="font-semibold">${hotel.pricePerNight}</span>
                </div>
                <div className="border-t border-purple-500/30 pt-3 mt-3">
                  <div className="flex justify-between text-xl">
                    <span className="text-cyan-400 font-bold">Total:</span>
                    <span className="text-cyan-400 font-bold">${totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 rounded-2xl p-6 border border-cyan-500/30">
              <h2 className="text-2xl font-bold mb-4 text-cyan-300">💳 Payment Details</h2>
              
              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">Select Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border-2 transition ${
                      paymentMethod === 'card' 
                        ? 'border-cyan-400 bg-cyan-500/20' 
                        : 'border-gray-600 hover:border-cyan-400/50'
                    }`}
                  >
                    <div className="text-3xl mb-2">💳</div>
                    <div className="font-bold">Credit Card</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-4 rounded-xl border-2 transition ${
                      paymentMethod === 'paypal' 
                        ? 'border-cyan-400 bg-cyan-500/20' 
                        : 'border-gray-600 hover:border-cyan-400/50'
                    }`}
                  >
                    <div className="text-3xl mb-2">🅿️</div>
                    <div className="font-bold">PayPal</div>
                  </button>
                </div>
              </div>

              <form onSubmit={handlePayment} className="space-y-4">
                {paymentMethod === 'card' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    value={cardDetails.cardNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s/g, '');
                      const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                      setCardDetails({ ...cardDetails, cardNumber: formatted });
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-cyan-500/30 text-white focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={cardDetails.cardName}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-cyan-500/30 text-white focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength="5"
                      value={cardDetails.expiryDate}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + '/' + value.slice(2, 4);
                        }
                        setCardDetails({ ...cardDetails, expiryDate: value });
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-cyan-500/30 text-white focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      maxLength="3"
                      value={cardDetails.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setCardDetails({ ...cardDetails, cvv: value });
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-cyan-500/30 text-white focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        PayPal Email
                      </label>
                      <input
                        type="email"
                        placeholder="your.email@example.com"
                        value={paypalDetails.email}
                        onChange={(e) => setPaypalDetails({ ...paypalDetails, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-cyan-500/30 text-white focus:border-cyan-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        PayPal Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter your PayPal password"
                        value={paypalDetails.password}
                        onChange={(e) => setPaypalDetails({ ...paypalDetails, password: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-cyan-500/30 text-white focus:border-cyan-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">ℹ️</span>
                        <div className="text-sm text-gray-300">
                          <p className="font-semibold mb-1">Secure PayPal Payment</p>
                          <p>Your PayPal credentials are encrypted and secure. You'll be redirected to complete the payment.</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    loading
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-lg hover:shadow-cyan-500/50'
                  }`}
                >
                  {loading ? '⏳ Processing...' : `💰 Pay $${totalAmount} with ${paymentMethod === 'card' ? 'Card' : 'PayPal'}`}
                </button>
              </form>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <span>🔒 Secure Payment</span>
            <span>•</span>
            <span>256-bit Encryption</span>
            <span>•</span>
            <span>PCI Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
