"use client";
import { useTheme } from "../ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`h-screen flex items-center justify-center ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <button
        onClick={toggleTheme}
        className="px-4 py-2 border rounded-md shadow-md"
      >
        Toggle Theme (Current: {theme})
      </button>
    </div>
  );
};

export default ThemeToggle;
