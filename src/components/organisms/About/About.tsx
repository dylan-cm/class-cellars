import React from "react";
import "./About.css";

import AboutImage from "../../../assets/about_image.jpg";
import Wave from "../../../assets/about-layered-wave.svg";

import Barrels from "../../../assets/barrels.svg";
import { HashLink } from "react-router-hash-link";

interface AboutProps {}

const About = ({ ...props }: AboutProps) => {
  const focusInput = () => {
    const emailCaptureInput = document.getElementById("emailCaptureInputHero");
    if (emailCaptureInput) emailCaptureInput.focus();
  };
  return (
    <div className="About">
      <div className="BarrelGradient" />
      <img className="Barrels" src={Barrels} alt="barrels" />
      <img className="Wave" src={Wave} alt="About" />
      <div className="AboutBackgroundColor" />
      <div className="AboutWrap">
        <div className="TopRow">
          <div className="Fun">
            <div
              className="AboutImage"
              style={{ backgroundImage: `url(${AboutImage})` }}
            >
              <h1 className="Title">
                Fine
                <br />
                wines,
              </h1>
              <h1 className="Title Refined">refined.</h1>
            </div>
          </div>
          <p className="Blurb">
            The mission of Classified Cellars is to offer only the finest
            bottles of the world's rarest wines. Before acquiring a bottle for
            our inventory we ask ourselves if this is a wine we predict will
            meet our buyer's highest expectations when it is opened for that
            special occasion.
            <br />
            <br />
            Our commitment to knowledge, experience, and ethics ensures full
            disclosure of provenance.
          </p>
        </div>
        <div className="JoinWrapper">
          <h2>We invite you to come explore our wines.</h2>
          <HashLink to="/#newsletter" smooth onClick={focusInput}>
            <div className="JoinButton">Get Insider Access</div>
          </HashLink>
        </div>
      </div>
    </div>
  );
};

export default About;
