import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../pagesCSSfiles/EventPage.css";

function EventPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const passedData = location.state?.searchData || {}; //passes query
  const query = passedData.query; //uses query field of searchData

  return (
    <div className="Markets">
      <h1>Markets for: "{query}"</h1>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
}

export default EventPage;
