import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const PostEditTranslate = () => {
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
    try {
      const res = await axios.get(`${API_URL}/convert`);
    } catch (error) {
      console.log("error:", error);
    }
  };

  //download
  const downloadFile = async () => {
    try {
      const response = await fetch(`${API_URL}/download_xliff`);
      if (!response.ok) throw new Error("Failed to download file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "downloaded_file.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div>
      <div className="w-[80%] lg:w-[50%] border border-black mx-auto rounded-2xl mt-20 p-10 mb-20">
        <h1 className="text-center mb-10 text-3xl">MTPE - html</h1>
        <div className="flex items-center justify-center">
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
