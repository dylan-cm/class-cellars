import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/organisms/Navbar/Navbar";
// import "./Root.css";

interface RootProps {}

const Root = ({ ...props }: RootProps) => {
  return (
    <div className="Root">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Root;
