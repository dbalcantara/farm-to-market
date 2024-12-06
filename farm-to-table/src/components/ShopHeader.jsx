import React from 'react';

// Navigation bar component
// Uses category id to determine which category is selected/displayed
function Header({ menus, setSelectedCategory }) {
  return (
    <nav>
      <ul>
        {/* Map through each menu item to display in the nav bar */}
        {menus.map(menu => (
          <li 
            key={menu.id} 
            onClick={() => setSelectedCategory(menu.id)}
          >
            {/* Display the name of each menu item */}
            {menu.name}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Header;
