import React, { useState } from "react";
import { EyeClosed, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const ForgotPasswordPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
   // Prevent the default form submission behavior
    e.preventDefault();
  
    try {
      // Send a POST request to the server to reset the password
      const response = await axios.post('http://localhost:8000/auth/reset-password', {
        phone,
        password,
      });
  
      // If the request is successful, navigate to the login page
      if (response.status === 200) {
        alert("Password reset successfully. Please log in.");
        navigate('/login');
      } else {
        alert("Failed to reset password. Please try again.");
      }
    } catch (err) {
      alert("Error resetting password. Please check your phone number and try again.");
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Find your account</h2>
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">New password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter new password"
              />
              <span 
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeClosed />}
              </span>
            </div>
          </div>
          <button type="submit" className="w-full bg-[#008DDA] text-white py-2 rounded-lg hover:bg-blue-600 mb-4">
            Reset Password
          </button>
          <Link to="/login"><button className="w-full bg-[#008DDA] text-white py-2 rounded-lg hover:bg-blue-600">Back</button></Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
