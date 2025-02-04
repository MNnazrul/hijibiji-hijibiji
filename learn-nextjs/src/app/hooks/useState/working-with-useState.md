Great! Since you already know the basics of useState(), here are some advanced implementations that can be useful in real-world Next.js applications:

1️⃣ Functional Updates in useState
Instead of directly modifying the state, you can use a function inside setState to prevent stale state issues.

✅ Example: Updating state based on previous state

```tsx
"use client";
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1); // ✅ Functional update
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

export default Counter;
📌 Why?
Using setCount(prevCount => prevCount + 1) ensures that the latest state is used, even when multiple updates happen at the same time.

2️⃣ useState with Local Storage (Persist Data)
Next.js does not persist useState between page reloads, but you can store state in localStorage.

✅ Example: Persisting state using localStorage

```tsx
"use client";
import { useState, useEffect } from "react";

function PersistedCounter() {
  const [count, setCount] = useState(() => {
    // Get stored count from localStorage
    return Number(localStorage.getItem("count")) || 0;
  });

  useEffect(() => {
    // Save count in localStorage whenever it updates
    localStorage.setItem("count", count);
  }, [count]);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default PersistedCounter;
```

📌 Why?

useState with a function (useState(() => Number(localStorage.getItem("count")) || 0)) ensures initial state is read only once.
useEffect updates localStorage when count changes.
3️⃣ Toggle Boolean State (Custom Hook)
Sometimes, we need to toggle a boolean state (true <-> false) frequently.

3️⃣ Toggle Boolean State (Custom Hook)
Sometimes, we need to toggle a boolean state (true <-> false) frequently.

✅ Example: Toggle Visibility

```tsx
"use client";
import { useState } from "react";

function ToggleComponent() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible((prev) => !prev)}>
        {isVisible ? "Hide" : "Show"}
      </button>
      {isVisible && <p>Hello! I am visible now.</p>}
    </div>
  );
}

export default ToggleComponent;
```

📌 Why?

Toggles state efficiently using setIsVisible(prev => !prev).

4️⃣ useState with Complex State (Objects & Arrays)
When handling objects or arrays, always spread (...) existing state to avoid overwriting it.

✅ Example: Updating an Object in useState

```tsx
"use client";
import { useState } from "react";

function ProfileUpdater() {
  const [profile, setProfile] = useState({ name: "John", age: 25 });

  return (
    <div>
      <h2>Name: {profile.name}</h2>
      <h2>Age: {profile.age}</h2>
      <button onClick={() => setProfile({ ...profile, age: profile.age + 1 })}>
        Increase Age
      </button>
    </div>
  );
}

export default ProfileUpdater;
```

📌 Why?

Preserves previous state by spreading ...profile and updating only age.

5️⃣ useState with an Array (Adding & Removing Items)
Managing lists efficiently with state.

✅ Example: Add & Remove Items from a List

```tsx
"use client";
import { useState } from "react";

function TaskList() {
  const [tasks, setTasks] = useState(["Task 1", "Task 2"]);

  const addTask = () => {
    setTasks([...tasks, `Task ${tasks.length + 1}`]); // ✅ Add new task
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index)); // ✅ Remove task
  };

  return (
    <div>
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task} <button onClick={() => removeTask(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
```

📌 Why?

Uses spread operator (...tasks) to add a new item.
Uses .filter() to remove an item without mutating state.

6️⃣ useState with Delayed Updates (Timeout)
Sometimes, you might need delayed state updates.

✅ Example: Delayed Counter

```tsx
"use client";
import { useState } from "react";

function DelayedCounter() {
  const [count, setCount] = useState(0);

  const incrementWithDelay = () => {
    setTimeout(() => {
      setCount((prev) => prev + 1);
    }, 2000); // 2s delay
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={incrementWithDelay}>Increment after 2s</button>
    </div>
  );
}

export default DelayedCounter;
```

📌 Why?

Uses setTimeout() for delayed updates.
Uses functional update (setCount(prev => prev + 1)) to prevent stale state issues.
