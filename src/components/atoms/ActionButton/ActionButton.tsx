import React from "react";
import { Status } from "../../../constants";
import "./ActionButton.css";

interface ActionButtonProps {
  onClick?: () => void;
  status?: Status;
  children?: React.ReactNode;
  successMsg?: string;
}

const ActionButton = ({ ...props }: ActionButtonProps) => {
  const className = "ActionButton";
  switch (props.status) {
    case Status.Success:
      return (
        <div className={className + " Success"}>
          {/* <img className="SuccessIcon" alt="SuccessIcon" src="s" />
          //TODO: get SuccessIcon */}
          {props.successMsg || "Success"}
        </div>
      );
    case Status.Fail:
      return (
        <div className={className + " Fail"}>
          {/* <img className="FailIcon" alt="FailIcon" src="s" />
          //TODO: get FailIcon */}
          Failed
        </div>
      );
    case Status.Loading:
      return (
        <div className={className + " Loading"}>
          {/* <img className="Spinner" alt="spinner" src="s" />
          //TODO: get spinner */}
          ...Loading
        </div>
      );
    case Status.Disabled:
      return (
        <div className={className + " Disabled"} children={props.children} />
      );
    default:
      return (
        <div
          className={className}
          onClick={props.onClick}
          children={props.children}
        />
      );
  }
};

export default ActionButton;
