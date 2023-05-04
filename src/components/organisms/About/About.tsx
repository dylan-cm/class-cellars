import React from "react";
import "./About.css";

interface AboutProps {}

const About = ({ ...props }: AboutProps) => {
  return (
    <div className="About">
      <div className="Fun">
        {/* <img src="someunsplashimgofbarrels" alt=""/> */}
        <div className="PlaceholderImg">
          <h1 className="Title">
            Rare
            <br />
            wines,
          </h1>
          <h1 className="Title Refined">refined.</h1>
        </div>
      </div>
      <p className="Blurb">
        The mission of Classified Cellars is to offer only the finest bottles of
        the world’s rarest wines. Before acquiring a bottle for our inventory we
        ask ourselves if this is a wine we predict will exceed our buyer’s
        expectations when it is opened for that special occasion.
        <br />
        <br />
        Our commitment to knowledge, experience, and ethics ensures full
        disclosure of provenance, giving clients confidence in each bottle's
        authenticity.
      </p>
      <div className="JoinWrapper">
        <h2>
          Come explore our secret wine cellar and discover the world's most
          exclusive wines.
        </h2>
        <div className="JoinButton">Get Insider Access</div>
      </div>
    </div>
  );
};

export default About;
