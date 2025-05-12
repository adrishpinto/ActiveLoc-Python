import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const RequirementsCard = () => {
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const response = await axios.get(`${API_URL}/get-requirements-user`, {
          withCredentials: true,
        });
        setRequirements(response.data.requirements);
      } catch (error) {
        toast.error("Failed to load requirements");
        console.error("Error fetching requirements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequirements();
  }, []);

  //time
  const getRemainingHours = (deadline) => {
    const deadlineTime = new Date(deadline);
    const currentTime = new Date();
    const remainingTime = deadlineTime - currentTime;
    return Math.floor(remainingTime / (1000 * 60 * 60));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const Navigate = (id) => {
    navigate("/requirements-confirm", { state: { id: id } });
  };

  const navClicked = (req) => {
    if (req.status === "Submitted") {
      Navigate(req._id);
    } else {
      toast.info("Quotation is still in draft and will be provided shortly.");
    }
  };

  return (
    <div className="container mx-auto mt-1 p-4 min-h-[70vh]">
      <h2 className="text-2xl font-semibold mb-4">Your Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requirements.map((req) => {
          const remainingHours = getRemainingHours(req.quotation_deadline);
          return (
            <div
              key={req._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start cursor-pointer"
              onClick={() => navClicked(req)}
            >
              <h3 className="text-xl font-semibold">{req.title}</h3>
              <p className="text-gray-600">Service: {req.service_type}</p>

              <p className="rounded">
                Status:{" "}
                {req.status == "Draft" ? (
                  <span className="bg-gray-200 px-2 rounded-lg text-gray-500">
                    {req.status}
                  </span>
                ) : (
                  <span className="bg-green-200 px-2 rounded-lg text-green-500">
                    {req.status == "Submitted" && "Ready"}
                  </span>
                )}
              </p>

              {req.status !== "Submitted" ? (
                <p className="text-gray-600">
                  {isNaN(remainingHours) || remainingHours <= 0 ? (
                    <p className="font-semibold text-sm mt-1">
                      Quotation will be ready shortly
                    </p>
                  ) : (
                    <p className="font-semibold text-sm mt-1">
                      Ready in: {remainingHours} hours
                    </p>
                  )}
                </p>
              ) : (
                <p className="font-semibold text-sm mt-1">
                  Click here to view quotation
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PageLayout = () => {
  return (
    <div>
      <div className="mt-16 mx-32 p-4 bg-slate-100 rounded-md">
        <RequirementsCard />
      </div>
    </div>
  );
};

export default PageLayout;
