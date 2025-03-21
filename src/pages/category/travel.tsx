import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const travelList = [
    "none", "Adventure", "Beach", "City", "Cruise", "Cultural",
    "Family", "Historical", "Mountain", "Nature", "Relaxing",
    "Romantic", "Safari", "Ski", "Theme Park", "Water Fall", "National Park",
    "Zoo", "Aquarium", "Museum", "Amusement Park", "Botanical Garden",
    "Art Gallery", "Historical Site", "Science Museum", "Zoo and Aquarium",
    "Temples", "Churches", "Mosques", "Synagogues", "Cathedrals"
];

const TravelSelection: React.FC = () => {
  const [selectedTravel, setSelectedTravel] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleTravel = (travel: string) => {
    setSelectedTravel((prev) =>
      prev.includes(travel) ? prev.filter((s) => s !== travel) : [...prev, travel]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-lg font-bold text-center mb-4">
          What are your favorite travel destinations?
        </h2>
        <div className="h-60 overflow-y-auto flex flex-wrap gap-2 justify-center p-2">
          {travelList.map((travel) => (
            <button
              key={travel}
              onClick={() => toggleTravel(travel)}
              className={`px-3 py-1 rounded-full border border-gray-400 text-sm transition-all
                ${selectedTravel.includes(travel) ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
            >
              {travel}
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={() => navigate(-1)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Previous
          </button>
          <Link to="/select-music">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TravelSelection;