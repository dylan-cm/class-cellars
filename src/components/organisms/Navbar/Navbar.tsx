import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HashLink, NavHashLink } from "react-router-hash-link";

import { ReactComponent as Logo } from "../../../assets/Logo - Light.svg";
import { ReactComponent as AccountIcon } from "../../../assets/accountIcon.svg";
import { ReactComponent as CartIcon } from "../../../assets/cartIcon.svg";
import { ReactComponent as AboutIcon } from "../../../assets/aboutIcon.svg";
import { ReactComponent as LearnIcon } from "../../../assets/learnIcon.svg";
import { ReactComponent as CellarIcon } from "../../../assets/cellarIcon.svg";
import { ReactComponent as OpenIcon } from "../../../assets/hamburgerIcon.svg";
import { ReactComponent as CloseIcon } from "../../../assets/exitIcon.svg";

import "./Navbar.css";

interface NavbarProps {}

const Navbar = ({ ...props }: NavbarProps) => {
  const [navbarBackground, setNavbarBackground] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const getHashClass = (label: string) =>
    "NavButton " + (location.hash.slice(1) === label ? "Active" : "");
  const getLinkClass = (label: string) => {
    return (
      "NavButton " + (location.pathname.slice(1) === label ? "Active" : "")
    );
  };
  const isSticky = () =>
    location.pathname !== "/" || menuOpen ? " Sticky" : "";

  useEffect(() => {
    if (location.pathname !== "/") setNavbarBackground(true);
    else {
      setNavbarBackground(false);
      document.addEventListener("scroll", () => {
        if (window.scrollY > 24) setNavbarBackground(true);
        else setNavbarBackground(false);
      });
    }
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <>
      <nav
        className={
          "Navbar" +
          isSticky() +
          (menuOpen ? " MenuNavBackground" : "") +
          (navbarBackground || menuOpen ? "" : " NoNavBackground")
        }
      >
        <HashLink to="/#top" smooth onClick={() => setMenuOpen(false)}>
          <Logo className={"Logo" + (menuOpen ? " LightLogo" : "")} />
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
        <HashLink
          to="/#newsletter"
          smooth
          onClick={() => setMenuOpen(false)}
          className="Mobile"
        >
          <div className={"SignupButton" + (menuOpen ? " LightSignup" : "")}>
            Sign Up
          </div>
        </HashLink>
        <div
          className={
            "MenuOpenButton Mobile" + (!menuOpen ? " Visible" : " Invisible")
          }
          onClick={() => setMenuOpen(true)}
        >
          <OpenIcon />
        </div>
        <div
          className={
            "MenuCloseButton Mobile" + (menuOpen ? " Visible" : " Invisible")
          }
          onClick={() => setMenuOpen(false)}
        >
          <CloseIcon />
        </div>
      </nav>
      <div
        className={"Menu Mobile"}
        style={{ display: menuOpen ? "flex" : "none" }}
      >
        <NavHashLink
          to="/#cellar"
          className={"MenuLink " + getHashClass("cellar")}
          onClick={() => setMenuOpen(false)}
        >
          <CellarIcon /> Cellar
        </NavHashLink>
        <NavHashLink
          to="/#learn"
          className={"MenuLink " + getHashClass("learn")}
          onClick={() => setMenuOpen(false)}
        >
          <LearnIcon /> Learn
        </NavHashLink>
        <NavHashLink
          to="/#about"
          className={"MenuLink " + getHashClass("about")}
          onClick={() => setMenuOpen(false)}
        >
          <AboutIcon /> About
        </NavHashLink>
        <NavHashLink
          to="account"
          className={"MenuLink " + getLinkClass("account")}
          onClick={() => setMenuOpen(false)}
        >
          <AccountIcon /> Account
        </NavHashLink>
        <NavHashLink
          to="cart"
          className={"MenuLink " + getLinkClass("cart")}
          onClick={() => setMenuOpen(false)}
        >
          <CartIcon /> Cart
        </NavHashLink>
      </div>
    </>
  );
};

export default Navbar;
