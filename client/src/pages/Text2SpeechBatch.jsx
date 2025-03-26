import { useEffect, useState } from "react";
import axios from "axios";
import FolderUploadT2S from "../components/FolderUploadT2S";
import { toast } from "react-toastify";
import LanguageDropdownT2S from "../components/LanguageDropdownT2S";

const API_URL = import.meta.env.VITE_API_URL;
const Text2SpeechBatch = () => {
  const [selectedVoice, setSelectedVoice] = useState("en-US-JennyNeural");
  const [files, setFiles] = useState([]);
  const [customNames, setCustomNames] = useState([]);
  const [uploadCheck, setUploadCheck] = useState(false);
  const [selectedPitch, setSelectedPitch] = useState("medium");
  const [selectedRate, setSelectedRate] = useState("medium");

  const updateArray = (index, value) => {
    setCustomNames((prev) => {
      const updatedNames = [...prev];
      updatedNames[index] = value;
      return updatedNames;
    });
  };

  const defaultNames = () => {
    if (customNames.length == 0) {
      for (let i = 0; i < files.length; i++) {
        let newFileExtension = files[i].name.split(".")[0];
        newFileExtension = newFileExtension + ".mp3";
        setCustomNames((prev) => [...prev, newFileExtension]);
      }
    }
  };

  const ResetDefaultNames = () => {
    setCustomNames([]);
    for (let i = 0; i < files.length; i++) {
      let newFileExtension = files[i].name.split(".")[0];
      newFileExtension = newFileExtension + ".mp3";
      setCustomNames((prev) => [...prev, newFileExtension]);
    }
  };

  useEffect(() => {
    defaultNames();
  }, [files.length]);

  const handleTextToSpeech = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/t2s_batch`,
        {
          voice: selectedVoice,
          custom_names: customNames,
          pitch: selectedPitch,
          rate: selectedRate,
        },
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/zip" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "speech_synthesis.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      //this error handling is longer than usual as it is handling for blob type return and not json
      console.error("Full error response:", error);

      if (error.response && error.response.data instanceof Blob) {
        //blob to json
        const reader = new FileReader();
        reader.onload = function () {
          try {
            const json = JSON.parse(reader.result);
            toast.error(json.error || "An unexpected error occurred");
          } catch (parseError) {
            console.error("Error parsing JSON:", parseError);
            toast.error("An unexpected error occurred");
          }
        };
        reader.readAsText(error.response.data);
      } else {
        toast.error(
          error.response?.data?.error || "An unexpected error occurred"
        );
      }
    }
  };

  return (
    <div>
      <div className="border-black lg:w-[50%] md:w-[70%] w-[90%] p-10 border mx-auto rounded-lg my-20 ">
        <h1 className="text-center text-3xl">Text to Speech Batch</h1>
        <FolderUploadT2S
          files={files}
          setFiles={setFiles}
          uploadCheck={uploadCheck}
          setUploadCheck={setUploadCheck}
        />

        <div className="my-10">
          <LanguageDropdownT2S
            selectedVoice={selectedVoice}
            setSelectedVoice={setSelectedVoice}
          />
        </div>
        <div className="flex gap-4 p-4 items-center justify-center mt-5 mb-10">
          {/* Pitch Selection */}
          <label className="flex flex-col">
            <span className="font-semibold">Select Pitch:</span>
            <select
              value={selectedPitch}
              onChange={(e) => setSelectedPitch(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="x-low">x-low</option>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
              <option value="x-high">x-high</option>
            </select>
          </label>

          {/* Rate Selection */}
          <label className="flex flex-col">
            <span className="font-semibold">Select Rate:</span>
            <select
              value={selectedRate}
              onChange={(e) => setSelectedRate(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="x-slow">x-slow</option>
              <option value="slow">slow</option>
              <option value="medium">medium</option>
              <option value="fast">fast</option>
              <option value="x-fast">x-fast</option>
            </select>
          </label>
        </div>

        {files.length == 0 && (
          <div className="text-center mb-10 text-xl mt-1 text-gray-500">
            {files.length} files are uploaded
          </div>
        )}
        <div className="mx-auto mt-10 flex flex-col">
          {files.length > 0 && (
            <div className="flex flex-col ">
              <h1 className="text-[22px] mb-2 font-semibold text-center">
                Add Custom Names (optional)
              </h1>

              <button
                onClick={ResetDefaultNames}
                className="my-2 mb-3 py-1 px-2  w-fit mx-auto bg-green-500 text-white hover:bg-green-600 rounded-md "
              >
                Reset Default Names
              </button>
              {customNames.map((name, index) => (
                <div
                  key={index}
                  className="flex flex-col mt-2 items-center w-[full] "
                >
                  <div>
                    <p className="mr-4 h-6 ml-2 font-semibold">{name}</p>
                    <input
                      type="text"
                      className="w-60 bg-slate-100  border border-blue-700 px-2 outline-none"
                      onChange={(e) => updateArray(index, e.target.value)}
                      placeholder={`rename file to ... `}
                    />
                    <p className="h-4 text-red-500 text-xs">
                      {!name && "please enter a file name"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {!uploadCheck && (
          <p className="text-center text-sm text-gray-400 mt-2">
            files not uploaded yet, click on "Upload Files" button
          </p>
        )}
        <div className="mx-auto w-fit">
          <button
            onClick={handleTextToSpeech}
            className="p-2 mt-1 bg-blue-500 text-white rounded"
          >
            Convert Text to Speech
          </button>
        </div>
      </div>
    </div>
  );
};

export default Text2SpeechBatch;
