import React from "react";
import { useRouteError } from "react-router-dom";

import "./ErrPage.css";

interface ErrPageProps {}

const ErrPage = ({ ...props }: ErrPageProps) => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="ErrPage">
      <h1>Something has gone wrong.</h1>
      <h2>Try again later.</h2>
      <h3>{error?.status}</h3>
      <p>{error?.data}</p>
    </div>
  );
};

export default ErrPage;
