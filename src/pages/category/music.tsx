import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const musicList = [
    "none", "Pop", "Rock", "Hip Hop", "Rap", "Country",
    "Jazz", "Blues", "Classical", "Reggae", "Soul",
    "Folk", "Electronic", "Dance", "Indie", "Metal",
    "Punk", "R&B", "Gospel", "Latin", "K-Pop", "J-Pop",
    "Funk", "Disco", "Techno", "House", "Trance", "Dubstep",
    "Drum and Bass", "Garage"
];

const MusicSelection: React.FC = () => {
  const [selectedMusic, setSelectedMusic] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleMusic = (music: string) => {
    setSelectedMusic((prev) =>
      prev.includes(music) ? prev.filter((s) => s !== music) : [...prev, music]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-lg font-bold text-center mb-4">
          What kind of music do you enjoy listening to?
        </h2>
        <div className="h-60 overflow-y-auto flex flex-wrap gap-2 justify-center p-2">
          {musicList.map((music) => (
            <button
              key={music}
              onClick={() => toggleMusic(music)}
              className={`px-3 py-1 rounded-full border border-gray-400 text-sm transition-all
                ${selectedMusic.includes(music) ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
            >
              {music}
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={() => navigate(-1)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Previous
          </button>
          <Link to="/select-collections">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MusicSelection;