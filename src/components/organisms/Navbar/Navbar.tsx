import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { ReactComponent as Logo } from "../../../assets/Logo - Light.svg";
import { MdMenu } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";
import { CartContext } from "../../../functions/contextProviders";

// Navigation Bar Component
interface NavbarProps {
  handleSideMenu: () => void;
}
const Navbar = ({ handleSideMenu }: NavbarProps) => {
  const navigate = useNavigate();
  const { cartQuantity } = useContext(CartContext);

  return (
    <div className={"Navbar"}>
      <Logo className={"Logo"} onClick={() => navigate("/")} />
      <div className="NavLinks-desktop">
        <div onClick={() => navigate("/")} className="NavbarLink">
          Home
        </div>
        <div onClick={() => navigate("/cellar")} className="NavbarLink">
          Cellar
        </div>
        <div
          onClick={() => navigate("/cart")}
          className="NavbarLink NavbarCartButton"
        >
          {"Cart "}
          <MdShoppingCart
            size={24}
            color={cartQuantity ? "var(--brand-lm-10-mid)" : "black"}
            id="navbar-shopping-cart-number"
          />
          {cartQuantity > 0 && (
            <div className="CartQtyIndicator">{cartQuantity}</div>
          )}
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
