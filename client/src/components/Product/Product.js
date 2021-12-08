import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../CartContext";
import TotalContext from "../../TotalContext";
import "./Product.css";

function Product({ title, price, image, id }) {
  const [product, setProduct] = useState(0);
  const [carts, setCarts] = useContext(CartContext);
  const [total, setTotal] = useContext(TotalContext);

  const addProduct = () => {
    setProduct(product + 1);

    const currentProduct = carts[id] || {
      amount: product,
      title: title,
      price: price,
      image: image,
    };
    currentProduct.amount = currentProduct.amount + 1;
    const newCarts = { ...carts, [id]: currentProduct };
    setCarts(newCarts);
  };

  const removeProduct = () => {
    product > 0 && setProduct(product - 1);

    let newCart;

    const currentProduct = carts[id];

    if (!currentProduct) return;

    currentProduct.amount = currentProduct.amount - 1;

    if (currentProduct.amount === 0) {
      newCart = { ...carts };
      delete newCart[id];
    } else {
      newCart = { ...carts, [id]: currentProduct };
    }

    setCarts(newCart);
  };

  const getTotal = (cart) => {
    return Object.entries(cart).reduce((acc, item) => {
      const amount = item[1].amount;
      return acc + amount;
    }, 0);
  };

  useEffect(() => {
    if (!carts) {
      setProduct(0);
    }
  }, [carts]);

  useEffect(() => {
    if (addProduct) {
      setTotal(getTotal(carts));
    }
  }, [carts]);

  return (
    <div className="product-card">
      <Link to={`/products/${id}`}>
        <div className="product-image">
          <img src={image} alt="Img" />
        </div>
      </Link>

      <div className="product-info">
        <h5>{title}</h5>
        <h6>${price}</h6>

        <button className="re1" onClick={removeProduct}>
          {" "}
          -{" "}
        </button>
        <span className="emz"> {product} </span>
        <button className="re2" onClick={addProduct}>
          {" "}
          +{" "}
        </button>
      </div>
    </div>
  );
}

export default Product;
