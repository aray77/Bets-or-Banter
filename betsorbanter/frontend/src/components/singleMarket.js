import React from "react";
import "./singleMarket.css";

function SingleMarket({ title, sub_title }) {
  return (
    <div className="singleMarket">
      <h1 style={{ color: "red", cursor: "pointer" }} onClick={() => window.history.back()}>X</h1>
      <h2 id="title">{title}</h2>
      <h3>Ends: {sub_title}</h3>
      <h4 style={{ color: "black" }}>Sample Statistic 1</h4>
      <h4 style={{ color: "black" }}>Sample Statistic 1</h4>
      <h4 style={{ color: "black" }}>Sample Statistic 1</h4>
    </div>
  );
}

export default SingleMarket;
