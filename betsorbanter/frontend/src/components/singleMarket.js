import React from "react";
import "./singleMarket.css";

function SingleMarket({ title, sub_title, query, articles, loading, error }) {
  return (
    <div className="singleMarket">
      <h1
        style={{ color: "red", cursor: "pointer" }}
        onClick={() => window.history.back()}
      >
        X
      </h1>
      <h2 id="title">{title}</h2>
      <h3>Ends: {sub_title}</h3>
      <h4 style={{ color: "black" }}>Sample Statistic 1</h4>
      <h4 style={{ color: "black" }}>Sample Statistic 2</h4>
      <h4 style={{ color: "black" }}>Sample Statistic 3</h4>

      <div>
        <h3>Learn more about related news:</h3>

        {loading && <p>Loading articles...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="articles">
          {articles.length > 0
            ? articles.map((a, index) => (
                <div key={index} className="article">
                  {a.web_url && (
                    <a href={a.web_url}>
                      <h4 style={{ fontSize: "14px" }}>{a.headline?.main}</h4>
                    </a>
                  )}
                </div>
              ))
            : !loading && <p>No articles found.</p>}
        </div>
      </div>
    </div>
  );
}

export default SingleMarket;
