import React, { useState } from "react";
import BigProductCard from "../../molecules/BigProductCard/BigProductCard";
import "./CellarList.css";

interface CellarListProps {
  products: {
    id: string;
    title: string;
    thumbnail: string;
    year: string;
    price: number;
    shortDescription: string;
  }[];
}

const CellarList = ({ ...props }: CellarListProps) => {
  const [position, setPosition] = useState(0);
  const maxPosition = 9;
  const forward = () =>
    setPosition(position === maxPosition ? maxPosition : position + 1);
  const back = () => setPosition(position === 0 ? 0 : position - 1);
  return (
    <div className="CellarList">
      {/* <div className="LeftFade"></div> */}
      <div
        className="LeftArrow"
        onClick={back}
        style={{ opacity: position === 0 ? 0.5 : 1 }}
      />
      {props.products.map((product) => (
        <BigProductCard
          key={"listItem" + product.id}
          id={product.id}
          title={product.title}
          thumbnail={product.thumbnail}
          price={product.price}
          year={product.year}
          shortDescription={product.shortDescription}
        />
      ))}
      {/* <div className="RightFade"></div> */}
      <div
        className="RightArrow"
        onClick={forward}
        style={{ opacity: position === maxPosition ? 0.5 : 1 }}
      />
    </div>
  );
};

export default CellarList;
