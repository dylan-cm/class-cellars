import React from "react";
import "./Section.css";
import { pickTextColorBasedOnBgColorSimple } from "../../../functions/utilities";

interface SectionProps {
  children?: React.ReactNode;
  bgColor: string;
  bgImg?: string;
  id?: string;
}

const Section = ({ ...props }: SectionProps) => {
  const textColor = pickTextColorBasedOnBgColorSimple(
    props.bgColor,
    "#fff",
    "#000"
  );
  return (
    <div
      id={props.id}
      className="Section"
      style={{
        color: textColor,
        backgroundImage: `url(${props.bgImg})`,
        backgroundColor: props.bgColor,
      }}
    >
      <div className="ContentWrapper">{props.children}</div>
    </div>
  );
};

export default Section;
