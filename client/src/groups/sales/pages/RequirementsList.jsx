import { useEffect, useState } from "react";
import Axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const RequirementsList = () => {
  const [requirements, setRequirements] = useState([]);
  const [error, setError] = useState(null);

  // Define the fetch function separately
  const fetchRequirements = async () => {
    try {
      const response = await Axios.get(`${API_URL}/get-requirements`, {
        withCredentials: true,
      });

      setRequirements(response.data.requirements);
    } catch (err) {
      setError("Failed to fetch requirements.");
      console.error("Error fetching requirements:", err);
    }
  };

  // Call fetchRequirements inside useEffect
  useEffect(() => {
    fetchRequirements();
  }, []);

  if (error) {
    return (
      <div className="bg-red-200 p-4 text-center text-red-700 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Requirements List</h2>
      <ul className="space-y-4">
        {requirements.map((requirement, index) => (
          <li
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
          >
            <div className="text-lg font-semibold mb-2">
              <strong>Title:</strong> {requirement.title}
            </div>
            <div className="text-md mb-2">
              <strong>Deadline:</strong> {requirement.deadline}
            </div>
            <div className="text-md mb-2">
              <strong>Description:</strong> {requirement.description}
            </div>
            <div className="text-md mb-2">
              <strong>Blob URL:</strong>{" "}
              <a
                href={requirement.blob_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                {requirement.blob_url}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequirementsList;
