import React from "react";
import "./marketBox.css";

function marketBox({ title, sub_title }) {
  return (
    <div className="marketBox">
      <h2 id = "title">{title}</h2>
      <h3>Ends: {sub_title}</h3>
    </div>
  );
}

export default marketBox;
