import React, { useEffect } from "react";
import "./Hero.css";
import blobs from "../../../assets/blobs.png";
import EmailCapture from "../../atoms/EmailCapture/EmailCapture";
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
      <div
        className="HeroLeft"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1632990964656-32cb3e921600?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80")`,
        }}
      />
      <div className="HeroRight" style={{ backgroundImage: `url(${blobs})` }}>
        {/* //todo: blobs */}
        <div className="HeroRightContent">
          <h1>
            A collection of wine so exclusive, you'll need to swear to secrecy.
          </h1>
          <h3>
            At Classified Cellars we bring you a selection of rare Burgundy
            wines that will compliment your style, expand your palette and add a
            new flair to your collection. Join our Newsletter today to be the
            first to know what's coming.
          </h3>
          <EmailCapture />
        </div>
      </div>
    </div>
  );
};

export default Hero;
