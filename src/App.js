import "./App.css";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import { useState, useEffect } from "react";

function App() {
  const [initProducts, setInitProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setInitProducts(data);
        setProducts(data);
      });
  }, []);

  const categories = initProducts
    .map((p) => p.category)
    .filter((value, index, array) => array.indexOf(value) === index);

  const handleChange = (e) => {
    if (e.target.value === "All") {
      setProducts(initProducts);
    } else {
      const filterProducts = initProducts.filter(
        (product) => product.category === e.target.value
      );
      setProducts(filterProducts);
    }
  };

  return (
    <div>
      <Header categories={categories} handleChange={handleChange} />
      <Products products={products} />
    </div>
  );
}

export default App;
