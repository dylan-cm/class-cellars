import React, { useEffect, useState } from "react";
import "./SideMenu.css";
import { useNavigate } from "react-router-dom";
import { MdClose, MdShoppingCart } from "react-icons/md";

// Side Menu Component
interface SideMenuProps {
  showSideMenu: boolean;
  handleSideMenu: () => void;
}
const SideMenu = ({ showSideMenu, handleSideMenu }: SideMenuProps) => {
  const localQty = Number(localStorage.getItem("cartQty")) || 0;
  const [cartQty, setCartQty] = useState(localQty);
  const navigate = useNavigate();
  useEffect(() => {
    setCartQty(localQty);
  }, [localQty]);
  const handleNavigate = (path: string) => {
    navigate(path);
    handleSideMenu();
  };
  return (
    <>
      <div
        className={showSideMenu ? "SideMenuWrapper" : "SideMenuWrapper Hidden"}
        onClick={handleSideMenu}
      />
      <div className={showSideMenu ? "SideMenu" : "SideMenu Hidden"}>
        <div className="SideMenuCloseButton" onClick={handleSideMenu}>
          <MdClose color="white" size={30} />
        </div>
        <div className="SideMenuLink" onClick={() => handleNavigate("/")}>
          Home
        </div>
        <div className="SideMenuLink" onClick={() => handleNavigate("/cellar")}>
          Cellar
        </div>
        <div
          onClick={() => handleNavigate("/cart")}
          className="SideMenuLink SideMenuCartButton"
        >
          {"Cart "}
          <MdShoppingCart
            size={24}
            color={cartQty ? "var(--brand-lm-10-mid)" : "white"}
          />
          {cartQty > 0 && (
            <div className="SideMenuCartQtyIndicator">{cartQty}</div>
          )}
        </div>
        <p>Signup for our newsletter to get the latest info on new arrivals.</p>
        <div
          className="SideMenuJoinButton"
          onClick={() => handleNavigate("/#newsletter")}
        >
          Join
        </div>
      </div>
    </>
  );
};

export default SideMenu;
