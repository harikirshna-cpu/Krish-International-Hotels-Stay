import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import FavoriteButton from '../components/FavoriteButton';

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, loading } = useFavorites();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            ❤️ My Favorite Hotels
          </h1>
          <p className="text-gray-600 text-lg">Your handpicked collection of amazing stays</p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl">
            <span className="text-8xl mb-6 block animate-pulse">💔</span>
            <p className="text-gray-500 text-2xl mb-3 font-semibold">No favorites yet!</p>
            <p className="text-gray-400 mb-8">Start exploring and save your dream hotels</p>
            <button
              onClick={() => navigate('/')}
              className="px-10 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl font-bold text-lg hover:from-red-600 hover:to-pink-600 transition shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              🔍 Discover Hotels
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((hotel) => (
              <div
                key={hotel._id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover-lift cursor-pointer group relative"
                onClick={() => navigate(`/hotels/${hotel._id}`)}
              >
                <div className="absolute top-4 right-4 z-10">
                  <FavoriteButton hotelId={hotel._id} />
                </div>
                <div className="relative overflow-hidden h-56">
                  <img
                    src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'}
                    alt={hotel.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-pink-600 transition">
                    {hotel.name}
                  </h3>
                  <p className="text-gray-600 mb-4 flex items-center gap-2">
                    <span className="text-xl">📍</span>
                    {hotel.location}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                      ${hotel.price}
                      <span className="text-sm text-gray-500">/night</span>
                    </span>
                    <span className="text-yellow-500 text-xl flex items-center gap-1">
                      ⭐ {hotel.rating}
                    </span>
                  </div>
                  {hotel.amenities && hotel.amenities.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 text-gray-700 rounded-full text-xs font-semibold"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
