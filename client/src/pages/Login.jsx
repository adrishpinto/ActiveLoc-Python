import image from "../assets/container.png";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const [eye, setEye] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const validateEmail = (email) => {
    const invalidSymbols = /[\s!#$%^&*()+=<>?]/;

    if (email === "" || email === null) {
      setEmailErr("Please fill out email");
      return false;
    }

    if (invalidSymbols.test(email)) {
      setEmailErr("Email contains invalid symbols");
      return false;
    }

    if (!email.includes("@")) {
      setEmailErr("Include `@` for a valid email");
      return false;
    }

    // Check if there's at least one character between @ and the last dot
    const atIndex = email.indexOf("@");
    const dotIndex = email.lastIndexOf(".");

    if (atIndex >= dotIndex - 1 || dotIndex === -1) {
      setEmailErr("Enter your email provider (e.g., gmail, yahoo)");
      return false;
    }

    // Check if there's at least one character after the last dot
    if (dotIndex >= email.length - 1) {
      setEmailErr("Enter a valid domain (e.g., .com, .in)");
      return false;
    }

    setEmailErr("");
    return true;
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );

      const userGroup = response.data.group;

      console.log("User ID:", response.data.user_id);
      console.log("Group:", userGroup);

      if (userGroup === "Customer") {
        navigate("/dashboard-c");
      } else if (
        userGroup === "Admin" ||
        userGroup === "Sales" ||
        userGroup === "Operation"
      ) {
        navigate("/dashboard");
      } else {
        navigate("/dashboard-c");
      }
    } catch (error) {
      if (error.response) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="border-[1px] w-[99%] mx-auto rounded-xl border-black sm:m-1 flex justify-around h-[150vh] ">
      <div className="lg:w-[40%] w-full border-r border-black ">
        <div className="mt-10 sm:ml-12">
          <div className="flex w-fit mx-auto sm:mx-0">
            <h1 className="inter text-[20px] font-semibold sm:ml-2">HD</h1>
          </div>
        </div>
        <div className="sm:w-[527px] mx-auto">
          <h1 className="font-bold text-[40px] w-fit sm:w-[399px] mx-auto">
            Sign in
          </h1>
          <p className="text-[#969696] w-fit sm:w-[399px] mx-auto">
            Please login to continue to your account.
          </p>

          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="relative w-[90%] sm:w-[399px] mx-auto mt-5 h-[70px]">
              <span className="absolute top-[-15%] left-[4%] bg-white px-1 text-sm text-[#9A9A9A]">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                className="w-full px-4 py-2 border-2 h-[59px] border-[#D9D9D9] outline-none rounded-xl focus:border-blue-400 placeholder:ml-[6px]"
                placeholder="Enter your email"
              />
              {emailErr && (
                <p className="text-red-500 text-sm mt-1">{emailErr}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative w-[90%] sm:w-[399px] mx-auto mt-5 h-[70px]">
              <input
                type={!eye ? "password" : "text"}
                className="w-full px-4 py-2 border-2 h-[59px] border-[#D9D9D9] outline-none rounded-xl focus:border-blue-400 placeholder:ml-[6px]"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div
                className="absolute right-3 top-5 size-[20px] text-[20px] hover:cursor-pointer"
                onClick={() => setEye((prev) => !prev)}
              >
                {eye ? <IoEyeOutline /> : <FaRegEyeSlash />}
              </div>

              {/* forgot password */}
              <p
                className="my-2 ml-1 font-semibold text-xs underline text-gray-400 cursor-pointer"
                onClick={() => navigate("reset-password")}
              >
                Forgot password?
              </p>
            </div>

            <div></div>
            {/* Message display */}

            {/* Submit Button */}
            <button
              type="submit"
              className="relative w-[90%] sm:w-[399px] mx-auto mt-6 h-[54px] bg-[#367AFF] rounded-xl flex items-center justify-center text-white text-[18px] font-semibold cursor-pointer hover:bg-opacity-90"
            >
              Sign in
            </button>
          </form>

          {/* <Google /> */}
        </div>
      </div>
      <div className="w-[60%] lg:block hidden">
        <img
          src={image}
          alt="img"
          className="w-[95%] mx-auto h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
