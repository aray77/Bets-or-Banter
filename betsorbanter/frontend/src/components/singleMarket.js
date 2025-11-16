import React from "react";
import "./singleMarket.css";

function SingleMarket({
  title,
  sub_title,
  query,
  articles,
  loading,
  error,
  geminiRaw,
}) {
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
      <div className="gemini-section">
        <h3>AI Summary (Gemini Raw):</h3>

        {loading ? (
          <p style={{ color: "black", fontStyle: "italic" }}>
            Loading AI summary...
          </p>
        ) : geminiRaw !== null && geminiRaw !== undefined ? (
          <pre
            style={{
              color: "black",
              overflowY: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            {typeof geminiRaw === "string"
              ? geminiRaw.replace(/^```json|```$/g, "").trim()
              : JSON.stringify(geminiRaw, null, 2)}
          </pre>
        ) : (
          <p style={{ fontStyle: "italic", color: "black" }}>
            No AI summary available.
          </p>
        )}
      </div>

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
