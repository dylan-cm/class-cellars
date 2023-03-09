import React from "react";
import "./ActionButton.css";

interface ActionButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  success?: boolean;
  children?: React.ReactNode;
}

const ActionButton = ({ ...props }: ActionButtonProps) => {
  var className = "ActionButton";
  if (props.success) className += " Success";
  if (props.disabled) className += " Disabled";
  return (
    <div
      className={className}
      onClick={() => {
        return props.onClick && !props.disabled ? props.onClick() : undefined;
      }}
    >
      {props.children}
    </div>
  );
};

export default ActionButton;
