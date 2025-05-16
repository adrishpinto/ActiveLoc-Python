import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { IoHomeSharp, IoSettings } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

import { FaUserPlus } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";

import axios from "axios";

const MenuItem = ({
  icon,
  label,
  path,
  isOpen,
  onClick,
  customClasses = "",
}) => {
  const location = useLocation();
  const isActive = location.pathname === path ? "bg-gray-200" : "";

  return (
    <li>
      <button
        onClick={onClick}
        className={`relative group flex items-center ${
          isOpen ? "justify-start" : "justify-center"
        } w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive} ${customClasses}`}
      >
        {icon}
        <span className={`ms-3 transition-all ${isOpen ? "block" : "hidden"}`}>
          {label}
        </span>

        {!isOpen && (
          <span className="absolute left-full ml-2 px-2 py-1 text-sm text-white bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity tooltip-arrow">
            {label}
          </span>
        )}
      </button>
    </li>
  );
};

const CustomerSidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const logout = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/logout`,
        {},
        { withCredentials: true }
      );
      navigate("/");
      console.log(response.data.message);
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-6 z-50 p-2 bg-gray-800 text-white rounded-lg"
      >
        {!isOpen ? <FaBars /> : <IoMdClose />}
      </button>

      <div
        className={`fixed top-0 left-0 z-40 h-screen p-4 bg-white dark:bg-gray-800 transition-all border-r border-gray-300 ${
          isOpen ? "w-64 overflow-auto" : "w-20"
        }`}
      >
        <h5
          className={`text-base font-semibold text-gray-500 uppercase dark:text-gray-400 ml-14 mt-1 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          Menu
        </h5>

        <ul className="py-4 space-y-2 font-medium">
          <MenuItem
            icon={<IoHomeSharp size={20} />}
            label="Dashboard"
            path="/dashboard-c"
            isOpen={isOpen}
            onClick={() => navigate("/dashboard-c")}
          />

          <MenuItem
            icon={<FaUserCircle size={20} />}
            label="User Profile"
            path="/user-profile"
            isOpen={isOpen}
            onClick={() => navigate("/user-profile")}
          />

          <MenuItem
            icon={<IoSettings size={20} />}
            label="Settings"
            path="/settings"
            isOpen={isOpen}
            onClick={() => navigate("/settings")}
          />

          <MenuItem
            icon={<CiLogout size={20} />}
            label="Logout"
            path="#"
            isOpen={isOpen}
            onClick={logout}
          />

          <MenuItem
            icon={<CiCirclePlus size={20} />}
            label="Add Requirement"
            path="/requirement-form"
            isOpen={isOpen}
            onClick={() => navigate("/requirements-form")}
          />
        </ul>
      </div>
    </>
  );
};

export default CustomerSidebar;
