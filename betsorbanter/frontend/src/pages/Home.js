//Home page component
//Holds title and search bar

import React from "react";
import logo from "../Assets/logo.png";
import logoFlip from "../Assets/logo_flipped.png";
import { useNavigate } from "react-router-dom";
import "../pagesCSSfiles/Home.css";
import { useState, useEffect } from "react";

function Home() {
  const navigate = useNavigate(); //this naviagtes between pages

  const [searchTerm, setSearchTerm] = useState(""); //holds search term

  /*const [pythonMessage, setPythonMessage] = useState(
    "Checking connection status..."
  ); //terms for connection, can be deleted later

  // Function to fetch connection status from Python backend
  const fetchPythonMessage = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/test_message"); //this connects to mainTest.py in backend
      const data = await response.json();
      setPythonMessage(`Backend Status: ${data.message}`); //tells connection is good, check mainTest.py for more info
    } catch (error) {
      setPythonMessage("Backend Status: Error connecting to Python server");
    }
  };
  

  //connection test
  useEffect(() => {
    fetchPythonMessage();
  }, []);*/

  // Function to handle the search button click and call the POST API, will need to access
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Please enter a search query.");
      return;
    }

    try {
      // Send the search term to the Python POST endpoint
      const response = await fetch("http://127.0.0.1:8000/api/search_events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchTerm }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Navigate to the /markets page and pass the results via state
      navigate("/markets", {
        state: { searchData: { query: searchTerm } }, //passes search term to eventPage
      });
    } catch (error) {
      alert("Failed to fetch search results from the server.");
    }
  };

  return (
    <div className="Home">
      <header className="Home-header">
        <h1 id="webtitle"> Bets or Banter </h1>
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

        {/* <h3 style={{ color: "red" }}>{pythonMessage}</h3>{" "} connection status, uncomment for testing purposes */}

        <br></br>
        <br></br>
        <br></br>
        {/* bad coding practice. */}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div id="mission">
          <img src={logoFlip} alt="Logo" />
          <div>
            <h4>Supporting Future Investors. One Bet At A Time.</h4>
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
