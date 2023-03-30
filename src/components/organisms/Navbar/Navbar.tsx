import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HashLink, NavHashLink } from "react-router-hash-link";

import { ReactComponent as Logo } from "../../../assets/Logo - Light.svg";
import { ReactComponent as AccountIcon } from "../../../assets/accountIcon.svg";
import { ReactComponent as CartIcon } from "../../../assets/cartIcon.svg";
import "./Navbar.css";

interface NavbarProps {}

const Navbar = ({ ...props }: NavbarProps) => {
  const [navbarBackground, setNavbarBackground] = useState(false);
  const location = useLocation();
  const getClass = (label: string) =>
    "NavButton " + (location.hash.slice(1) === label ? "Active" : "");

  useEffect(() => {
    if (location.pathname !== "/") setNavbarBackground(true);
    else {
      setNavbarBackground(false);
      document.addEventListener("scroll", () => {
        if (window.scrollY > 50) setNavbarBackground(true);
        else setNavbarBackground(false);
      });
    }
  }, [location.pathname]);

  return (
    <div
      className="Navbar"
      style={{ background: navbarBackground ? "white" : "transparent" }}
    >
      <HashLink to="/#top" smooth>
        <Logo className="Logo" />
      </HashLink>
      <div className="NavButtons">
        <NavHashLink to="/#cellar" className={getClass("cellar")} smooth>
          Cellar
        </NavHashLink>
        <NavHashLink to="/#learn" className={getClass("learn")} smooth>
          Learn
        </NavHashLink>
        <NavHashLink to="/#about" className={getClass("about")} smooth>
          About
        </NavHashLink>
        <div className="RightButtons">
          <NavLink
            to="account"
            className={({ isActive, isPending }) =>
              "NavButton " + (isActive ? "Active" : isPending ? "Pending" : "")
            }
          >
            <AccountIcon fill="#CB002D" />
          </NavLink>
          <NavLink
            to="cart"
            className={({ isActive, isPending }) =>
              "NavButton " + (isActive ? "Active" : isPending ? "Pending" : "")
            }
          >
            <CartIcon fill="#CB002D" />
          </NavLink>
          <HashLink to="/#newsletter" smooth>
            <div className="SignupButton">Sign Up</div>
          </HashLink>
        </div>
      </div>
      <HashLink to="/#newsletter" smooth>
        <div className="SignupButton MobileButton">Sign Up</div>
      </HashLink>
      <div className="MenuButton MobileButton" />
    </div>
  );
};

export default Navbar;
