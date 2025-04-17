import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CustomerSidebar from "./groups/customer/components/CustomerSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Layout() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/user`, {
          withCredentials: true,
        });
        setGroup(res.data.group);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  if (group === null)
    return (
      <div>
        <div className="flex flex-col items-center justify-center h-screen text-2xl font-[300] ">
          <div className="ml-8 flex">
            Loading
            <div className="w-8 h-8 border-t-2 border-b-2 ml-4 border-blue-500 rounded-full animate-spin"></div>
          </div>
          <div
            className="text-xs underline text-gray-500  font-semibold mt-5 cursor-pointer"
            onClick={() => navigate("/")}
          >
            click here to re-login if wait time is above one minute
          </div>
        </div>
      </div>
    );

  if (group === "Admin" || group === "Sales" || group === "Operations")
    return (
      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className={`flex-1 ${isOpen ? "sm:ml-64" : "sm:ml-16"}`}>
          <Outlet context={{ group }} />
        </div>
      </div>
    );

  if (group === "Customer")
    return (
      <div className="flex">
        <CustomerSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className={`flex-1 ${isOpen ? "sm:ml-64" : "sm:ml-20"}`}>
          <Outlet context={{ group }} />
        </div>
      </div>
    );
}
