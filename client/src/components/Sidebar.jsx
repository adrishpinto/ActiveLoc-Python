import { useState } from "react";
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
import axios from "axios";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

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

  // Function to check if the link is active
  const isActive = (x) => (location.pathname === x ? "bg-gray-200" : "");

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
          isOpen ? "w-64" : "w-20"
        }`}
      >
        <h5
          className={`text-base font-semibold  text-gray-500 uppercase dark:text-gray-400 ml-14 mt-1 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          Menu
        </h5>

        {/* Sidebar Menu */}
        <ul className="py-4 space-y-2 font-medium">
          <li>
            <button
              onClick={() => navigate("/Dashboard")}
              className={`relative group flex items-center ${
                isOpen ? "justify-start" : "justify-center"
              } w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive(
                "/Dashboard"
              )}`}
            >
              <IoHomeSharp size={20} />
              <span
                className={`ms-3 transition-all ${isOpen ? "block" : "hidden"}`}
              >
                Dashboard
              </span>

              {/* Tooltip for collapsed sidebar */}
              {!isOpen && (
                <span className="absolute left-full ml-2 px-2 py-1 text-sm text-white bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity tooltip-arrow">
                  Dashboard
                </span>
              )}
            </button>
          </li>

          {/* Translation Section */}
          <div className={`${isOpen ? "pt-4 space-y-1" : "pt-0 space-y-2"}`}>
            {isOpen && (
              <div className="flex items-center w-full my-2">
                <div className="w-[45%] h-[1px] bg-gray-300"></div>
                <p className="text-[12px] text-gray-400 font-[400] mx-2">
                  Translation
                </p>
                <div className="w-[50%] h-[1px] bg-gray-300"></div>
              </div>
            )}
            <li>
              <button
                onClick={() => navigate("/machine-translate")}
                className={`relative group flex items-center ${
                  isOpen ? "justify-start" : "justify-center"
                } w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive(
                  "/machine-translate"
                )}`}
              >
                <MdGTranslate size={20} />
                <span
                  className={`ms-3 transition-all ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  Machine Translation
                </span>

                {!isOpen && (
                  <span className="absolute left-full ml-2 px-2 py-1 text-sm text-white bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity tooltip-arrow">
                    Machine Translation
                  </span>
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/postedit-translate")}
                className={`relative group flex items-center ${
                  isOpen ? "justify-start" : "justify-center"
                } w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive(
                  "/postedit-translate"
                )}`}
              >
                <FaEdit size={20} />
                <span
                  className={`ms-3 transition-all ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  Post Edit Translation
                </span>

                {!isOpen && (
                  <span className="absolute left-full ml-2 px-2 py-1 text-sm text-white bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity tooltip-arrow">
                    Post Edit Translation
                  </span>
                )}
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/merge-mtpe")}
                className={`relative group flex items-center ${
                  isOpen ? "justify-start" : "justify-center"
                } w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive(
                  "/merge-mtpe"
                )}`}
              >
                <VscCombine size={20} />
                <span
                  className={`ms-3 transition-all ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  Merge MTPE
                </span>

                {!isOpen && (
                  <span className="absolute left-full ml-2 px-2 py-1 text-sm text-white bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity tooltip-arrow">
                    Merge MTPE
                  </span>
                )}
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/workbench")}
                className={`relative group flex items-center ${
                  isOpen ? "justify-start" : "justify-center"
                } w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive(
                  "/workbench"
                )}`}
              >
                <FileCode className="w-5 h-5" />
                <span
                  className={`ms-3 transition-all ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  Workbench
                </span>

                {!isOpen && (
                  <span className="absolute left-full ml-2 px-2 py-1 text-sm text-white bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity tooltip-arrow">
                    Workbench
                  </span>
                )}
              </button>
            </li>
          </div>

          {/* Speech Section */}
          <div className={`${isOpen ? "pt-4 space-y-1" : "pt-0 space-y-2"}`}>
            {isOpen && (
              <div className="flex items-center w-full my-2">
                <div className="w-[45%] h-[1px] bg-gray-300"></div>
                <p className="text-[12px] text-gray-400 font-[400] mx-2">
                  Speech
                </p>
                <div className="w-[50%] h-[1px] bg-gray-300"></div>
              </div>
            )}

            <li>
              <button
                onClick={() => navigate("/speechtotext")}
                className={`relative group flex items-center ${
                  isOpen ? "justify-start" : "justify-center"
                } w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive(
                  "/speechtotext"
                )}`}
              >
                <FaMicrophoneAlt size={20} />
                <span
                  className={`ms-3 transition-all ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  Speech to Text
                </span>

                {!isOpen && (
                  <span className="absolute left-full ml-2 px-2 py-1 text-sm text-white bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity tooltip-arrow">
                    Speech to Text
                  </span>
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/voice-isolator")}
                className={`relative group flex items-center ${
                  isOpen ? "justify-start" : "justify-center"
                } w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive(
                  "/voice-isolator"
                )}`}
              >
                <GiSoundWaves size={20} />
                <span
                  className={`ms-3 transition-all ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  Voice Isolator
                </span>

                {!isOpen && (
                  <span className="absolute left-full ml-2 px-2 py-1 text-sm text-white bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity tooltip-arrow">
                    Voice Isolator
                  </span>
                )}
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/texttospeech")}
                className={`relative group flex items-center ${
                  isOpen ? "justify-start" : "justify-center"
                } w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive(
                  "/texttospeech"
                )}`}
              >
                <GiSpeaker size={20} />
                <span
                  className={`ms-3 transition-all ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  Text to Speech
                </span>

                {!isOpen && (
                  <span className="absolute left-full ml-2 px-2 py-1 text-sm text-white bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity tooltip-arrow">
                    Text to Speech
                  </span>
                )}
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/texttospeechbatch")}
                className={`relative group flex items-center ${
                  isOpen ? "justify-start" : "justify-center"
                } w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive(
                  "/texttospeechbatch"
                )}`}
              >
                <GiSpeaker
                  className="text-white bg-black rounded-xl"
                  size={20}
                />
                <span
                  className={`ms-3 transition-all ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  Text to Speech Batch
                </span>

                {!isOpen && (
                  <span className="absolute left-full ml-2 px-2 py-1 text-sm text-white bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity tooltip-arrow">
                    Text to Speech Batch
                  </span>
                )}
              </button>
            </li>
          </div>

          {/* Settings */}
          <li className="pt-10">
            <button
              onClick={() => navigate("/settings")}
              className={`relative group flex items-center ${
                isOpen ? "justify-start" : "justify-center"
              } w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive(
                "/settings"
              )}`}
            >
              <IoSettings size={20} />
              <span
                className={`ms-3 transition-all ${isOpen ? "block" : "hidden"}`}
              >
                Settings
              </span>

              {!isOpen && (
                <span className="absolute left-full ml-2 px-2 py-1 text-sm text-white bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity tooltip-arrow">
                  Settings
                </span>
              )}
            </button>
          </li>

          {/* Logout */}
          <li>
            <button
              onClick={logout}
              className={`relative group flex items-center ${
                isOpen ? "justify-start" : "justify-center"
              } w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <CiLogout size={20} />
              <span
                className={`ms-3 transition-all ${isOpen ? "block" : "hidden"}`}
              >
                Logout
              </span>

              {!isOpen && (
                <span className="absolute left-full ml-2 px-2 py-1 text-sm text-white bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity tooltip-arrow">
                  Logout
                </span>
              )}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
