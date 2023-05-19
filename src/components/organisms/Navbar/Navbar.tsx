import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Logo } from "../../../assets/Logo - Light.svg";

import "./Navbar.css";
import { MdMenu } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";

// Navigation Bar Component
interface NavbarProps {
  handleSideMenu: () => void;
}
const Navbar = ({ handleSideMenu }: NavbarProps) => {
  const localQty = Number(localStorage.getItem("cartQty")) || 0;
  const [cartQty, setCartQty] = useState(localQty);
  const navigate = useNavigate();
  useEffect(() => {
    setCartQty(localQty);
  }, [localQty]);
  return (
    <div className={"Navbar"}>
      <Logo className={"Logo"} />
      <div className="NavLinks-desktop">
        <div onClick={() => navigate("/")} className="NavbarLink">
          Home
        </div>
        <div onClick={() => navigate("/products")} className="NavbarLink">
          Cellar
        </div>
        <div
          onClick={() => navigate("/cart")}
          className="NavbarLink NavbarCartButton"
        >
          {"Cart "}
          <MdShoppingCart
            size={24}
            color={cartQty ? "var(--brand-lm-10-mid)" : "black"}
          />
          {cartQty > 0 && <div className="CartQtyIndicator">{cartQty}</div>}
        </div>
        <div
          onClick={() => navigate("/#newsletter")}
          className="NavbarJoinButton"
        >
          Join
        </div>
      </div>
      <div className="NavLinks-mobile">
        <div className="SideMenuOpenButton" onClick={handleSideMenu}>
          <MdMenu size={24} fill="white" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
