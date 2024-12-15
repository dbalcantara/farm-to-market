import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './SignUpPage.css';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!result.ok) {
        setMessage(result.message || 'Signup Failed.');
      } 
      setMessage('User signed up successfully!');
      navigate('/login'); 
      
    } catch (error) {
      setMessage('Failed to connect to the server.');
    }
    
  };

  return (
    <div className="signup-background">
      <div className="signup-container">
        <h1>SIGNUP</h1>
        <p className="signup-welcome-message">Hello! Let's get started.</p>
        <form onSubmit={handleSubmit}>

          <div className='signup-prompt'>
            <h3>FIRST NAME</h3>
          </div>
          <div className="signup-field">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="signup-input-field"
          />
          </div>

          <div className='signup-prompt'>
            <h3>LAST NAME</h3>
          </div>
          <div className="signup-field">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="signup-input-field"
            />
          </div>

          <div className='signup-prompt'>
            <h3>EMAIL</h3>
          </div>
          <div className="signup-field">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="signup-input-field"
            />
          </div>

          <div className='signup-prompt'>
            <h3>PASSWORD</h3>
          </div>
          <div className="signup-field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="signup-input-field"
            />
          </div>

          <div className='signup-prompt'>
            <h3>CONFIRM</h3>
          </div>
          <div className="signup-field">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="signup-input-field"
            />
          </div>

          <button type="submit" className="btn sign-up">
            Sign Up
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        <p className="login-link">
          Already registered? <Link to="/">Log in</Link>
        </p>
      </div>
      <div className="signup-content-container">
        {/* Right Section: Company Description */}
        <div className="signup-company-info">
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

export default SignUpPage;
