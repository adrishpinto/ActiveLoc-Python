import React, { useState } from "react";
import axios from "axios";
import LanguageDropdown from "../components/LanguageDropdownMT";
import FileUpload from "../components/FileUploadAzure";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const PostEditTranslate = () => {
  const [language, setLanguage] = useState("");

  const translate = async () => {
    setTranslationStatus({ message: "Translating..." });
    try {
      const response = await axios.get(`${API_URL}/covert`);
    } catch (error) {
      console.error("Translation Error:", error);
      setTranslationStatus({ message: "Translation failed" });
    }
  };

  // uploads...

  const convertFile = async () => {
    if (!language) return toast.error("please select a language");

    try {
      const res = await axios.get(`${API_URL}/convert`, {
        params: { language },
        withCredentials: true,
      });
      // Handle success response here if needed
      toast.success("File sent succesfully");
    } catch (error) {
      console.log("error:", error);
      toast.error("Failed to convert file. Please try again.");
    }
  };

  //download
  const downloadFile = async () => {
    try {
      const response = await fetch(`${API_URL}/download_xliff`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to download file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const file_name = response.headers.get("file_name") || "downloaded_file";
      a.download = `${file_name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div>
      <div className="w-[80%] lg:w-[50%] border border-black mx-auto rounded-2xl my-32 p-10 mb-20">
        <h1 className="text-center mb-10 text-3xl">Post Edit Translation</h1>
        <h2 className="border-2 border-green-500 bg-green-200 mb-8 w-fit mx-auto px-6 py-2 rounded-lg  text-black font-semibold">
          <span className="font-semibold text-lg pr-1">
            Supported File Types:{" "}
          </span>{" "}
          docx, andriod strings, HTML, iOS Strings, ODT
        </h2>
        <FileUpload />

        <div className="flex items-center justify-center mt-10">
          <LanguageDropdown
            language={language}
            onLanguageChange={(e) => setLanguage(e.target.value)}
          />
          <button
            onClick={convertFile}
            className="bg-blue-200 hover:bg-blue-300  mx-4 px-2 py-1 rounded"
          >
            Convert File
          </button>
          <button
            onClick={downloadFile}
            className="bg-blue-200 mx-4 px-2 py-1 rounded"
          >
            Download File
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostEditTranslate;
