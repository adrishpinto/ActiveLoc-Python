import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

export default function RequirementsForm() {
  const [form, setForm] = useState({
    title: "Sample Project Title",
    description: "This is a sample project description to test the form.",
    deadline: "",
    customer_name: "Sample Customer Name",
    contact_person: "John Doe",
    email: "johndoe@example.com",
    phone_number: "+1234567890",
    city: "Sample City",
    country: "Sample Country",
    service_type: "Translation",
    preferred_start_date: "",
    budget: "",
    file_link: "http://example.com/sample-file.pdf",
    urgent: "urgent",
    quality: "use this tool",
    one_time: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Include hardcoded fields for `approved`, `status`, and `one_time` in the submission
      const dataToSubmit = {
        ...form,
        approved: false,
        status: "Draft",
      };

      await axios.post(`${API_URL}/requirements_form`, dataToSubmit, {
        withCredentials: true,
      });

      toast.success("Requirement submitted successfully!");

      // Reset form after submission
      setForm({
        title: "",
        description: "",
        deadline: "",
        customer_name: "",
        contact_person: "",
        email: "",
        phone_number: "",
        city: "",
        country: "",
        service_type: "",
        preferred_start_date: "",
        budget: "",
        file_link: "",
        urgent: "Normal",
        quality: "",
      });
    } catch (err) {
      const message = err.response?.data?.message || "Submission failed.";
      toast.error(message);
    }
  };

  return (
    <div>
      <h2 className="text-center text-5xl font-[300] my-4">
        Requirements Form
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-4 space-y-4 bg-white border mb-20 shadow rounded-xl"
      >
        <div className="flex flex-col gap-8">
          {/* Project Information */}
          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Project Title<span className="text-red-500 pb-10 ml-1">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter project title"
              required
              className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Project Description
              <span className="text-red-500 pb-10 ml-1">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter project description"
              required
              className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
            />
          </div>

          {/* Service Information */}
          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Service Type<span className="text-red-500 pb-10 ml-1">*</span>
            </label>
            <select
              name="service_type"
              value={form.service_type}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
            >
              <option value="" disabled>
                Select Service Type
              </option>
              <option value="Translation">Translation</option>
              <option value="Localization">Localization</option>
              <option value="Consulting">Consulting</option>
              <option value="Staffing">Staffing</option>
              <option value="Data Services">Data Services</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Preferred Start Date
            </label>
            <input
              type="date"
              name="preferred_start_date"
              value={form.preferred_start_date}
              onChange={handleChange}
              className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium">Budget</label>
            <input
              type="number"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              placeholder="Enter budget"
              className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
            />
          </div>

          {/* Customer Information */}
          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Customer / Organization Name
              <span className="text-red-500 pb-10 ml-1">*</span>
            </label>
            <input
              type="text"
              name="customer_name"
              value={form.customer_name}
              onChange={handleChange}
              placeholder="Enter customer or organization name"
              required
              className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Contact Person<span className="text-red-500 pb-10 ml-1">*</span>
            </label>
            <input
              type="text"
              name="contact_person"
              value={form.contact_person}
              onChange={handleChange}
              placeholder="Enter contact person's name"
              required
              className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Email Address<span className="text-red-500 pb-10 ml-1">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
              className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Phone Number<span className="text-red-500 pb-10 ml-1">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone_number}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
            />
          </div>

          {/* Location Information */}
          <div className="space-y-2">
            <label className="block text-lg font-medium">
              City<span className="text-red-500 pb-10 ml-1">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
              className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Country<span className="text-red-500 pb-10 ml-1">*</span>
            </label>
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Enter country"
              required
              className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
            />
          </div>

          {/* File Link */}
          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Link to Supporting Files
            </label>
            <input
              type="text"
              name="file_link"
              value={form.file_link}
              onChange={handleChange}
              placeholder="Enter file link"
              className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
            />
          </div>

          {/* Urgency and Quality */}
          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Quality / Special Instructions
            </label>
            <input
              type="text"
              name="quality"
              value={form.quality}
              onChange={handleChange}
              placeholder="Enter special requirements"
              className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium">Urgency</label>
            <select
              name="urgent"
              value={form.urgent}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded outline-none focus:border-blue-400 focus:bg-slate-50"
            >
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
              <option value="express">Express</option>
            </select>
          </div>

          {/* One-Time Field */}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Requirement
        </button>
      </form>
    </div>
  );
}
