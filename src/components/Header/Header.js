import "./Header.css";
import Cart from "../Cart/Cart";
import { useContext, useState } from "react";
import TotalContext from "../../TotalContext";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import React from "react";
import PriceContext from "../../PriceContext";

function Header({ categories, handleChange }) {
  const [showCart, setShowCart] = useState(false);
  const [total] = useContext(TotalContext);
  const [products] = useContext(PriceContext);

  const productWithMinPrice = products.reduce(function (prev, curr) {
    return prev.price < curr.price ? prev : curr;
  });

  const productWithMaxPrice = products.reduce(function (prev, curr) {
    return prev.price > curr.price ? prev : curr;
  });

  const [value, setValue] = React.useState([
    productWithMinPrice.price,
    productWithMaxPrice.price,
  ]);

  const slider = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <nav className="product-filter">
      <h1>GoCode Shop</h1>

      <div className="sort">
        <div className="collection-sort">
          <label>Filter by:</label>

          <select className="list" onChange={handleChange}>
            <option value="all"> All </option>
            {categories.map((category, i) => (
              <option key={i} value={category}>
                {" "}
                {category}{" "}
              </option>
            ))}
          </select>
        </div>

        <div className="collection-sort">
          <label>Sort by:</label>
          <select className="list">
            <option value="/">Featured</option>
            <option value="/">Best Selling</option>
            <option value="/">Alphabetically, A-Z</option>
            <option value="/">Alphabetically, Z-A</option>
            <option value="/">Price, low to high</option>
            <option value="/">Price, high to low</option>
            <option value="/">Date, new to old</option>
            <option value="/">Date, old to new</option>
          </select>
        </div>
      </div>

      <button
        className="cart-button"
        onClick={() => {
          setShowCart(!showCart);
        }}
      >
        {" "}
        Cart ({total}) 🛒{" "}
      </button>
      {showCart && <Cart />}
      <Box sx={{ width: 300 }}>
        <Slider
          min={productWithMinPrice.price}
          max={productWithMaxPrice.price}
          getAriaLabel={() => "Price range"}
          value={value}
          onChange={slider}
          valueLabelDisplay="auto"
        />
        {/* Your range of Price is between {value[0]} to {value[1]} */}
      </Box>
    </nav>
  );
}

export default Header;