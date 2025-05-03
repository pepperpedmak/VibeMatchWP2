import React, { useState } from "react";
import { X } from "lucide-react";
import Navbar from "./navbar";

const Liked: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [likedUsers, setLikedUsers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      age: 27,
      gender: "Female",
      mbti: "ENFJ",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      collections: ["Books", "Vinyl Records"],
      games: ["Chess", "Minecraft"],
      movies: ["Inception", "La La Land"],
      music: ["Pop", "Jazz"],
      pets: ["Cat"],
      sports: ["Yoga"],
      travel: ["Japan", "Italy"]
    },
    {
      id: 2,
      name: "Mike Chen",
      age: 29,
      gender: "Male",
      mbti: "ISTP",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      collections: ["Comic Books"],
      games: ["Dota 2", "Valorant"],
      movies: ["The Dark Knight", "Interstellar"],
      music: ["Rock", "Hip Hop"],
      pets: ["Dog"],
      sports: ["Basketball", "Swimming"],
      travel: []
    },
  ]);

  const handleImageClick = (user: any) => {
    setSelectedUser(user);
    setShowProfile(true);
  };

  const closeProfile = () => {
    setShowProfile(false);
  };

  const handleCorrect = () => {
    setShowProfile(false);
  };

  const handleWrong = () => {
    // Remove the user from liked list
    setLikedUsers(prev => prev.filter(user => user.id !== selectedUser.id));
    setShowProfile(false);
  };

  const renderCategory = (title: string, items?: string[]) => {
    if (!items || items.length === 0) return null;
    return (
      <p className="mt-4 text-lg">
        <strong>{title}: </strong>
        {items.map((item, index) => (
          <span key={index} className="border border-gray-500 px-3 py-1 rounded-full text-sm ml-2">
            {item}
          </span>
        ))}
      </p>
    );
  };

  return (
    <div className="w-screen h-screen bg-white flex flex-col">
      <Navbar />

      <div className="grid grid-cols-5 gap-3 px-6 pt-8 pb-2 flex-1 overflow-y-auto">
        {likedUsers.map(user => (
          <div 
            key={user.id} 
            className="aspect-square cursor-pointer"
            onClick={() => handleImageClick(user)}
          >
            <img
              src={user.image}
              alt={`Liked user ${user.id}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            />
          </div>
        ))}
      </div>

      {/* Profile Modal */}
      {showProfile && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={closeProfile}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2">
                <img
                  src={selectedUser.image}
                  alt={selectedUser.name}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold">{selectedUser.name}</h2>
                <div className="mt-6 space-y-2">
                  <p className="text-lg"><strong>Age:</strong> {selectedUser.age}</p>
                  <p className="text-lg"><strong>Gender:</strong> {selectedUser.gender}</p>
                  <p className="text-lg"><strong>MBTI:</strong> {selectedUser.mbti}</p>
                </div>

                {renderCategory("Collections", selectedUser.collections)}
                {renderCategory("Games", selectedUser.games)}
                {renderCategory("Movies", selectedUser.movies)}
                {renderCategory("Music", selectedUser.music)}
                {renderCategory("Pets", selectedUser.pets)}
                {renderCategory("Sports", selectedUser.sports)}
                {renderCategory("Travel", selectedUser.travel)}

                {/* Action Buttons */}
                <div className="flex gap-8 mt-8">
                    <button 
                    onClick={handleWrong}
                    className="bg-red-500 text-white text-4xl w-20 h-20 rounded-full shadow-md hover:bg-red-600 flex items-center justify-center"
                >
                ✖
                    </button>
                    <button 
                    onClick={handleCorrect}
                    className="bg-green-500 text-white text-4xl w-20 h-20 rounded-full shadow-md hover:bg-green-600 flex items-center justify-center"
                >
                ✔
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Liked;