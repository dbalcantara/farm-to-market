import React, { useContext } from 'react';
import { CartController } from './ShopCartController';

// Appliance component to display appliance item cards with add-to-cart functionality
function Card({ items }) {
  const { addToCart, cartItems } = useContext(CartController);
  return (
    <div className="item-list">
      {/* Loop through each item in the items array */}
      {items.map((item, index) => (
        <div className="item-card" key={index}>
          {/* Display the item's image */}
          <img src={item.img} alt={item.name} />
          {/* Display the item's name */}
          <h2>{item.name}</h2>
          {/* Display the item's price */}
          <p>{item.price}</p>
          {/* Button to add the item to the cart */}
          <button onClick={() => addToCart(item.id)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Card;
