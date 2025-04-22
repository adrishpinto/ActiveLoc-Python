import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

const VendorTable = () => {
  const [vendors, setVendors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    group: "",
    status: true,
    permission: "",
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${API_URL}/delete-user/${userId}`, {
        withCredentials: true,
      });
      toast.success("User deleted");
      setVendors((prev) => prev.filter((c) => c._id !== userId));
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response?.data || error.message
      );
      toast.error("Error deleting user");
    }
  };

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(`${API_URL}/users-vendor`, {
          withCredentials: true,
        });
        setVendors(response.data.vendors);
      } catch (error) {
        toast.error("Error fetching vendors");
      }
    };

    fetchVendors();
  }, []);

  const EditVendor = (vendor) => {
    setSelectedUser(vendor);
    setFormData({
      email: vendor.email,
      first_name: vendor.first_name,
      last_name: vendor.last_name,
      group: vendor.group,
      status: vendor.status,
      permission: vendor.permission || "",
    });
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "status" ? value === "true" : value,
    }));
  };

  const UpdateUser = async () => {
    try {
      await axios.put(`${API_URL}/edit_user/${selectedUser._id}`, formData, {
        withCredentials: true,
      });

      toast.success("User updated successfully");
      setIsEditing(false);
      setSelectedUser(null);

      const updatedVendors = vendors.map((vendor) =>
        vendor._id === selectedUser._id ? { ...vendor, ...formData } : vendor
      );
      setVendors(updatedVendors);
    } catch (error) {
      toast.error("Error updating user");
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Vendor List</h2>
      <div
        onClick={() => navigate("/add-vendor")}
        className="bg-green-500 text-white px-2 py-1 w-fit rounded-lg mt-2 mb-4 cursor-pointer border-green-500 border"
      >
        Add Vendor +
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <h3 className="text-xl font-semibold mb-4">Edit User</h3>
        <div className="mb-2">
          <label className="block mb-1">First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Group:</label>
          <input
            type="text"
            name="group"
            readOnly
            value={formData.group}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 cursor-not-allowed bg-slate-100"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          >
            <option value={true}>Activated</option>
            <option value={false}>Deactivated</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={UpdateUser}
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </Modal>

      {/* Vendor Table */}
      <div className="flex flex-col">
        <div className="flex w-full border bg-cyan-500 text-white font-semibold">
          <div className="w-[14%] px-2 py-2">First Name</div>
          <div className="w-[14%] px-2 py-2">Last Name</div>
          <div className="w-[20%] px-2 py-2">Email</div>
          <div className="w-[14%] px-2 py-2">Group</div>
          <div className="w-[14%] px-2 py-2">Status</div>
          <div className="w-[11%] px-2 py-2">Modify</div>
          <div className="w-[11%] px-2 py-2">Remove</div>
        </div>

        {vendors.map((vendor) => (
          <div
            key={vendor._id}
            className="flex w-full border-b hover:bg-gray-100 items-center"
          >
            <div className="w-[14%] px-2 py-2">{vendor.first_name}</div>
            <div className="w-[14%] px-2 py-2">{vendor.last_name}</div>
            <div className="w-[20%] px-2 py-2">{vendor.email}</div>
            <div className="w-[14%] px-2 py-2">{vendor.group}</div>
            <div className="w-[14%]">
              <div
                className={`w-fit px-2 py-1 rounded-full text-center text-sm ${
                  vendor.status
                    ? "bg-green-200 text-green-700"
                    : "bg-red-200 text-red-600"
                }`}
              >
                {vendor.status ? "Activated" : "Deactivated"}
              </div>
            </div>
            <div className="w-[11%] px-2 py-2">
              <button
                onClick={() => EditVendor(vendor)}
                className="px-3 py-1 bg-sky-500 text-white rounded"
              >
                Edit
              </button>
            </div>
            <div className="w-[11%] px-2 py-2">
              <ConfirmDeleteButton onDelete={() => deleteUser(vendor._id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorTable;

const ConfirmDeleteButton = ({ onDelete }) => {
  const confirmDelete = () => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-2 w-[90%]">
          <span>Are you sure you want to delete this user?</span>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                onDelete();
                closeToast();
              }}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Yes
            </button>
            <button
              onClick={closeToast}
              className="px-3 py-1 bg-gray-300 text-black rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  return (
    <button
      onClick={confirmDelete}
      className="px-3 py-1 bg-red-500 text-white rounded"
    >
      Delete
    </button>
  );
};
