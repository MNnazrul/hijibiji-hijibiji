"use client";

import React, { useState, useRef } from "react";
import { detectLanguage, generateId } from "../lib/utils";
import { CodeFile } from "../lib/types";

interface FileUpaloaderProps {
  onFileUploaded: (file: CodeFile) => void;
}
let count = 0;
const FileUploader: React.FC<FileUpaloaderProps> = ({ onFileUploaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    console.log("processFile", count++);
    setIsLoading(true);
    setError(null);
    try {
      const content = await file.text();
      const language = detectLanguage(file.name);

      console.log(file.name);
      console.log("file content ", content);

      const newFile: CodeFile = {
        id: generateId(),
        name: file.name,
        content,
        language,
        uploadAt: new Date().toISOString(),
      };

      onFileUploaded(newFile);
    } catch (error) {
      setError("Failed to read file. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleFileChange", count++);
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    console.log("handleDrop", count++);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      console.log(files);
      processFile(files[0]);
    }
  };

  const handleClick = () => {
    console.log("handleclick", count++);
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full mb-6">
      <div
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors cursor-pointer ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        style={{ minHeight: "150px" }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".js,.jsx,.ts,.tsx,.py,.php,.java,.c,.cpp,.cs,.go,.rb,.rs,.html,.css,.json,.yaml,.yml,.md,.sql,.sh"
        />

        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-t-blue-500 border-gray-200 rounded-full animate-spin mb-2"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Uploading file...
            </p>
          </div>
        ) : (
          <>
            <svg
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Supported file types: JS, TS, Python, PHP, C++, and more
            </p>
          </>
        )}

        {error && (
          <p className="mt-2 text-sm text-red-500 dark:text-red-400">{error}</p>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
