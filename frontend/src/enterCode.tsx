
// This component is used to verify the OTP sent to the user's phone number during registration.

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const OTPVerification: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const phoneNumber = location.state?.phone || "Unknown";
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));

  useEffect(() => {
    if (!location.state?.phone) {
      navigate("/register/getPhoneNumber");
    }
  }, [location.state, navigate]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  const handleSubmit = () => {
    alert(`OTP Submitted: ${otp.join("")}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg ">
        <h2 className="text-2xl font-bold mb-4">Enter your code</h2>
        <p className="text-gray-700">{phoneNumber} <span className="text-[#008DDA] cursor-pointer">Resend</span></p>
        <div className="flex justify-center gap-2 my-4">
          {otp.map((_, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength={1}
              className="w-10 h-10 text-center text-lg border border-gray-300 rounded-lg focus:ring-[#008DDA] focus:border-[#008DDA]"
              value={otp[index]}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          ))}
        </div>
        <p className="text-[#008DDA] text-sm cursor-pointer"><Link to="/register/getPhoneNumber">Change number</Link></p>
        <button onClick={handleSubmit} className="w-full bg-[#008DDA] text-white py-2 rounded-lg mt-4 hover:bg-[#0073B0]">
          Next
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
