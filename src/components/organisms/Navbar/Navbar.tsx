import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HashLink, NavHashLink } from "react-router-hash-link";

import { ReactComponent as Logo } from "../../../assets/Logo - Light.svg";

import "./Navbar.css";

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
        <HashLink to="/#newsletter" smooth onClick={focusInput}>
          <div className="JoinButton">Join</div>
        </HashLink>
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
