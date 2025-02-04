"use client";
import { useState, useEffect } from "react";

function UseEffect() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return; // Pause the timer

    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 10);

    // Cleanup function
    return () => clearInterval(timer); // Clears the timer when component unmounts
  }, [isRunning]); // Runs once (component mounts)

  let milliseconds = String(time % 100).padStart(2, "0");
  let seconds = Math.floor(time / 100);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  minutes %= 60;
  seconds %= 60;
  const formattedSeconds = seconds.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedHours = hours.toString().padStart(2, "0");

  return (
    <div>
      <h3>
        Time: {formattedHours} h {formattedMinutes} m {formattedSeconds}s{" "}
        {milliseconds} ms{" "}
      </h3>
      <button onClick={() => setIsRunning((prev) => !prev)}>
        {isRunning ? "Pause" : "Start"}
      </button>
      <br />
      <button onClick={() => setTime(0)}>Reset</button>
    </div>
  );
}

export default UseEffect;

/**

What Does "Unmount" Mean?
  In React, a component unmounts when it is removed from the UI (DOM). This usually happens when:
  - The user navigates to another page (in a SPA).
  - A parent component no longer renders the component.
  - The component is conditionally removed ({show && <Component />}).



What is a Cleanup Function in useEffect?
  - The cleanup function is a special function returned inside useEffect(). It runs when the component unmounts to clean up side effects (like timers, event listeners, or API calls).


Why is Cleanup Needed?
  - Prevents memory leaks.
  - Ensures no outdated or unnecessary operations run after  the component is gone.
  - Avoids errors caused by updating state after the component unmounts.



  */
