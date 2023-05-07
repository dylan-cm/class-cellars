import React from "react";
import "./Footer.css";
import EmailCapture from "../../atoms/EmailCapture/EmailCapture";
import { HashLink } from "react-router-hash-link";
import Wave from "../../../assets/footer_layered_wave.svg";
import Shh from "../../../assets/shh.jpg";

interface FooterProps {}

const Footer = ({ ...props }: FooterProps) => {
  return (
    <div className="Footer">
      <img className="Wave" src={Wave} alt="Footer" />
      <div className="FooterBackgroundColor" />
      <div className="ShhGradient" />
      <img className="Shh" src={Shh} alt="Secret" />
      <div className="FooterWrap">
        <h2>Join the Classified Cellars Community</h2>
        <EmailCapture />
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
  );
};

export default Footer;
