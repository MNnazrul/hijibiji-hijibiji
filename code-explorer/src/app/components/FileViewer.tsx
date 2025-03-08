"use client";
import React from "react";
import { CodeFile } from "../lib/types";
import CodeBlock from "./CodeBlock";

interface FileViewerProps {
  file: CodeFile | null;
}

const FileViewer: React.FC<FileViewerProps> = ({ file }) => {
  if (!file) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px] border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 p-6">
        <div className="text-center">
          <svg
            className="w-12 h-12 mx-auto mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          <h3 className="mb-2 text-xl font-medium text-gray-700 dark:text-gray-300">
            No file selected
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Select a file from the list to view its content
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <CodeBlock
        code={file.content}
        language={file.language}
        fileName={file.name}
      />
    </div>
  );
};

export default FileViewer;
