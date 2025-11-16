//Home page component
//Holds title and search bar

import React from "react";
import logo from "../Assets/logo.png";
import logoFlip from "../Assets/logo_flipped.png";
import { useNavigate } from "react-router-dom";
import "../pagesCSSfiles/Home.css";
import { useState } from "react";

function Home() {
  const navigate = useNavigate(); //this navigates between pages
  const [searchTerm, setSearchTerm] = useState(""); //holds search term

  // Function to handle the search button click and call the POST API
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Please enter a search query.");
      return;
    }

    try {
      // Navigate to the /markets page and pass the search term via state
      navigate("/markets", {
        state: { searchData: { query: searchTerm } }, //passes search term to eventPage
      });
    } catch (error) {
      alert("Failed to fetch search results from the server.");
      console.error(error);
    }
  };

  return (
    <div className="Home">
      <header className="Home-header">
        <h1 id="webtitle">Bets or Banter</h1>
        <h2>
          <i>"Bet" you didn't see that one coming?</i>
        </h2>
        <br></br>
        <img src={logo} alt="Logo" />
        <br></br>

        {/* Search Bar, which takes user input */}
        <input
          type="text"
          placeholder="Find a market..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch}>Search</button>

        <br></br>
        <br></br>
        <br></br>
        {/* bottom spacing */}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div id="mission">
          <img src={logoFlip} alt="Logo" />
          <div>
            <h4 style={{ color: "white" }}>Supporting Future Investors. One Bet At A Time.</h4>
            <p>
              Supporting future investors through smart betting practices
              matters because betting, when approached responsibly and
              analytically, can be a powerful way to teach real-world lessons
              about probability, risk management, and emotional discipline.
              These are the same skills that underpin successful long-term
              investing. Smart betting practices — such as understanding odds,
              setting clear limits, avoiding loss-chasing, and recognizing the
              role of chance — help people develop a grounded mindset around
              risk. Instead of relying on intuition or impulse, individuals
              learn to evaluate decisions based on data, expected outcomes, and
              long-term thinking.
            </p>
            <p>
              That's why we started <b>Bet or Banter</b>. One bet at a time, we
              are fostering a safe and responsible environment to learn the key
              principles of investing.
            </p>
          </div>
        </div>

        <br></br>
        <br></br>
        <br></br>
      </header>
    </div>
  );
}

export default Home;
