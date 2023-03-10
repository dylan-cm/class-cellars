import React from "react";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import NavButton from "../../atoms/NavButton/NavButton";
import "./Navbar.css";

interface NavbarProps {}

const Navbar = ({ ...props }: NavbarProps) => {
  return (
    <div className="Navbar">
      <div className="NavbarWrapper">
        <HashLink to="/#top" className="Logo" smooth>
          Logo
        </HashLink>
        <div className="NavButtons">
          <NavButton hash label="About" link="about" />
          <NavButton hash label="Newsletter" link="newsletter" center />
          <NavButton hash label="Cellar" link="cellar-preview" />
          <NavButton label="Account" link="account" />
        </div>
        <NavLink
          to="cart"
          className={({ isActive, isPending }) =>
            "CartNav " + (isActive ? "Active" : isPending ? "Pending" : "")
          }
        >
          Cart
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
