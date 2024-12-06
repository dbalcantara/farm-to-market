import React, { createContext, useState } from 'react';

// Creating the CartController context to manage cart state
export const CartController = createContext();

// CartControllerProvider component to manage and provide cart state to the app
export const CartControllerProvider = ({ children }) => {
  // State to manage items in the shopping cart
  const [cartItems, setCartItems] = useState({});

  // Function to add an item to the cart by itemId
  // If the item is already in the cart, increment the quantity; otherwise, add it with quantity 1
  const addToCart = (itemId) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [itemId]: (prevItems[itemId] || 0) + 1,
    }));
  };

  // Function to remove an item from the cart by itemId
  // Decreases quantity or removes the item if quantity is 1
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      if (updatedItems[itemId] > 1) {
        updatedItems[itemId] -= 1; // Decrease quantity if more than 1
      } else {
        delete updatedItems[itemId]; // Remove the item completely if quantity is 1
      }
      return updatedItems;
    });
  };

  // Passing cartItems, addToCart, and removeFromCart as context values
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
  };

  // Providing the context value to child components
  return (
    <CartController.Provider value={value}>
      {children}
    </CartController.Provider>
  );
};
