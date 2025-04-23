import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdGTranslate } from "react-icons/md";
import { IoHomeSharp, IoSettings } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";
import { FaMicrophoneAlt } from "react-icons/fa";
import { GiSoundWaves } from "react-icons/gi";
import { GiSpeaker } from "react-icons/gi";
import { VscCombine } from "react-icons/vsc";
import { FileCode } from "lucide-react";
import { FaEdit } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import axios from "axios";

// Menu Item Component
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

// Section Divider Component
const SectionDivider = ({ label, isOpen, x }) => {
  if (!isOpen) return null;

  return (
    <div className="flex items-center w-full my-2">
      <div className={`${x ? "w-[30%]" : "w-[45%]"} h-[1px] bg-gray-300`}></div>
      <p className="text-[12px] text-gray-400 font-[400] mx-2">{label}</p>
      <div className={`${x ? "w-[30%]" : "w-[45%]"} h-[1px] bg-gray-300`}></div>
    </div>
  );
};

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [group, setGroup] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const getUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/user`, { withCredentials: true });
      setGroup(res.data.group);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-6 z-50 p-2 bg-gray-800 text-white rounded-lg"
      >
        {!isOpen ? <FaBars /> : <IoMdClose />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-screen p-4 bg-white dark:bg-gray-800 transition-all border-r border-gray-300 ${
          isOpen ? "w-72 overflow-auto" : "w-20"
        }`}
      >
        <h5
          className={`text-base font-semibold text-gray-500 uppercase dark:text-gray-400 ml-14 mt-1 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          Menu
        </h5>

        {/* Sidebar Menu */}
        <ul className="py-4 space-y-2 font-medium">
          {/* Main Section */}
          <MenuItem
            icon={<IoHomeSharp size={20} />}
            label="Dashboard"
            path="/Dashboard"
            isOpen={isOpen}
            onClick={() => navigate("/Dashboard")}
          />

          {/* Translation Section */}
          <div className={`${isOpen ? "pt-4 space-y-1" : "pt-0 space-y-2"}`}>
            <SectionDivider label="Translation" isOpen={isOpen} />

            <MenuItem
              icon={<MdGTranslate size={20} />}
              label="Machine Translation"
              path="/machine-translate"
              isOpen={isOpen}
              onClick={() => navigate("/machine-translate")}
            />

            <MenuItem
              icon={<MdGTranslate size={20} className="text-cyan-800" />}
              label="Machine Translation V2"
              path="/machine-translate_v2"
              isOpen={isOpen}
              onClick={() => navigate("/machine-translate_v2")}
            />

            <MenuItem
              icon={<FaEdit size={20} />}
              label="Post Edit Translation"
              path="/postedit-translate"
              isOpen={isOpen}
              onClick={() => navigate("/postedit-translate")}
            />

            <MenuItem
              icon={<VscCombine size={20} />}
              label="Merge MTPE"
              path="/merge-mtpe"
              isOpen={isOpen}
              onClick={() => navigate("/merge-mtpe")}
            />

            <MenuItem
              icon={<FileCode className="w-5 h-5" />}
              label="Workbench"
              path="/workbench"
              isOpen={isOpen}
              onClick={() => navigate("/workbench")}
            />
          </div>

          {/* Speech Section */}
          <div className={`${isOpen ? "pt-4 space-y-1" : "pt-0 space-y-2"}`}>
            <SectionDivider label="Speech" isOpen={isOpen} />

            <MenuItem
              icon={<FaMicrophoneAlt size={20} />}
              label="Speech to Text"
              path="/speechtotext"
              isOpen={isOpen}
              onClick={() => navigate("/speechtotext")}
            />

            <MenuItem
              icon={<GiSoundWaves size={20} />}
              label="Voice Isolator"
              path="/voice-isolator"
              isOpen={isOpen}
              onClick={() => navigate("/voice-isolator")}
            />

            <MenuItem
              icon={<GiSpeaker size={20} />}
              label="Text to Speech"
              path="/texttospeech"
              isOpen={isOpen}
              onClick={() => navigate("/texttospeech")}
            />

            <MenuItem
              icon={
                <GiSpeaker
                  className="text-white bg-black rounded-xl"
                  size={20}
                />
              }
              label="Text to Speech Batch"
              path="/texttospeechbatch"
              isOpen={isOpen}
              onClick={() => navigate("/texttospeechbatch")}
            />
          </div>

          {/* User Management Section */}
          {(group === "Sales" ||
            group === "Operations" ||
            group === "Admin") && (
            <div className={`${isOpen ? "pt-4 space-y-1 " : "pt-0 space-y-2"}`}>
              <SectionDivider label="Manage Users" isOpen={isOpen} x={true} />

              {group === "Sales" && (
                <MenuItem
                  icon={<FaUserPlus size={20} />}
                  label="Manage Customers"
                  path="/customer-table"
                  isOpen={isOpen}
                  onClick={() => navigate("/customer-table")}
                />
              )}

              {group === "Operations" && (
                <MenuItem
                  icon={<FaUserPlus size={20} />}
                  label="Manage Vendors"
                  path="/vendor-table"
                  isOpen={isOpen}
                  onClick={() => navigate("/vendor-table")}
                />
              )}

              {group === "Admin" && (
                <MenuItem
                  icon={<FaUserPlus size={20} />}
                  label="Manage Users"
                  path="/user-table"
                  isOpen={isOpen}
                  onClick={() => navigate("/user-table")}
                />
              )}
              <MenuItem
                icon={<CiBoxList size={20} />}
                label="Quotation Table"
                path="/quotation"
                isOpen={isOpen}
                onClick={() => navigate("/quotation-table")}
              />

              <MenuItem
                icon={<CiCirclePlus size={20} />}
                label="Add Requirement"
                path="/requirement-form"
                isOpen={isOpen}
                onClick={() => navigate("/requirements-form")}
              />
            </div>
          )}

          {/* Profile Section */}
          <MenuItem
            icon={<FaUserCircle size={20} />}
            label="User Profile"
            path="/user-profile"
            isOpen={isOpen}
            onClick={() => navigate("/user-profile")}
            customClasses="pt-10"
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
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
