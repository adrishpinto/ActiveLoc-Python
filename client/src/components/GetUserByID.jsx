import React, { useEffect, useState } from "react";
import axios from "axios";

const GetUserByID = ({ user_id, setIsOpen, isOpen }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user_id && isOpen) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/user/${user_id}`,
            {
              withCredentials: true,
            }
          );
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUser();
    }
  }, [user_id, isOpen]);

  if (!isOpen) return null;

  if (!user) {
    return <div className="p-4 text-center absolute">Loading...</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full relative overflow-y-auto max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-semibold text-2xl"
        >
          &times;
        </button>

        {/* Modal content */}
        <h3 className="text-xl font-semibold mb-4">User Details</h3>
        <p>
          <strong>User ID:</strong> {user.user_id}
        </p>

        <p>
          <strong>Name:</strong> {user.first_name} {user.last_name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Status:</strong> {user.status ? "Active" : "Inactive"}
        </p>
        <p>
          <strong>Group:</strong> {user.group}
        </p>
        <p>
          <strong>Permission:</strong> {user.permission}
        </p>

        {/* Optional Fields */}
        {user.phone_number && (
          <p>
            <strong>Phone Number:</strong> {user.phone_number}
          </p>
        )}
        {user.city && (
          <p>
            <strong>City:</strong> {user.city}
          </p>
        )}
        {user.country && (
          <p>
            <strong>Country:</strong> {user.country}
          </p>
        )}
        {user.type && (
          <p>
            <strong>Type:</strong> {user.type}
          </p>
        )}
        {user.organization_name && (
          <p>
            <strong>Organization:</strong> {user.organization_name}
          </p>
        )}
        {user.billing_address && (
          <p>
            <strong>Billing Address:</strong> {user.billing_address}
          </p>
        )}
        {user.tax_id && (
          <p>
            <strong>Tax ID:</strong> {user.tax_id}
          </p>
        )}
        {user.pan_number && (
          <p>
            <strong>PAN Number:</strong> {user.pan_number}
          </p>
        )}
        {user.billing_currency && (
          <p>
            <strong>Billing Currency:</strong> {user.billing_currency}
          </p>
        )}

        {/* Vendor-specific fields */}
        {user.group == "Vendor" && (
          <>
            {user.standard_rate && (
              <p>
                <strong>Standard Rate:</strong> {user.standard_rate}
              </p>
            )}
            {user.services_offered && (
              <p>
                <strong>Services Offered:</strong> {user.services_offered}
              </p>
            )}
            {user.custom_service && (
              <p>
                <strong>Custom Service:</strong> {user.custom_service}
              </p>
            )}
          </>
        )}

        {/* Customer-specific field */}
        {user.group === "customer" && user.created_by && (
          <p>
            <strong>Created By:</strong> {user.created_by}
          </p>
        )}
      </div>
    </div>
  );
};

export default GetUserByID;
