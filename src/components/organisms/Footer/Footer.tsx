import React from "react";
import "./Footer.css";
import EmailCapture from "../../atoms/EmailCapture/EmailCapture";
import { HashLink } from "react-router-hash-link";
import Wave from "../../../assets/footer_layered_wave.svg";
import TopWave from "../../../assets/cta_wave_top.svg";
import BottomWave from "../../../assets/cta_wave_bottom.svg";
import Shh from "../../../assets/shh.jpg";

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
        <img className="Wave" src={Wave} alt="Footer" />
        <div className="FooterBackgroundColor" />
        <div className="ShhGradient" />
        <img className="Shh" src={Shh} alt="Secret" />
        <div className="FooterWrap">
          <ul className="Sitemap">
            <li>
              <a href="mailto:info@classifiedcellars.com">Contact Us</a>
            </li>
            <li>
              <HashLink to="/#about" smooth>
                About
              </HashLink>
            </li>
            <li>
              <HashLink to="/#newsletter" smooth>
                Home
              </HashLink>
            </li>
          </ul>
          {/* //TODO: <a href="">Legal Disclaimers</a> */}
          {/* //TODO:  socials */}
          <a className="Little" href="legal">
            Legal Disclaimers
          </a>
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
