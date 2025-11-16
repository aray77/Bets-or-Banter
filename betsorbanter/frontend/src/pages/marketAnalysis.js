import "../pagesCSSfiles/marketAnalysis.css";
import NavBar from "../components/navBar";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SingleMarket from "../components/singleMarket";

function MarketAnalysis() {
  const { id } = useParams();
  const location = useLocation();
  const { title, sub_title } = location.state || {};

  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [gotArticles, setGotArticles] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    if (title) {
      setQuery(title);
    }
  }, [title]);

  useEffect(() => {
    if (query.trim() !== "") {
      fetchArticles();
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
          />
        </div>
      </div>
    </>
  );
}

export default MarketAnalysis;
