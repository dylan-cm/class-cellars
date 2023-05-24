import React from "react";
import "./NotFound.css";

const NotFound = () => (
  <div className="NotFound">
    <div className="NotFoundContent">
      <h1>404</h1>
      <img
        src="https://media4.giphy.com/media/xYLZSq6wQBrRC/giphy.gif?cid=ecf05e47ih0p9bpel54yvxmsfsrqfge8ivdaxcx6ytzbrxzv&ep=v1_gifs_search&rid=giphy.gif&ct=g"
        alt="lost"
      />
      <h2>Oops, it looks like you got lost in our cellar!</h2>
      <p>
        We're unable to find the page you're looking for. It may have been
        moved, or it doesn't exist. Try checking the URL, or go back to the
        cellar.
      </p>
      <button onClick={() => window.history.back()}>Return to Cellar</button>
    </div>
  </div>
);

export default NotFound;
