import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./AdminSales.css";

const AdminSales = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/show-all-orders");
        if (!response.ok) {
          throw new Error("Failed to fetch products. Server error.");
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="sales-report-page">
      <div className="back-button" onClick={() => navigate("/dashboard")}>
        &larr;
      </div>

      <div className="sales-page-title">
        <h1>SALES REPORT</h1>
      </div>
      <div className="tab-controls">
        <button className="tab-button active">Weekly</button>
        <button className="tab-button">Monthly</button>
        <button className="tab-button">Annual</button>
      </div>
      <div className="sales-summary">
        <h2 className="section-title">Weekly Sales</h2>
        <p className="total-sales">Total Sales: Php 300.00</p>
      </div>

      <table className="sales-table">
        <thead>
          <tr>
            <th>PRODUCT ID</th>
            <th>PRODUCT NAME</th>
            <th>PRICE</th>
            <th>QUANTITY SOLD</th>
            <th>TOTAL INCOME</th>
          </tr>
        </thead>
        <tbody>
          {error ? (
            <tr>
              <td colSpan="5" className="error-message">{error}</td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.productId}>
                <td>{order.productId}</td>
                <td>{order.productName}</td>
                <td>Php {order.productPrice}</td>
                <td>{order.orderQuantity}</td>
                <td>Php {(order.productPrice * order.orderQuantity  )}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSales;
