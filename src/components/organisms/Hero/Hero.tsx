import React, { useEffect } from "react";
import "./Hero.css";
import { useLocation } from "react-router-dom";

interface HeroProps {}

const Hero = ({ ...props }: HeroProps) => {
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
      <div className="HeroContent">
        <h1>
          Experience a collection of wines curated expressly for your reliance
          on their premium provenance.
        </h1>
      </div>
    </div>
  );
};

export default Hero;
