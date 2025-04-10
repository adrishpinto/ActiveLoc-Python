import React, { useState } from "react";
import axios from "axios";
import LanguageDropdown from "../components/LanguageDropdownMT";
import FileUpload from "../components/upload_components/FileUploadAzure";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const MachineTranslate = () => {
  const [language, setLanguage] = useState("");
  const [translationStatus, setTranslationStatus] = useState({
    message: "not started",
  });
  const [loading, setLoading] = useState(false);

  const translate = async (language) => {
    setTranslationStatus({ message: "Translating..." });
    if (!language) return toast.error("please select a language");
    try {
      const response = await axios.post(
        `${API_URL}/translate`,
        { lang: language },
        {
          withCredentials: true,
          headers: {
            "X-CSRF-TOKEN": "7e751158-100e-4ea1-87a7-54ccc8b9b594",
          },
        }
      );

      setTranslationStatus(response.data);
      toast.success("translation has completed succesfully");
      if (response.request.responseURL !== `${API_URL}/translate`) {
        window.location.href = response.request.responseURL;
        return;
      }
    } catch (error) {
      console.error("Translation Error:", error);
      setTranslationStatus({ message: "Translation failed" });
    }
  };

  const downloadFile = async () => {
    try {
      const response = await fetch(`${API_URL}/download`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to download file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const ext = response.headers.get("file_type") || "txt";
      let file_name = response.headers.get("file_name") || "downloaded_file";

      if (language) {
        file_name = file_name + "_" + language;
      }
      const a = document.createElement("a");
      a.href = url;
      a.download = `${file_name}${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
      console.log([...response.headers.entries()]);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div>
      <div className="w-[80%] lg:w-[50%] border border-black mx-auto rounded-2xl my-20 p-10">
        <h1 className="mb-10 text-center text-3xl">Machine Translation</h1>

        {/* File Upload Component */}
        <FileUpload />

        <div className="flex gap-2 mx-auto w-fit my-10">
          <LanguageDropdown
            language={language}
            onLanguageChange={(e) => setLanguage(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-center">
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
            <p className="font-bold mr-2">Status:</p>
            {translationStatus?.message === "not started" && (
              <div>Not Started</div>
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

export default MachineTranslate;
