import React, { useEffect, useState } from "react";
import "./AdminProducts.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/show-all-products");

        if (!response.ok) {
          throw new Error("Failed to fetch products. Server error.");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  const sortProducts = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    const sortedProducts = [...products].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setProducts(sortedProducts);
  };

  return (
    <div className="product-page">
      <h1 className="page-title">Products Listing</h1>

      <div className="sorting-controls">
        <label htmlFor="sort-options">Sort by:</label>
        <select
          id="sort-options"
          onChange={(e) => sortProducts(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Select criteria
          </option>
          <option value="productName">Name</option>
          <option value="productCategory">Type</option>
          <option value="productPrice">Price</option>
          <option value="productQuantity">Quantity</option>
        </select>
        <button
          onClick={() => sortProducts(sortConfig.key)}
          disabled={!sortConfig.key}
        >
          Sort {sortConfig.direction === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>

      <div className="product-container">
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product.productId}>
              <img
                src={product.productImage}
                alt={product.productName}
                className="product-image"
              />
              <div className="product-details">
                <h2>{product.productName}</h2>
                <p>{product.productCategory}</p>
                <p>Stocks Left: {product.productQuantity}</p>
                <p className="product-price">Php {product.productPrice.toFixed(2)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
