import React from "react";
import "./NavButton.css";

interface NavButtonProps {
  label: string;
}

const NavButton = ({ ...props }: NavButtonProps) => {
  return <div className="NavButton">{props.label}</div>;
};

export default NavButton;
