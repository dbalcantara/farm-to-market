import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome!</h1>
      <p>Discover amazing products.</p>
      <Link to="/login">
        <button className="btn shop-now">Shop now!</button>
      </Link>
    </div>
  );
};

export default LandingPage;
