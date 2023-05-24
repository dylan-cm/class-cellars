import React from "react";
import "./EmptyCart.css";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="EmptyCart">
      <h2>Your cart is empty.</h2>
      <div className="ShopNow" onClick={() => navigate("/cellar")}>
        Shop Now
      </div>
    </div>
  );
};

export default EmptyCart;
