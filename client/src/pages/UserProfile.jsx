import axios from "axios";
import { useState, useEffect } from "react";
import PostEditTranslate from "./PostEditTranslate";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState("");
  const [status, setStatus] = useState("");
  const [id, setID] = useState("");
  const getUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/user`, { withCredentials: true });
      setFName(res.data.first_name);
      setLName(res.data.last_name);
      setEmail(res.data.email);
      setGroup(res.data.group);
      setStatus(res.data.status);
      setID(res.data.user_id);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <div className="p-10">
        <h1 className="font-[300]  text-4xl">User Details</h1>
        <div className="mt-6 text-lg ">
          <div className="grid grid-cols-[auto_1fr] gap-y-4 gap-x-4 p-2">
            <h2 className="text-base">Name:</h2>
            <h2 className="text-base bg-gray-200 px-3 w-fit rounded-full text-gray-600">
              {fname} {lname}
            </h2>

            <h2 className="text-base">Email:</h2>
            <h2 className="text-base bg-gray-200 px-3 w-fit rounded-full text-center text-gray-600">
              {email}
            </h2>

            <h2 className="text-base">Group:</h2>
            <h2 className="text-base bg-gray-200 px-3 w-fit rounded-full text-center text-gray-600">
              {group}
            </h2>

            <h2 className="text-base">Status:</h2>
            <h2
              className={`text-base bg-gray-200 px-3 w-fit rounded-full text-center  ${
                status
                  ? "bg-green-200 text-green-600"
                  : "bg-red-200 text-red-500"
              }`}
            >
              {status ? "Activated" : "Deactivated"}
            </h2>

            <h2 className="text-base">ID:</h2>
            <h2 className="text-base bg-gray-200 px-3 w-fit rounded-full text-center text-gray-600">
              {id}
            </h2>
          </div>
          <p
            className="mt-4 bg-blue-500 w-fit text-base px-4 py-1 rounded-lg text-white cursor-pointer"
            onClick={() => {
              navigate("/reset-password");
            }}
          >
            Reset Password
          </p>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
