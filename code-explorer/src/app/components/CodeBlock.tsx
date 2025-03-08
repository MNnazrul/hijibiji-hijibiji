"use client";

import React, { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";

// Import common language support
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-php";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markup"; // HTML
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-sql";

interface CodeBlockProps {
  code: string;
  language: string;
  fileName: string;
}

interface PopupPosition {
  x: number;
  y: number;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, fileName }) => {
  const [copied, setCopied] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState<PopupPosition>({
    x: 0,
    y: 0,
  });
  const codeRef = useRef<HTMLElement>(null);

  // Initialize syntax highlighting
  useEffect(() => {
    const highlight = async () => {
      if (typeof window !== "undefined" && codeRef.current) {
        // Ensure the language is loaded
        try {
          await Promise.all([
            import("prismjs"),
            import(`prismjs/components/prism-${language}`),
          ]);

          // Force a re-highlight
          Prism.highlightElement(codeRef.current);
        } catch (error) {
          console.warn(`Language '${language}' might not be supported:`, error);
          // Fallback to plain text if language isn't supported
          Prism.highlightElement(codeRef.current);
        }
      }
    };

    highlight();
  }, [code, language]);

  // Add custom styles for syntax highlighting
  useEffect(() => {
    // Add these styles only once
    if (!document.getElementById("prism-custom-styles")) {
      const style = document.createElement("style");
      style.id = "prism-custom-styles";
      style.innerHTML = `
        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
          color: #8292a2;
        }

        .token.punctuation {
          color: #f8f8f2;
        }

        .token.namespace {
          opacity: .7;
        }

        .token.property,
        .token.tag,
        .token.constant,
        .token.symbol,
        .token.deleted {
          color: #f92672;
        }

        .token.boolean,
        .token.number {
          color: #ae81ff;
        }

        .token.selector,
        .token.attr-name,
        .token.string,
        .token.char,
        .token.builtin,
        .token.inserted {
          color: #a6e22e;
        }

        .token.operator,
        .token.entity,
        .token.url,
        .language-css .token.string,
        .style .token.string,
        .token.variable {
          color: #f8f8f2;
        }

        .token.atrule,
        .token.attr-value,
        .token.function,
        .token.class-name {
          color: #e6db74;
        }

        .token.keyword {
          color: #66d9ef;
        }

        .token.regex,
        .token.important {
          color: #fd971f;
        }

        .token.important,
        .token.bold {
          font-weight: bold;
        }

        .token.italic {
          font-style: italic;
        }

        .token.entity {
          cursor: help;
        }

        /* Dark mode specific styles */
        .dark pre[class*="language-"],
        .dark code[class*="language-"] {
          color: #f8f8f2;
          background: none;
          text-shadow: 0 1px rgba(0, 0, 0, 0.3);
          font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTextSelection = () => {
    console.log("Selection event triggered"); // Debug log
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();

    console.log("Selected text:", selectedText); // Debug log

    if (!selection || !selectedText) {
      setShowPopup(false);
      return;
    }

    try {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      console.log("Selection rect:", rect); // Debug log

      // Calculate position for the popup
      const x = rect.left + rect.width / 2;
      const y = rect.bottom;

      setSelectedText(selectedText);
      setPopupPosition({ x, y });
      setShowPopup(true);
    } catch (error) {
      console.error("Error handling selection:", error);
      setShowPopup(false);
    }
  };

  const handleExplain = () => {
    if (!selectedText) return;

    // Create a modal with dark mode support
    const modal = document.createElement("div");
    modal.className = "fixed inset-0 flex items-center justify-center z-50";
    modal.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50"></div>
      <div class="relative bg-white dark:bg-gray-800 w-11/12 max-w-2xl rounded-lg shadow-xl p-6">
        <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div class="mt-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Code Explanation</h3>
          <pre class="bg-gray-50 dark:bg-gray-900 rounded p-4 overflow-auto max-h-[60vh] text-sm">
            <code class="text-gray-800 dark:text-gray-200">${selectedText}</code>
          </pre>
        </div>
      </div>
    `;

    // Add click handlers
    const closeModal = () => {
      document.body.removeChild(modal);
      setShowPopup(false);
    };

    modal.querySelector("button")?.addEventListener("click", closeModal);
    modal
      .querySelector(".fixed.inset-0.bg-black")
      ?.addEventListener("click", closeModal);

    document.body.appendChild(modal);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm relative">
      {/* Header with file name and copy button */}
      <div className="flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="font-mono text-sm text-gray-600 dark:text-gray-300 truncate max-w-[80%]">
          {fileName}
          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
            ({language})
          </span>
        </div>
        <button
          onClick={copyToClipboard}
          className="text-sm px-3 py-1 rounded-md transition-colors bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-200 border border-gray-300 dark:border-gray-600"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code content */}
      <div
        className="overflow-auto bg-gray-50 dark:bg-gray-900 p-4 max-h-[600px]"
        onMouseUp={handleTextSelection}
      >
        <pre className="m-0">
          <code
            ref={codeRef}
            className={`language-${language || "plaintext"} block`}
          >
            {code}
          </code>
        </pre>
      </div>

      {/* Selection Popup */}
      {showPopup && (
        <div
          className="code-popup fixed z-50 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700"
          style={{
            left: `${popupPosition.x}px`,
            top: `${popupPosition.y}px`,
            transform: "translate(-50%, 8px)",
          }}
        >
          <button
            onClick={handleExplain}
            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left flex items-center gap-2 min-w-[100px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Explain
          </button>
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
