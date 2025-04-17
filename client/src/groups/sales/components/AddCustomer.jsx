import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AddCustomer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    group: "Customer",
    status: true,
    permission: "",
  });

  const updateField = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async () => {
    try {
      await axios.post(`${API_URL}/add-user`, formData, {
        withCredentials: true,
      });
      toast.success("Customer added successfully");
    } catch (err) {
      toast.error(err.response?.data?.error || "Error adding customer");
    }
  };

  return (
    <div className="flex flex-col ">
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl border shadow-md space-y-4 mt-32">
        <h2 className="text-2xl font-bold text-center">Add Customer</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            onChange={updateField}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            onChange={updateField}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={updateField}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={updateField}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
          />
          <div className="w-full font-semibold px-4 cursor-not-allowed py-2 border border-black rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300">
            Group : Customer
          </div>
          <button
            onClick={submit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Customer
          </button>
        </div>
      </div>
      <button
        onClick={() => navigate("/customer-table")}
        className="mt-8 cursor-pointer mx-auto w-fit bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        Go Back
      </button>
    </div>
  );
};

export default AddCustomer;
