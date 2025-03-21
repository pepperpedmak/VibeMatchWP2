import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const animalsList = [
    "none", "Dog", "Cat", "Rabbit", "Hamster", "Parrot",
    "Fish", "Turtle", "Horse", "Snake", "Lizard",
    "Gold fish", "Koi Fish", "Chinchilla", "Hermit Crab",
    "Mouse", "Axoloti", "Gerbil", "Hedgehog", "Ferret"
];

const PetSelection: React.FC = () => {
  const [selectedAnimals, setSelectedAnimals] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleAnimal = (animal: string) => {
    setSelectedAnimals((prev) =>
      prev.includes(animal) ? prev.filter((s) => s !== animal) : [...prev, animal]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-lg font-bold text-center mb-4">
          What are yout favorite pets?
        </h2>
        <div className="h-60 overflow-y-auto flex flex-wrap gap-2 justify-center p-2">
          {animalsList.map((animal) => (
            <button
              key={animal}
              onClick={() => toggleAnimal(animal)}
              className={`px-3 py-1 rounded-full border border-gray-400 text-sm transition-all
                ${selectedAnimals.includes(animal) ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
            >
              {animal}
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={() => navigate(-1)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Previous
          </button>
          <Link to="/select-sports">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PetSelection;