import React from 'react';
import { Link } from 'react-router-dom';
import './SignUpPage.css';

const SignUpPage = () => {
  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
      <form>
        <input type="text" placeholder="First Name" required />
        <input type="text" placeholder="Last Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <input type="password" placeholder="Confirm Password" required />
        <button type="submit" className="btn sign-up">Sign Up</button>
      </form>
      <p className="login-link">
        Already registered? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default SignUpPage;
