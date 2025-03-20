import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getCsrfToken } from "../utils/csrfUtils";

const API_URL = import.meta.env.VITE_API_URL;

const FileUploadEnchanced = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  //get cookie for auth
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
    accept: "", // later add the file type if needed
  });

  const handleUpload = async () => {
    if (!file) return toast.error("please select a file to upload...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const csrfToken = getCsrfToken();
      const response = await fetch(`${API_URL}/upload-enhanced-audio`, {
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

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }

      const result = await response.json();
      toast.success(result.message);
    } catch (error) {
      console.log("Upload failed", error);
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

export default FileUploadEnchanced;
