import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/user/LoginForm';
import Notification from '../components/ui/Notification';

const LoginPage = () => {
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      navigate('/user');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      {error && <Notification message={error} type="error" />}
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;