import axios from "axios";
import { useState, useEffect } from "react";
import PostEditTranslate from "./PostEditTranslate";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [name, setName] = useState("");

  const getUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/user`, { withCredentials: true });
      setName(res.data.first_name);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full border py-10">
      <h1 className="text-center text-4xl">
        Welcome, <span className="font-semibold">{name || "User"}!</span>
      </h1>
      <h1 className="text-center text-4xl mt-20 font-[200]">Our Sevices</h1>
      <div className="border flex sm:flex-row gap-4 items-center justify-center flex-col mt-10 flex-wrap">
        <Card name="Machine Translation" link="machine-translate" />
        <Card name="Post Edit Translation" link="postedit-translate" />
        <Card name="Speech to Text" link="speechtotext" />
        <Card name="Voice Isolator" link="voice-isolator" />
        <Card name="Text to Speech" link="texttospeech" />
        <Card name="Text to Speech Batch" link="texttospeechbatch" />
      </div>
    </div>
  );
};

const Card = ({ name, link }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="border border-gray-400 rounded-xl w-[300px] h-[250px] p-2 mt-5 cursor-hover">
        <div
          onClick={() => navigate(`/${link}`)}
          className="border border-gray-300 rounded w-full h-full p-2 bg-blue-200 flex items-center justify-center cursor-pointer hover:bg-blue-300 "
        >
          <h1 className="text-center text-3xl font-[300]">{name}</h1>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
