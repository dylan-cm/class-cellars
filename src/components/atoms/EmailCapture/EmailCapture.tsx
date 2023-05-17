import React, { useState } from "react";
import "./EmailCapture.css";
import { addCustomer } from "../../../functions/actions";
import { Status } from "../../../constants";

interface EmailCaptureProps {}

const EmailCapture = ({ ...props }: EmailCaptureProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>(Status.Enabled);

  const handleSubmit = async () => {
    //todo: validateEmail(email)
    const resCode = await addCustomer(email);
    if (status === Status.Success || status === Status.Loading) return;
    setStatus(Status.Loading);
    setStatus(resCode === 200 ? Status.Success : Status.Fail);
    console.log(resCode);
  };

  return (
    <div className="EmailCapture">
      <input
        id="emailCaptureInputHero"
        className="EmailInput"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="JoinButton" onClick={handleSubmit}>
        Sign Up
      </div>
      <div
        className="SuccessNotification"
        style={{
          opacity:
            status === Status.Enabled || status === Status.Disabled ? 0 : 1,
          pointerEvents:
            status === Status.Enabled || status === Status.Disabled
              ? "none"
              : "auto",
        }}
      >
        {status === Status.Loading
          ? "...Signing Up"
          : status === Status.Fail
          ? "There's been an error. Try refreshing the page."
          : "Thank you for signing up! Classified wines incoming."}
      </div>
    </div>
  );
};

export default EmailCapture;
