import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MachineTranslate from "./pages/MachineTranslate";
import PostEditTranslate from "./pages/PostEditTranslate";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Speech2Text from "./pages/Speech2Text";
import VoiceIsolator from "./pages/VoiceIsolator";
import FileList from "./pages/FileList";
import Text2Speech from "./pages/Text2Speech";
import Text2SpeechBatch from "./pages/Text2SpeechBatch";
import LanguageDropdown from "./components/LanguageDropdownT2S";
import MergeMTPE from "./pages/MergeMTPE";
import Workbench from "./pages/Workbench";
import Test from "./pages/Test";
import UserProfile from "./pages/UserProfile";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout"; // extracted layout component

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Non-layout routes */}
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Layout-wrapped routes */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/machine-translate" element={<MachineTranslate />} />
          <Route path="/postedit-translate" element={<PostEditTranslate />} />
          <Route path="/speechtotext" element={<Speech2Text />} />
          <Route path="/voice-isolator" element={<VoiceIsolator />} />
          <Route path="/file-list" element={<FileList />} />
          <Route path="/texttospeech" element={<Text2Speech />} />
          <Route path="/texttospeechbatch" element={<Text2SpeechBatch />} />
          <Route path="/t" element={<LanguageDropdown />} />
          <Route path="/merge-mtpe" element={<MergeMTPE />} />
          <Route path="/workbench" element={<Workbench />} />
          <Route path="/test" element={<Test />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}
