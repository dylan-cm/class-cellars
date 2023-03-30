import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HashLink, NavHashLink } from "react-router-hash-link";

import { ReactComponent as Logo } from "../../../assets/Logo - Light.svg";
import { ReactComponent as AccountIcon } from "../../../assets/accountIcon.svg";
import { ReactComponent as CartIcon } from "../../../assets/cartIcon.svg";
import "./Navbar.css";

interface NavbarProps {}

const Navbar = ({ ...props }: NavbarProps) => {
  const [navbarBackground, setNavbarBackground] = useState(false);
  const location = useLocation();
  const getHashClass = (label: string) =>
    "NavButton " + (location.hash.slice(1) === label ? "Active" : "");
  const getLinkClass = (label: string) => {
    return (
      "NavButton " + (location.pathname.slice(1) === label ? "Active" : "")
    );
  };

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
        <NavHashLink to="/#cellar" className={getHashClass("cellar")} smooth>
          Cellar
        </NavHashLink>
        <NavHashLink to="/#learn" className={getHashClass("learn")} smooth>
          Learn
        </NavHashLink>
        <NavHashLink to="/#about" className={getHashClass("about")} smooth>
          About
        </NavHashLink>
        <div className="RightButtons">
          <NavHashLink to="account" className={getLinkClass("account")}>
            <AccountIcon />
          </NavHashLink>
          <NavHashLink to="cart" className={getLinkClass("cart")}>
            <CartIcon />
          </NavHashLink>
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
