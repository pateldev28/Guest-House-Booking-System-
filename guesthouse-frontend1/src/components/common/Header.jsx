import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="app-header">
      <nav>
        <Link to="/" className="logo">GuestHouse Booking</Link>
        <div className="nav-links">
          {user ? (
            <>
              <span>Welcome, {user.name}</span>
              <button onClick={logout} className="logout-btn">Logout</button>
            </>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;