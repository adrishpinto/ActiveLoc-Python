import { useState } from "react";
import { toast } from "react-toastify";
import { getCsrfToken } from "../utils/csrfUtils";

const FolderUploadT2S = ({ setFiles, files, uploadCheck, setUploadCheck }) => {
  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("No files selected");
      return;
    }

    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    try {
      const response = await fetch("http://localhost:5000/upload_folder", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setUploadCheck(true);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Error uploading files");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md w-80 mx-auto mt-10">
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="block w-full mb-2 bg-blue-200"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-400"
      >
        Upload Files
      </button>
    </div>
  );
};

export default FolderUploadT2S;
