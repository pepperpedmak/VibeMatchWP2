import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const typesmovieList = [
    "none", "Action", "Adventure", "Animation", "Biography", "Comedy",
    "Crime", "Documentary", "Drama", "Family", "Fantasy", "History",
    "Horror", "Music", "Musical", "Mystery", "Romance", "Sci-Fi",
    "Sport", "Thriller", "War", "Western", "Superhero", "Supernatural",
    "Zombie", "Vampire", "Werewolf", "Alien", "Robot", "Time Travel",
];

const MovieSelection: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleMovie = (movie: string) => {
    setSelectedMovie((prev) =>
      prev.includes(movie) ? prev.filter((s) => s !== movie) : [...prev, movie]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-lg font-bold text-center mb-4">
            What movie genres do you enjoy watching?
        </h2>
        <div className="h-60 overflow-y-auto flex flex-wrap gap-2 justify-center p-2">
          {typesmovieList.map((movie) => (
            <button
              key={movie}
              onClick={() => toggleMovie(movie)}
              className={`px-3 py-1 rounded-full border border-gray-400 text-sm transition-all
                ${selectedMovie.includes(movie) ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
            >
              {movie}
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={() => navigate(-1)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Previous
          </button>
          <Link to="/generate-image">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Finish
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieSelection;