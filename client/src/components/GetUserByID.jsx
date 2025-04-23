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
    return <div className="p-4 text-center absolute"></div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
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
        {user.organization_name && (
          <p>
            <strong>Organization Name:</strong> {user.organization_name}
          </p>
        )}
      </div>
    </div>
  );
};

export default GetUserByID;
