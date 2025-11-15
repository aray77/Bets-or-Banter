//TODO: Event page holds search results with brief description of markets. 
import React from 'react';
import { useNavigate } from "react-router-dom";
import '../pagesCSSfiles/Home.css';


function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>market page</h1>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
}

export default Home;