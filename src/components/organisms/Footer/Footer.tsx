import React from "react";
import "./Footer.css";
import EmailCapture from "../../atoms/EmailCapture/EmailCapture";
// import { HashLink } from "react-router-hash-link";
import TopWave from "../../../assets/cta_wave_top.svg";
import BottomWave from "../../../assets/cta_wave_bottom.svg";
import { NavLink } from "react-router-dom";

interface FooterProps {}

const Footer = ({ ...props }: FooterProps) => {
  return (
    <>
      <div className="SignUpCTA">
        <img className="CTAWave" src={TopWave} alt="Email Signup" />
        <div className="CTAForm">
          <h2>Come explore our fine wines!</h2>
          <h3>Join the Classified Cellars Community today.</h3>
          <EmailCapture />
          <h6>
            *You can unsubscribe at any time and we will never sell your data.
          </h6>
        </div>
        <img className="CTAWave" src={BottomWave} alt="Email Signup" />
      </div>
      <div className="Footer">
        <div className="FooterBackgroundColor" />
        <div className="FooterWrap">
          <ul className="Sitemap">
            <li>
              <a href="mailto:info@classifiedcellars.com">Contact Us</a>
            </li>
            <li>
              <NavLink to={"terms"}>Payments & Shipping</NavLink>
            </li>
          </ul>
          <span className="Little">
            © 2023 Classified Cellars. All Rights Reserved.
          </span>
          <span>Made with ❤️ by DMC in sunny Oakland, CA</span>
        </div>
      </div>
    </>
  );
};

export default Footer;
