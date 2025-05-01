import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeClosed, Eye } from 'lucide-react';
import { Link } from "react-router-dom";

const GenderList = ["Male", "Female"];

const FillInfo: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    birthdate: "",
    gender: "",
    mbti: "none"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleGender = (gender: string) => {
    setSelectedGender([gender]);
    setFormData(prev => ({ ...prev, gender }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5432/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, password })
      });

      if (response.ok) {
        const result = await response.json();
        alert("Success! Username: " + result.userId);
        navigate("/select-animals");
      } else {
        const error = await response.json();
        alert("Error: " + error.error);
      }
    } catch (err) {
      alert("Unable to connect to server. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-start mb-6">
          Fill in your information
        </h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your phone"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <div className="overflow-y-auto flex flex-wrap gap-2 justify-start p-2">
              {GenderList.map((gender) => (
                <button
                  type="button"
                  key={gender}
                  onClick={() => toggleGender(gender)}
                  className={`px-3 py-1 rounded-full border border-gray-400 text-sm transition-all
                    ${selectedGender.includes(gender)
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-200"}`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">MBTI</label>
            <select
              name="mbti"
              value={formData.mbti}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="none">none</option>
              <option value="INTJ">INTJ</option>
              <option value="INTP">INTP</option>
              <option value="ENTJ">ENTJ</option>
              <option value="ENTP">ENTP</option>
              <option value="INFJ">INFJ</option>
              <option value="INFP">INFP</option>
              <option value="ENFJ">ENFJ</option>
              <option value="ENFP">ENFP</option>
              <option value="ISTJ">ISTJ</option>
              <option value="ISFJ">ISFJ</option>
              <option value="ESTJ">ESTJ</option>
              <option value="ESFJ">ESFJ</option>
              <option value="ISTP">ISTP</option>
              <option value="ISFP">ISFP</option>
              <option value="ESTP">ESTP</option>
              <option value="ESFP">ESFP</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-[#008DDA] text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Register
          </button>
          <div className="mt-4 text-center text-sm">
          I already have an account? <span className="text-blue-500 cursor-pointer"><Link to="/login">Log in</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FillInfo;