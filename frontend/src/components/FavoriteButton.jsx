import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';

const FavoriteButton = ({ hotelId }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(hotelId);

  const handleClick = async (e) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      if (favorite) {
        await removeFavorite(hotelId);
      } else {
        await addFavorite(hotelId);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`p-4 rounded-full transition-all transform hover:scale-125 shadow-2xl ${
        favorite
          ? 'bg-gradient-to-r from-red-500 via-pink-500 to-red-500 text-white neon-button'
          : 'glass border-2 border-pink-400/50 text-pink-400 hover:text-red-400 hover:border-red-400/70'
      }`}
      title={favorite ? '💔 Remove from favorites' : '❤️ Add to favorites'}
      style={{
        boxShadow: favorite ? '0 0 20px rgba(255, 0, 100, 0.6), 0 0 40px rgba(255, 0, 100, 0.4)' : ''
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 animate-pulse"
        fill={favorite ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
};

export default FavoriteButton;
