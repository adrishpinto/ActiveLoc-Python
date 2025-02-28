import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdGTranslate } from "react-icons/md";
import { IoHomeSharp, IoSettings } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("userData");
      navigate("./");
    } catch (err) {
      console.log(err.response?.data?.error || "Logout failed");
    }
  };

  // Function to check if the link is active
  const isActive = (x) => (location.pathname == x ? "bg-gray-200" : "");

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg"
      >
        {!isOpen ? <FaBars /> : <IoMdClose />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-screen -translate-x-full p-4 bg-white dark:bg-gray-800 transition-transform border-r border-gray-300 ${
          isOpen ? "translate-x-0" : "-translate-x-[100%]"
        }`}
      >
        <h5 className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400 ml-10 mt-1">
          Menu
        </h5>

        {/* Sidebar Menu */}
        <ul className="py-4 space-y-2 font-medium">
          <li>
            <a
              href="/Dashboard"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive(
                "/Dashboard"
              )}`}
            >
              <IoHomeSharp />
              <span className="ms-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="/machine-translate"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive(
                "/machine-translate"
              )}`}
            >
              <MdGTranslate />
              <span className="ms-3">Machine Translation</span>
            </a>
          </li>
          <li>
            <a
              href="/postedit-translate"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive(
                "/postedit-translate"
              )}`}
            >
              <MdGTranslate />
              <span className="ms-3">Post Edit Translation</span>
            </a>
          </li>
          <li>
            <a
              href="/settings"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive(
                "/settings"
              )}`}
            >
              <IoSettings />
              <span className="ms-3">Settings</span>
            </a>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <CiLogout />
              <span className="ms-3">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
