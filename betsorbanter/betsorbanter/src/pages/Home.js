//Home page component
//Holds title and search bar

import React from "react";
import { useNavigate } from "react-router-dom";
import "../pagesCSSfiles/Home.css";
import { useState, useEffect } from "react";

function Home() {
  const navigate = useNavigate(); //this naviagtes between pages

  const [searchTerm, setSearchTerm] = useState(""); //holds search term
  const [pythonMessage, setPythonMessage] = useState(
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
  }, []);

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
        <h1> Bets or Banter </h1>
        <h3 style={{ color: "red" }}>{pythonMessage}</h3>{" "}
        {/*  connection status, for testing purposes */}
        <h2>
          <i>"Bet" you didn't see that one coming?</i>
        </h2>
        {/* Search Bar, which takes user input */}
        <input
          type="text"
          placeholder="Search for events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch}>Search</button>
      </header>
    </div>
  );
}

export default Home;
