import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/organisms/Navbar/Navbar";
import { Helmet, HelmetProvider } from "react-helmet-async";

interface RootProps {}

const Root = ({ ...props }: RootProps) => {
  return (
    <HelmetProvider>
      <Helmet>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@400;700&family=Lilita+One&family=Roboto+Condensed:wght@400;700&family=Fugaz+One&display=swap');
        </style>
      </Helmet>
      <div className="Root">
        <Navbar />
        <Outlet />
      </div>
    </HelmetProvider>
  );
};

export default Root;
