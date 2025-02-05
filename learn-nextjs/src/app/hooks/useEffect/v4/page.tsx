"use client";
import { useState, useEffect } from "react";

function ConditionalEffect() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function getResults() {
      if (searchQuery === "") {
        setResults([]);
        return;
      }

      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${searchQuery}`
        );
        const data = await response.json(); // ✅ Properly await response.json()
        setResults(data.products || []); // ✅ Extract the 'products' array
      } catch (error) {
        console.error("Error fetching data:", error);
        setResults([]); // ✅ Ensure the state is never an invalid value
      }
    }

    getResults(); // ✅ Properly call the function
  }, [searchQuery]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {results.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default ConditionalEffect;
