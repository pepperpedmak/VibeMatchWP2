import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface MultiSelectProps {
  title: string;
  options: string[];
  nextPath: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ title, options, nextPath }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleItem = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-lg font-bold text-center mb-4">{title}</h2>
        <div className="h-60 overflow-y-auto flex flex-wrap gap-2 justify-center p-2">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => toggleItem(option)}
              className={`px-3 py-1 rounded-full border border-gray-400 text-sm transition-all
                ${selectedItems.includes(option) ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={() => navigate(-1)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Previous
          </button>
          <Link to={nextPath}>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
