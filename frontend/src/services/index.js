import api from './api';

export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  }
};

export const hotelService = {
  getAllHotels: async (params = {}) => {
    const response = await api.get('/hotels', { params });
    return response.data;
  },

  getHotelById: async (id) => {
    const response = await api.get(`/hotels/${id}`);
    return response.data;
  },

  searchHotels: async (query) => {
    const response = await api.get('/hotels/search', { params: { q: query } });
    return response.data;
  },

  getRecommendedHotels: async () => {
    const response = await api.get('/hotels/recommended');
    return response.data;
  },

  addReview: async (hotelId, reviewData) => {
    const response = await api.post(`/hotels/${hotelId}/reviews`, reviewData);
    return response.data;
  }
};

export const bookingService = {
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  getUserBookings: async (params = {}) => {
    const response = await api.get('/bookings/my-bookings', { params });
    return response.data;
  },

  getBookingById: async (id) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  cancelBooking: async (id) => {
    const response = await api.patch(`/bookings/${id}/cancel`);
    return response.data;
  }
};

export const userService = {
  getFavorites: async () => {
    const response = await api.get('/users/favorites');
    return response.data;
  },

  addToFavorites: async (hotelId) => {
    const response = await api.post('/users/favorites', { hotelId });
    return response.data;
  },

  removeFromFavorites: async (hotelId) => {
    const response = await api.delete(`/users/favorites/${hotelId}`);
    return response.data;
  }
};
