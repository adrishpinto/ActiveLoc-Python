import { useState } from "react";
import FileUpload from "../components/FileUploadMerge";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const MergeMTPE = () => {
  const [file1, setFile1] = useState(false);
  const [file2, setFile2] = useState(false);

  const mergeFiles = async () => {
    try {
      const response = await axios.post(
        "/merge-file",
        {},
        {
          withCredentials: true,
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "merged_file.docx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      console.log("File download initiated");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      throw error;
    }
  };

  return (
    <div className="w-[80%] lg:w-[60%] border border-black mx-auto rounded-2xl my-20 p-10 flex items-center justify-center flex-col">
      <h1 className="text-3xl mb-8 text-center">Merge Files</h1>
      <div className="border-2 border-gray-700 bg-gray-200 my-4 p-2 rounded-lg">
        <p>
          Make sure the original file name and post edit file name are the same
        </p>
        <p>post-edit filename = original filename + .xlf</p>
      </div>
      <div className="flex gap-10">
        <FileUpload
          name="original file"
          fileC={file1}
          setFileC={setFile1}
          api="original"
        />
        <FileUpload
          name="post-edit xlf"
          fileC={file2}
          setFileC={setFile2}
          api="xlf"
        />
      </div>
      <button
        onClick={mergeFiles}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-10 flex items-center justify-center"
      >
        Merge
      </button>
    </div>
  );
};

export default MergeMTPE;
