import { useState, useEffect } from 'react';
import { fetchPendingBookings, approveBooking, rejectBooking } from '../../services/api';
import Notification from '../ui/Notification';

const BookingApproval = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadPendingBookings();
  }, []);

  const loadPendingBookings = async () => {
    setLoading(true);
    try {
      const data = await fetchPendingBookings();
      setBookings(data);
    } catch (error) {
      setMessage({ text: 'Failed to load bookings', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (bookingId) => {
    try {
      await approveBooking(bookingId);
      setMessage({ text: 'Booking approved', type: 'success' });
      loadPendingBookings();
    } catch (error) {
      setMessage({ text: 'Failed to approve booking', type: 'error' });
    }
  };

  const handleReject = async (bookingId, reason) => {
    if (!reason) {
      setMessage({ text: 'Please provide a reason for rejection', type: 'error' });
      return;
    }
    try {
      await rejectBooking(bookingId, reason);
      setMessage({ text: 'Booking rejected', type: 'success' });
      loadPendingBookings();
    } catch (error) {
      setMessage({ text: 'Failed to reject booking', type: 'error' });
    }
  };

  if (loading) return <div>Loading pending bookings...</div>;

  return (
    <div className="booking-approval">
      <h3>Pending Booking Approvals</h3>
      {message && <Notification message={message.text} type={message.type} />}
      
      {bookings.length === 0 ? (
        <p>No pending bookings</p>
      ) : (
        <div className="booking-list">
          {bookings.map(booking => (
            <div key={booking.id} className="booking-item">
              <div className="booking-details">
                <h4>Booking #{booking.id}</h4>
                <p>Guest House: {booking.guestHouse.name}</p>
                <p>Room: {booking.room.number} - Bed: {booking.bed.number}</p>
                <p>Dates: {booking.startDate} to {booking.endDate}</p>
                <p>User: {booking.user.name} ({booking.user.email})</p>
              </div>
              <div className="booking-actions">
                <button onClick={() => handleApprove(booking.id)}>Approve</button>
                <div className="reject-form">
                  <input
                    type="text"
                    placeholder="Reason for rejection"
                    id={`reason-${booking.id}`}
                  />
                  <button onClick={() => {
                    const reason = document.getElementById(`reason-${booking.id}`).value;
                    handleReject(booking.id, reason);
                  }}>
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingApproval;