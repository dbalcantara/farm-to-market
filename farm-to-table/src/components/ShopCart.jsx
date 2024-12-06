import React, { useContext } from 'react';
import { CartController } from './ShopCartController';

// Cart component for displaying items added to the cart
// Includes "remove from cart" functionality imported from CartController
//const Cart = ({ Appliancesitems, Gadgetitems, Accessoriesitems }) => {
const Cart = ({ Products}) => {
  // Accessing cartItems and removeFromCart from CartController context
  const { cartItems, removeFromCart } = useContext(CartController);

  // Combine all items from different categories into one array
  // const allItems = [...Appliancesitems, ...Gadgetitems, ...Accessoriesitems]; 
  const allItems = [...Products]; 
 

  // Calculate the total number of items in the cart
  const totalItemsInCart = () => {
    return allItems.reduce((total, item) => {
      if (cartItems[item.id] > 0) {
        return total + cartItems[item.id]; // Add item quantity to total
      }
      return total;
    }, 0);
  };

  return (
    <ul> 
      <h3>Shopping Cart (Total:{totalItemsInCart()})</h3>
      {/* Iterate through all items to display those in the cart */}
      {allItems.map((item) => {
        // Check if the item exists in the cart (cartItems[item.id] > 0)
        if (cartItems[item.id] > 0) {
          return (
            <li key={item.id}>
              {/* Display item name, price, and quantity in the cart */}
              {item.name} - {item.price} (x{cartItems[item.id]})
              {/* Button to remove item from the cart */}
              <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          );
        }
        return null; // Do not render item if it's not in the cart
      })}
    </ul>
  );
};

export default Cart;
