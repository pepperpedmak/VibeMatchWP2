// This file is fill phone number

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const GetPhoneNumberPage: React.FC = () => {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/register/getPhoneNumber/enterCode", { state: { phone } });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Can we get your number?</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter phone number"
            />
          </div>
          <div className="block text-sm font-medium text-gray-700 mb-4">
            We'll text you a OTP code to verify you're really you.
          </div>
          <button type="submit" className="w-full bg-[#008DDA] text-white py-2 rounded-lg hover:bg-blue-600">
            Next
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          I already have an account? <span className="text-blue-500 cursor-pointer"><Link to="/">Log in</Link></span>
        </div>
      </div>
    </div>
  );
};

export default GetPhoneNumberPage;