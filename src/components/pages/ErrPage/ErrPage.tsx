import React from "react";
import { useRouteError } from "react-router-dom";

import "./ErrPage.css";

interface ErrPageProps {}

const ErrPage = ({ ...props }: ErrPageProps) => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="ErrPage">
      <h1>{error?.status || "404"}</h1>
      <p>{error?.data}</p>
    </div>
  );
};

export default ErrPage;
