import React, { useState } from "react";
import { EyeClosed, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

type LoginProps = {
  onLogin: (phone: string, password: string) => void;
};

const LoginPage: React.FC<LoginProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(phone, password);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back!</h2>
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
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter password"
              />
              <span 
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeClosed />}
              </span>
            </div>
          </div>
          <div className="text-blue-500 text-sm mb-4 cursor-pointer">Forgot your password?</div>
          <Link to="/home">
            <button type="submit" className="w-full bg-[#008DDA] text-white py-2 rounded-lg hover:bg-blue-600">
              Login
            </button>
          </Link>
        </form>
        <div className="mt-4 flex items-center justify-center border-t pt-4">
          <button className="w-full flex items-center justify-center gap-2 border px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <span><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" width={20}></img></span> Log in with Google
          </button>
        </div>
        <div className="mt-4 text-center text-sm">
          No account? <span className="text-blue-500 cursor-pointer"><Link to="/register/getPhoneNumber">Sign up</Link></span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;