import React from 'react';
import './SignUpPage.css';

const SignUpPage = () => {
  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
      <form>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit" className="btn sign-up">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
