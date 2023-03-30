import React from "react";
import "./Cart.css";

interface CartProps {}

const Cart = ({ ...props }: CartProps) => {
  return (
    <div className="Cart">
      <h1>Cart</h1>
    </div>
  );
};

export default Cart;
