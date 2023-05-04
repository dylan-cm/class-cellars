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
          backgroundImage: `background: linear-gradient(180deg, rgba(238, 216, 216, 0) 77.08%, #EED8D8 94.79%), url(.jpg), url(https://images.unsplash.com/photo-1585318822327-319ef7d67fb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1675&q=80)`,
        }}
      >
        <div className="GradientLayer" />
      </div>
      <div className="HeroRight" style={{ backgroundImage: `url(${blobs})` }}>
        {/* //todo: blobs */}
        <div className="HeroRightContent">
          <h1>
            Experience a collection of wines so exclusive that you'll need to
            take an oath of secrecy.{" "}
          </h1>
          <h3>
            {
              "Classified Cellars offers an exquisite selection of rare wines that will complement your taste, expand your palate, and add a touch of exclusivity to your collection. "
            }
            <strong>Hand-selected by our covert sommeliers.</strong>
          </h3>
          <div className="CaptureWrapper">
            <h2>Gain access to our confidential wine reports.</h2>
            <EmailCapture />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
