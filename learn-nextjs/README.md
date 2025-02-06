This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

---

---

---

### `fetch()` API in Detail

The fetch() function is a modern, built-in JavaScript API for making HTTP requests. It provides a Promise-based way to interact with resources such as APIs, databases, and remote servers.

#### Basic Syntax

```js
fetch(url, options)
  .then((response) => response.json()) // Convert response to JSON
  .then((data) => console.log(data)) // Handle data
  .catch((error) => console.error(error)); // Handle errors
```

- `url`: The resource (API endpoint) to fetch from.
- `options (optional)`: An object that specifies request method, headers, body, etc.

---

### `JSON.stringify()` in JavaScript

`JSON.stringify()` converts a JavaScript object or array into a JSON string. This is useful when sending data to APIs, storing data in local storage, or logging structured data.

#### Syntax

```js
JSON.stringify(value, replacer, space);
```

#### Parameters

- value (Required) → The object/array to convert into JSON.
- replacer (Optional) → A function or array to filter which properties to include.
- space (Optional) → Number of spaces or a string for indentation (for pretty-printing).

**Example**

```tsx
JSON.stringify(data, ["products", "id", "title", "price"], 2);
// hooks/useEffect/v3
```

### `ReactNode` in Typescript

`ReactNode` is a type from React that represents anything that can be rendered in React. This includes **elements, text, fragments, portals,** and even **null** or **undefined**.

It is commonly **used for typing the children prop** when creating reusable components.

### 1. Basic Usage of `ReactNode`

**Example: Typing the children prop with `ReactNode`**

```tsx
import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode; // Accepts any valid JSX content
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="card">{children}</div>;
};

export default Card;
```

✅ The `Card` component can now accept **any valid React elements** as its children:

```tsx
<Card>
  <h2>Hello</h2>
  <p>This is a card component.</p>
</Card>
```

### 2. What Values Does ReactNode Include?

`ReactNode` can be:

#### ✅ JSX elements:

```tsx
const element: ReactNode = <h1>Hello</h1>;
```

#### ✅ Strings and numbers:

```tsx
const text: ReactNode = "Hello, world!";
const number: ReactNode = 42;
```

#### ✅ Arrays of elements:

```tsx
const list: ReactNode = [<li>Item 1</li>, <li>Item 2</li>];
```

#### ✅ null or undefined:

```tsx
const empty: ReactNode = null;
```

#### ✅ Fragments:

```tsx
const fragment: ReactNode = (
  <>
    <h1>Title</h1>
    <p>Description</p>
  </>
);
```

#### ✅ React Portals:

```tsx
const portal: ReactNode = React.createPortal(
  <div>Inside Portal</div>,
  document.body
);
```

### 3. Difference Between ReactNode and `JSX.Element`

**Example of `JSX.Element`:**

```tsx
const myElement: JSX.Element = <h1>Hello</h1>; // ✅ Works
const myString: JSX.Element = "Hello"; // ❌ Error, because JSX.Element must be an element
```

Use `JSX.Element` when expecting only a single JSX element, while ReactNode is more flexible and allows multiple types.

### 4. When to Use ReactNode?

**✅ When defining children in a component:**

```tsx
interface Props {
  children: ReactNode;
}
```

**✅ When expecting any renderable content, including strings and fragments.** <br>
**✅ When creating higher-order components (HOCs) that wrap other components.**

---

---

## Explain of layout.tsx:
