import React, { useState } from "react";
import "./EmailCapture.css";
import { submitEmail } from "../../../functions/actions";
import { Status } from "../../../constants";

interface EmailCaptureProps {}

const EmailCapture = ({ ...props }: EmailCaptureProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>(Status.Enabled);

  const handleSubmit = () => {
    //todo: validateEmail(email)
    submitEmail(email);
    if (status === Status.Success || status === Status.Loading) return;
    alert(email);
    setStatus(Status.Loading);
    //TODO: const res = await sendToShopify(email)
    const resCode = "200";
    setStatus(resCode === "200" ? Status.Success : Status.Fail);
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
        Join
      </div>
    </div>
  );
};

export default EmailCapture;
