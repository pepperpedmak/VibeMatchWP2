import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const GenderList = ["Male", "Female"];

const FillInfo: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleGender = (gender: string) => {
    setSelectedGender((prev) =>
      prev.includes(gender)
        ? prev.filter((s) => s !== gender)
        : [...prev, gender]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-start mb-6">
          Fill in your information
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 ">
              Gender
            </label>
            <div className="overflow-y-auto flex flex-wrap gap-2 justify-start p-2">
              {GenderList.map((gender) => (
                <button
                  key={gender}
                  onClick={() => toggleGender(gender)}
                  className={`px-3 py-1 rounded-full border border-gray-400 text-sm transition-all
                          ${
                            selectedGender.includes(gender)
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-700 hover:bg-gray-200"
                          }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              MBTI
            </label>
            <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
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

          <Link to="/select-animals">
            <button className="w-full bg-[#008DDA] text-white py-2 rounded-lg hover:bg-blue-600">
              Next
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default FillInfo;
