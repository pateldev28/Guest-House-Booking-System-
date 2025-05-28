import { useAuth } from '../context/AuthContext';
import BookingForm from '../components/user/BookingForm';
import BookingHistory from '../components/common/BookingHistory';
import Header from '../components/common/Header';

const UserPage = () => {
  const { user } = useAuth();

  return (
    <div className="user-page">
      <Header user={user} />
      <div className="user-content">
        <BookingForm />
        <BookingHistory />
      </div>
    </div>
  );
};

export default UserPage;