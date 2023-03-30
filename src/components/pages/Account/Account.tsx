import React from "react";
import "./Account.css";

interface AccountProps {}

const Account = ({ ...props }: AccountProps) => {
  return (
    <div className="Account">
      <h1>Account</h1>
    </div>
  );
};

export default Account;
