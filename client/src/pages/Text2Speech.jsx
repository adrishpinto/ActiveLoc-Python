import { useState } from "react";
import LanguageDropdownT2S from "../components/LanguageDropdownT2S";

const API_URL = import.meta.env.VITE_API_URL;

export default function LanguageDropdown() {
  const [selectedVoice, setSelectedVoice] = useState("");
  const [text, setText] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [audioKey, setAudioKey] = useState(0);
  const [rate, setRate] = useState("");
  const [pitch, setPitch] = useState("");

  const synthesizeSpeech = async () => {
    if (!text || !selectedVoice) {
      alert("Please enter text and select a voice.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/synthesize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice: selectedVoice, rate, pitch }),
      });

      const data = await response.json();
      if (response.ok) {
        setAudioFile(`${API_URL}${data.file}`);
        setAudioKey((prevKey) => prevKey + 1);
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      alert("Failed to connect to the server");
    }
  };

  return (
    <div className="flex flex-col  w-[50%] my-20 border p-10 border-black rounded-lg mx-auto">
      <h1 className="text-center text-3xl mb-5">Text to Speech</h1>
      {/* Language Dropdown */}

      <div className="mb-10">
        <LanguageDropdownT2S
          selectedVoice={selectedVoice}
          setSelectedVoice={setSelectedVoice}
        />
      </div>

      {/* rate and ptich */}

      <div className="  mx-auto  border bg-slate-50 px-20 py-2 rounded-lg mb-5">
        <div className="flex gap-4">
          <div>
            <h2>Rate</h2>
            <input
              type="text"
              className="outline-none bg-slate-200"
              placeholder="-100% - 100%"
              value={rate}
              onChange={(e) => {
                setRate(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <h2>Pitch</h2>
            <input
              type="text"
              className="outline-none bg-slate-200"
              placeholder="-100% - 100%"
              value={pitch}
              onChange={(e) => {
                setPitch(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <h2 className="mt-2 text-xs ">note: 0% is default value</h2>
      </div>
      {/* Text Input */}

      <div>
        <textarea
          className="p-2 rounded bg-white mt-6 w-full h-40 outline-none border-2 focus:border-blue-400 "
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to synthesize..."
        />
      </div>

      {/* Synthesize Button */}
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={synthesizeSpeech}
        disabled={!selectedVoice || !text}
      >
        Synthesize Speech
      </button>

      {/* Audio Player */}
      <div className="mx-auto">
        {audioFile && (
          <audio key={audioKey} controls className="mt-4">
            <source src={audioFile} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
}
