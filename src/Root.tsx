import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/organisms/Navbar/Navbar";
import SideMenu from "./components/organisms/SideMenu/SideMenu";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./App.css";
import { CartProvider } from "./functions/contextProviders";

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
          url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,400;0,500;0,700;0,900;1,600;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,400;1,900&display=swap');
        </style>
      </Helmet>
      <CartProvider>
        <div className="Root">
          <SideMenu
            handleSideMenu={handleSideMenu}
            showSideMenu={showSideMenu}
          />
          <div className={showSideMenu ? "App Blurred" : "App"}>
            <Navbar handleSideMenu={handleSideMenu} />
            <Outlet />
          </div>
        </div>
      </CartProvider>
    </HelmetProvider>
  );
};

export default Root;
