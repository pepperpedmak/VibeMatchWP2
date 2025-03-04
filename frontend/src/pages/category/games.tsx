import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const typesgameList = [
    "none", "MMORPG", "MOBA", "FPS", "RTS", "RPG","TPS", "TBS", 
    "Action", "Adventure", "Role-Playing", "Simulation", "Strategy",
    "Sports", "Puzzle", "Idle", "Racing", "Fighting", "Survival", "Horror",
    "Educational", "Music", "Board", "Card", "Casual", "Trivia", "Arcade",
    "Platformer", "Rhythm", "Shooter", "Sandbox", 
    "Stealth", "Battle Royale", "Open World", "Tower Defense", "Visual Novel"
];

const GamesSelection: React.FC = () => {
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleGame = (game: string) => {
    setSelectedGames((prev) =>
      prev.includes(game) ? prev.filter((s) => s !== game) : [...prev, game]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-lg font-bold text-center mb-4">
          What types of games do you enjoy playing?
        </h2>
        <div className="h-60 overflow-y-auto flex flex-wrap gap-2 justify-center p-2">
          {typesgameList.map((game) => (
            <button
              key={game}
              onClick={() => toggleGame(game)}
              className={`px-3 py-1 rounded-full border border-gray-400 text-sm transition-all
                ${selectedGames.includes(game) ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
            >
              {game}
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={() => navigate(-1)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Previous
          </button>
          <Link to="/select-travel">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GamesSelection;