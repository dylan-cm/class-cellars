import React, { useState } from "react";
import "./EmailCapture.css";
import { submitEmail } from "../../../functions/actions";
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
    // const response = await shopify.clients.Graphql();
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
        Sign Up
      </div>
    </div>
  );
};

export default EmailCapture;
