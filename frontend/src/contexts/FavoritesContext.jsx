import React, { createContext, useContext, useState, useEffect } from 'react';
import { userService } from '../services';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      loadFavorites();
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated]);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const data = await userService.getFavorites();
      setFavorites(data);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (hotelId) => {
    try {
      await userService.addToFavorites(hotelId);
      await loadFavorites();
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  };

  const removeFavorite = async (hotelId) => {
    try {
      await userService.removeFromFavorites(hotelId);
      await loadFavorites();
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  };

  const isFavorite = (hotelId) => {
    return favorites.some(fav => fav._id === hotelId);
  };

  const value = {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
    refreshFavorites: loadFavorites
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};
