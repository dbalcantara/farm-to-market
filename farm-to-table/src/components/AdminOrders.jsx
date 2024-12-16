import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]); // State for fetched orders
  const [error, setError] = useState(null); // State for errors
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3001/show-all-orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders. Server error.");
        }
        const data = await response.json();
        setOrders(data); // Update state with fetched data
      } catch (err) {
        setError(err.message); // Set error message
      }
    };

    fetchOrders(); // Fetch orders on component mount
  }, []);

// Handler for confirming an order
const handleConfirmOrder = async (transactionId) => {
  try {
    const response = await fetch("http://localhost:3001/confirm-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactionId }),
    });
    const result = await response.json();
    if (response.ok) {
      alert(result.message);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.transactionId === transactionId
            ? { ...order, orderStatus: 1 }
            : order
        )
      );
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error("Error confirming order:", error);
  }
};

// Handler for canceling an order
const handleCancelOrder = async (transactionId) => {
  try {
    const response = await fetch("http://localhost:3001/cancelorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactionId }),
    });
    const result = await response.json();
    if (response.ok) {
      alert(result.message);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.transactionId !== transactionId)
      );
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error("Error canceling order:", error);
  }
};

  return (
    <div className="orders-report-page">
      {/* Back Button */}
      <div className="back-button" onClick={() => navigate("/dashboard")}>
        &larr;
      </div>

      <div className="page-title">
        <h1>CONFIRM ORDER</h1>
      </div>
      <table className="orders-table">
        <thead>
          <tr>
            <th>TRANSACTION ID</th>
            <th>PRODUCT</th>
            <th>ORDER QUANTITY</th>
            <th>STATUS</th>
            <th>EMAIL</th>
            <th>DATE ORDERED</th>
            <th>TIME</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {error ? (
            <tr>
              <td colSpan="8" className="error-message">
                {error}
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.transactionId}>
                <td>{order.transactionId}</td>
                <td>{order.productName}</td>
                <td>{order.orderQuantity}</td>
                <td>{order.orderStatus === 1 ? "Confirmed" : "Pending"}</td>
                <td>{order.email}</td>
                <td>{order.dateOrdered}</td>
                <td>{order.time}</td>
                <td>
                  {order.orderStatus === 1 ? (
                    <>
                      <span className="status-confirmed">Confirmed</span>
                      <button className="btn-disabled" disabled>
                        Cannot Cancel
                      </button>
                    </>
                  ) : (
                    <div className="action-buttons">
                      <button
                        className="btn-confirm"
                        onClick={() => handleConfirmOrder(order.transactionId)}
                      >
                        Confirm Order
                      </button>
                      <button
                        className="btn-cancel"
                        onClick={() => handleCancelOrder(order.transactionId)}
                      >
                        Cancel Order
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
