"use client";

import { useState, useEffect } from "react";

function Example4() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((result) => setData(result));
  }, []);

  return (
    <div>
      <h1>useEffect() with Multiple Effects</h1>
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <pre>
          {JSON.stringify(data, ["products", "id", "title", "price"], 2)}
        </pre>
      </div>
    </div>
  );
}

export default Example4;
