"use client";
import { useState, useEffect } from "react";

function ConditionalEffect() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (searchQuery) {
      // Only fetch data if searchQuery is not empty
      fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => setResults(data));
    }
  }, [searchQuery]); // Re-run when 'searchQuery' changes

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {results}
        {/* {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))} */}
      </ul>
    </div>
  );
}

export default ConditionalEffect;
