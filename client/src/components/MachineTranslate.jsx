import React, { useState } from "react";
import axios from "axios";
import LanguageDropdown from "./LanguageDropdown";

const API_URL = import.meta.env.VITE_API_URL;

const MachineTranslate = () => {
  const [language, setLanguage] = useState("...");

  const [file, setFile] = useState(null);
  const [translationStatus, setTranslationStatus] = useState({
    message: "not started",
  });
  const [loading, setLoading] = useState(false);

  const translate = async (language) => {
    setTranslationStatus({ message: "Translating..." });

    try {
      const response = await axios.post(
        `${API_URL}/translate`,
        { lang: language },
        { withCredentials: true }
      );

      setTranslationStatus(response.data);

      if (response.request.responseURL !== `${API_URL}/translate`) {
        window.location.href = response.request.responseURL;
        return;
      }
    } catch (error) {
      console.error("Translation Error:", error);
      setTranslationStatus({ message: "Translation failed" });
    }
  };

  // uploads...
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
        credentials: "include",
      });

      setTranslationStatus({ message: "not started" });

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

  //download
  const downloadFile = async () => {
    try {
      const response = await fetch(`${API_URL}/download`);
      if (!response.ok) throw new Error("Failed to download file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const ext = response.headers.get("file_type") || "txt";
      console.log(response.headers.get("file_type"));
      console.log([...response.headers.entries()]);

      const a = document.createElement("a");
      a.href = url;
      a.download = `downloaded_file${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Revoke the object URL to free memory
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div>
      <div className="w-[80%] lg:w-[50%] border border-black mx-auto rounded-2xl mt-32 p-10">
        <h1 className="mb-10 text-center text-3xl ">Machine Translation</h1>
        <div className="mx-auto flex items-center justify-center mb-10">
          <input
            className="border w-52"
            type="file"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex gap-2 mx-auto w-fit my-10">
          <LanguageDropdown
            language={language}
            onLanguageChange={(e) => setLanguage(e.target.value)}
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
            onClick={() => translate(language)}
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

            {/* translation button */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MachineTranslate;
