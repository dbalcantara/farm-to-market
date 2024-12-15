import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      {/* <img src = ""></img>  - edit logo */} 
      <Link to="/" className="logo">Farm to Table</Link>
      <nav className="nav-buttons">
        <Link to="/signup">
          <button className="btn sign-up">Sign Up</button>
        </Link>
        <Link to="/login">
          <button className="btn log-in">Log In</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;