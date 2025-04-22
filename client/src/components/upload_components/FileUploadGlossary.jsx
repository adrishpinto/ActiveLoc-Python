import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getCsrfToken } from "../../utils/csrfUtils";

const API_URL = import.meta.env.VITE_API_URL;

const FileUploadGlossary = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "",
  });

  const handleUpload = async () => {
    if (!file) {
      console.log("No file selected");
      return toast.error("Please select a file to upload...");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/upload-glossary`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      console.log("Response Headers:", response.headers);

      if (response.status === 401) {
        console.log("Unauthorized: Invalid credentials");
        toast.error("Unauthorized: Invalid credentials or session expired.");
        navigate("/");
        return;
      }

      const result = await response.json();

      if (!response.ok) {
        toast.error(`Upload failed: ${result.error || "Unknown error."}`);
        return;
      }

      console.log("Upload result:", result);
      toast.success(result.message);
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Upload failed: Network error or server unavailable.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div
        {...getRootProps()}
        className={`sm:w-[500px] h-[250px] flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer ${
          isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500 ">Drop the file here...</p>
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

export default FileUploadGlossary;
