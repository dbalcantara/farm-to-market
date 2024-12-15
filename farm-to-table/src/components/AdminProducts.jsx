import React, { useEffect, useState } from "react";
import "./AdminProducts.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div className="product-page">
      <h1 className="page-title">Products Listing</h1>

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
