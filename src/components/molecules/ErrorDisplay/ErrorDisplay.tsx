import React from "react";
import { useNavigate } from "react-router-dom";

export const ErrorDisplay = ({ message }: { message: string }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "red" }}>An error has occurred!</h1>
      <p>{message}</p>
      <p>Please try again later.</p>
      <div className="ShopNow" onClick={() => navigate(-1)}>
        Back
      </div>
    </div>
  );
};

export default ErrorDisplay;
