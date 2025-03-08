"use client";

import React, { useState, useEffect } from "react";
import FileUploader from "./components/FileUploader";
import FileList from "./components/FileList";
import { CodeFile } from "./lib/types";
import FileViewer from "./components/FileViewer";

export default function Home() {
  const [files, setFiles] = useState<CodeFile[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const selectedFile = files.find((file) => file.id === selectedFileId) || null;

  const handleFileUploaded = (newFile: CodeFile) => {
    setFiles((prevFiles) => [...prevFiles, newFile]);
    console.log("working", newFile);
    setSelectedFileId(newFile.id);
    console.log("file list : ", files);
  };

  const handleFileSelect = (fileId: string) => {
    setSelectedFileId(fileId);
  };

  const handleFileDelete = (fileId: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));

    if (selectedFileId === fileId) {
      const remainingFiles = files.filter((file) => file.id !== fileId);
      if (remainingFiles.length > 0) {
        setSelectedFileId(remainingFiles[0].id);
      } else {
        setSelectedFileId(null);
      }
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Code Explorer</h1>

      <FileUploader onFileUploaded={handleFileUploaded} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* File list (1/3 width on medium screens and larger) */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Files</h2>
          <FileList
            files={files}
            selectedFileId={selectedFileId}
            onFileSelect={handleFileSelect}
            onFileDelete={handleFileDelete}
          />
        </div>

        {/* Code viewer (2/3 width on medium screens and larger) */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Code Viewer</h2>
          <FileViewer file={selectedFile} />
        </div>
      </div>
    </main>
  );
}
