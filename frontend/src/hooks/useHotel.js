import { useState, useEffect } from 'react';
import { hotelService } from '../services';

export const useHotel = (id) => {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHotel = async () => {
      try {
        setLoading(true);
        const data = await hotelService.getHotelById(id);
        setHotel(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadHotel();
    }
  }, [id]);

  return { hotel, loading, error };
};
