import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const sportsList = [
  "none", "Soccer", "Basketball", "Rugby", "American Football", "Cricket",
  "Baseball", "Volleyball", "Tennis", "Golf", "Badminton", "Boxing",
  "Table Tennis", "Karate", "Judo", "Mixed Martial Arts", "Formula 1",
  "Taekwondo", "Motorcycle Racing", "Cycling", "Swimming", "Skiing"
];

const SportsSelection: React.FC = () => {
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleSport = (sport: string) => {
    setSelectedSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-lg font-bold text-center mb-4">
          What sports do you enjoy playing or watching?
        </h2>
        <div className="h-60 overflow-y-auto flex flex-wrap gap-2 justify-center p-2">
          {sportsList.map((sport) => (
            <button
              key={sport}
              onClick={() => toggleSport(sport)}
              className={`px-3 py-1 rounded-full border border-gray-400 text-sm transition-all
                ${selectedSports.includes(sport) ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
            >
              {sport}
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={() => navigate(-1)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Previous
          </button>
          <Link to="/select-games">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SportsSelection;