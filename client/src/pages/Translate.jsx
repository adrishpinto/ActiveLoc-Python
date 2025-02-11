import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [translationStatus, setTranslationStatus] = useState({
    message: "not started",
  });
  const [loading, setLoading] = useState(false);

  const translate = async () => {
    setTranslationStatus({ message: "Translating..." });
    try {
      const response = await axios.get(`${API_URL}/translate`);
      setTranslationStatus(response.data);
    } catch (error) {
      console.error("Translation Error:", error);
      setTranslationStatus({ message: "Translation failed" });
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      setTranslationStatus({ message: "not started" });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const downloadFile = async () => {
    try {
      const blobName = "any";
      const response = await axios.get(
        `${API_URL}/download?blob_name=${blobName}`
      );

      const blob = new Blob([response.data]);
      const link = document.createElement("a");

      link.href = URL.createObjectURL(blob);
      link.download = "filename" + response.headers.get("X-File-Type");
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading the file", error);
    }
  };

  return (
    <div>
      <div className="w-[80%] lg:w-[50%] border border-black mx-auto rounded-2xl mt-32 p-20">
        <div className="mx-auto flex items-center justify-center mb-10">
          <input
            className="border w-52"
            type="file"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={handleUpload}
            className="bg-blue-200 mx-4 px-2 py-1 rounded"
          >
            Upload
          </button>
          <button
            onClick={translate}
            disabled={loading}
            className="bg-blue-200 mx-4 px-2 py-1 rounded"
          >
            {loading ? "Translating..." : "Translate File"}
          </button>
          <button
            onClick={downloadFile}
            className="bg-blue-200 mx-4 px-2 py-1 rounded"
          >
            Download File
          </button>
        </div>

        {translationStatus && (
          <div className="text-center mt-10 flex mx-auto w-64 items-center justify-center">
            <p className="font-bold mr-2">Status: </p>
            {translationStatus?.message === "not started" && (
              <div>Not Started </div>
            )}
            {translationStatus?.message === "Translating..." && (
              <div>Translating...</div>
            )}
            {translationStatus?.message === "Translation failed" && (
              <div className="text-red-500">Failed</div>
            )}
            {translationStatus?.message ===
              "Translation completed successfully." && (
              <div className="text-green-500">Success</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
