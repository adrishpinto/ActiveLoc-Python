import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getCsrfToken } from "../../utils/csrfUtils";

const API_URL = import.meta.env.VITE_API_URL;

const FileUpload = ({ name, fileC, setFileC, api }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file != null) {
      setFileC(1);
    }
  }, [file, setFile]);

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
      const csrfToken = getCsrfToken();

      const response = await fetch(`${API_URL}/upload-merge-${api}`, {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
      });

      console.log("Response Headers:", response.headers);

      if (response.status === 401) {
        console.log("Unauthorized: Invalid credentials");
        navigate("/");
        toast.error("Unauthorized: Invalid credentials or session expired.");
      }

      const result = await response.json();
      console.log("Upload result:", result); // Logs the response body
      toast.success(result.message);
    } catch (error) {
      console.log("Upload failed", error); // Logs the error
      toast.error("Upload failed, please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 mx-4 w-fit">
      <div
        {...getRootProps()}
        className={`sm:w-[250px] p-5 h-[250px] flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer ${
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
      {!file && (
        <div className="text-red-500 text-sm">{name} not uploaded yet</div>
      )}
      {file && (
        <div className="mt-2 text-sm text-gray-600 text-center">
          Selected file:{" "}
          {file.name.length > 20 ? file.name.slice(0, 20) + "..." : file.name}
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
