import React from "react";
import { NavHashLink } from "react-router-hash-link";
import { NavLink, useLocation } from "react-router-dom";
import "./NavButton.css";

interface NavButtonProps {
  label: string;
  link: string;
  hash?: boolean;
  center?: boolean;
}

const scrollWithOffset = (el: any) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = -360;
  window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
};

const NavButton = ({ ...props }: NavButtonProps) => {
  const location = useLocation();

  return props.hash ? (
    props.center ? (
      <NavHashLink
        to={`/#${props.link}`}
        className={
          "NavButton " + (location.hash.slice(1) === props.link ? "Active" : "")
        }
        smooth
        scroll={scrollWithOffset}
      >
        {props.label}
      </NavHashLink>
    ) : (
      <NavHashLink
        to={`/#${props.link}`}
        className={
          "NavButton " + (location.hash.slice(1) === props.link ? "Active" : "")
        }
        smooth
      >
        {props.label}
      </NavHashLink>
    )
  ) : (
    <NavLink
      to={`${props.link}`}
      className={({ isActive, isPending }) =>
        "NavButton " + (isActive ? "Active" : isPending ? "Pending" : "")
      }
    >
      {props.label}
    </NavLink>
  );
};

export default NavButton;
