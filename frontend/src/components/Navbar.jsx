import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass-dark shadow-2xl sticky top-0 z-50 neon-border border-t-0 border-l-0 border-r-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Futuristic Logo */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center cursor-pointer hover:scale-110 transition duration-300 group"
          >
            <div className="text-4xl mr-3 animate-float">🏨</div>
            <div className="flex flex-col">
              <span className="text-3xl font-black holographic">
                KRISH International Hotels
              </span>
              <span className="text-xs text-cyan-400 font-bold tracking-widest">LUXURY WORLDWIDE</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center gap-3 px-5 py-3 glass rounded-xl border border-cyan-400/30 hover:border-cyan-400/60 transition">
                  <span className="text-2xl">👤</span>
                  <span className="font-bold text-cyan-300">{user?.name}</span>
                </div>
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold hover:from-cyan-600 hover:to-blue-600 transition neon-button"
                >
                  🏠 Home
                </button>
                <button
                  onClick={() => navigate('/favorites')}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl font-bold hover:from-pink-600 hover:to-red-600 transition neon-button"
                >
                  ❤️ Favorites
                </button>
                {user?.role === 'admin' && (
                  <>
                    <button
                      onClick={() => navigate('/admin')}
                      className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-bold hover:from-yellow-600 hover:to-orange-600 transition neon-button"
                    >
                      🔐 Admin
                    </button>
                    <button
                      onClick={() => navigate('/analytics')}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition neon-button"
                    >
                      📊 Analytics
                    </button>
                  </>
                )}
                <button
                  onClick={() => navigate('/profile')}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold hover:from-indigo-600 hover:to-purple-600 transition neon-button"
                >
                  👤 Profile
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition neon-button"
                >
                  📊 Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold hover:from-red-600 hover:to-orange-600 transition neon-button"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-8 py-3 glass border border-cyan-400/50 text-cyan-300 hover:border-cyan-400 rounded-xl font-bold transition"
                >
                  🔐 Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold transition neon-button"
                >
                  ✨ Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
