## `useContext` Hook in Next.js (TypeScript)

`useContext` is used to share state across multiple components without prop drilling. It allows you to access a global state from any child component.

### 🛠 1. Creating a Context in TypeScript

To use `useContext`, you need to:

- Create a Context using `createContext`
- Provide the Context at a high level (e.g., `layout.tsx` or `App.tsx`)
- Consume the Context using `useContext` in child components

### ✅ Example: Theme Context with `useContext`

In this example, we'll create a ThemeContext that manages the dark/light theme for our Next.js app.

### 📌 Step 1: Create the Context (`ThemeContext.tsx`)

```tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Define TypeScript type for the context value
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

// Create Context with default values (use `undefined` initially)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define props for the provider
interface ThemeProviderProps {
  children: ReactNode;
}

// Create Theme Provider Component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook for consuming ThemeContext
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
```

#### 📌 What’s happening here?

- We define a TypeScript interface (`ThemeContextType`) to ensure strict typing.
- `createContext()` is used to define a new ThemeContext.
- The `ThemeProvider` stores the theme state and provides it to all children.
- The `useTheme` custom hook is created for easy access to the context.

### 📌 Step 2: Wrap Your App with ThemeProvider

Now, we need to wrap our entire Next.js app inside `ThemeProvider` so that all components can access the theme context.

Edit `layout.tsx` or `page.tsx`:

```tsx
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

### 📌 Step 3: Use useContext in a Component

Now that we've set up the context, let's consume it in a component.

```tsx
"use client";
import { useTheme } from "@/context/ThemeContext";

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
```

#### 📌 What’s happening here?

- We import `useTheme()` to access `theme` and `toggleTheme`.
- Clicking the button toggles the theme between `light` and `dark`.
- The component applies a different background color based on the theme.

### 🔥 Why Use useContext in Next.js?

- **Avoids Prop Drilling** – No need to pass props down multiple levels.
- **Centralized State Management** – Useful for themes, authentication, and global settings.
- **Works with Server Components** – You can wrap server components in a provider.

### 🛠 Advanced `useContext` with Local Storage (Persistent Theme)

We can store the theme in `localStorage` so it persists after a page refresh.

Modify `ThemeContext.tsx`:

```tsx
"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (
      ((typeof window !== "undefined" && localStorage.getItem("theme")) as
        | "light"
        | "dark") || "light"
    );
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
```

**📌 What’s changed?**

- The useState() function initializes the theme from localStorage.
- The useEffect() hook saves the theme to localStorage whenever it updates.

Now, **the theme persists** even after a page refresh! 🎉

### 🎯 Key Takeaways from useContext

✅ **Used for global state management** without prop drilling <br>
✅ **Wrap your app** in a Provider (e.g., ThemeProvider) <br>
✅ **Use a custom hook** (`useTheme`) to simplify access <br>
✅ **Ensure TypeScript safety** by defining types <br>
✅ **Can be combined with** localStorage for persistence <br>
