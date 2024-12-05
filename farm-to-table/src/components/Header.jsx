import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      {/* <img src = ""></img>  - edit logo */} 
      <div className="logo">Farm to Table</div>
      <nav className="nav-buttons">
        <button className="btn sign-up">Sign Up</button>
        <button className="btn log-in">Log In</button>
      </nav>
    </header>
  );
};

export default Header;
