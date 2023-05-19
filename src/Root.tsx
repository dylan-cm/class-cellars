import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/organisms/Navbar/Navbar";
import SideMenu from "./components/organisms/SideMenu/SideMenu";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./App.css";

interface RootProps {}

const Root = ({ ...props }: RootProps) => {
  const [showSideMenu, setShowSideMenu] = useState(false);

  const handleSideMenu = () => {
    setShowSideMenu(!showSideMenu);
  };
  return (
    <HelmetProvider>
      <Helmet>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@400;700&family=Lilita+One&family=Roboto+Condensed:wght@400;700&family=Fugaz+One&display=swap');
        </style>
      </Helmet>
      <div className="Root">
        <SideMenu handleSideMenu={handleSideMenu} showSideMenu={showSideMenu} />
        <div className={showSideMenu ? "App Blurred" : "App"}>
          <Navbar handleSideMenu={handleSideMenu} />
          <Outlet />
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Root;
