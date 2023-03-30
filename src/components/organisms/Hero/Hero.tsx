import React, { useState } from "react";
import "./Hero.css";
import blobs from "../../../assets/blobs.png";
import { submitEmail } from "../../../functions/actions";

interface HeroProps {}

const Hero = ({ ...props }: HeroProps) => {
  const [email, setEmail] = useState("");

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
          <div className="EmailCapture">
            <input
              className="EmailInput"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="HeroJoinButton" onClick={() => submitEmail(email)}>
              Join
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
