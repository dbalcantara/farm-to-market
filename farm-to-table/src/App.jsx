import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LogInPage from './components/LogInPage';
import SignUpPage from './components/SignUpPage';
import './App.css';
import ShopPage from './components/ShopPage';
import AdminDashboard from './components/AdminDashboard'
import AdminUsers from './components/AdminUsers';
import AdminProducts from './components/AdminProducts';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/dashboard/users" element={<AdminUsers />} />
          <Route path="/dashboard/products" element={<AdminProducts />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
