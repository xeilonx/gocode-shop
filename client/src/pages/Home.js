import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "../components/Header/Header";
import Products from "../components/Products/Products";
import Counter from "../components/Counter/Counter";
import CartContext from "../CartContext";
import TotalContext from "../TotalContext";
import PriceContext from "../PriceContext";

function Home() {
  const [initProducts, setInitProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [carts, setCarts] = useState([]);
  const [minMax, setMinMax] = useState([0, 1000]);
  const [price, setPrice] = useState([0, 1000]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        setInitProducts(data);
        setProducts(data);
      });
  }, []);

  const categories = initProducts
    .map((p) => p.category)
    .filter((value, index, array) => array.indexOf(value) === index);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = (price) => {
    setPrice(price);
  };

  useEffect(() => {
    if (initProducts.length > 0) {
      const productWithMinPrice = initProducts.reduce((prev, curr) =>
        prev.price < curr.price ? prev : curr
      );

      const productWithMaxPrice = initProducts.reduce((prev, curr) =>
        prev.price > curr.price ? prev : curr
      );

      setMinMax([productWithMinPrice.price, productWithMaxPrice.price]);
      setPrice([productWithMinPrice.price, productWithMaxPrice.price]);
    }
  }, [initProducts]);

  return (
    <div>
      <Counter />
      <CartContext.Provider value={[carts, setCarts]}>
        <TotalContext.Provider value={[total, setTotal]}>
          <PriceContext.Provider value={[minMax, setMinMax, price, setPrice]}>
            <Header
              categories={categories}
              handleCategoryChange={handleCategoryChange}
              handlePriceChange={handlePriceChange}
            />
            <Products products={products} price={price} category={category} />
          </PriceContext.Provider>
        </TotalContext.Provider>
      </CartContext.Provider>
    </div>
  );
}

export default Home;
