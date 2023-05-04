import React from "react";
import Footer from "../../organisms/Footer/Footer";
import Hero from "../../organisms/Hero/Hero";
import "./Home.css";
import { Helmet } from "react-helmet-async";
import About from "../../organisms/About/About";

const Home = () => {
  return (
    <>
      <Helmet></Helmet>
      <div className="Home">
        <Hero />
        <About />
        <Footer />
      </div>
    </>
  );
};

export default Home;
