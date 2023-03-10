import React from "react";
import NavButton from "../../atoms/NavButton/NavButton";
import "./Navbar.css";

interface NavbarProps {}

const Navbar = ({ ...props }: NavbarProps) => {
  return (
    <div className="Navbar">
      <div className="NavbarWrapper">
        <div className="Logo">
          <span>Logo</span>
        </div>
        <div className="NavButtons">
          <NavButton label="About" />
          <NavButton label="Newsletter" />
          <NavButton label="Cellar" />
          <NavButton label="Account" />
        </div>
        <div className="CartButtonWrapper">
          <span>Cart</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
