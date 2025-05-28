import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookings = async () => {
    // Implementation would call your API
    const data = await fetch('/api/bookings').then(res => res.json());
    setBookings(data);
  };

  const createBooking = async (bookingData) => {
    // Implementation would call your API
    const newBooking = await fetch('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    }).then(res => res.json());
    setBookings([...bookings, newBooking]);
    return newBooking;
  };

  const value = {
    bookings,
    selectedBooking,
    setSelectedBooking,
    fetchBookings,
    createBooking
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);