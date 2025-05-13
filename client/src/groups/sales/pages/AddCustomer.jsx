import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    group: "Customer",
    status: true,
    permission: "",
    phone_number: "",
    city: "",
    country: "",
    organization_name: "",
    type: "Individual",
    billing_address: "",
    tax_id: "",
    pan_number: "",
    billing_currency: "",
  });

  const updateField = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const requiredFields = [
      "email",
      "password",
      "first_name",
      "last_name",
      "group",
      "status",
      "phone_number",
      "city",
      "country",
    ];

    if (formData.type === "Business") {
      requiredFields.push("organization_name");
    }

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        toast.error(`${field.replace("_", " ")} is required.`);
        isValid = false;
      }
    });

    return isValid;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post(`${API_URL}/add-user`, formData, {
        withCredentials: true,
      });
      toast.success("Customer added successfully");
    } catch (err) {
      toast.error(err.response?.data?.error || "Error adding Customer");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl border shadow-md space-y-4 mt-32">
        <h2 className="text-2xl font-bold text-center">Add Customer</h2>
        <form onSubmit={submit} className="space-y-4">
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
            Group: Customer
          </div>

          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            onChange={updateField}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={updateField}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            onChange={updateField}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
          />

          <select
            name="type"
            value={formData.type}
            onChange={updateField}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
          >
            <option value="Individual">Individual</option>
            <option value="Business">Business</option>
          </select>

          {formData.type === "Business" && (
            <input
              type="text"
              name="organization_name"
              placeholder="Organization Name"
              onChange={updateField}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
            />
          )}

          <select
            name="billing_currency"
            value={formData.billing_currency}
            onChange={updateField}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
          >
            <option value="">Currency</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
          </select>

          {/* Optional Fields Section */}
          <div className="mt-4 space-y-4">
            <h3 className="font-semibold text-lg">Optional (2nd phase)</h3>
            <input
              type="text"
              name="billing_address"
              placeholder="Billing Address"
              onChange={updateField}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
            />

            <input
              type="text"
              name="tax_id"
              placeholder="Tax ID"
              onChange={updateField}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
            />

            <input
              type="text"
              name="pan_number"
              placeholder="PAN Number"
              onChange={updateField}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Customer
          </button>
        </form>
      </div>
      <button
        onClick={() => navigate("/Customer-table")}
        className="mt-8 cursor-pointer mx-auto w-fit bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        Go Back
      </button>
    </div>
  );
};

export default AddUser;
