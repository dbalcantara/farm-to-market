import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
        <h1>Cultivate & Co.</h1>
        </div>
        <h2>Hello, Admin!</h2>
        <nav className="nav-links">
          <Link to="users" className="nav-link">User Management</Link>
          <Link to="products" className="nav-link">Product Listing</Link>
          <Link to="orders" className="nav-link">Order Fulfillment</Link>
          <Link to="sales" className="nav-link">Sales Report</Link>
        </nav>
        <Link to="logout" className="logout">Logout</Link>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1>Dashboard</h1>

        <div className="dashboard-cards">
          <Link to="users" className="card">
            <img src="users-image-placeholder.jpg" alt="User Management" />
            <span>User Management</span>
          </Link>
          <Link to="products" className="card">
            <img src="products-image-placeholder.jpg" alt="Product Listing" />
            <span>Product Listing</span>
          </Link>
          <Link to="orders" className="card">
            <img src="orders-image-placeholder.jpg" alt="Order Fulfillment" />
            <span>Order Fulfillment</span>
          </Link>
          <Link to="sales" className="card">
            <img src="sales-image-placeholder.jpg" alt="Sales Report" />
            <span>Sales Report</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
