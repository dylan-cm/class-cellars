import React, { useState } from "react";
import "./EmailCapture.css";
import { addCustomer } from "../../../functions/actions";
import { Status } from "../../../constants";

interface EmailCaptureProps {}

const EmailCapture = ({ ...props }: EmailCaptureProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>(Status.Enabled);
  const [emailError, setEmailError] = useState(false);

  const validateEmail = (email: string) => {
    const pattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!pattern.test(email)) {
      setEmailError(true);
      return false;
    }
    setEmailError(false);
    return true;
  };

  const handleSubmit = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault(); // prevent form default behavior (page reload)
    if (!validateEmail(email)) return;

    const resCode = await addCustomer(email);
    if (status === Status.Success || status === Status.Loading) return;
    setStatus(Status.Loading);
    setStatus(resCode === 200 ? Status.Success : Status.Fail);
    console.log(resCode);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="EmailCapture">
        {/* Wrap input and button in form element */}
        <input
          id="emailCaptureInputHero"
          className="EmailInput"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
          }}
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
      </form>
      {emailError && <div className="EmailError">Invalid email address.</div>}
    </>
  );
};

export default EmailCapture;
