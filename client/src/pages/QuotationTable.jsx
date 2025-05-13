import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const QuotationTable = () => {
  const [requirements, setRequirements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-requirements`,
          { withCredentials: true }
        );
        setRequirements(response.data.requirements);
      } catch (err) {
        toast.error("Error fetching requirements data.");
      }
    };

    fetchRequirements();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/quotation/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/delete-requirement/${id}`,
        { withCredentials: true }
      );
      toast.success("Requirement deleted successfully.");
      setRequirements((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      toast.error("Failed to delete requirement.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 w-[90%]">
      <h2 className="text-center text-3xl font-bold mb-6">Quotation List</h2>

      <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
        {/* Header Row */}
        <div className="flex border-b pb-2 mb-4 items-center text-sm font-semibold">
          <div className="w-[20%]">Title</div>
          <div className="w-[22%]">Customer Name</div>
          <div className="w-[20%]">Contact Person</div>
          <div className="w-[16%]">Service Type</div>
          <div className="w-[11%] text-center">Status</div>
          <div className="w-[9%] text-right">Remove</div>
        </div>

        {/* Data Rows */}
        {requirements.length > 0 ? (
          requirements.map((requirement) => (
            <div
              key={requirement._id}
              className="flex border-b py-2 items-center hover:bg-gray-50 text-sm"
            >
              <div
                className="w-[20%] cursor-pointer"
                onClick={() => handleRowClick(requirement._id)}
              >
                {requirement.title}
              </div>
              <div
                className="w-[22%] cursor-pointer"
                onClick={() => handleRowClick(requirement._id)}
              >
                {requirement.customer_name}
              </div>
              <div
                className="w-[20%] cursor-pointer"
                onClick={() => handleRowClick(requirement._id)}
              >
                {requirement.contact_person}
              </div>
              <div
                className="w-[16%] cursor-pointer"
                onClick={() => handleRowClick(requirement._id)}
              >
                {requirement.service_type}
              </div>
              <div
                className="w-[11%] cursor-pointer"
                onClick={() => handleRowClick(requirement._id)}
              >
                <div
                  className={`w-fit px-2 py-1 rounded-full text-center text-xs mx-auto
                    ${
                      requirement.status === "Draft"
                        ? "bg-gray-200 text-gray-700 w-[80px]"
                        : "bg-green-200 text-green-700 w-[70px]"
                    }`}
                >
                  {requirement.status}
                </div>
              </div>
              <div className="w-[9%] text-right">
                <button
                  onClick={() => handleDelete(requirement._id)}
                  className="text-white bg-red-500 rounded px-2 py-2 hover:text-red-800 font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center py-4 w-full">
            <p className="text-center">No requirements available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotationTable;
