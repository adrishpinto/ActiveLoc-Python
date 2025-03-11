import React, { useState } from "react";
import axios from "axios";
import FileUploadAudio from "../components/FileUploadAudio";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const Speech2Text = () => {
  const [isTranscribed, setIsTranscribed] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [dialogue, setDialogue] = useState("");
  const [srt, setSrt] = useState("");
  const [error, setError] = useState(null);
  const [viewing, setViewing] = useState(null);

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : null;
  };

  const transcribe = async () => {
    try {
      const csrfToken = getCookie("csrf_access_token");
      if (!csrfToken) {
        toast.error("CSRF token missing.");
        return;
      }

      const response = await axios.post(
        `${API_URL}/transcribe`,
        {},
        {
          withCredentials: true,
          headers: { "X-CSRF-TOKEN": csrfToken },
        }
      );

      if (response.data.success) {
        setIsTranscribed(true);
        toast.success("Transcription data saved!");
      } else {
        setError("Failed to process transcription.");
      }
    } catch (error) {
      console.error("Error in transcription:", error);
      setError("Transcription Failed.");
      toast.error("Transcription Failed.");
    }
  };

  const fetchTranscription = async (endpoint, setState, type) => {
    try {
      const csrfToken = getCookie("csrf_access_token");
      if (!csrfToken) {
        toast.error("CSRF token missing.");
        return;
      }
  
      const response = await axios.post(`${API_URL}/${endpoint}`, {}, {
        withCredentials: true,
        headers: { "X-CSRF-TOKEN": csrfToken },
      });
  
      console.log("API Response:", response.data);
  
      if (response.data.text || response.data.dialogue || response.data.subtitles) {
        if (type === "SRT") {
          const srtFormat = response.data.subtitles.map((item, index) => 
            `${index + 1}\n${item.start} --> ${item.end}\n${item.text}\n`
          ).join("\n");
          
          setState(srtFormat);
        } else {
          setState(response.data.text || response.data.dialogue);
        }
        setViewing(type);
      } else {
        setError(`Failed to retrieve ${type} transcription.`);
      }
    } catch (error) {
      console.error(`Error fetching ${type} transcription:`, error);
      setError(`${type} Transcription Failed.`);
      toast.error(`${type} Transcription Failed.`);
    }
  };
  

  const downloadAsFile = (data, fileName, fileType) => {
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.${fileType}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="w-[80%] lg:w-[50%] border border-black mx-auto rounded-2xl my-32 p-10">
        <h1 className="mb-10 text-center text-3xl">Speech to Text</h1>

        <FileUploadAudio />

        {/* INITIAL TRANSCRIBE BUTTON */}
        {!isTranscribed ? (
          <div className="flex items-center justify-center mt-10">
            <button
              onClick={transcribe}
              className="bg-blue-500 px-4 py-2 rounded text-white"
            >
              Transcribe
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center mt-10">
            <button
              onClick={() =>
                fetchTranscription("transcribe_text", setTranscription, "Text")
              }
              className="bg-blue-500 mx-4 px-2 py-1 rounded text-white"
            >
              View Text
            </button>
            <button
              onClick={() =>
                fetchTranscription(
                  "transcribe_dialogue",
                  setDialogue,
                  "Dialogue"
                )
              }
              className="bg-green-500 mx-4 px-2 py-1 rounded text-white"
            >
              View Dialogue
            </button>
            <button
              onClick={() =>
                fetchTranscription("transcribe_srt", setSrt, "SRT")
              }
              className="bg-purple-500 mx-4 px-2 py-1 rounded text-white"
            >
              View SRT
            </button>
          </div>
        )}

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* DISPLAY SELECTED TRANSCRIPTION */}
        {viewing && (
          <div className="mt-4">
            <h2 className="font-bold text-center">{viewing} Transcription:</h2>
            <textarea
              value={
                viewing === "Text"
                  ? transcription
                  : viewing === "Dialogue"
                  ? dialogue
                  : srt
              }
              readOnly
              className="w-full p-2 border rounded mt-2"
              rows={6}
            />
            <div className="flex justify-center mt-4">
              <button
                onClick={() =>
                  downloadAsFile(
                    viewing === "Text"
                      ? transcription
                      : viewing === "Dialogue"
                      ? dialogue
                      : srt,
                    viewing.toLowerCase(),
                    viewing === "SRT" ? "srt" : "txt"
                  )
                }
                className="bg-gray-700 px-4 py-2 text-white rounded"
              >
                Download as {viewing === "SRT" ? ".srt" : ".txt"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Speech2Text;
