// Layout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={`flex-1 ${isOpen ? "sm:ml-64" : "sm:ml-16"}`}>
        <Outlet />
      </div>
    </div>
  );
}
