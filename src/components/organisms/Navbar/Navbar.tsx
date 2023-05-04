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
import EmailCapture from "../../atoms/EmailCapture/EmailCapture";

interface NavbarProps {}

const Navbar = ({ ...props }: NavbarProps) => {
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
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const focusInput = () => {
    const emailCaptureInput = document.getElementById("emailCaptureInputHero");
    if (emailCaptureInput) emailCaptureInput.focus();
  };

  return (
    <>
      <nav
        className={
          "Navbar" + isSticky() + (menuOpen ? " MenuNavBackground" : "")
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
            <HashLink to="/#newsletter" smooth onClick={focusInput}>
              <div className="JoinButton">Join</div>
            </HashLink>
          </div>
        </div>
        <HashLink
          to="/#newsletter"
          smooth
          onClick={() => {
            setMenuOpen(false);
            focusInput();
          }}
          className="Mobile"
        >
          <div className={"JoinButton" + (menuOpen ? " LightJoin" : "")}>
            Join
          </div>
        </HashLink>
      </nav>
    </>
  );
};

export default Navbar;
