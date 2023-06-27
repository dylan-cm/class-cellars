import React from "react";
import "./GridLoading.css";

interface GridLoadingProps {}

const GridLoading = ({ ...props }: GridLoadingProps) => {
  return (
    <div className="GridLoading">
      {Array.from({ length: 18 }, (_) => (
        <div className="Card">
          <div className="Image" />
          <div className="Divider" />
          <div className="Title" />
          <div className="GreyLine" />
          <div className="Row">
            <div className="RedLine" />
            <div className="RedLine" />
          </div>
          <div className="Row">
            <div className="GreyLine" />
            <div className="GreyLine" />
          </div>
          <div className="Button" />
        </div>
      ))}
    </div>
  );
};

export default GridLoading;
