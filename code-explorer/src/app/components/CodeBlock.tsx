"use client";

import React, { useState, useRef } from "react";
import { detectLanguage, generateId } from "../lib/utils";
import { CodeFile } from "../lib/types";

interface FileUpaloaderProps {
  onFileUploaded: (file: CodeFile) => void;
}

const FileUploader: React.FC<FileUpaloaderProps> = ({ onFileUploaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const content = await file.text();
      const language = detectLanguage(file.name);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
};
