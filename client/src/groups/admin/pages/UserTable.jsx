import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import GetUserByID from "../../../components/GetUserByID";

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

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    group: "",
    status: true,
    permission: "",
    phone_number: "",
    city: "",
    country: "",
    organization_name: "",
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${API_URL}/delete-user/${userId}`, {
        withCredentials: true,
      });
      toast.success("User deleted");
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Unexpected error";
      console.error(errorMsg);
      toast.error("Error deleting user: " + errorMsg);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/users`, {
          withCredentials: true,
        });
        setUsers(response.data.users);
      } catch (error) {
        toast.error("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  const EditUser = (user) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      group: user.group,
      status: user.status,
      permission: user.permission || "",
      phone_number: user.phone_number || "",
      city: user.city || "",
      country: user.country || "",
      organization_name: user.organization_name || "",
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

      const updatedUsers = users.map((user) =>
        user._id === selectedUser._id ? { ...user, ...formData } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      toast.error("Error updating user");
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-4xl font-semibold text-center mb-4">User List</h2>
      <div
        onClick={() => navigate("/add-user")}
        className="bg-green-500 text-white px-2 py-1 ml-10 w-fit rounded-lg mt-2 mb-4 cursor-pointer border-green-500 border"
      >
        Add User +
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <div className="overflow-y-auto max-h-[90vh]">
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
              readOnly={formData.group === "Admin"}
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded focus:outline-none focus:border-blue-500 ${
                formData.group === "Admin"
                  ? "cursor-not-allowed bg-gray-100"
                  : ""
              }`}
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Group:</label>
            {formData.group === "Admin" ? (
              <input
                type="text"
                name="group"
                readOnly
                onChange={handleInputChange}
                value={formData.group}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 cursor-not-allowed bg-gray-100"
              />
            ) : (
              <select
                name="group"
                value={formData.group}
                onChange={handleInputChange}
                className="w-full px-2 py-2 border rounded focus:outline-none focus:bg-slate-50 focus:border-blue-300"
              >
                <option value="Sales">Sales</option>
                <option value="Operations">Operations</option>
                <option value="Customer">Customer</option>
                <option value="Vendor">Vendor</option>
              </select>
            )}
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
          {(formData.group === "Customer" || formData.group === "Vendor") && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  Phone Number:
                </label>
                <input
                  type="text"
                  name="phone_number"
                  placeholder="Phone Number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  City:
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  Country:
                </label>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  Organization Name:
                </label>
                <input
                  type="text"
                  name="organization_name"
                  placeholder="Organization Name"
                  value={formData.organization_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:bg-slate-50 focus:border-blue-300"
                />
              </div>
            </>
          )}
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
        </div>
      </Modal>

      {/* User Table */}
      <div className="flex flex-col ml-10 border">
        <div className="flex w-full  border bg-cyan-500 text-white font-semibold">
          <div className="w-[14%] px-2 py-2">First Name</div>
          <div className="w-[14%] px-2 py-2">Last Name</div>
          <div className="w-[24%] px-2 py-2">Email</div>
          <div className="w-[14%] px-2 py-2">Group</div>
          <div className="w-[14%] px-2 py-2">Status</div>
          <div className="w-[9%] px-2 py-2">Modify</div>
          <div className="w-[9%] px-2 py-2">Remove</div>
        </div>

        <GetUserByID user_id={user} isOpen={isOpen} setIsOpen={setIsOpen} />

        {users.map((user) => (
          <div
            key={user._id}
            className="flex w-full border-b hover:bg-gray-100 items-center"
          >
            <div className="w-[14%] px-2 py-2">{user.first_name}</div>
            <div className="w-[14%] px-2 py-2">{user.last_name}</div>
            <div className="w-[24%] px-2 py-2">{user.email}</div>
            <div className="w-[14%] px-2 py-2">{user.group}</div>
            <div
              className="w-[50%] absolute  z-10 h-10 cursor-pointer"
              onClick={() => {
                setIsOpen(true), setUser(user._id);
              }}
            ></div>
            <div className="w-[14%]">
              <div
                className={`w-fit px-2 py-1 rounded-full text-center text-sm ${
                  user.status
                    ? "bg-green-200 text-green-700"
                    : "bg-red-200 text-red-600"
                }`}
              >
                {user.status ? "Activated" : "Deactivated"}
              </div>
            </div>
            <div className="w-[9%] px-2 py-2">
              <button
                onClick={() => {
                  EditUser(user);
                }}
                className="px-3 py-1 bg-sky-500 text-white rounded"
              >
                Edit
              </button>
            </div>
            <div className="w-[9%] px-2 py-2">
              <ConfirmDeleteButton onDelete={() => deleteUser(user._id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;

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
