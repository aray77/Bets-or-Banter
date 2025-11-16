import React from "react";
import "./marketBox.css";

function marketBox({ title, sub_title, onClick }) {
  return (
    <div className="marketBox" onClick={onClick}>
      <h2 id = "title">{title}</h2>
      <h3>Ends: {sub_title}</h3>
    </div>
  );
}

export default marketBox;
