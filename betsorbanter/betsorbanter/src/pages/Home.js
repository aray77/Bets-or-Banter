//Home page component
//Holds title and search bar


import React from 'react';
import { useNavigate } from "react-router-dom";
import '../pagesCSSfiles/Home.css';



function Home() {
  const navigate = useNavigate();
  return (
    <div className="Home">
      <header className="Home-header">
        <h1> Bets or Banter </h1>
        <h2><i>"Bet" you didn't see that one coming?</i></h2>
        <input type="text" placeholder="Search for events..." />
        <button onClick={() => navigate("/markets")}>Search</button>
      </header>
    </div>
  );
}

export default Home;
