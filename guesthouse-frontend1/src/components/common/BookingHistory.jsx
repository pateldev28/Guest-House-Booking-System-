import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchUserBookings } from '../../services/api';

const BookingHistory = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserBookings(user.id)
        .then(data => {
          setBookings(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="booking-history">
      <h3>Your Booking History</h3>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Guest House</th>
              <th>Room</th>
              <th>Bed</th>
              <th>Dates</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.guestHouse.name}</td>
                <td>{booking.room.number}</td>
                <td>{booking.bed.number}</td>
                <td>{booking.startDate} to {booking.endDate}</td>
                <td className={`status-${booking.status.toLowerCase()}`}>
                  {booking.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingHistory;