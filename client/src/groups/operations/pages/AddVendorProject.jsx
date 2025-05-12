import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import GetUserByID from "../../../components/GetUserByID";

const AddVendorProject = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [user, setUser] = useState("");
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

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

  const addVendor = async (vendor) => {
    const vendorData = {
      name: vendor?.first_name || "Unnamed Vendor",
      email: vendor?.email || "no-email@example.com",
      company: vendor?.organization_name || "Individual",
      standard_rate: vendor?.standard_rate || "0",
      work_status: "ongoing",
      bill_status: "pending",
      billing_currency: vendor?.billing_currency || "",
    };

    try {
      const res = await axios.post(
        `${API_URL}/requirements/${id}/vendor`, // This will be the new endpoint
        vendorData,
        {
          withCredentials: true,
        }
      );
      toast.success("Vendor added to project");
    } catch (error) {
      console.error(error);
      if (error.status == 400) {
        toast.error("This vendor is already added");
      } else {
        toast.error("Failed to add vendor");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-4xl font-semibold text-center mb-4">Vendor List</h2>

      {/* Edit Modal */}

      {/* Vendor Table */}
      <div className="flex flex-col ml-10 border">
        <div className="flex w-full border bg-cyan-500 text-white font-semibold">
          <div className="w-[14%] px-2 py-2">First Name</div>
          <div className="w-[14%] px-2 py-2">Last Name</div>
          <div className="w-[24%] px-2 py-2">Email</div>
          <div className="w-[14%] px-2 py-2">Service</div>
          <div className="w-[14%] px-2 py-2">Standard Rate</div>
          <div className="w-[10%] px-2 py-2">Status</div>

          <div className="w-[10%] px-2 py-2">Add to Project</div>
        </div>

        <GetUserByID
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user_id={user}
        ></GetUserByID>
        {vendors.map((vendor) => (
          <div
            key={vendor._id}
            className="flex w-full border-b hover:bg-gray-100 items-center"
          >
            <div
              className="w-[50%] absolute h-10 cursor-pointer"
              onClick={() => {
                setUser(vendor._id), setIsOpen(true);
              }}
            ></div>
            <div className="w-[14%] px-2 py-2">{vendor.first_name}</div>
            <div className="w-[14%] px-2 py-2">{vendor.last_name}</div>
            <div className="w-[24%] px-2 py-2">{vendor.email}</div>
            <div className="w-[14%] px-2 py-2">{vendor.services_offered}</div>
            <div className="w-[14%] px-2 py-2">
              {vendor.billing_currency} {vendor.standard_rate}
            </div>

            <div className="w-[10%]">
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
            <div className="w-[10%]">
              <div className="w-fit mx-auto px-2 py-2 ">
                <button
                  onClick={() => addVendor(vendor)}
                  className="px-3 py-1 bg-green-500 text-white rounded"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddVendorProject;
