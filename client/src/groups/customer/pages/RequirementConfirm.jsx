import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const RequirementConfirm = () => {
  const [requirementData, setRequirementData] = useState(null);
  const location = useLocation();
  const id = location.state?.id;
  const [rejectPop, setRejectPop] = useState(false);
  const [reason, setReason] = useState("");
  const [terminatePop, setTerminatePop] = useState(false);
  const [suggestedChanges, setSuggestedChanges] = useState("");

  const fetchRequirementData = async () => {
    try {
      const response = await axios.get(`${API_URL}/get-requirement/${id}`, {
        withCredentials: true,
      });
      setRequirementData(response.data.requirement);
    } catch (error) {
      console.error("Error fetching requirement data:", error);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchRequirementData();
  }, []);

  if (!requirementData)
    return <div className="text-center mt-10">Loading Quotation...</div>;

  const Confirm = async () => {
    try {
      await axios.post(
        `${API_URL}/notify-approval/${requirementData._id}`,
        { reason, suggestedChanges },
        { withCredentials: true }
      );
      toast("Approval notification sent!");
    } catch (error) {
      console.error("Error sending approval notification:", error);
      toast(
        "Failed to send approval notification. Please directly contact team"
      );
    }
  };

  const Reject = async () => {
    try {
      await axios.post(
        `${API_URL}/notify-rejection/${requirementData._id}`,
        { reason, suggestedChanges },
        { withCredentials: true }
      );
      toast("Rejection notification sent!");
      setRejectPop(false);
    } catch (error) {
      console.error("Error sending rejection notification:", error);
      toast("Failed to send rejection notification.");
    }
  };

  const Terminate = async () => {
    try {
      await axios.post(
        `${API_URL}/notify-terminate/${requirementData._id}`,
        {},
        { withCredentials: true }
      );
      toast("Rejection notification sent!");
      setRejectPop(false);
    } catch (error) {
      console.error("Error sending rejection notification:", error);
      toast("Failed to send rejection notification.");
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-[300] my-4 text-center mb-10">
        Quotation Details
      </h1>
      <div className="bg-white-100 border w-fit mx-auto p-4 px-8 rounded-lg shadow-md shadow-gray-200">
        <p className="mb-3">
          Do you agree with the terms and pricing provided in this quotation?
        </p>
        <div className="w-fit mx-auto">
          <button
            className="px-5 bg-green-500 hover:bg-green-600 mx-3 text-white py-1 rounded-lg "
            onClick={Confirm}
          >
            Confirm
          </button>
          <button
            className="px-5 bg-red-500 hover:bg-red-600 mx-3 text-white py-1 rounded-lg"
            onClick={() => {
              setRejectPop(true);
            }}
          >
            Reject
          </button>

          <button
            className="px-5 bg-red-700 hover:bg-red-800 mx-3 text-white py-1 rounded-lg"
            onClick={() => {
              setTerminatePop(true), Reject;
            }}
          >
            Terminate
          </button>
        </div>
      </div>
      <div className="p-5 mx-10 mt-10 border shadow-sm shadow-gray-300 mb-10">
        <div>
          {/* Header Section */}

          <div className="text-center mb-6"></div>
          <img
            src="http://localhost:8000/static/logo.png"
            alt="Logo"
            className="mx-auto w-[20vw]"
          />
        </div>
        {/* Quote and Date */}
        <table className="w-full font-bold text-sm uppercase">
          <tbody>
            <tr>
              <td className="text-left pl-2">Quote: 2378237928</td>
              <td className="text-right pr-2">
                Date of Issue: {new Date().toLocaleDateString()}
              </td>
            </tr>
          </tbody>
        </table>
        {/* Recipient Information */}
        <div className="pl-2 mt-4">
          <p>To,</p>
          <p>{requirementData.contact_person}</p>
          <p>
            {requirementData.email} | {requirementData.phone_number}
          </p>
          <p>
            {requirementData.city} {requirementData.country}
          </p>
        </div>
        {/* Subject and Description */}
        <p className="mt-10">
          <strong>Subject:</strong> {requirementData.invoice_subject}
        </p>
        <p className="mt-6">
          Thank you for your interest. This is in reference to the discussed
          requirements, we would like to quote the following detail.
        </p>
        {/* Invoice Table */}
        <table className="mt-10 w-full border-collapse text-center">
          <thead>
            <tr>
              <th className="border p-2">S No</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Languages</th>
              <th className="border p-2">Words</th>
              <th className="border p-2">Rate Per Word</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">1</td>
              <td className="border p-2 text-left">
                {requirementData.invoice_description}
              </td>
              <td className="border p-2">{requirementData.locale_count}</td>
              <td className="border p-2">{requirementData.units}</td>
              <td className="border p-2">{requirementData.rate}</td>
              <td className="border p-2">
                {requirementData.rate * requirementData.units}
              </td>
            </tr>
            <tr>
              <td colSpan="3" className="border p-2 text-left pl-10">
                GST (18%)
              </td>
              <td className="border p-2">
                {requirementData.rate * requirementData.units * 0.18}
              </td>
            </tr>
            <tr>
              <td
                colSpan="3"
                className="border p-2 text-left pl-10 font-semibold"
              >
                Net Amount
              </td>
              <td className="border p-2 font-semibold">
                {requirementData.rate * requirementData.units +
                  requirementData.rate * requirementData.units * 0.18}
              </td>
            </tr>
          </tbody>
        </table>
        {/* Turnaround Time */}
        <p className="mt-6">
          Note: TAT <strong>{requirementData.date_diff}</strong> Business days.
        </p>
        {/* Terms and Conditions */}
        <p className="text-lg font-semibold mt-10 mb-3 text-decoration-underline">
          Terms & Conditions
        </p>
        <ul className="list-disc pl-5 text-sm leading-6">
          <li>
            Payment: 25% advance and balance payment within 30 days from the day
            of delivery of the assignment.
          </li>
          <li>
            Quotation Validity: The quotation is valid for 30 days from the date
            of the quotation.
          </li>
          <li>
            Delivery Schedule: Delivery schedule of the project will be
            reconfirmed after getting the confirmation of the job.
          </li>
          <li>
            Cancellation: Cancellation of an order by the Client shall entitle
            ActiveLoc to claim payment of any work already performed for that
            order including cost for any sample work executed.
          </li>
          <li>
            Warranty: ActiveLoc provides warranty of the services provided. If
            any changes or modifications are requested by the Client, ActiveLoc
            undertakes to carry them out free of charge provided such requests
            are made within 30 days of delivery by ActiveLoc and provided that
            the original source document/instructions are not modified.
          </li>
          <li>
            Modifications: ActiveLoc changing any part of the project including
            copy written, translated or edited text at the Client’s request
            shall in no way constitute an acknowledgement on the part of
            ActiveLoc of having supplied an inferior service. Lodging a request
            for modification, change or alteration shall not release the Client
            from its obligation to pay.
          </li>
          <li>
            Acceptance: The service shall be deemed to have been fully accepted
            by the Client at the end of 30 days from the date of delivery and
            allow ActiveLoc to send the invoice.
          </li>
          <li>
            Post-Completion Changes: Once the project is complete and the Client
            requests for any further changes after completion, then the same
            will be charged as per the regular fees.
          </li>
          <li>Turnaround Time (TAT): 1700 words per day per translator.</li>
          <li>
            Express Delivery Charge: We will charge 25% of overall translation
            cost as express delivery charge for quicker TAT.
          </li>
          <li>
            Minimum Invoicing: We practice a minimum invoicing policy of
            INR.2500/- per language irrespective of the volume of service
            requested.
          </li>
        </ul>
        {/* Footer */}
        <div className="text-center text-sm mt-10">
          <p>
            Registered office: 1st Floor, GK Complex, #45/3 Residency Road,
            Bengaluru – 560025 INDIA
          </p>
          <p>
            <strong>Email:</strong> contact@activeloc.com |{" "}
            <strong>Telephone:</strong> +91 6361 045 174 |{" "}
            <strong>Website:</strong>
            <a
              href="http://activeloc.com"
              className="text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              activeloc.com
            </a>
          </p>
        </div>
      </div>

      {rejectPop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Reject Quotation</h2>

            <label className="block text-sm font-medium mb-1">
              Reason for Rejection
            </label>
            <textarea
              className="w-full border rounded p-2 mb-3"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />

            <label className="block text-sm font-medium mb-1">
              Suggested Changes
            </label>
            <textarea
              className="w-full border rounded p-2 mb-4"
              rows={3}
              value={suggestedChanges}
              onChange={(e) => setSuggestedChanges(e.target.value)}
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setRejectPop(false)}
                className="px-4 py-1 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={Reject}
                className="px-4 py-1 bg-red-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {terminatePop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Terminate Quotation</h2>
            <p className="mb-6 text-gray-700">
              Are you sure you want to terminate this quotation?
            </p>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setTerminatePop(false)}
                className="px-4 py-1 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await axios.post(
                      `${API_URL}/terminate-quotation/${requirementData._id}`,
                      {},
                      { withCredentials: true }
                    );
                    toast("Quotation terminated successfully.");
                    setTerminatePop(false);
                  } catch (error) {
                    console.error("Error terminating quotation:", error);
                    toast("Failed to terminate quotation.");
                  }
                }}
                className="px-4 py-1 bg-red-600 text-white rounded"
              >
                Terminate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequirementConfirm;
