"use client";

import { useState, useEffect } from "react";

//------------------------------------------------
// basic useState

function UseState() {
  // 1.-------------------------------------------
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  // 2. -------------------------------------------

  const [persistentCount, setPersistentCount] = useState<number>(() => {
    // Get stored count from localStorage
    const storedPersistentCount = localStorage.getItem("persistentCount");
    return storedPersistentCount ? parseInt(storedPersistentCount) : 0;
  });

  useEffect(() => {
    localStorage.setItem("persistentCount", persistentCount.toString());
  }, [persistentCount]);

  const persistentIncrement = () => {
    setPersistentCount((prevPersistentCount) => prevPersistentCount + 1);
  };

  const persistentDecrement = () => {
    setPersistentCount((prevPersistentCount) => prevPersistentCount - 1);
  };

  // 3. Toggle visibility
  const [isVisible, setIsVisible] = useState(false);

  // 4. with Complex State (Objects & Arrays)
  const [profile, setProfile] = useState({ name: "John", age: 25 });

  const increaseAge = () => {
    setProfile((prevProfile) => ({
      ...prevProfile, // spread the previous profile
      age: prevProfile.age + 1, // increment the age
    }));
  };

  // 5. useState with an Array (Adding & Removing Items) Managing lists efficiently with state.

  const [tasks, setTasks] = useState(["Task 1", "Task 2"]);

  const addTask = () => {
    setTasks([...tasks, `Task ${tasks.length + 1}`]); // ✅ Add new task
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index)); // ✅ Remove task
  };

  // 6. with Delayed Updates (Timeout)

  const [delayCount, setDelayCount] = useState(0);

  const incrementWithDelay = () => {
    setTimeout(() => {
      setDelayCount((prev) => prev + 1);
    }, 1000); // 1s delay
  };

  return (
    <div className="gap-4">
      <div>
        <h1>1. Basic useState</h1>
        <h3> Count = {count} </h3>
        <button onClick={increment}>Increment</button> <br />
        <button onClick={decrement}>Decrement</button>
      </div>

      <div>
        <h1>2. Persisting state using localStorage </h1>
        <h3>PersistentCounter = {persistentCount}</h3>
        <button onClick={persistentIncrement}>Increment</button>
        <br />
        <button onClick={persistentDecrement}>Decrement</button>
      </div>

      <div>
        <h1>3. Toggle Visibility</h1>

        <button onClick={() => setIsVisible((prev) => !prev)}>
          {isVisible ? "Hide" : "Show"}
        </button>
        {isVisible && <p>Hello! I am visible now.</p>}
      </div>

      <div>
        <h1>4. with Complex State (Objects & Arrays)</h1>
        <h2>Name: {profile.name}</h2>
        <h2>Age: {profile.age}</h2>
        <button
          onClick={() => setProfile({ ...profile, age: profile.age + 1 })}
        >
          Increase Age
        </button>
      </div>

      <div>
        <h1>
          5. useState with an Array (Adding & Removing Items Managing lists
          efficiently with state.
        </h1>
        <button onClick={addTask}>Add Task</button>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task} <button onClick={() => removeTask(index)}>❌</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1>6. with Delayed Updates (Timeout)</h1>
        <h2>Count: {delayCount}</h2>
        <button onClick={incrementWithDelay}>Increment after 1s</button>
      </div>
    </div>
  );
}

export default UseState;
