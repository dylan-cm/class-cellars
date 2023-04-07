import React from "react";
// import React, { useEffect, useState } from "react";
// import News from "../../molecules/News/News";
// import CellarList from "../../organisms/CellarList/CellarList";
import Footer from "../../organisms/Footer/Footer";
import Hero from "../../organisms/Hero/Hero";
import "./Home.css";
import { Helmet } from "react-helmet-async";

// type ListedProduct = {
//   //TODO global product type
//   id: string;
//   title: string;
//   thumbnail: string;
//   price: number;
//   year: string;
//   shortDescription: string;
// };

const Home = () => {
  // const [listedProducts, setListedProducts] = useState<ListedProduct[]>([]);

  //TODO: link setListedProduct to shopify
  // useEffect(() => {
  //   setListedProducts([
  //     {
  //       id: "0001",
  //       title: "Dom Perignon",
  //       thumbnail:
  //         "https://media.bbr.com/s/bbr/20108000200-ms?img404=Default_Wine",
  //       price: 355.0,
  //       year: "2008",
  //       shortDescription:
  //         "Now this quiet courtyard, Sunday afternoon, this girl with a random collection of European furniture, as though Deane had once intended to use the place as his home. The tug Marcus Garvey, a steel drum nine meters long and two in diameter, creaked and shuddered as Maelcum punched for a California gambling cartel, then as a gliding cursor struck sparks from the Chinese program’s thrust, a worrying impression of solid fluidity, as though the shards of a broken mirror bent.",
  //     },
  //     {
  //       id: "0001",
  //       title: "Dom Perignon",
  //       thumbnail:
  //         "https://media.bbr.com/s/bbr/20108000200-ms?img404=Default_Wine",
  //       price: 355.0,
  //       year: "2008",
  //       shortDescription:
  //         "Now this quiet courtyard, Sunday afternoon, this girl with a random collection of European furniture, as though Deane had once intended to use the place as his home. The tug Marcus Garvey, a steel drum nine meters long and two in diameter, creaked and shuddered as Maelcum punched for a California gambling cartel, then as a gliding cursor struck sparks from the Chinese program’s thrust, a worrying impression of solid fluidity, as though the shards of a broken mirror bent.",
  //     },
  //     {
  //       id: "0001",
  //       title: "Dom Perignon",
  //       thumbnail:
  //         "https://media.bbr.com/s/bbr/20108000200-ms?img404=Default_Wine",
  //       price: 355.0,
  //       year: "2008",
  //       shortDescription:
  //         "Now this quiet courtyard, Sunday afternoon, this girl with a random collection of European furniture, as though Deane had once intended to use the place as his home. The tug Marcus Garvey, a steel drum nine meters long and two in diameter, creaked and shuddered as Maelcum punched for a California gambling cartel, then as a gliding cursor struck sparks from the Chinese program’s thrust, a worrying impression of solid fluidity, as though the shards of a broken mirror bent.",
  //     },
  //   ]);
  // }, []);

  return (
    <>
      <Helmet></Helmet>
      <div className="Home">
        <Hero />
        <Footer />
      </div>
    </>
  );
};

export default Home;
