import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PaymentFailed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { error } = location.state || {};

  useEffect(() => {
    // Auto redirect to home after 10 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black text-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-gradient-to-br from-red-800/30 to-orange-900/30 rounded-3xl p-12 border-2 border-red-500/50 shadow-2xl text-center animate-fade-in">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50 animate-pulse">
              <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Payment Failed ❌
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            We couldn't process your payment
          </p>

          {/* Error Details */}
          {error && (
            <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-red-400 mb-2">Error Details:</h3>
              <p className="text-gray-300">{error}</p>
            </div>
          )}

          {/* Possible Reasons */}
          <div className="bg-gray-800/50 rounded-2xl p-6 mb-8 text-left">
            <h2 className="text-2xl font-bold mb-4 text-orange-400">🔍 Possible Reasons:</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-red-400 mr-2">•</span>
                <span>Insufficient funds in your account</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">•</span>
                <span>Incorrect card details or expired card</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">•</span>
                <span>Bank declined the transaction</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">•</span>
                <span>Network or connection issues</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">•</span>
                <span>Card limit exceeded</span>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-4 mb-8">
            <p className="text-blue-300">
              💡 <strong>Need Help?</strong> Contact our support team at support@krishhotels.com or call 1-800-HOTELS
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition shadow-lg hover:shadow-orange-500/50"
            >
              🔄 Try Again
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold hover:from-cyan-600 hover:to-blue-600 transition shadow-lg hover:shadow-cyan-500/50"
            >
              🏠 Back to Home
            </button>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Redirecting to home in 10 seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
