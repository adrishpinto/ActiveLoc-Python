import React, { useState } from "react";
import axios from "axios";
import FileUploadAudio from "../components//upload_components/FileUploadAudio";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const Speech2Text = () => {
  const [isTranscribed, setIsTranscribed] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [dialogue, setDialogue] = useState("");
  const [srt, setSrt] = useState("");
  const [error, setError] = useState(null);
  const [viewing, setViewing] = useState(null);

  const transcribe = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/transcribe`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setIsTranscribed(true);
        toast.success("Transcription data saved!");
      } else {
        setError("Failed to process transcription.");
      }
    } catch (error) {
      setError("Transcription Failed.");
      toast.error("Transcription Failed.");
    }
  };

  const fetchText = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/transcribe-text`,
        {},
        {
          withCredentials: true,
        }
      );

      setTranscription(response.data.text || "No transcription found.");
      setViewing("Text");
    } catch (error) {
      setError("Text Transcription Failed.");
      toast.error("Text Transcription Failed.");
    }
  };

  const fetchDialogue = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/transcribe-dialogue`,
        {},
        {
          withCredentials: true,
        }
      );

      setDialogue(response.data.dialogue || "No dialogue found.");
      setViewing("Dialogue");
    } catch (error) {
      setError("Dialogue Transcription Failed.");
      toast.error("Dialogue Transcription Failed.");
    }
  };

  const fetchSRT = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/transcribe-srt`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.data.subtitles) {
        const formattedSRT = response.data.subtitles
          .map(
            (item, index) =>
              `${index + 1}\n${item.start} --> ${item.end}\n${item.text}\n`
          )
          .join("\n");

        setSrt(formattedSRT);
        setViewing("SRT");
      }
    } catch (error) {
      setError("SRT Transcription Failed.");
      toast.error("SRT Transcription Failed.");
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
      <div className="w-[80%] lg:w-[50%] border border-black mx-auto rounded-2xl my-20 p-10">
        <h1 className="mb-10 text-center text-3xl">Speech to Text</h1>

        <FileUploadAudio />

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
          <div>
            <div className="flex items-center justify-center mt-10">
              <button
                onClick={transcribe}
                className="bg-blue-500 px-4 py-2 rounded text-white"
              >
                Transcribe
              </button>
            </div>

            <div className="flex items-center justify-center mt-10">
              <button
                onClick={fetchText}
                className="bg-cyan-500 mx-4 px-2 py-1 rounded text-white"
              >
                View Text
              </button>
              <button
                onClick={fetchDialogue}
                className="bg-emerald-500 mx-4 px-2 py-1 rounded text-white"
              >
                View Dialogue
              </button>
              <button
                onClick={fetchSRT}
                className="bg-purple-500 mx-4 px-2 py-1 rounded text-white"
              >
                View SRT
              </button>
            </div>
          </div>
        )}

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

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
