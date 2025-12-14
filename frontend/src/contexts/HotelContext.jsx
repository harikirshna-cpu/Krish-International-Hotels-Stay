import React, { createContext, useContext, useState, useEffect } from 'react';
import { hotelService } from '../services';

const HotelContext = createContext();

export const useHotels = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotels must be used within HotelProvider');
  }
  return context;
};

export const HotelProvider = ({ children }) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const loadHotels = async (params = {}) => {
    try {
      setLoading(true);
      const response = await hotelService.getAllHotels({ ...filters, ...params });
      setHotels(response.hotels);
      setPagination({
        page: response.page,
        pages: response.pages,
        total: response.total
      });
    } catch (error) {
      console.error('Error loading hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchHotels = async (query) => {
    try {
      setLoading(true);
      const data = await hotelService.searchHotels(query);
      setHotels(data);
    } catch (error) {
      console.error('Error searching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    loadHotels({ ...newFilters, page: 1 });
  };

  const clearFilters = () => {
    setFilters({});
    loadHotels({ page: 1 });
  };

  const changePage = (page) => {
    loadHotels({ page });
  };

  useEffect(() => {
    loadHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    hotels,
    loading,
    filters,
    pagination,
    loadHotels,
    searchHotels,
    applyFilters,
    clearFilters,
    changePage
  };

  return <HotelContext.Provider value={value}>{children}</HotelContext.Provider>;
};
