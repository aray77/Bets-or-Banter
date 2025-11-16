import "../pagesCSSfiles/marketAnalysis.css";
import NavBar from "../components/navBar";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SingleMarket from "../components/singleMarket";

function MarketAnalysis() {
  const { id } = useParams();
  const location = useLocation();
  const { title, sub_title, event_ticker } = location.state || {};

  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [gotArticles, setGotArticles] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sentiment, setSentiment] = useState(null);
  const [geminiRaw, setGeminiRaw] = useState(null);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `http://localhost:8000/nyt/search?q=${encodeURIComponent(query)}`
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setArticles(data.response?.docs || []);
      setGotArticles(true);
    } catch (err) {
      console.error(err);
      setError("Failed to get articles");
    } finally {
      setLoading(false);
    }
  };

  const fetchGeminiRaw = async (ticker, nytQuery) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/eval/event_title_paragraph?ticker=${ticker}&nyt_query=${encodeURIComponent(
          nytQuery
        )}`
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setGeminiRaw(data.gemini_raw || data);
    } catch (err) {
      console.error("Gemini fetch error:", err);
    }
  };

  // When title arrives from navigation, set the NYT query
  useEffect(() => {
    if (title) {
      setQuery(title);
    }
  }, [title]);

  // Fetch NYT articles whenever the query changes
  useEffect(() => {
    if (query.trim() !== "") {
      fetchArticles();

      // Fetch Gemini using event_ticker + query
      if (event_ticker) {
        fetchGeminiRaw(event_ticker, query);
      }
    }
  }, [query]);

  return (
    <>
      <NavBar />
      <div className="MarketAnalysis">
        <h1>Analytics for:</h1>

        <div id="displayMarket">
          <SingleMarket
            title={title ?? id}
            sub_title={sub_title ?? ""}
            query={query}
            articles={articles}
            loading={loading}
            error={error}
            geminiRaw={geminiRaw} 
          />
        </div>
      </div>
    </>
  );
}

export default MarketAnalysis;
