import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LogInPage.css';

const LogInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.status) {
        throw new Error(data.message || 'Login failed');
      }

      console.log('Login successful:', data);

      alert('Login successful!');
      navigate('/shop'); 
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn log-in" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      <p className="signup-link">
        Not yet registered? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default LogInPage;
