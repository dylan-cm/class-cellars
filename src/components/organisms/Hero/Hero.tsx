import React, { useEffect } from "react";
import "./Hero.css";
import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

interface HeroProps {}

const Hero = ({ ...props }: HeroProps) => {
  const focusInput = () => {
    const emailCaptureInput = document.getElementById("emailCaptureInputHero");
    if (emailCaptureInput) emailCaptureInput.focus();
  };

  const location = useLocation();
  useEffect(() => {
    if (location.hash === "#newsletter") {
      const emailCaptureInput = document.getElementById(
        "emailCaptureInputHero"
      );
      if (emailCaptureInput) emailCaptureInput.focus();
    }
  }, [location]);
  return (
    <div className="Hero">
      <div
        className="HeroBG"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80)`,
        }}
      >
        <div className="GradientLayer" />
      </div>
      <div className="HeroContent">
        <h1>
          Experience a collection of wines curated expressly for your reliance
          on their premium provenance.
        </h1>
        <h2>
          We invite you to sign up for our mailing list to assure your receiving
          our exclusive offers.
        </h2>
        <HashLink to="/#newsletter" smooth onClick={focusInput}>
          <div className="JoinButton">Get Insider Access</div>
        </HashLink>
      </div>
    </div>
  );
};

export default Hero;
