import React, { useEffect, useState } from "react";
import Section from "../../atoms/Section/Section";
import News from "../../molecules/News/News";
import CellarList from "../../organisms/CellarList/CellarList";
import Footer from "../../organisms/Footer/Footer";
import "./Home.css";

type ListedProduct = {
  //TODO global product type
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  year: string;
  shortDescription: string;
};

const Home = () => {
  const [listedProducts, setListedProducts] = useState<ListedProduct[]>([]);

  //TODO: link setListedProduct to shopify
  useEffect(() => {
    setListedProducts([
      {
        id: "0001",
        title: "Dom Perignon",
        thumbnail:
          "https://media.bbr.com/s/bbr/20108000200-ms?img404=Default_Wine",
        price: 355.0,
        year: "2008",
        shortDescription:
          "Now this quiet courtyard, Sunday afternoon, this girl with a random collection of European furniture, as though Deane had once intended to use the place as his home. The tug Marcus Garvey, a steel drum nine meters long and two in diameter, creaked and shuddered as Maelcum punched for a California gambling cartel, then as a gliding cursor struck sparks from the Chinese program’s thrust, a worrying impression of solid fluidity, as though the shards of a broken mirror bent.",
      },
      {
        id: "0001",
        title: "Dom Perignon",
        thumbnail:
          "https://media.bbr.com/s/bbr/20108000200-ms?img404=Default_Wine",
        price: 355.0,
        year: "2008",
        shortDescription:
          "Now this quiet courtyard, Sunday afternoon, this girl with a random collection of European furniture, as though Deane had once intended to use the place as his home. The tug Marcus Garvey, a steel drum nine meters long and two in diameter, creaked and shuddered as Maelcum punched for a California gambling cartel, then as a gliding cursor struck sparks from the Chinese program’s thrust, a worrying impression of solid fluidity, as though the shards of a broken mirror bent.",
      },
      {
        id: "0001",
        title: "Dom Perignon",
        thumbnail:
          "https://media.bbr.com/s/bbr/20108000200-ms?img404=Default_Wine",
        price: 355.0,
        year: "2008",
        shortDescription:
          "Now this quiet courtyard, Sunday afternoon, this girl with a random collection of European furniture, as though Deane had once intended to use the place as his home. The tug Marcus Garvey, a steel drum nine meters long and two in diameter, creaked and shuddered as Maelcum punched for a California gambling cartel, then as a gliding cursor struck sparks from the Chinese program’s thrust, a worrying impression of solid fluidity, as though the shards of a broken mirror bent.",
      },
    ]);
  }, []);

  return (
    <div className="Home">
      <Section
        bgImg="https://images.unsplash.com/photo-1609238000857-303bf54099b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
        bgColor="#181818"
      >
        <div className="Hero">
          <h1>Welcome to Classified Cellars</h1>
          <h2>Wine so good you'll need a top-level security clearance.</h2>
        </div>
      </Section>
      <Section id="cellar-preview" bgColor="#ffffff">
        <div className="CellarPreview">
          <h2>Our Cellar</h2>
          <a href="v">View all</a>
          <CellarList products={listedProducts} />
        </div>
      </Section>
      <Section bgColor="#2c1919">
        <News id="newsletter" />
      </Section>
      <Section id="about" bgColor="#ffffff">
        <div className="About">
          <h2>About us</h2>
        </div>
      </Section>
      <Footer />
    </div>
  );
};

export default Home;
