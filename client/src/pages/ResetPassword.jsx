import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const OtpResetForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("send");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sendOtp = async () => {
    try {
      await axios.post(`${API_URL}/send-otp`, { email });
      toast.success("OTP sent to your email.");
      setStep("verify");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to send OTP");
    }
  };

  const verifyAndReset = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.post(`${API_URL}/reset-password`, {
        email,
        otp,
        new_password: newPassword,
      });
      toast.success("Password updated successfully.");
      setStep("send");
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to reset password");
    }
  };

  return (
    <div>
      <div className="mx-auto p-4 border rounded shadow mt-32 w-[30%]">
        <h2 className="text-xl font-semibold mb-4">
          {step === "send" ? "Send OTP" : "Reset Password"}
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded outline-none focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {step === "verify" && (
          <>
            <input
              type="text"
              placeholder="OTP"
              className="w-full mb-2 p-2 border rounded outline-none focus:border-blue-500"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full mb-2 p-2 border rounded outline-none focus:border-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full mb-2 p-2 border rounded outline-none focus:border-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        )}
        <button
          onClick={step === "send" ? sendOtp : verifyAndReset}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {step === "send" ? "Send OTP" : "Reset Password"}
        </button>
      </div>
      <div className="mx-auto w-fit mt-2 text-gray-400 underline cursor-pointer text-sm">
        <p onClick={() => navigate(-1)}>Go Back</p>
      </div>
    </div>
  );
};

export default OtpResetForm;
