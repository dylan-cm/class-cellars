import React, { useState } from "react";
import "./News.css";
import ActionButton from "../../atoms/ActionButton/ActionButton";
import { Status } from "../../../constants";

interface NewsProps {}

const News = ({ ...props }: NewsProps) => {
  const [email, setEmail] = useState("");
  const [submit, setSubmit] = useState<Status>(Status.Enabled);

  const handleNewsletterSignup = async () => {
    if (submit === Status.Success || submit === Status.Loading) return;
    alert(email);
    setSubmit(Status.Loading);
    //TODO: const res = await submitToSpotify(email)
    const resCode = "200";
    setSubmit(resCode === "200" ? Status.Success : Status.Fail);
  };

  const validEmail = (email: string) => true; //TODO: email validation

  return (
    <div className="News">
      <h2>Join Our Newsletter</h2>
      {submit === Status.Success ? (
        <h2>Thank You!</h2>
      ) : (
        <input
          type="email"
          value={email}
          onChange={(e) =>
            submit === Status.Enabled && setEmail(e.target.value)
          }
          placeholder="email@example.com"
        />
      )}
      <ActionButton
        onClick={handleNewsletterSignup}
        status={validEmail(email) ? submit : Status.Disabled}
      >
        Sign Up
      </ActionButton>
    </div>
  );
};

export default News;
