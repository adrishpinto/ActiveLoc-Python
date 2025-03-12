import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import MachineTranslate from "./pages/MachineTranslate";
import PostEditTranslate from "./pages/PostEditTranslate";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Speech2Text from "./pages/Speech2Text";
import VoiceIsolator from "./pages/VoiceIsolator";

function Layout() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const isLoginPage = location.pathname === "/";

  return (
    <div className="flex">
      {!isLoginPage && <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />}
      <div
        className={`flex-1 ${
          !isLoginPage ? (isOpen ? "sm:ml-64" : "sm:ml-16") : ""
        }`}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/machine-translate" element={<MachineTranslate />} />
          <Route path="/postedit-translate" element={<PostEditTranslate />} />
          <Route path="/speechtotext" element={<Speech2Text />} />
          <Route path="/voice-isolator" element={<VoiceIsolator />} />
        </Routes>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
