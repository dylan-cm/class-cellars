import React from "react";
import "./Paper.css";

interface PaperProps {
  children?: React.ReactNode;
}

const Paper: React.FC<PaperProps> = ({ ...props }) => {
  return <div className="Paper">{props.children}</div>;
};

export default Paper;
