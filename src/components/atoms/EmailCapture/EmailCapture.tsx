import React, { useState } from "react";
import "./EmailCapture.css";
import { addCustomer } from "../../../functions/actions";
import { Status } from "../../../constants";
// import { shopifyApi, Session, ApiVersion } from "@shopify/shopify-api";

interface EmailCaptureProps {}

// const shopify = shopifyApi({
//   // The next 4 values are typically read from environment variables for added security
//   apiKey: "APIKeyFromPartnersDashboard",
//   apiSecretKey: "APISecretFromPartnersDashboard",
//   scopes: ["write_customers"],
//   hostName: "my-shop.myshopify.com",
//   apiVersion: ApiVersion.April23,
//   isEmbeddedApp: false,
//   isCustomStoreApp: true,
// });
// const session = shopify.session.customAppSession("my-shop.myshopify.com");
// shopify.auth()

// const client = new shopify.clients.Graphql({
//   session: {
//     id: "",
//     shop: "",
//     state: "",
//     isOnline: true,
//     isActive: () => true,
//     toObject: () => undefined,
//     equals: () => true,
//     toPropertyArray: (): [string, string | number | boolean][] => [],
//   },
// });
// const response = await client.query({ data: "{your_query}" });

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
