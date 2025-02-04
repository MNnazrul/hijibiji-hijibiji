# **Understanding `useEffect()` in React & Next.js**

## **📌 What is `useEffect()`?**

`useEffect()` is a built-in React Hook that lets you perform **side effects** in functional components. Side effects include:

- Fetching data from an API
- Directly interacting with the DOM (e.g., changing the document title)
- Setting up event listeners
- Managing timers, intervals, or subscriptions

In traditional React class components, side effects were handled inside lifecycle methods like:

- `componentDidMount()`
- `componentDidUpdate()`
- `componentWillUnmount()`

With `useEffect()`, you can handle all these in a **declarative and concise way**.

---

## **📌 Why is `useEffect()` Used?**

The primary purpose of `useEffect()` is to **synchronize a component with external systems** like APIs, browser storage, or even other parts of your app.

### **🔹 Common Use Cases**

1. **Fetching Data from APIs**: Load data when a component mounts or when certain dependencies change.
2. **Updating the Document Title**: Change the page title dynamically.
3. **Managing Timers & Intervals**: Running background processes, countdowns, or animations.
4. **Subscribing to Events**: Handling global event listeners, such as keyboard or mouse events.
5. **Interacting with Local Storage**: Saving and retrieving data from `localStorage` or `sessionStorage`.
6. **Cleanup on Component Unmount**: Remove event listeners, cancel API requests, or clear timers.

---

## **📌 How `useEffect()` Works?**

- It runs **after the component renders**.
- You can control **when it runs** by specifying **dependencies**.
- It supports **cleanup functions** to handle unmounting or dependency updates.

---

## **📌 Types of `useEffect()` Usage**

### **1️⃣ Running Once (on Mount)**

- Runs **only once** when the component **first renders**.
- Used for **initial API calls, event listeners, or setting up third-party libraries**.

### **2️⃣ Running on State/Prop Changes**

- Runs **whenever a specific dependency changes**.
- Used when you want to trigger an effect based on **state or prop updates**.

### **3️⃣ Running on Every Render**

- Runs **after every render** (when no dependencies are provided).
- Usually avoided unless absolutely necessary.

### **4️⃣ Cleanup Effect (on Unmount)**

- Runs a **cleanup function** before the component unmounts.
- Used to remove **event listeners, clear intervals, or cancel API requests**.

---

## **📌 Best Practices for `useEffect()`**

✅ **Use Multiple `useEffect()` Calls for Different Side Effects**

- Keeps code **organized and readable**.  
  ✅ **Always Define Dependencies Properly**
- Prevents **unnecessary re-renders or infinite loops**.  
  ✅ **Use Cleanup Functions When Necessary**
- Prevents **memory leaks and unintended behaviors**.  
  ✅ **Avoid Unnecessary Effects**
- Only use `useEffect()` when **side effects** are needed.

---

---

---

## Examples:

### 1️⃣ `useEffect()` Cleanup

When you use side effects like subscriptions, event listeners, or timers, you need to clean up these effects to avoid memory leaks. You can do this by returning a cleanup function inside `useEffect()`.

```jsx
"use client";
import { useState, useEffect } from "react";

function Timer() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    // Cleanup function
    return () => clearInterval(timer); // Clears the timer when component unmounts
  }, []); // Runs once (component mounts)

  return <div>Time: {time}s</div>;
}

export default Timer;
```

**_📌 Why?_**

- return () => clearInterval(timer) is used for cleanup when the component is unmounted or when the effect re-runs.
- This prevents memory leaks when you set up intervals or timeouts.

### 2️⃣ useEffect() with Dependencies

The dependency array is a key feature of useEffect(). You can control when the effect runs based on specific state or prop changes.

✅ Example: Fetching Data Based on State

```tsx
"use client";
import { useState, useEffect } from "react";

function FetchData() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Fetch data when 'page' changes
    fetch(`https://api.example.com/data?page=${page}`)
      .then((response) => response.json())
      .then((result) => setData(result));
  }, [page]); // Only re-run when 'page' changes

  return (
    <div>
      <p>Page: {page}</p>
      <button onClick={() => setPage((prev) => prev + 1)}>Next Page</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default FetchData;
```

**_📌 Why?_**

- The effect re-runs only when page changes.
- This is useful for data fetching, animations, and other side effects that depend on specific state or props.

### 3️⃣ useEffect() with Multiple Effects

You can use multiple useEffect() calls within a single component for different side effects. Each useEffect runs independently of others.

✅ Example: Multiple Effects

```tsx
"use client";
import { useState, useEffect } from "react";

function MultipleEffects() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  // Effect 1: Count change side effect
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]); // Re-run when count changes

  // Effect 2: Data fetching side effect
  useEffect(() => {
    fetch("https://api.example.com/data")
      .then((response) => response.json())
      .then((result) => setData(result));
  }, []); // Run only once on mount

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default MultipleEffects;
```

**_📌 Why?_**

- The first useEffect manages document title based on count.
- The second useEffect fetches data once when the component mounts.

### 4️⃣ useEffect() with Conditional Effects

You can apply conditions to only run an effect when certain conditions are met.

✅ Example: Conditionally Triggering Side Effects

```tsx
"use client";
import { useState, useEffect } from "react";

function ConditionalEffect() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      // Only fetch data if searchQuery is not empty
      fetch(`https://api.example.com/search?q=${searchQuery}`)
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
        {results.map((result, index) => (
          <li key={index}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ConditionalEffect;
```

**_📌 Why?_**

- The effect only triggers a fetch when searchQuery is not empty, preventing unnecessary API calls.
- This is a conditional effect.

### 5️⃣ useEffect() for Component Mounting & Unmounting

You can use empty dependency array ([]) to run the effect only once when the component mounts (equivalent to componentDidMount() in class components), and the cleanup function will run when the component unmounts.

✅ Example: Component Mounting/Unmounting

```tsx
"use client";
import { useState, useEffect } from "react";

function ComponentLifecycle() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("Component Mounted");

    return () => {
      console.log("Component Unmounted");
    };
  }, []); // Run once on mount, cleanup on unmount

  return (
    <div>
      <p>{message}</p>
      <button onClick={() => setMessage("Goodbye!")}>Unmount</button>
    </div>
  );
}

export default ComponentLifecycle;
```

**_📌 Why?_**

- Component Mounted: Logs when the component first mounts.
- Cleanup on Unmount: Logs when the component unmounts.

#### 🔥 Best Practices for useEffect()

- 1️⃣ Separate Concerns: Keep each side effect in its own useEffect() (e.g., one for API calls, one for DOM manipulations).
- 2️⃣ Use Dependencies Correctly: Always define dependencies correctly to avoid unnecessary re-renders or missed updates.
- 3️⃣ Avoid Memory Leaks: Use cleanup functions to remove event listeners, timers, etc., on unmount.

### 6️⃣ useEffect() with Async Functions

To use async functions in useEffect(), you cannot directly make the effect callback async, but you can define an async function inside the useEffect callback.

✅ Example: Fetching Data with Async/Await

```tsx
"use client";
import { useState, useEffect } from "react";

function AsyncEffect() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://api.example.com/data");
      const result = await response.json();
      setData(result);
    };

    fetchData(); // Call async function
  }, []); // Empty dependency array to run once

  return <div>{data ? JSON.stringify(data) : "Loading..."}</div>;
}

export default AsyncEffect;
```

**_📌 Why?_**

- This approach uses an async function inside useEffect to handle async operations like data fetching.
