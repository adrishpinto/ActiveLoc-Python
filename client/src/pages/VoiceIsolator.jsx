import React, { useState } from "react";
import FileUploadEnchanced from "../components//upload_components/FileUploadEnhanced";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const VoiceIsolator = () => {
  const [audioURL, setAudioURL] = useState(null);
  const [error, setError] = useState(null);

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : null;
  };

  const isolateAudio = async () => {
    console.log("isolateAudio function called"); // Check if function runs

    const csrfToken = getCookie("csrf_access_token");
    console.log("CSRF Token:", csrfToken); // Debugging CSRF token

    if (!csrfToken) {
      console.error("No CSRF token found");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/isolate-audio`,
        {},
        {
          withCredentials: true,
          headers: { "X-CSRF-TOKEN": csrfToken },
          responseType: "blob",
        }
      );

      console.log("API Response:", response); // Debug API response

      const url = URL.createObjectURL(response.data);
      setAudioURL(url);
    } catch (error) {
      console.error("API Error:", error); // Log detailed error
      setError("Audio Processing Failed.");
      toast.error("Audio Processing Failed.");
    }
  };

  return (
    <div className="w-[80%] lg:w-[50%] border border-black mx-auto rounded-2xl my-20 p-10 flex flex-col ">
      <h1 className="mb-10 text-center text-3xl font-bold">Voice Isolator</h1>
      <FileUploadEnchanced />
      <button
        onClick={isolateAudio}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-8 w-fit mx-auto"
      >
        Process Audio
      </button>

      {audioURL && (
        <div className="mt-5 mx-auto">
          <audio controls>
            <source src={audioURL} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
};

export default VoiceIsolator;
