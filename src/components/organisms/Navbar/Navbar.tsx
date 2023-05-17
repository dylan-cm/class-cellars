import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HashLink, NavHashLink } from "react-router-hash-link";

import { ReactComponent as Logo } from "../../../assets/Logo - Light.svg";

import "./Navbar.css";

interface NavbarProps {}

const Navbar = ({ ...props }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  const location = useLocation();
  // const getHashClass = (label: string) =>
  //   "NavButton " + (location.hash.slice(1) === label ? "Active" : "");
  // const getLinkClass = (label: string) => {
  //   return (
  //     "NavButton " + (location.pathname.slice(1) === label ? "Active" : "")
  //   );
  // };
  const isSticky = () =>
    location.pathname !== "/" || menuOpen ? " Sticky" : "";
  const scrolled = scrollPosition > 76 ? " Scrolled" : "";
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
        <div className={"NavbarBackground" + scrolled} />
        <HashLink to="/#top" smooth onClick={() => setMenuOpen(false)}>
          <Logo className={"Logo" + (menuOpen ? " LightLogo" : "")} />
        </HashLink>
        <NavHashLink to={"/products"}>Cellar</NavHashLink>
        <HashLink to="/#newsletter" smooth onClick={focusInput}>
          <div className="JoinButton">Join</div>
        </HashLink>
      </nav>
    </>
  );
};

export default Navbar;
