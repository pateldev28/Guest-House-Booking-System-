import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import BookingForm from './BookingForm';
import BookingHistory from '../common/BookingHistory';
import Header from '../common/Header';
import '../../styles/userDashboard.scss';

const UserDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('newBooking');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (window.location.hash === '#history') {
      setActiveTab('history');
    }
  }, []);

  const handleBookingSuccess = () => {
    setActiveTab('history');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="user-dashboard">
      <Header user={user} />
      
      <div className="dashboard-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'newBooking' ? 'active' : ''}`}
            onClick={() => setActiveTab('newBooking')}
          >
            New Booking
          </button>
          <button
            className={`tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            My Bookings
          </button>
        </div>

        {showSuccess && (
          <div className="success-banner">
            Booking submitted successfully! Status: Pending Approval
          </div>
        )}

        <div className="tab-content">
          {activeTab === 'newBooking' ? (
            <div className="booking-section">
              <h2>Create New Booking</h2>
              <BookingForm onSuccess={handleBookingSuccess} />
            </div>
          ) : (
            <div className="history-section">
              <h2>Booking History</h2>
              <BookingHistory />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;