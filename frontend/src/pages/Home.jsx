import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotels } from '../contexts/HotelContext';
import { useSettings } from '../contexts/SettingsContext';
import FavoriteButton from '../components/FavoriteButton';
import SearchBar from '../components/SearchBar';
import AIChatbot from '../components/AIChatbot';
import SettingsPanel from '../components/SettingsPanel';

const Home = () => {
  const navigate = useNavigate();
  const { hotels, loading, pagination, changePage } = useHotels();
  const { convertPrice, getCurrencySymbol } = useSettings();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [showChatbot, setShowChatbot] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const categories = [
    { id: 'all', name: 'All Hotels', icon: '🏨', color: 'from-cyan-500 to-blue-500' },
    { id: 'luxury', name: 'Luxury', icon: '👑', color: 'from-yellow-500 to-orange-500' },
    { id: 'resort', name: 'Resort', icon: '🏝️', color: 'from-green-500 to-emerald-500' },
    { id: 'business', name: 'Business', icon: '💼', color: 'from-gray-500 to-slate-600' },
    { id: 'boutique', name: 'Boutique', icon: '🎨', color: 'from-pink-500 to-rose-500' },
    { id: 'beach', name: 'Beach', icon: '🏖️', color: 'from-blue-400 to-cyan-400' },
    { id: 'urban', name: 'Urban', icon: '🏙️', color: 'from-purple-500 to-indigo-500' }
  ];

  const priceFilters = [
    { id: 'all', name: 'All Prices', range: [0, 10000] },
    { id: 'budget', name: '$ Budget', range: [0, 100] },
    { id: 'moderate', name: '$$ Moderate', range: [100, 300] },
    { id: 'luxury', name: '$$$ Luxury', range: [300, 600] },
    { id: 'ultra', name: '$$$$ Ultra Luxury', range: [600, 10000] }
  ];

  const filteredHotels = hotels.filter(hotel => {
    const categoryMatch = selectedCategory === 'all' || hotel.category?.toLowerCase() === selectedCategory;
    const priceFilter = priceFilters.find(f => f.id === priceRange);
    const priceMatch = !priceFilter || (hotel.price >= priceFilter.range[0] && hotel.price <= priceFilter.range[1]);
    return categoryMatch && priceMatch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen particle-bg">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-cyan-500/30"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-cyan-400 border-r-purple-400 border-b-pink-400 border-l-yellow-400 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-t-purple-400 border-r-pink-400 border-b-cyan-400 border-l-yellow-400 animate-spin" style={{animationDuration: '2s', animationDirection: 'reverse'}}></div>
          </div>
          <p className="text-xl text-cyan-300 font-bold neon-text">⚡ Loading Futuristic Hotels ⚡</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen particle-bg" style={{background: 'linear-gradient(135deg, #0a0e27 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0a0e27 100%)'}}>
      {/* AI Chatbot */}
      {showChatbot && <AIChatbot onClose={() => setShowChatbot(false)} />}
      
      {/* Settings Panel */}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}

      {/* Floating Quick Actions */}
      <div className="fixed right-8 bottom-8 z-50 flex flex-col gap-4">
        <button 
          onClick={() => setShowSettings(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition transform"
          title="Settings"
        >
          ⚙️
        </button>
        <button 
          onClick={() => setShowChatbot(!showChatbot)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition transform animate-pulse"
          title="AI Chat Support"
        >
          🤖
        </button>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition transform"
          title="Scroll to top"
        >
          ⬆️
        </button>
        <button 
          onClick={() => navigate('/favorites')}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition transform"
          title="View favorites"
        >
          ❤️
        </button>
        <button 
          onClick={() => navigate('/bookings')}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition transform"
          title="My bookings"
        >
          📋
        </button>
      </div>

      {/* Futuristic Hero Section with Luxury Hotel Background */}
      <div className="relative py-24 px-4 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20"></div>
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,255,255,0.1) 0px, transparent 2px, transparent 4px, rgba(0,255,255,0.1) 6px)',
          backgroundSize: '100% 6px'
        }}></div>
        <div className="max-w-[1920px] mx-auto text-center relative z-10">
          <h1 className="text-7xl md:text-8xl font-black mb-8 holographic animate-bounce-in">
            🌟 FUTURE OF LUXURY 🌟
          </h1>
          <p className="text-3xl mb-4 text-cyan-300 font-bold animate-slide-in" style={{
            textShadow: '0 0 20px rgba(0,255,255,0.8)'
          }}>
            ⚡ Experience Next-Gen Hotel Booking ⚡
          </p>
          <p className="text-xl text-purple-300 animate-fade-in mb-8">
            🚀 Immersive • Futuristic • Unforgettable 🚀
          </p>
          
          {/* Hero CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => document.getElementById('hotels-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl font-black text-white text-xl hover:scale-105 transition transform shadow-2xl"
            >
              🏨 Explore Hotels
            </button>
            <button 
              onClick={() => navigate('/admin-advanced')}
              className="px-10 py-5 glass-dark rounded-2xl font-black text-cyan-300 text-xl hover:scale-105 transition transform border-2 border-cyan-500/50"
            >
              🔐 Admin Panel
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 pb-12">
        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="glass-dark rounded-2xl p-6 text-center neon-border transform hover:scale-105 transition">
            <div className="text-5xl mb-3">🏨</div>
            <div className="text-4xl font-black text-cyan-400 mb-2">{hotels.length}+</div>
            <div className="text-gray-400 font-semibold">Premium Hotels</div>
          </div>
          <div className="glass-dark rounded-2xl p-6 text-center neon-border transform hover:scale-105 transition">
            <div className="text-5xl mb-3">🌍</div>
            <div className="text-4xl font-black text-purple-400 mb-2">50+</div>
            <div className="text-gray-400 font-semibold">Global Cities</div>
          </div>
          <div className="glass-dark rounded-2xl p-6 text-center neon-border transform hover:scale-105 transition">
            <div className="text-5xl mb-3">⭐</div>
            <div className="text-4xl font-black text-yellow-400 mb-2">4.8</div>
            <div className="text-gray-400 font-semibold">Average Rating</div>
          </div>
          <div className="glass-dark rounded-2xl p-6 text-center neon-border transform hover:scale-105 transition">
            <div className="text-5xl mb-3">🎉</div>
            <div className="text-4xl font-black text-pink-400 mb-2">100K+</div>
            <div className="text-gray-400 font-semibold">Happy Guests</div>
          </div>
        </div>

        <SearchBar />

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-cyan-300 mb-6 text-center">🎯 Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-4 rounded-xl font-bold transition transform hover:scale-105 ${
                  selectedCategory === cat.id
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                    : 'glass-dark text-gray-300 hover:text-white'
                }`}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="text-sm">{cat.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-purple-300 mb-4 text-center">💰 Filter by Price</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {priceFilters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setPriceRange(filter.id)}
                className={`px-6 py-3 rounded-xl font-bold transition ${
                  priceRange === filter.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'glass-dark text-gray-300 hover:text-white'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>

        {/* Special Offers Banner */}
        <div className="glass-dark rounded-3xl p-8 mb-12 neon-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-yellow-500/20 to-green-500/20 animate-pulse"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-red-400 to-pink-400 mb-4">
              🎄 CHRISTMAS SPECIAL OFFERS 🎄
            </h2>
            <p className="text-2xl text-cyan-300 mb-4">Up to 50% OFF on Selected Hotels!</p>
            <div className="flex justify-center gap-6 text-lg">
              <span className="bg-red-500/30 px-4 py-2 rounded-full">🎁 Free Breakfast</span>
              <span className="bg-green-500/30 px-4 py-2 rounded-full">🎅 Late Checkout</span>
              <span className="bg-blue-500/30 px-4 py-2 rounded-full">❄️ Winter Packages</span>
            </div>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="mb-8" id="hotels-section">
          <h2 className="text-4xl font-black text-center mb-8">
            <span className="holographic">✨ Featured Hotels ✨</span>
          </h2>
          <p className="text-center text-gray-400 mb-8 text-lg">
            Showing {filteredHotels.length} of {hotels.length} hotels
          </p>
          {filteredHotels.length === 0 ? (
            <div className="text-center glass-dark p-12 rounded-3xl">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl text-cyan-300 font-bold mb-2">No Hotels Found</h3>
              <p className="text-gray-400">Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredHotels.map((hotel, index) => (
            <div
              key={hotel._id}
              className="glass-dark rounded-3xl overflow-hidden hover-lift cursor-pointer group neon-border relative"
              onClick={() => navigate(`/hotels/${hotel._id}`)}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {/* Special Badge */}
              {hotel.category && (
                <div className="absolute top-4 left-4 z-20">
                  <div className="glass px-3 py-1 rounded-full border border-cyan-400/50">
                    <span className="text-cyan-300 font-bold text-xs uppercase">{hotel.category}</span>
                  </div>
                </div>
              )}
              
              <div className="absolute top-4 right-4 z-20" onClick={(e) => e.stopPropagation()}>
                <FavoriteButton hotelId={hotel._id} />
              </div>
              <div className="relative overflow-hidden h-72">
                <img
                  src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop'}
                  alt={hotel.name}
                  className="w-full h-full object-cover transform group-hover:scale-125 group-hover:rotate-2 transition duration-700"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop';
                  }}
                  style={{filter: 'saturate(1.3) contrast(1.1) brightness(1.05)'}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/80 via-purple-900/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>
              </div>
              <div className="p-6 relative">
                <h3 className="text-3xl font-black mb-4 holographic group-hover:scale-105 transition">
                  {hotel.name}
                </h3>
                <p className="text-cyan-200 mb-6 flex items-center gap-3 text-lg">
                  <span className="text-2xl">📍</span>
                  <span className="font-semibold">{hotel.location}</span>
                </p>
                <div className="flex justify-between items-center pt-6 border-t border-cyan-500/30">
                  <div>
                    <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300">
                      {getCurrencySymbol()}{convertPrice(hotel.price)}
                    </span>
                    <span className="text-cyan-400 text-sm block mt-1 font-bold">/NIGHT</span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-2xl mb-1">
                      <span>⭐</span>
                      <span className="text-yellow-300 font-bold neon-text">{hotel.rating}</span>
                    </div>
                    <span className="text-purple-300 text-xs font-semibold">RATED</span>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="w-full py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl font-black text-white text-lg neon-button relative overflow-hidden">
                    <span className="relative z-10">🚀 BOOK NOW</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-black text-center mb-10 holographic">🚀 Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-dark rounded-2xl p-8 text-center hover-lift neon-border">
              <div className="text-6xl mb-4">💎</div>
              <h3 className="text-2xl font-bold text-cyan-300 mb-3">Premium Quality</h3>
              <p className="text-gray-400">Hand-picked luxury hotels with verified reviews and ratings</p>
            </div>
            <div className="glass-dark rounded-2xl p-8 text-center hover-lift neon-border">
              <div className="text-6xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-purple-300 mb-3">Secure Payment</h3>
              <p className="text-gray-400">Bank-level encryption with multiple payment options</p>
            </div>
            <div className="glass-dark rounded-2xl p-8 text-center hover-lift neon-border">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-pink-300 mb-3">Instant Booking</h3>
              <p className="text-gray-400">Quick confirmation with real-time availability</p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-black text-center mb-10 holographic">💬 Guest Reviews</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-dark rounded-2xl p-6 neon-border">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-2xl">👨</div>
                <div className="ml-4">
                  <div className="font-bold text-white">Leo Jonowich</div>
                  <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-gray-300 italic">"Amazing experience! The booking was seamless and the hotel exceeded all expectations. Highly recommended!"</p>
            </div>
            <div className="glass-dark rounded-2xl p-6 neon-border">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-2xl">👩</div>
                <div className="ml-4">
                  <div className="font-bold text-white">Abas</div>
                  <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-gray-300 italic">"Best hotel booking platform! Easy to use, great deals, and excellent customer service. Will definitely use again."</p>
            </div>
            <div className="glass-dark rounded-2xl p-6 neon-border">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-2xl">👨</div>
                <div className="ml-4">
                  <div className="font-bold text-white">Venky</div>
                  <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-gray-300 italic">"Perfect for business trips! Found exactly what I needed with great filters and instant confirmation."</p>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="glass-dark rounded-3xl p-12 mb-12 neon-border text-center">
          <h2 className="text-4xl font-black text-cyan-300 mb-4">📧 Subscribe to Exclusive Deals</h2>
          <p className="text-xl text-gray-300 mb-8">Get notified about special offers, new hotels, and seasonal promotions!</p>
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-xl bg-gray-800 border border-cyan-500/30 text-white focus:border-cyan-500 focus:outline-none"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-bold text-white hover:from-cyan-600 hover:to-purple-600 transition">
              Subscribe Now 🚀
            </button>
          </div>
        </div>

        {/* Partners Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-black text-center mb-8 text-gray-400">🤝 Trusted By Leading Brands</h2>
          <div className="glass-dark rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
              <div className="text-4xl opacity-70 hover:opacity-100 transition">🏨</div>
              <div className="text-4xl opacity-70 hover:opacity-100 transition">✈️</div>
              <div className="text-4xl opacity-70 hover:opacity-100 transition">💳</div>
              <div className="text-4xl opacity-70 hover:opacity-100 transition">🌐</div>
              <div className="text-4xl opacity-70 hover:opacity-100 transition">🏆</div>
              <div className="text-4xl opacity-70 hover:opacity-100 transition">⭐</div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 glass-dark p-6 rounded-2xl neon-border">
            <button
              onClick={() => changePage(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:from-cyan-600 hover:to-purple-600 transition neon-button"
            >
              ⬅️ Previous
            </button>
            <span className="text-cyan-300 font-bold text-xl">
              <span className="text-3xl holographic">{pagination.currentPage}</span>
              <span className="text-purple-400"> / {pagination.totalPages}</span>
            </span>
            <button
              onClick={() => changePage(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:from-purple-600 hover:to-pink-600 transition neon-button"
            >
              Next ➡️
            </button>
          </div>
        )}

        {/* Footer Section */}
        <footer className="mt-20 glass-dark rounded-3xl p-12 neon-border">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-black text-cyan-300 mb-4">🌟 KRISH Hotels</h3>
              <p className="text-gray-400 mb-4">Your trusted partner for luxury hotel bookings worldwide.</p>
              
              {/* CEO Info */}
              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4 mb-4">
                <h4 className="text-sm font-bold text-yellow-300 mb-2">👨‍💼 CEO</h4>
                <p className="text-white font-bold">Krish</p>
                <p className="text-xs text-gray-400">Masters: Engineering Computer Science</p>
                <p className="text-cyan-300 text-sm mt-1">📱 123456789</p>
              </div>
              
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center hover:scale-110 transition">📱</button>
                <button className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center hover:scale-110 transition">🐦</button>
                <button className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center hover:scale-110 transition">📷</button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-purple-300 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-cyan-300 cursor-pointer transition">🏠 Home</li>
                <li className="hover:text-cyan-300 cursor-pointer transition">🔍 Search Hotels</li>
                <li className="hover:text-cyan-300 cursor-pointer transition">❤️ My Favorites</li>
                <li className="hover:text-cyan-300 cursor-pointer transition">📋 My Bookings</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-purple-300 mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-cyan-300 cursor-pointer transition">💬 Help Center</li>
                <li className="hover:text-cyan-300 cursor-pointer transition">📞 Contact Us</li>
                <li className="hover:text-cyan-300 cursor-pointer transition">🔒 Privacy Policy</li>
                <li className="hover:text-cyan-300 cursor-pointer transition">📜 Terms of Service</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-purple-300 mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 support@krishhotels.com</li>
                <li>📱 +1 (555) 123-4567</li>
                <li>🏢 123 Luxury Ave, New York</li>
                <li>⏰ 24/7 Customer Support</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-cyan-500/30 pt-6 text-center">
            <p className="text-gray-400">
              © 2025 KRISH International Hotels. All rights reserved. | 
              <span className="text-cyan-300 font-bold"> Made with 💎 for Luxury Travelers</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
