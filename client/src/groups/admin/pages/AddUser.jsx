import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AddUser = () => {
  const navigate = useNavigate();

  const [rateValue, setRateValue] = useState("");
  const [rateUnit, setRateUnit] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    group: "",
    status: true,
    permission: "",
    phone_number: "",
    city: "",
    country: "",
    organization_name: "",
    type: "Individual",
    standard_rate: "",
    services_offered: "",
    billing_address: "",
    tax_id: "",
    pan_number: "",
    billing_currency: "",
    custom_service: "",
  });

  const updateField = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "status" ? e.target.value === "true" : e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/add-user`, formData, {
        withCredentials: true,
      });
      toast.success("User added successfully");
    } catch (err) {
      toast.error(err.response?.data?.error || "Error adding user");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl border shadow-md space-y-4 mt-32">
        <h2 className="text-2xl font-bold text-center">Add User</h2>
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

          <select
            name="group"
            value={formData.group}
            onChange={updateField}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
          >
            <option value="" disabled>
              Select Group
            </option>
            <option value="Sales">Sales</option>
            <option value="Operations">Operations</option>
            <option value="Customer">Customer</option>
            <option value="Vendor">Vendor</option>
          </select>

          {(formData.group === "Customer" || formData.group === "Vendor") && (
            <>
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

              {formData.group === "Vendor" && (
                <>
                  {/* Standard Rate: Currency + Value + Unit */}
                  <h2 className="font-bold mt-4">Standard Rate</h2>
                  <div className="flex gap-2">
                    <select
                      name="billing_currency"
                      value={formData.billing_currency}
                      onChange={updateField}
                      required
                      className="w-[30%] px-2 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
                    >
                      <option value="">Currency</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="INR">INR</option>
                      {/* Add more as needed */}
                    </select>

                    <input
                      type="text"
                      placeholder="Value"
                      value={rateValue}
                      onChange={(e) => {
                        const val = e.target.value;
                        setRateValue(val);
                        setFormData((prev) => ({
                          ...prev,
                          standard_rate: `${val}/${rateUnit}`,
                        }));
                      }}
                      required
                      className="w-1/4 px-2 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
                    />

                    <input
                      type="text"
                      placeholder="Units"
                      value={rateUnit}
                      onChange={(e) => {
                        const unit = e.target.value;
                        setRateUnit(unit);
                        setFormData((prev) => ({
                          ...prev,
                          standard_rate: `${rateValue}/${unit}`,
                        }));
                      }}
                      required
                      className="w-1/2 px-2 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
                    />
                  </div>

                  <select
                    name="services_offered"
                    value={formData.services_offered}
                    onChange={updateField}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
                  >
                    <option value="">Select Service</option>

                    <option value="Translation">Translation</option>
                    <option value="Localization">Localization</option>
                    <option value="Transcription">Transcription</option>
                    <option value="Proofreading">Proofreading</option>
                    <option value="Copywriting">Copywriting</option>
                    <option value="Data Annotation">Data Annotation</option>
                    <option value="Data Collection">Data Collection</option>
                    <option value="Recruitment">Recruitment</option>
                    <option value="Staffing">Staffing</option>
                    <option value="Digital Marketing">Digital Marketing</option>

                    <option value="Other">Other</option>
                  </select>

                  {formData.services_offered === "Other" && (
                    <input
                      type="text"
                      name="custom_service"
                      placeholder="Please specify"
                      value={formData.custom_service}
                      onChange={updateField}
                      className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
                    />
                  )}
                </>
              )}

              <select
                name="status"
                value={formData.status}
                onChange={updateField}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
              >
                <option value={true}>Activated</option>
                <option value={false}>Deactivated</option>
              </select>

              {/* Optional Fields */}
              <div className="mt-4 space-y-4">
                <h3 className="text-xl font-semibold">Optional (2nd Phase)</h3>
                <input
                  type="text"
                  name="billing_address"
                  placeholder="Billing Address"
                  onChange={updateField}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  name="tax_id"
                  placeholder="Tax ID / GST"
                  onChange={updateField}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  name="pan_number"
                  placeholder="PAN Number"
                  onChange={updateField}
                  className="w-full px-4 py-2 border rounded-lg"
                />

                {formData.group == "Customer" && (
                  <select
                    name="billing_currency"
                    value={formData.billing_currency}
                    onChange={updateField}
                    className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
                  >
                    <option value="">Currency</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="INR">INR</option>
                    {/* Add more as needed */}
                  </select>
                )}
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add User
          </button>
        </form>
      </div>

      <button
        onClick={() => navigate("/user-table")}
        className="mt-8 cursor-pointer mx-auto w-fit bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        Go Back
      </button>
    </div>
  );
};

export default AddUser;
