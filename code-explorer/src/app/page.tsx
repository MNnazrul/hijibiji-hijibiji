"use client";

import React, { useState, useEffect } from "react";
import FileUploader from "./components/FileUploader";
import FileList from "./components/FileList";
import { CodeFile } from "./lib/types";

export default function Home() {
  const [files, setFiles] = useState<CodeFile[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const selectFile = files.find((file) => file.id === selectedFileId) || null;

  const handleFileUpload = (newFile: CodeFile) => {
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
    <div className="">
      <FileUploader onFileUploaded={handleFileUpload} />
      <div>
        <FileList
          files={files}
          selectedFileId={selectedFileId}
          onFileSelect={handleFileSelect}
          onFileDelete={handleFileDelete}
        />
      </div>
    </div>
  );
}
