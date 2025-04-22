import React, { useState, useEffect } from "react";
import axios from "axios";
import LanguageDropdown from "../components/LanguageDropdownMT";
import FileUpload from "../components/upload_components/FileUploadAzure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const MachineTranslate_V2 = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("");
  const [selectedBlob, setSelectedBlob] = useState(""); 
  const [blobs, setBlobs] = useState([]);

  // Fetch blobs when component mounts
  useEffect(() => {
    const fetchBlobs = async () => {
      try {
        const response = await fetch(`${API_URL}/list-blobs`, {
          credentials: "include",
        });

        if (!response.ok) {
          const error = await response.json();
          return toast.error(error.error || "Failed to fetch blobs");
        }

        const data = await response.json();
        setBlobs(data.blobs); // Set the blobs
      } catch (error) {
        console.error("Error fetching blobs:", error);
        toast.error("Error fetching blobs");
      }
    };

    fetchBlobs();
  }, []);

  const translate = async (language) => {
    if (!language) return toast.error("Please select a language");

    try {
      const response = await axios.post(
        `${API_URL}/translate_v2`,
        { lang: language, glossary: selectedBlob }, // Send blob name
        {
          withCredentials: true,
        }
      );

      toast.success("Translation has completed successfully");
    } catch (error) {
      console.error("Translation Error:", error);
      toast.error("Translation failed");
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
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div>
      <div className="w-[80%] lg:w-[50%] border border-black mx-auto rounded-2xl my-14 p-10">
        <h1 className="mb-10 text-center text-3xl">Machine Translation V2</h1>

        {/* File Upload Component */}
        <FileUpload />

        {/* Language Dropdown */}
        <div className="flex gap-2 mx-auto w-fit my-5">
          <LanguageDropdown
            language={language}
            onLanguageChange={(e) => setLanguage(e.target.value)}
          />
        </div>

        {/* Blob Dropdown */}
        <div className="flex gap-2 mx-auto w-fit my-5 ">
          <select
            value={selectedBlob}
            onChange={(e) => setSelectedBlob(e.target.value)}
            className="border px-3 py-2 rounded bg-slate-100 w-52"
          >
            <option value="">Select Glossary</option>
            {blobs.map((blob, idx) => (
              <option key={idx} value={blob}>
                {blob}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center">
          <button
            onClick={() => translate(language)}
            className="bg-blue-200 mx-4 px-2 py-1 rounded"
          >
            Translate File
          </button>
          <button
            onClick={downloadFile}
            className="bg-blue-200 mx-4 px-2 py-1 rounded"
          >
            Download File
          </button>
        </div>

        {/* Add Glossary Button */}
        <div
          className="bg-blue-500 w-fit mx-auto px-2 py-1 rounded-lg text-white mt-4 cursor-pointer"
          onClick={() => navigate("/add-glossary")}
        >
          + Add Glossary
        </div>
      </div>
    </div>
  );
};

export default MachineTranslate_V2;
