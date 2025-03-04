import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const collectionsList = [
    "none", "Stamps", "Coins", "Postcards", "Vinyl Records", "Comic Books",
    "Action Figures", "Trading Cards", "Antiques", "Art", "Books",
    "Comic Strips", "Currency", "Dolls", "Figurines", "Jewelry",
    "Keychains", "Magnets", "Miniatures", "Models", "Music",
    "Ornaments", "Paperweights", "Patches", "Pins", "Pottery",
    "Prints", "Rocks", "Seashells", "Sculptures", "Signs"
];

const CollectionSelection: React.FC = () => {
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleCollection = (collection: string) => {
    setSelectedCollections((prev) =>
      prev.includes(collection) ? prev.filter((s) => s !== collection) : [...prev, collection]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-lg font-bold text-center mb-4">
          Do you have any collections?
        </h2>
        <div className="h-60 overflow-y-auto flex flex-wrap gap-2 justify-center p-2">
          {collectionsList.map((collection) => (
            <button
              key={collection}
              onClick={() => toggleCollection(collection)}
              className={`px-3 py-1 rounded-full border border-gray-400 text-sm transition-all
                ${selectedCollections.includes(collection) ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
            >
              {collection}
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={() => navigate(-1)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Previous
          </button>
          <Link to="/select-movies">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CollectionSelection;