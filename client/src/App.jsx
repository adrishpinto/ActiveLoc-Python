import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import MachineTranslate from "./components/MachineTranslate";
import PostEditTranslate from "./components/PostEditTranslate";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

function Layout() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isLoginPage = location.pathname === "/";

  return (
    <div className="flex">
      {!isLoginPage && <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />}
      <div className={`flex-1 ${!isLoginPage ? (isOpen ? "sm:ml-64" : "sm:ml-16") : ""}`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/machine-translate" element={<MachineTranslate />} />
          <Route path="/postedit-translate" element={<PostEditTranslate />} />
        </Routes>
      </div>
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
