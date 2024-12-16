import React, { useEffect, useState } from "react";
import Header from "./ShopHeader";
import "./ShopPage.css";

function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/show-all-products");
        if (!response.ok) {
          throw new Error("Failed to fetch products. Server error.");
        }
        const data = await response.json();

        setProducts(data);

        const uniqueCategories = [...new Set(data.map((item) => item.productCategory))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProductsAndCategories();
  }, []);

  // Add a product to the cart
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.productId === product.productId);

    if (existingProduct) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  // Remove a product from the cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.productId !== productId));
  };

  // Update stock quantities after checkout
  const updateStockAfterCheckout = () => {
    const updatedProducts = [...products];
    cart.forEach((item) => {
      const productIndex = updatedProducts.findIndex((product) => product.productId === item.productId);
      if (productIndex !== -1) {
        updatedProducts[productIndex].productQuantity -= item.quantity; // Deduct the quantity from stock
      }
    });
    setProducts(updatedProducts);
  };

  const calculateTotalPrice = () =>
    cart.reduce((total, item) => total + item.productPrice * item.quantity, 0);

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    updateStockAfterCheckout(); // Update stock after checkout
    setCart([]); // Clear cart
  };

  const sortProducts = (key) => {
    if (!key) return;

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

  const renderProducts = () => {
    if (error) {
      return <p className="error-message">{error}</p>;
    }

    if (products.length === 0) {
      return <p>Loading products...</p>;
    }

    const filteredProducts =
      selectedCategory === null
        ? products
        : products.filter((product) => product.productCategory === selectedCategory);

    if (filteredProducts.length === 0) {
      return <p>No products found for this category.</p>;
    }

    return (
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.productId}>
            <img
              src={product.productImage}
              alt={product.productName}
              className="product-image"
            />
            <h2 className="product-name">{product.productName}</h2>
            <p>Type: {product.productCategory}</p>
            <p>Price: Php {product.productPrice.toFixed(2)}</p>
            <p>Description: {product.productDescription}</p>
            <p>Stocks Left: {product.productQuantity}</p>
            <button
              className="add-to-cart-button"
              onClick={() => addToCart(product)}
              disabled={product.productQuantity === 0}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    );
  };

  // Render the cart drawer
  const renderCart = () => {
    if (cart.length === 0) {
      return <p>Your cart is empty.</p>;
    }
  
    return (
      <div className="cart-container">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total (Php)</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.productId}>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>{(item.productPrice * item.quantity).toFixed(2)}</td>
                <td>
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="cart-summary">
          <h3>Total: Php {calculateTotalPrice().toFixed(2)}</h3>
          <button className="place-order-button" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    );
  };
  

  return (
    <div className="App">
      <div className="header-container">
        <header>
          <h1>Farm to Table</h1>
        </header>
        <Header
          menus={[{ name: "All Products", url: "#", id: null }, ...categories.map((category) => ({
            name: category,
            url: "#",
            id: category,
          }))]}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div className="sorting">
        <label htmlFor="sort-options">Sort by:</label>
        <select
          id="sort-options"
          onChange={(e) => sortProducts(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>Select criteria</option>
          <option value="productName">Name</option>
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
      <div className="main-container">
        <main>{renderProducts()}</main>
        <aside className="cart-drawer">
          <h2>Your Cart</h2>
          {renderCart()}
        </aside>
      </div>
    </div>
  );
}


export default ShopPage;
