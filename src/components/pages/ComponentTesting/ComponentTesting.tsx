import React, { useState } from "react";
import BigProductCard from "../../molecules/BigProductCard/BigProductCard";
import Hero from "../../organisms/Hero/Hero";
import "./ComponentTesting.css";

interface ComponentTestingProps {}

const ComponentTesting = ({ ...props }: ComponentTestingProps) => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div
      className="ComponentTesting"
      style={{ backgroundColor: darkMode ? "#111" : "#fff" }}
    >
      {/* <div
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          padding: "4px",
          backgroundColor: "#999",
          cursor: "pointer",
        }}
      >
        {darkMode ? "dark" : "light"}
      </div> */}

      <Hero />

      {/* <BigProductCard
        id="0001"
        title="Dom Perignon"
        thumbnail="https://media.bbr.com/s/bbr/20108000200-ms?img404=Default_Wine"
        price={355.0}
        year="2008"
        shortDescription="Now this quiet courtyard, Sunday afternoon, this girl with a random collection of European furniture, as though Deane had once intended to use the place as his home. The tug Marcus Garvey, a steel drum nine meters long and two in diameter, creaked and shuddered as Maelcum punched for a California gambling cartel, then as a gliding cursor struck sparks from the Chinese program’s thrust, a worrying impression of solid fluidity, as though the shards of a broken mirror bent."
      /> */}
    </div>
  );
};

export default ComponentTesting;
