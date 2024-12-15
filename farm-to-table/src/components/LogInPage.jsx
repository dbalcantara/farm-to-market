import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LogInPage.css';

const LogInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('User logged in successfully!');
        navigate('/shop');
      } else {
        setMessage(result.message || 'An error occurred.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-background">

      {/* Left Section: Login Form */}
      <div className="login-container">
        <h1>LOGIN</h1>
        <p className="login-welcome-message">Welcome back! Please log in to your account.</p>
        <form onSubmit={handleSubmit}>
          <div className='login-prompt'>
            <h3>EMAIL</h3>
          </div>
          
          <div className="login-field">
            <span className="icon">@</span>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input-field"
            />
          </div>
          <div className='login-prompt'>
          <h3>PASSWORD</h3>
          </div>
          <div className="login-field">
            <span className="icon">🗝</span>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input-field"
            />
          </div>
          <button type="submit" className="btn login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

        <p className="signup-link">
          Not yet registered? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
      <div className="login-content-container">
        {/* Right Section: Company Description */}
        <div className="login-company-info">
          <h2>Cultivate & Co.</h2>
          <p>
            -----------------------------------------------------------------------------------------------------------
            Where every bite tells the story of fresh, locally-grown produce and sustainable practices.
            At <strong>Cultivate & Co.</strong>, we bridge the gap between farm and table, offering you
            the finest selection of handpicked, wholesome goods straight from the heart of nature
            to your plate. Come savor the difference of farm-fresh living!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;