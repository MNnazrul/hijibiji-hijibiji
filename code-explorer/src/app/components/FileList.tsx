"use client";

import React from "react";
import { CodeFile } from "../lib/types";

interface FileListProps {
  files: CodeFile[];
  selectedFileId: string | null;
  onFileSelect: (fileId: string) => void;
  onFileDelete: (fileId: string) => void;
}

const FileList: React.FC<FileListProps> = ({
  files,
  selectedFileId,
  onFileSelect,
  onFileDelete,
}) => {
  if (files.length === 0) {
    return (
      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
        <p className="text-center text-gray-500 dark:text-gray-400">
          No files uploaded yet. Upload a file to see it here.
        </p>
      </div>
    );
  }
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {files.map((file) => (
        <li
          key={file.id}
          className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${
            selectedFileId === file.id
              ? "bg-blue-50 dark:bg-blue-900/20"
              : "hover:bg-gray-50 dark:hover:bg-gray-800"
          }`}
          onClick={() => onFileSelect(file.id)}
        >
          <div className="flex items-center">
            {/* File icon based on language */}
            <div className="mr-3 text-gray-400 dark:text-gray-500">
              <svg
                className="w-5 h-5"
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
            </div>

            {/* File details */}
            <div className="truncate">
              <p className="font-medium text-gray-700 dark:text-gray-300 truncate">
                {file.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(file.uploadAt).toLocaleString()} • {file.language}
              </p>
            </div>
          </div>

          {/* Delete button */}
          <button
            className="p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the file selection
              onFileDelete(file.id);
            }}
            aria-label="Delete file"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FileList;
