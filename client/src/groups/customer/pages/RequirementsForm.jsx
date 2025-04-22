import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = import.meta.env.VITE_API_URL;

const RequirementsForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    blob_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/requirements_form`, formData, {
        withCredentials: true,
      });
      toast.success("Requirements submitted successfully!");
    } catch (err) {
      toast.error("Error submitting requirements");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800">
          Submit Project Requirements
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none  focus:border-blue-500"
        />

        <input
          type="text"
          name="title"
          placeholder="Link to supporting Files"
          value={formData.blob_url}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none  focus:border-blue-500"
        />

        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none  focus:border-blue-500"
        />

        <div>
          <label>Deadline</label>
          <input
            type="datetime-local"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none  focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default RequirementsForm;
