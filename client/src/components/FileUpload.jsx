import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const API_URL = import.meta.env.VITE_API_URL;

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : null;
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*, application/pdf", // Modify based on file types allowed
  });

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const csrfToken = getCookie("csrf_access_token");
      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
      });

      if (response.redirected) {
        window.location.href = response.url;
        return;
      }

      const result = await response.json();
      alert(result.message);

    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div
        {...getRootProps()}
        className={`sm:w-[500px] h-[250px]  flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer ${
          isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the file here...</p>
        ) : (
          <p>Drag & drop a file here, or click to select one</p>
        )}
      </div>

      {file && (
        <div className="mt-2 text-sm text-gray-600">
          Selected file: {file.name}
        </div>
      )}

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
