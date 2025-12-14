import React, { useState } from 'react';
import { useHotels } from '../contexts/HotelContext';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchHotels, loadHotels, applyFilters } = useHotels();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minRating: '',
    location: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchHotels(searchQuery);
    } else {
      loadHotels();
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    applyFilters(filters);
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setFilters({ minPrice: '', maxPrice: '', minRating: '', location: '' });
    applyFilters({});
    setSearchQuery('');
    setShowFilters(false);
  };

  return (
    <div className="glass-dark shadow-2xl rounded-3xl p-8 mb-12 border-2 border-cyan-500/30 neon-border">
      <form onSubmit={handleSearch} className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <span className="absolute left-5 top-4 text-3xl">🔍</span>
          <input
            type="text"
            placeholder="Search hotels by name, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-16 pr-6 py-4 glass border-2 border-cyan-400/30 rounded-2xl focus:outline-none focus:ring-4 focus:ring-cyan-500/50 focus:border-cyan-400 transition text-cyan-100 placeholder-cyan-400/50 text-lg font-semibold"
          />
        </div>
        <button
          type="submit"
          className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-2xl font-black text-lg hover:from-cyan-600 hover:to-purple-600 transition neon-button"
        >
          🚀 SEARCH
        </button>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-black text-lg hover:from-purple-600 hover:to-pink-600 transition neon-button flex items-center gap-2"
        >
          🎛️ FILTERS
          {showFilters ? ' ▲' : ' ▼'}
        </button>
      </form>

      {showFilters && (
        <div className="border-t-2 border-cyan-500/30 pt-8 animate-fade-in">
          <h3 className="text-2xl font-black mb-6 holographic flex items-center gap-3">
            <span className="text-4xl">🎯</span>
            FILTER OPTIONS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="block text-lg font-bold mb-3 text-cyan-300">💰 Min Price</label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="$0"
                className="w-full px-5 py-3 glass border-2 border-purple-400/30 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 text-purple-100 placeholder-purple-400/50 font-bold"
              />
            </div>
            <div>
              <label className="block text-lg font-bold mb-3 text-cyan-300">💵 Max Price</label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="$1000"
                className="w-full px-5 py-3 glass border-2 border-purple-400/30 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 text-purple-100 placeholder-purple-400/50 font-bold"
              />
            </div>
            <div>
              <label className="block text-lg font-bold mb-3 text-cyan-300">⭐ Min Rating</label>
              <select
                name="minRating"
                value={filters.minRating}
                onChange={handleFilterChange}
                className="w-full px-5 py-3 glass border-2 border-pink-400/30 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-500/50 focus:border-pink-400 text-pink-100 font-bold"
              >
                <option value="" className="bg-gray-900">Any Rating</option>
                <option value="3" className="bg-gray-900">3+ Stars ⭐⭐⭐</option>
                <option value="4" className="bg-gray-900">4+ Stars ⭐⭐⭐⭐</option>
                <option value="4.5" className="bg-gray-900">4.5+ Stars ⭐⭐⭐⭐⭐</option>
              </select>
            </div>
            <div>
              <label className="block text-lg font-bold mb-3 text-cyan-300">📍 Location</label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="City or area"
                className="w-full px-5 py-3 glass border-2 border-cyan-400/30 rounded-xl focus:outline-none focus:ring-4 focus:ring-cyan-500/50 focus:border-cyan-400 text-cyan-100 placeholder-cyan-400/50 font-bold"
              />
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-8 py-3 glass border-2 border-red-400/50 text-red-300 rounded-xl hover:border-red-400 hover:bg-red-500/20 font-bold transition"
            >
              🗑️ Clear All
            </button>
            <button
              type="button"
              onClick={handleApplyFilters}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold transition neon-button"
            >
              ✨ Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
