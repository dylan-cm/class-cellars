import React from "react";
import Paper from "../../atoms/Paper/Paper";
import "./BigProductCard.css";

import ActionButton from "../../atoms/ActionButton/ActionButton";

import { addToCart } from "../../../functions/actions";
import { displayPrice } from "../../../functions/localization";

//TODO: get types from shopify
interface BigProductCardProps {
  imgURL: string;
  title: string;
  shortDescription: string;
  productID: string;
  price: number;
  year: string;
}

const BigProductCard: React.FC<BigProductCardProps> = ({ ...props }) => {
  return (
    <div className="BigProductCard" id={"BigProductCard-" + props.productID}>
      <Paper>
        <div className="LayoutContentWrapper">
          <img className="ProductImg" src={props.imgURL} alt="productImage" />
          <div className="LayoutDetails">
            <h4>{props.title}</h4>
            <div className="Row">
              <h6>{props.year}</h6>
              <h5 className="Price">{displayPrice(props.price)}</h5>
            </div>
            <div className="ShortDescriptionWrapper">
              <div className="ShortDescription">{props.shortDescription}</div>
              <div className="More">More</div>
            </div>
          </div>
          <div className="Row Actions">
            <ActionButton onClick={() => addToCart(props.productID)}>
              Add to Cart
            </ActionButton>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default BigProductCard;
