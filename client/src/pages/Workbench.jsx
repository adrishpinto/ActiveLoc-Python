import FileUpload from "../components/upload_components/FileUploadWorkbench";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

const Workbench = () => {
  const [checkFile, setCheckFile] = useState(false);
  const [sources, setSources] = useState([]);

  const [targets, setTargets] = useState([]);

  const handleEditorChange = (index, newValue) => {
    const updated = [...targets];
    updated[index] = newValue;
    setTargets(updated);
    console.log("Updated targets:", updated);
  };

  const getXlfData = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/load-workbench`,
        {},
        { withCredentials: true }
      );
      setSources(res.data.sources);
      setTargets(res.data.targets);
      return res.data;
    } catch (error) {
      console.error("Failed to load XLF data:", error);
      throw error;
    }
  };

  const updateWorkbench = async (targetsArray) => {
    try {
      const response = await axios.post(
        `${API_URL}/workbench-update`,
        { targets: targetsArray },
        {
          responseType: "blob",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const blob = new Blob([response.data], { type: "application/xml" });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      link.download = "updated_file.xlf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log("File downloaded successfully");
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (checkFile) {
      getXlfData();
    }
  }, [checkFile]);

  return (
    <div className="my-20 min-h-[500px] border rounded-xl w-[100%] max-w-[100wh] mx-auto py-10">
      <h1 className="text-4xl text-center mb-5">Workbench</h1>

      {!checkFile && (
        <div>
          <FileUpload checkFile={checkFile} setCheckFile={setCheckFile} />
          <p className="text-gray-600 text-center font-[300] mt-5">
            Upload .xlf file to load source and target
          </p>
        </div>
      )}

      {sources.length === 0 && targets.length === 0 && checkFile && (
        <div className="flex items-center justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-blue-600 font-medium">Loading...</span>
        </div>
      )}

      <div className="space-y-5">
        {sources.map((source, index) => (
          <div key={index} className="flex flex-row  gap-2 items-stretch ">
            {/* Source */}
            <div className="w-[44%] border border-black rounded px-3 py-1 ">
              {source || (
                <span className="text-red-500 bg-red-100 px-2 py-1">
                  [empty segment]
                </span>
              )}
            </div>

            {/* Target Editor */}
            <textarea
              className="w-[48%]  border border-black px-3 rounded outline-none resize-none focus:bg-slate-50 focus:border-blue-500"
              value={targets[index]}
              onChange={(e) => handleEditorChange(index, e.target.value)}
            />

            {/* Status */}
            <div className="w-[4%] border border-black flex items-center justify-center py-1  ">
              {targets[index] ? (
                <FaCheck className="text-green-500" />
              ) : (
                <div className="text-red-500">❌</div>
              )}
            </div>
          </div>
        ))}
        {targets.length > 1 && sources.length > 1 && (
          <div
            className="mx-auto bg-blue-500 px-5 rounded-lg my-5 cursor-pointer hover:bg-blue-400 py-2 text-white w-fit"
            onClick={() => updateWorkbench(targets)}
          >
            Convert
          </div>
        )}
      </div>
    </div>
  );
};

export default Workbench;
