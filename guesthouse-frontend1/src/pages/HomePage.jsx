import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <h1>Welcome to Guest House Booking System</h1>
      {!user ? (
        <div className="auth-links">
          <Link to="/login" className="btn">Login</Link>
        </div>
      ) : (
        <div className="user-links">
          {user.role === 'admin' ? (
            <Link to="/admin" className="btn">Go to Admin Panel</Link>
          ) : (
            <Link to="/user" className="btn">Go to User Dashboard</Link>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;