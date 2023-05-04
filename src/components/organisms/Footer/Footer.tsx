import React from "react";
import "./Footer.css";
import EmailCapture from "../../atoms/EmailCapture/EmailCapture";
import { HashLink } from "react-router-hash-link";

interface FooterProps {}

const Footer = ({ ...props }: FooterProps) => {
  return (
    <div className="Footer">
      <p>
        Are you a wine enthusiast with a discerning taste, a vision for an
        exceptional cellar, and a thirst for new experiences?
      </p>
      <h2>Receive insider intel on rare wines.</h2>
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
  );
};

export default Footer;
