## 🔹 useRef Hook in Next.js (TypeScript)

`useRef` is a powerful hook in React and Next.js that allows you to:

- Persist values between renders without causing re-renders.
- Directly reference DOM elements for manipulation.
- Store mutable values that don’t trigger re-renders when updated.

### 🛠 1. Basic Syntax

```tsx
import { useRef } from "react";

const ref = useRef<Type>(initialValue);
```

## 📌 Explanation:

- `useRef<Type>(initialValue)` creates a mutable reference with an initial value.
- The returned ref object has a `.current` property where the value is stored.
- Unlike `useState`, updating `ref.current` does not trigger a re-render.

### ✅ Example 1: Accessing a DOM Element (Strict TypeScript)

One common use case for `useRef` is to get a reference to a DOM element.

#### 📌 Focusing an Input Field on Button Click

```tsx
"use client";
import { useRef } from "react";

const FocusInput: React.FC = () => {
  // Define the ref with HTMLInputElement type
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <input
        ref={inputRef}
        type="text"
        className="border px-2 py-1"
        placeholder="Type something..."
      />
      <button
        onClick={handleFocus}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Focus Input
      </button>
    </div>
  );
};

export default FocusInput;
```

## 📌 What’s happening here?

- `useRef<HTMLInputElement | null>(null)` is initialized with `null` and typed correctly.
- The ref is assigned to the `<input>` element.
- Clicking the button triggers `handleFocus()`, which directly manipulates the input element without causing re-renders.

---

### ✅ Example 2: Storing Mutable Values Without Re-renders

Sometimes, we need a value that persists between renders but does not trigger re-renders when changed.

#### 📌 Tracking Render Counts

```tsx
"use client";
import { useRef, useState, useEffect } from "react";

const RenderCounter: React.FC = () => {
  const countRef = useRef<number>(0); // Mutable ref value
  const [state, setState] = useState<number>(0); // State to trigger re-renders

  useEffect(() => {
    countRef.current += 1;
  });

  return (
    <div className="p-4">
      <p>Component re-rendered: {countRef.current} times</p>
      <button
        onClick={() => setState(state + 1)}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Re-render
      </button>
    </div>
  );
};

export default RenderCounter;
```

## 📌 What’s happening here?

- `countRef` persists its value across renders without causing re-renders.
- Each re-render increments `countRef.current`, tracking how many times the component re-renders.
- `useState(state + 1)` triggers re-renders, but `countRef.current` is preserved.

### ✅ Example 3: useRef vs useState (When to Use What?)

| Feature                  | `useRef` | `useState` |
| ------------------------ | -------- | ---------- |
| Triggers Re-renders?     | ❌ No    | ✅ Yes     |
| Stores Mutable Value?    | ✅ Yes   | ✅ Yes     |
| Used for DOM References? | ✅ Yes   | ❌ No      |
| Used for State Updates?  | ❌ No    | ✅ Yes     |

### 📌 Use `useRef` when:

- You need to store a mutable value that doesn’t trigger a re-render.
- You need a reference to a DOM element (e.g., input, canvas).
- You want to track a value across renders without causing re-renders.

### 📌 Use `useState` when:

- You need to re-render the component when the value changes.
- You are storing UI-related data (e.g., button states, form inputs).

### ✅ Example 4: Storing Previous State with useRef

`useRef` can be used to store the previous state value before an update.

#### 📌 Tracking Previous Counter Value

```tsx
"use client";
import { useState, useRef, useEffect } from "react";

const PreviousState: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const prevCountRef = useRef<number>(0);

  useEffect(() => {
    prevCountRef.current = count; // Store previous count
  }, [count]); // Runs whenever count changes

  return (
    <div className="p-4">
      <p>Current: {count}</p>
      <p>Previous: {prevCountRef.current}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-purple-500 text-white rounded"
      >
        Increment
      </button>
    </div>
  );
};

export default PreviousState;
```

## 📌 What’s happening here?

- The `prevCountRef` stores the previous state value before updating.
- Each render, `prevCountRef.current` gets updated but doesn’t trigger a re-render.
- This is useful when comparing the current vs previous state.

### ✅ Example 5: useRef for Managing Timers (`setTimeout`)

When dealing with timers (e.g., `setTimeout`, `setInterval`), `useRef` is useful for storing and clearing timers.

#### 📌 Auto-incrementing Counter with useRef Timer

```tsx
"use client";
import { useState, useRef, useEffect } from "react";

const TimerCounter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="p-4">
      <p>Count: {count}</p>
      <button
        onClick={() => {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Stop Timer
      </button>
    </div>
  );
};

export default TimerCounter;
```

## 📌 What’s happening here?

- `intervalRef` stores the interval ID, preventing unnecessary re-renders.
- The `setInterval` function increments the count every second.
- `clearInterval(intervalRef.current)` stops the timer when the button is clicked.

## 🎯 Key Takeaways from useRef

✅ Does not cause re-renders when `ref.current` is updated.  
✅ Used to reference DOM elements (e.g., focusing input fields).  
✅ Stores mutable values across renders without re-rendering.  
✅ Useful for persisting state (e.g., previous state, render counts).  
✅ Essential for managing timers (`setTimeout`, `setInterval`).
