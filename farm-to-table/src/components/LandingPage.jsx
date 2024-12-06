import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div>
      <Header />
      <div className="landing-page">
        <h1>Welcome!</h1>
        <p>Discover amazing products.</p>
        <Link to="/login">
          <button className="btn shop-now">Shop now!</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
