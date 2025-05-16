import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Quotation = ({ requirementId }) => {
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);

  const [selectVendor, setSelectVendor] = useState({
    email: "",
    standard_rate: "",
    units: "",
    current_rate: "",
  });

  const navigate = useNavigate();
  console.log(id);
  const [requirement, setRequirement] = useState({
    title: "",
    description: "",
    customer_name: "",
    contact_person: "",
    email: "",
    phone_number: "",
    city: "",
    country: "",
    budget: 0.0,
    file_link: "",
    urgent: "normal",
    project_status: "",
    quality: "",
    service_type: "",
    preferred_start_date: "",
    deadline: "",
    billing_address: "",
    tax_id: "",
    task_description: "",
    units: 0.0,
    locales: "",
    resouces: "",
    tools: "",
    existing_material: "",
    currency_choice: "",
    billing_model: "",
    cost_breakdown: "",
    discounts: "",
    tax: "",
    payment_terms: "",
    estimation: "",
    milestones: "",
    buffer_days: "",
    quote_by: "",
    status: "",
    approved: false,
    invoice_subject: "",
    invoice_description: "",
    countdown: "",
    pm_hours: "",
    pm_rate: "",
    rate: 0.0,
  });

  const numericFields = ["budget", "rate", "profit", "pm_rate"];

  const API_URL = import.meta.env.VITE_API_URL;

  const downloadPDF = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_URL}/requirement-pdf/${id}`, {
        responseType: "blob",
        withCredentials: true,
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "requirement_report.pdf";
      link.click();
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast.error("Error downloading PDF.");
    }
  };

  const sendQuotation = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        `${API_URL}/send-quotation/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      console.log("Quotation sent successfully:", response.data.message);
    } catch (error) {
      console.error(
        "Error sending quotation:",
        error.response?.data || error.message
      );
    }
  };

  const Navigate = (id) => {
    navigate(`/add-vendor-project/${id}`);
  };

  const fetchRequirement = async () => {
    try {
      const response = await axios.get(`${API_URL}/get-requirement/${id}`, {
        withCredentials: true,
      });

      if (response.data && response.data.requirement) {
        const req = { ...response.data.requirement };
        numericFields.forEach((field) => {
          if (req[field]) {
            const raw = req[field].toString();
            if (/^\d*\.?\d*$/.test(raw)) {
              const parts = raw.split(".");
              parts[0] = Number(parts[0]).toLocaleString("en-IN");
              req[field] = parts.join(".");
            }
          }
        });

        setRequirement(req);
      } else {
        toast.error("Requirement data not found.");
      }
    } catch (err) {
      toast.error("Error fetching requirement data.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue = value;

    if (type !== "checkbox" && numericFields.includes(name)) {
      let raw = value.replace(/,/g, "");
      if (/^\d*\.?\d*$/.test(raw)) {
        const parts = raw.split(".");
        parts[0] = Number(parts[0]).toLocaleString("en-IN");
        newValue = parts.join(".");
      } else {
        return;
      }
    }

    setRequirement({
      ...requirement,
      [name]: type === "checkbox" ? checked : newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cleanedRequirement = { ...requirement };

      ["budget", "rate", "profit", "pm_rate"].forEach((field) => {
        if (cleanedRequirement[field]) {
          cleanedRequirement[field] =
            parseFloat(cleanedRequirement[field].replace(/,/g, "")) || 0;
        }
      });

      await axios.put(`${API_URL}/requirements/${id}`, cleanedRequirement, {
        withCredentials: true,
      });
      toast.success("Requirement updated successfully");
    } catch (err) {
      toast.error("Error updating requirement.");
    }
  };

  const sendToCustomer = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${API_URL}/requirements/${id}`,
        { status: "Submitted" },
        {
          withCredentials: true,
        }
      );
      toast.success("Requirement updated successfully");
    } catch (err) {
      toast.error("Error updating requirement.");
    }
  };

  const withdrawFromCustomer = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${API_URL}/requirements/${id}`,
        { status: "Draft" },
        {
          withCredentials: true,
        }
      );
      toast.success("Requirement updated successfully");
    } catch (err) {
      toast.error("Error updating requirement.");
    }
  };

  useEffect(() => {
    fetchRequirement();
  }, [id]);

  const [tab, setTab] = useState(1);

  return (
    <div>
      <h2 className="text-center text-5xl font-[300] mt-10 mb-10">
        Update Requirement
      </h2>

      {requirement.approved === "rejected" && (
        <div className="bg-white border max-w-2xl mx-auto mt-20 mb-10 px-6 py-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-red-700 ">
            Rejection Details
          </h2>
          <p>
            Reason:{" "}
            {requirement.rejection_reason?.trim()
              ? requirement.rejection_reason
              : "Not given"}
          </p>
          <p>
            Suggested Changes:{" "}
            {requirement.rejection_changes?.trim()
              ? requirement.rejection_changes
              : "Not given"}
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-[90%] mx-auto p-4 space-y-4 bg-white border mb-20 shadow rounded-xl"
      >
        <div className="flex justify-around mb-5 mt-2">
          <div
            className="border w-[33%] bg-sky-300 py-1 hover:bg-sky-400 text-center rounded-lg cursor-pointer text-lg  font-[400]"
            onClick={() => setTab(1)}
          >
            User Requirements
          </div>
          <div
            onClick={() => setTab(2)}
            className="border w-[33%] bg-teal-300 py-1 hover:bg-teal-400 text-center rounded-lg cursor-pointer text-lg font-[400]"
          >
            Quotation Details
          </div>
          <div
            onClick={() => setTab(3)}
            className="border w-[33%] bg-emerald-300 py-1 hover:bg-emerald-400 text-center rounded-lg cursor-pointer text-lg font-[400]"
          >
            Post Approval
          </div>
        </div>
        <div className="">
          {tab == 1 && (
            <div className="flex flex-wrap gap-x-4 gap-y-5">
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Quotation Deadline (in hours)
                </label>
                <input
                  type="number"
                  name="countdown"
                  value={requirement.countdown}
                  onChange={handleChange}
                  placeholder="Enter deadline"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Project Title */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Project Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={requirement.title}
                  onChange={handleChange}
                  placeholder="Enter project title"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Project Description */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Project Description
                </label>
                <textarea
                  name="description"
                  value={requirement.description}
                  onChange={handleChange}
                  placeholder="Enter project description"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Customer Name */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Customer Name
                </label>
                <input
                  type="text"
                  name="customer_name"
                  value={requirement.customer_name}
                  onChange={handleChange}
                  placeholder="Enter customer name"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Contact Person */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Contact Person
                </label>
                <input
                  type="text"
                  name="contact_person"
                  value={requirement.contact_person}
                  onChange={handleChange}
                  placeholder="Enter contact person's name"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Email */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={requirement.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Phone Number */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone_number"
                  value={requirement.phone_number}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* City */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={requirement.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Country */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={requirement.country}
                  onChange={handleChange}
                  placeholder="Enter country"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Budget */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Budget
                </label>
                <input
                  type="text"
                  name="budget"
                  value={requirement.budget}
                  onChange={handleChange}
                  placeholder="Enter budget"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                  step="0.01"
                />
              </div>
              {/* Urgency */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Urgency
                </label>
                <select
                  name="urgent"
                  value={requirement.urgent}
                  onChange={handleChange}
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="express">Express</option>
                </select>
              </div>
              {/* One Time */}
              {/* Service Type */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Service Type
                </label>
                <select
                  name="service_type"
                  value={requirement.service_type}
                  onChange={handleChange}
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                >
                  <option value="Translation">Translation</option>
                  <option value="Localization">Localization</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Staffing">Staffing</option>
                  <option value="Data Services">Data Services</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {/* Preferred Start Date */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Preferred Start Date
                </label>
                <input
                  type="date"
                  name="preferred_start_date"
                  value={requirement.preferred_start_date}
                  onChange={handleChange}
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Deadline */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={requirement.deadline}
                  onChange={handleChange}
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* File Link */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  File Link
                </label>
                <input
                  type="text"
                  name="file_link"
                  value={requirement.file_link}
                  onChange={handleChange}
                  placeholder="Enter file link"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Billing Address */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Billing Address
                </label>
                <input
                  type="text"
                  name="billing_address"
                  value={requirement.billing_address}
                  onChange={handleChange}
                  placeholder="Enter billing address"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Tax ID */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Tax ID
                </label>
                <input
                  type="text"
                  name="tax_id"
                  value={requirement.tax_id}
                  onChange={handleChange}
                  placeholder="Enter tax ID"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>{" "}
            </div>
          )}
          {/* Task Description */}
          {tab == 2 && (
            <div className="flex flex-wrap gap-x-4 gap-y-5">
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Task Description
                </label>
                <textarea
                  name="task_description"
                  value={requirement.task_description}
                  onChange={handleChange}
                  placeholder="Enter task description"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Units */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Units
                </label>
                <input
                  type="number"
                  name="units"
                  value={requirement.units}
                  onChange={handleChange}
                  placeholder="Enter units"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                  step="any"
                />
              </div>

              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Rate
                </label>
                <input
                  type="text"
                  name="rate"
                  value={requirement.rate}
                  onChange={handleChange}
                  placeholder="Enter rate per words/units"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                  step="any"
                />
              </div>
              {/* Locales */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Locales
                </label>
                <input
                  type="text"
                  name="locales"
                  value={requirement.locales}
                  onChange={handleChange}
                  placeholder="Enter locales"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Resources */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Resources
                </label>
                <input
                  type="text"
                  name="resouces"
                  value={requirement.resouces}
                  onChange={handleChange}
                  placeholder="Enter resources"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Tools */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Tools
                </label>
                <input
                  type="text"
                  name="tools"
                  value={requirement.tools}
                  onChange={handleChange}
                  placeholder="Enter tools"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Existing Material */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Existing Material
                </label>
                <input
                  type="text"
                  name="existing_material"
                  value={requirement.existing_material}
                  onChange={handleChange}
                  placeholder="Enter existing material"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Currency Choice */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Currency Choice
                </label>
                <input
                  type="text"
                  name="currency_choice"
                  value={requirement.currency_choice}
                  onChange={handleChange}
                  placeholder="Enter currency choice"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Billing Model */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Billing Model
                </label>
                <input
                  type="text"
                  name="billing_model"
                  value={requirement.billing_model}
                  onChange={handleChange}
                  placeholder="Enter billing model"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Cost Breakdown */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Cost Breakdown
                </label>
                <input
                  type="text"
                  name="cost_breakdown"
                  value={requirement.cost_breakdown}
                  onChange={handleChange}
                  placeholder="Enter cost breakdown"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Discounts */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Discounts
                </label>
                <input
                  type="text"
                  name="discounts"
                  value={requirement.discounts}
                  onChange={handleChange}
                  placeholder="Enter discounts"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Tax */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">Tax</label>
                <input
                  type="text"
                  name="tax"
                  value={requirement.tax}
                  onChange={handleChange}
                  placeholder="Enter tax"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Payment Terms */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Payment Terms
                </label>
                <input
                  type="text"
                  name="payment_terms"
                  value={requirement.payment_terms}
                  onChange={handleChange}
                  placeholder="Enter payment terms"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Estimation */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Estimation
                </label>
                <input
                  type="text"
                  name="estimation"
                  value={requirement.estimation}
                  onChange={handleChange}
                  placeholder="Enter estimation"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Milestones */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Milestones
                </label>
                <input
                  type="text"
                  name="milestones"
                  value={requirement.milestones}
                  onChange={handleChange}
                  placeholder="Enter milestones"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Buffer Days */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Buffer Days
                </label>
                <input
                  type="text"
                  name="buffer_days"
                  value={requirement.buffer_days}
                  onChange={handleChange}
                  placeholder="Enter buffer days"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Quote By */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Last Edited By
                </label>
                <input
                  type="text"
                  name="quote_by"
                  value={requirement.quote_by}
                  onChange={handleChange}
                  placeholder="Enter quote by"
                  readOnly
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {/* Status */}
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Status
                </label>
                <select
                  name="status"
                  value={requirement.status}
                  onChange={handleChange}
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                >
                  <option value="Draft">Draft</option>
                  <option value="Submitted">Submitted</option>
                </select>
              </div>
              {/* Approved */}
              <div className="flex space-x-2 items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Status:
                </label>
                {requirement.approved === "approved" && (
                  <div className="bg-green-200 text-green-600 w-fit px-3 py-1 rounded-full">
                    Approved
                  </div>
                )}
                {requirement.approved === "pending" && (
                  <div className="bg-blue-200 text-blue-600 w-fit px-3 py-1 rounded-full">
                    Pending
                  </div>
                )}
                {requirement.approved === "terminated" && (
                  <div className="bg-red-200 text-red-600 w-fit px-3 py-1 rounded-full">
                    Terminated
                  </div>
                )}
                {requirement.approved === "rejected" && (
                  <div className="bg-red-200 text-red-600 w-fit px-3 py-1 rounded-full">
                    Rejected
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Invoice Subject
                </label>
                <input
                  type="text"
                  name="invoice_subject"
                  value={requirement.invoice_subject}
                  onChange={handleChange}
                  placeholder="Enter Invoice Subject"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text-lg font-medium w-[50%]">
                  Invoice Description
                </label>
                <input
                  type="text"
                  name="invoice_description"
                  value={requirement.invoice_description}
                  onChange={handleChange}
                  placeholder="Enter Invoice Description"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
            </div>
          )}
          {requirement.approved === "pending" && tab == 3 && (
            <div>
              <VendorEditPopup
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
                vendor={selectVendor}
                requirementId={id}
              />
              <h2 className="mt-16 text-3xl mb-6">Post Client Approval</h2>
              <div className="flex items-center justify-center w-[45%] min-w-[400px] mb-10">
                <label className="block text-lg font-medium w-[90%]">
                  Project Code (full code)
                </label>
                <input
                  type="text"
                  name="project_code"
                  value={requirement.project_code}
                  onChange={handleChange}
                  placeholder="Enter Project Code (ex. FY2026CL001)"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              <div className="mt-4">
                <label className="text-lg font-medium w-[50%]">
                  Project Status
                </label>
                <select
                  className=" border p-2 w-full mb-6 border-gray-300 rounded-lg shadow"
                  value={requirement.project_status}
                  name="project_status"
                  onChange={handleChange}
                >
                  <option value="in-progress">In Progress</option>
                  <option value="assigned">Assigned</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
              <div className="text-2xl mt-4">Current Vendors</div>
              <h2 className="text-gray-500 mt-2 ml-2">
                {requirement.vendors.length == 0 && "No Vendors added yet..."}
              </h2>
              <div className="flex flex-wrap sm:justify-between items-center gap-4 w-[90%] sm:flex-row flex-col justify-center w-[45%] min-w-[400px] mb-16 mx-auto ">
                {requirement.vendors.map((req) => (
                  <div className="w-[45%] min-w-[400px] border shadow rounded-xl p-4 font-semibold bg-white">
                    <p>
                      <span className="text-gray-500">Name:</span> {req.name}
                    </p>
                    <p>
                      <span className="text-gray-500">Email:</span> {req.email}
                    </p>
                    <p>
                      <span className="text-gray-500">Units:</span> {req.units}
                    </p>
                    <p>
                      <span className="text-gray-500">Current Rate:</span>{" "}
                      {req.current_rate}
                    </p>
                    <p>
                      <span className="text-gray-500">Currency:</span>{" "}
                      {req.billing_currency}
                    </p>
                    {req.bill_status == "pending" && (
                      <p>
                        Billing Status:
                        <span className="bg-sky-200 rounded-full px-2 text-sky-600 text-sm ml-2 font-[300]">
                          Pending
                        </span>
                      </p>
                    )}
                    {req.bill_status == "submitted" && (
                      <p>
                        Billing Status:
                        <span className="bg-emerald-200 rounded-full px-2 text-emerald-600 text-sm ml-2 font-[300]">
                          Submitted
                        </span>
                      </p>
                    )}
                    {req.bill_status == "paid" && (
                      <p>
                        Billing Status:
                        <span className="bg-green-200 rounded-full px-2 text-green-600 text-sm ml-2 font-[300]">
                          Paid
                        </span>
                      </p>
                    )}
                    <p>
                      <span className="text-gray-500">Work Status:</span>{" "}
                      {req.work_status == "not_started"
                        ? "Not Started"
                        : req.work_status}
                    </p>
                    <button
                      className="bg-green-500 px-2 text-white rounded-lg font-[400] hover:bg-green-400 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPopup(true);
                        setSelectVendor({
                          email: req.email,
                          standard_rate: req.standard_rate,
                          units: req.units,
                          current_rate: req.current_rate,
                          billing_currency: req.billing_currency,
                        });
                      }}
                    >
                      Add Rate
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex flex-row">
                <h2 className="font-semibold">Profit:</h2>
                <p className="text-green-700 rounded-lg ml-2 px-3 bg-green-200">
                  Rs.{requirement.profit}
                </p>
              </div>
              <div className="flex flex-row items-center">
                <h2 className="font-semibold my-4">Profit Percentage:</h2>
                <p className="text-green-700 rounded-lg ml-2 px-3 bg-green-200">
                  {requirement.profit != null &&
                  requirement.units > 0 &&
                  requirement.rate > 0
                    ? (
                        (requirement.profit /
                          (requirement.units * requirement.rate)) *
                        100
                      ).toFixed(2)
                    : "N/A"}
                  %
                </p>
              </div>
              <div className="flex items-center justify-center w-[45%] min-w-[400px]">
                <label className="block text font-medium w-[50%]">
                  PM hours
                </label>
                <input
                  type="text"
                  name="pm_hours"
                  value={requirement.pm_hours}
                  onChange={handleChange}
                  placeholder="Enter buffer days"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              <div className="flex items-center justify-center w-[45%] min-w-[400px] mt-4">
                <label className="block text font-medium w-[50%]">
                  PM rate
                </label>
                <input
                  type="text"
                  name="pm_rate"
                  value={requirement.pm_rate}
                  onChange={handleChange}
                  placeholder="Enter buffer days"
                  className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
                />
              </div>
              {requirement.profit > 0 &&
                requirement.pm_rate > 0 &&
                requirement.pm_hours > 0 && (
                  <div className="flex items-center font-semibold w-[45%] min-w-[400px] mt-4">
                    <p>Post Mangement Profit:</p>
                    <p className="font-normal px-2 bg-green-200 text-green-700 rounded-lg ml-2">
                      {(
                        ((requirement.profit -
                          requirement.pm_rate * requirement.pm_hours) /
                          requirement.profit) *
                        100
                      ).toFixed(2)}
                      %
                    </p>
                  </div>
                )}
            </div>
          )}
        </div>

        <div className="w-full flex items-center flex-wrap gap-2 justify-center w-[45%] min-w-[400px] space-x-2">
          <button
            type="submit"
            className="px-8 py-3  block bg-blue-600 text-white rounded-lg disabled:bg-blue-400 w-fit"
          >
            Save Draft
          </button>

          <button
            type="submit"
            onClick={(e) => sendToCustomer(e)}
            className="px-8 py-3  block bg-green-500 text-white rounded-lg disabled:bg-blue-400 w-fit"
          >
            Send to customer
          </button>

          <button
            type="submit"
            className="px-8 py-3  block bg-red-600 text-white rounded-lg disabled:bg-blue-400 w-fit"
            onClick={(e) => withdrawFromCustomer(e)}
          >
            Withdraw from customer
          </button>

          <button
            onClick={downloadPDF}
            className="px-8 py-3 block bg-green-500 text-white rounded-lg disabled:bg-blue-400 w-fit"
          >
            Download as PDF
          </button>

          <button
            onClick={sendQuotation}
            className="px-8 py-3 block bg-green-500 text-white rounded-lg disabled:bg-blue-400 w-fit"
          >
            Send Email
          </button>

          <button
            onClick={() => Navigate(id)}
            className="px-8 py-3 block bg-blue-500 text-white rounded-lg disabled:bg-blue-400 w-fit"
          >
            Add Vendor
          </button>
        </div>
      </form>
    </div>
  );
};

export default Quotation;

const VendorEditPopup = ({
  isOpen,
  onClose,
  vendor,
  requirementId,
  onSuccess,
}) => {
  const [currentRate, setCurrentRate] = useState("");
  const [units, setUnits] = useState("");

  useEffect(() => {
    if (isOpen && vendor) {
      const baseRate =
        vendor.current_rate === 0 || vendor.current_rate == null
          ? extractRate(vendor.standard_rate)
          : vendor.current_rate;
      setCurrentRate(baseRate ?? "");
      setUnits(vendor.units ?? "");
    }
  }, [isOpen, vendor]);

  function extractRate(value) {
    if (!value) return null;
    const num = parseFloat(value.split("/")[0]);
    return isNaN(num) ? null : num;
  }

  const handleUpdate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/requirements/vendor/update",
        {
          requirement_id: requirementId,
          vendor: {
            email: vendor.email,
            rate: parseFloat(currentRate),
            units: parseFloat(units),
          },
        },
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      onSuccess && onSuccess();
      onClose();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center w-[100%] min-w-[400px] items-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Edit Vendor</h2>

        <div className="mb-3">
          <label className="block text-sm">Rate</label>
          <input
            type="number"
            value={currentRate}
            onChange={(e) => setCurrentRate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Units</label>
          <input
            type="number"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
