import { useState } from 'react';
import { initiatePasswordReset } from '../../services/auth';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    try {
      await initiatePasswordReset(email);
      setMessage('Password reset link has been sent to your email');
      setError('');
    } catch (err) {
      setError('Failed to send reset link. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="password-reset">
      <h2>Reset Password</h2>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your registered email"
          />
        </div>
        <button type="submit" className="reset-button">Send Reset Link</button>
      </form>
    </div>
  );
};

export default PasswordReset;