import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Quotation = ({ requirementId }) => {
  const { id } = useParams();
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
    one_time: false,
    quality: "",
    service_type: "Translation",
    preferred_start_date: "",
    deadline: "",
    billing_address: "",
    tax_id: "",
    task_description: "",
    units: "",
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
    status: "Draft",
    approved: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing requirement data
  useEffect(() => {
    const fetchRequirement = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-requirement/${id}`,
          {
            withCredentials: true,
          }
        );

        // Assuming the response data contains a 'requirement' field
        if (response.data && response.data.requirement) {
          setRequirement(response.data.requirement); // Set the requirement data
        } else {
          setError("Requirement data not found.");
          toast.error("Requirement data not found.");
        }
      } catch (err) {
        setError("Error fetching requirement data.");
        toast.error("Error fetching requirement data.");
      }
    };

    fetchRequirement();
  }, [id]);

  // Handle form change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRequirement({
      ...requirement,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/requirements/${id}`,
        requirement,
        { withCredentials: true }
      );
      toast.success("Requirement updated successfully");
    } catch (err) {
      setError("Error updating requirement.");
      toast.error("Error updating requirement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-center text-5xl font-[300] mt-20 mb-14">
        Update Requirement
      </h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-4 space-y-4 bg-white border mb-20 shadow rounded-xl"
      >
        {/* Project Title */}
        <div className="space-y-2">
          <label className="block text-lg font-medium">Project Title</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">Customer Name</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">Contact Person</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">Email</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">Phone Number</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">City</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">Country</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">Budget</label>
          <input
            type="number"
            name="budget"
            value={requirement.budget}
            onChange={handleChange}
            placeholder="Enter budget"
            className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
            step="0.01"
          />
        </div>

        {/* Urgency */}
        <div className="space-y-2">
          <label className="block text-lg font-medium">Urgency</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">One Time</label>
          <input
            type="checkbox"
            name="one_time"
            checked={requirement.one_time}
            onChange={handleChange}
            className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
          />
        </div>

        {/* Service Type */}
        <div className="space-y-2">
          <label className="block text-lg font-medium">Service Type</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={requirement.deadline}
            onChange={handleChange}
            className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
          />
        </div>

        {/* File Link */}
        <div className="space-y-2">
          <label className="block text-lg font-medium">File Link</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">Billing Address</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">Tax ID</label>
          <input
            type="text"
            name="tax_id"
            value={requirement.tax_id}
            onChange={handleChange}
            placeholder="Enter tax ID"
            className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
          />
        </div>

        {/* Task Description */}
        <div className="space-y-2">
          <label className="block text-lg font-medium">Task Description</label>
          <textarea
            name="task_description"
            value={requirement.task_description}
            onChange={handleChange}
            placeholder="Enter task description"
            className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
          />
        </div>

        {/* Units */}
        <div className="space-y-2">
          <label className="block text-lg font-medium">Units</label>
          <input
            type="text"
            name="units"
            value={requirement.units}
            onChange={handleChange}
            placeholder="Enter units"
            className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
          />
        </div>

        {/* Locales */}
        <div className="space-y-2">
          <label className="block text-lg font-medium">Locales</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">Resources</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">Tools</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">Existing Material</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">Currency Choice</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">Billing Model</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">Cost Breakdown</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">Discounts</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">Tax</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">Payment Terms</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">Estimation</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">Milestones</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">Buffer Days</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">Last Edited By</label>
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
        <div className="space-y-2">
          <label className="block text-lg font-medium">Status</label>
          <select
            name="status"
            value={requirement.status}
            onChange={handleChange}
            className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
          >
            <option value="Draft">Draft</option>
            <option value="Submitted">Submitted</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Approved */}
        <div className="flex space-x-2 items-center justify-center ">
          <label className="block text-lg font-medium">Approved:</label>
          {requirement.approved ? (
            <div className="bg-green-200 w-fit px-3 py-1 rounded-full ">
              Confirmed
            </div>
          ) : (
            <div className="bg-blue-200 w-fit px-3 py-1 rounded-full ">
              Pending
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-blue-600 text-white rounded-lg disabled:bg-blue-400"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Quotation;
