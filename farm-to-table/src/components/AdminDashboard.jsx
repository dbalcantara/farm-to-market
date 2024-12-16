import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';
import One from '../assets/001.jpg';
import Two from '../assets/002.jpg';
import Three from '../assets/003.jpg';
import Four from '../assets/004.jpg';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
        <h1>Cultivate & Co.</h1>
        </div>
        <div className='admin-h2'>
          <h2>Hello, Admin!</h2>
        </div>
        <nav className="nav-links">
          <Link to="users" className="nav-link">User Management</Link>
          <Link to="products" className="nav-link">Product Listing</Link>
          <Link to="orders" className="nav-link">Order Fulfillment</Link>
          <Link to="sales" className="nav-link">Sales Report</Link>
        </nav>
        <Link to="/" className="logout">LOGOUT</Link>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="dashboard">
          <h3>Dashboard</h3>
          <div className="dashboard-cards">
            <Link to="users" className="card">
            <img src={One} alt="User Management" />
              <span>User Management</span>
            </Link>
            <Link to="products" className="card">
            <img src={Two} alt="User Management" />
              <span>Product Listing</span>
            </Link>
            <Link to="orders" className="card">
            <img src={Three} alt="User Management" />
              <span>Order Fulfillment</span>
            </Link>
            <Link to="sales" className="card">
            <img src={Four} alt="User Management" />
              <span>Sales Report</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
