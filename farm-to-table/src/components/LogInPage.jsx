import React from 'react';
import { Link } from 'react-router-dom';
import './LogInPage.css';

const LogInPage = () => {
  return (
    <div className="login-page">
      <h1>Log In</h1>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit" className="btn log-in">Log In</button>
      </form>
      <p className="signup-link">
        Not yet registered? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default LogInPage;
