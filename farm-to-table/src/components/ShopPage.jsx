import { useState } from 'react'
import Header from './ShopHeader';
import Card from './ShopCard';
import { CartControllerProvider } from './ShopCartController';
import Cart from './ShopCart';
import './ShopPage.css';


// Defined category structures with names, URLs, and unique IDs
const menus = [
  { name: "Products", url: "#", id: 1 },
  // { name: "Gadgets", url: "#", id: 2 },
  // { name: "Accessories", url: "#", id: 3 },
];

// Items for each category with details like ID, name, image, and price
const Products = [
  { id: 1, name: "Oven", img: "https://www.kyowa.com.ph/cdn/shop/files/KW-3320_3322_3325_3328A_grande.jpg?v=1700446651", price: "₱20000" },
  { id: 2, name: "Rice Cooker", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmRSJETzUNFfCbSmtzH41VYh1xtG3iiXK2Mg&s", price: "₱5000" },
  { id: 3, name: "Air Conditioner", img: "https://i5.walmartimages.com/seo/Midea-5-000-BTU-150-Sq-ft-Mechanical-Window-Air-Conditioner-White-MAW05M1WWT_e69841e8-f927-4348-a7b6-a0c695a83ad4.99578b1e45f02b7408bdd2bc61d5f818.jpeg", price: "₱8000" },
  { id: 4, name: "Electric Fan", img: "https://ansons.ph/wp-content/uploads/2020/01/F-409LS.jpg", price: "₱1000" }
];

// const Gadgetitems = [
//   { id: 5, name: "iPhone 16", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRefymJKP8pcBuNRxEbqZySRl-HdPvNChSJBw&s", price: "₱70000" },
//   { id: 6, name: "RK61 Keyboard", img: "https://rkgamingstore.com/cdn/shop/products/RK61gamingkeyboard_1_9c7cfd02-7f06-4305-a1b8-d2de6bd8f289.jpg?v=1636444580", price: "₱6000" },
//   { id: 7, name: "Macbook Air", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-g6ZWExP8t8Xl2bG0E4cM4mxjJYZ525ZrLQ&s", price: "₱100000" },
//   { id: 8, name: "iPad 10", img: "https://accenthub.com.ph/wp-content/uploads/2023/05/Apple-10.9-Inches-iPad-10th-Gen-Wi-Fi-256GB-Silver-1.jpg", price: "₱40000" }
// ];

// const Accessoriesitems = [
//   { id: 9, name: "Gentle Monster", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYCoLvymShSqBwq9blnF_YJR5rRbC8SZ_UjQ&s", price: "₱5000" },
//   { id: 10, name: "Solasta Necklace", img: "https://img.perniaspopupshop.com/catalog/product/s/o/SOLA092133_1.jpg?impolicy=zoomimage", price: "₱3000" },
//   { id: 11, name: "Pandora Bracelet", img: "https://pandora.lucerneluxe.com/cdn/shop/products/HIGH_CMYK_592453C00_CMYK_1024x1024@2x.jpg?v=1672819037", price: "₱5000" },
//   { id: 12, name: "Casio Watch", img: "https://www.casio.com/content/dam/casio/product-info/locales/ph/en/timepiece/product/watch/C/CA/CA5/ca-500weg-1a/assets/CA-500WEG-1A.png", price: "₱4000" }
// ];


function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState(1);  // Initial state for selected category

  // Renders the item cards based on the selected category  
  const renderCategory = () => {
    switch (selectedCategory) {
      case 1:
        return <Card items={Products} />;
      // case 2:
      //   return <Card items={Gadgetitems} />;
      // case 3:
      //   return <Card items={Accessoriesitems} />;
      // default:
        return null;
    }
  };

  return (
      <CartControllerProvider>
        <div className="App">
        <div className="header-container">
           {/* Header with app title and navigation menu */}
          <header>
            <h1>Farm to Table</h1>
          </header>
          {/* Header component with menu items and category selection */}
          <Header menus={menus} setSelectedCategory={setSelectedCategory} />
        </div>
        <div className="main-container">
          <main>
            {/* Renders the selected category's items */}
            {renderCategory()}
          </main>
          <div className="cart">
            <Cart
              Products={Products}
              // Gadgetitems={Gadgetitems}
              // Accessoriesitems={Accessoriesitems}
            />
          </div>
        </div>
      </div>
      </CartControllerProvider>
  )
}

export default ShopPage
