import React, { useState, useEffect } from 'react';

const ApiKeyGate = ({ children }) => {
  const [apiKey, setApiKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [showSnowflakes, setShowSnowflakes] = useState(true);

  // Valid API keys (in production, this should be validated server-side)
  const VALID_API_KEYS = [
    'KRISH-2024-LUXURY',
    'HOTEL-BOOKING-PRO',
    'CHRISTMAS-SPECIAL-2024',
    'ADMIN-ACCESS-KEY'
  ];

  useEffect(() => {
    // Check if API key is already stored
    const storedKey = sessionStorage.getItem('apiKey');
    if (storedKey && VALID_API_KEYS.includes(storedKey)) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (VALID_API_KEYS.includes(apiKey.trim())) {
      sessionStorage.setItem('apiKey', apiKey.trim());
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid API Key! Please try again.');
      setApiKey('');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center relative overflow-hidden">
      {/* Christmas Snowflakes */}
      {showSnowflakes && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="snowflake absolute text-white opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                fontSize: `${Math.random() * 20 + 10}px`,
                animation: `fall ${Math.random() * 10 + 5}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              ❄️
            </div>
          ))}
        </div>
      )}

      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-pulse"></div>
      </div>

      {/* API Key Gate Card */}
      <div className="relative z-10 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl p-12 rounded-3xl border-4 border-cyan-500/50 shadow-2xl max-w-2xl w-full mx-4">
        {/* Christmas Decoration */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-6xl">
          🎄
        </div>

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            🏨 KRISH Hotels
          </h1>
          <p className="text-2xl text-gray-300 font-semibold">International Luxury Collection</p>
          <div className="flex justify-center gap-4 mt-4 text-3xl">
            <span>🎅</span>
            <span>🎁</span>
            <span>⭐</span>
            <span>🎄</span>
            <span>❄️</span>
          </div>
        </div>

        {/* Christmas Banner */}
        <div className="bg-gradient-to-r from-red-600 to-green-600 text-white text-center py-3 rounded-xl mb-6 font-bold">
          🎄 CHRISTMAS SPECIAL 2024 - Limited Time Offers! 🎁
        </div>

        {/* Access Required Message */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔐</div>
          <h2 className="text-3xl font-bold text-white mb-3">Secure Access Required</h2>
          <p className="text-gray-300 text-lg">
            Please enter your API Key to access the exclusive KRISH Hotels booking platform
          </p>
        </div>

        {/* API Key Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white text-lg font-semibold mb-2">
              🔑 API Access Key
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key..."
              className="w-full px-6 py-4 bg-gray-700/50 border-2 border-cyan-500/50 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border-2 border-red-500 text-red-300 px-6 py-4 rounded-xl text-center font-semibold">
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold text-xl py-4 rounded-xl hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            🚀 Access Platform
          </button>
        </form>

        {/* Valid API Keys (for demo purposes) */}
        <div className="mt-8 p-6 bg-gray-800/50 rounded-xl border border-cyan-500/30">
          <p className="text-gray-400 text-sm mb-3">🎁 <strong>Demo API Keys:</strong></p>
          <div className="space-y-2 text-sm font-mono">
            {VALID_API_KEYS.map((key, index) => (
              <div
                key={index}
                onClick={() => setApiKey(key)}
                className="text-cyan-300 hover:text-cyan-200 cursor-pointer bg-gray-700/50 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                {index === 0 && '🎄 '}{index === 1 && '💼 '}{index === 2 && '🎅 '}{index === 3 && '🔐 '}
                {key}
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-xs mt-3 italic">Click any key to auto-fill</p>
        </div>

        {/* Christmas Offer Badge */}
        <div className="mt-6 text-center">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-2 rounded-full text-sm animate-pulse">
            🎁 Special Christmas Discounts Inside! 🎄
          </div>
        </div>
      </div>

      {/* Snowfall Animation */}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ApiKeyGate;
