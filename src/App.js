import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const summarizeArticle = async () => {
    setLoading(true);
    setError("");
    setSummary("");
    const encodedUrl = encodeURIComponent(url);
    const apiUrl = `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${encodedUrl}&lang=en&engine=2`;
    const options = {
      method: "GET",
      url: apiUrl,
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "5e6fb8604fmshc98eb239ffbb232p18a4b3jsn4a79cef88f3e", 
        "X-RapidAPI-Host": "article-extractor-and-summarizer.p.rapidapi.com",
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      console.log(response.status);
      setSummary(response.data.summary);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch summary. Please check the URL or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Article Summarizer</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter article URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={summarizeArticle} disabled={loading || !url}>
          {loading ? "Summarizing..." : "Summarize"}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {summary && (
        <div className="summary-container">
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default App;
