import { useState, useEffect } from 'react';
import { bookingService } from '../services';

export const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingService.getUserBookings();
      setBookings(response.bookings);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const cancelBooking = async (bookingId) => {
    try {
      await bookingService.cancelBooking(bookingId);
      await loadBookings();
    } catch (err) {
      throw err;
    }
  };

  return { bookings, loading, error, refreshBookings: loadBookings, cancelBooking };
};
