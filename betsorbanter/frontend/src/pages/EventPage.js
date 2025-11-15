import React from "react";
import { useLocation } from "react-router-dom";
import "../pagesCSSfiles/EventPage.css";
import NavBar from "../components/navBar";

function EventPage() {
  const location = useLocation();

  const passedData = location.state?.searchData || {}; //passes query
  const query = passedData.query; //uses query field of searchData

  return (
    <div className="EventPage">
      <NavBar />
      <div className="Markets">
        <h1 style = {{ margin: "20px", fontSize: "2.5rem" }}> <b>Markets for: </b> "{query}"</h1>
      </div>
    </div>
  );
}

export default EventPage;
