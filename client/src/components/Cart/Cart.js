import React, { useContext, useEffect } from "react";
import CartContext from "../../CartContext";
import TotalContext from "../../TotalContext";
import "./Cart.css";

function Cart() {
  const [total, setTotal] = useContext(TotalContext);
  const [carts, setCarts] = useContext(CartContext);

  const getTotal = (cart) => {
    return Object.entries(cart).reduce((acc, item) => {
      const amount = item[1].amount;
      return acc + amount;
    }, 0);
  };

  useEffect(() => {
    setTotal(getTotal(carts));
  }, []);

  const items = Object.entries(carts).map(([key, value]) => {
    return (
      <div key={key}>
        <img className="pic" src={value.image} alt="sh"></img>{" "}
        <span>{value.title}</span>: <span>{value.amount}</span>, price:
        <span>{value.price * value.amount}</span>
      </div>
    );
  });

  const allPrice = Object.entries(carts).reduce((acc, item) => {
    const totalSum = item[1].price * item[1].amount;
    return acc + totalSum;
  }, 0);

  return (
    <div className="cart">
      <h2> Shopping cart</h2>
      <span className="text">{items}</span>
      <h6> You have {total} products in shopping cart</h6>
      <h6> Total price: ${Math.round(allPrice)} </h6>
      <button className="reset" onClick={() => setCarts(!carts)}>
        Delete all products from the cart
      </button>
    </div>
  );
}

export default Cart;