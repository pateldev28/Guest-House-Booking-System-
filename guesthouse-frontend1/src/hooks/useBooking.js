import { useState, useEffect, useCallback } from 'react';
import { fetchBookings, createBooking, cancelBooking } from '../services/api';

export const useBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadBookings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchBookings();
      setBookings(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addBooking = async (bookingData) => {
    try {
      setLoading(true);
      const newBooking = await createBooking(bookingData);
      setBookings(prev => [...prev, newBooking]);
      return newBooking;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeBooking = async (bookingId) => {
    try {
      setLoading(true);
      await cancelBooking(bookingId);
      setBookings(prev => prev.filter(b => b.id !== bookingId));
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  return {
    bookings,
    loading,
    error,
    addBooking,
    removeBooking,
    refreshBookings: loadBookings
  };
};