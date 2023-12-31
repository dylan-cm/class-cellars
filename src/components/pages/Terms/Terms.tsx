import React from "react";
import "./Terms.css";
import { useNavigate } from "react-router-dom";

interface TermsProps {}

const Terms = ({ ...props }: TermsProps) => {
  const navigate = useNavigate();
  return (
    <div className="Terms">
      <h3>Shipping</h3>
      <p>
        <br />
        You must be 21 years or older to purchase alcoholic beverages from us.
        Signature of a person at least 21 years of age is required for all
        deliveries of alcoholic beverages.
        <br />
        <br />
        Shipping charges will be invoiced separately from wine charges to ensure
        accurate pricing based on weight as well as on the number of packages
        per order.
        <br />
        <br />
        We do not ship to PO Boxes.
        <br />
        <br />
        <br />
        <br />
      </p>
      <h3>Payment</h3>
      <p>
        <br />
        We accept Visa, Mastercard, and American Express. In order to set up a
        shipment we will need your billing address and shipping address. The
        billing address must match the credit card you use. In order to prevent
        fraudulent activity we may ask that you scan and email us a copy of your
        drivers license and credit card. We reserve the right to refuse to ship
        to any customer whom we deem to be engaging in fraudulent activity.
        <br />
        <br />
        <br />
        <br />
      </p>
      <button onClick={() => navigate("/cellar")}>Shop Now</button>
    </div>
  );
};

export default Terms;
