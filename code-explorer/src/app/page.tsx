"use client";

import React, { useState, useEffect } from "react";
import FileUploader from "./components/FileUploader";
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

  return (
    <div className="">
      <FileUploader onFileUploaded={handleFileUpload} />
    </div>
  );
}
