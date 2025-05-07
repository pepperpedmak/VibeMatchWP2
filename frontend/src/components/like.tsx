import React, { useState } from "react";
import { X, Heart, Music, Film, Gamepad2, Plane, Package, Dumbbell, Cat, Check } from "lucide-react";
import Navbar from "./navbar";

const Liked = () => {
  const [selectedUser, setSelectedUser] = useState(null);
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

  // Map of category to icon
  const categoryIcons = {
    pets: <Cat size={18} />,
    sports: <Dumbbell size={18} />,
    games: <Gamepad2 size={18} />,
    movies: <Film size={18} />,
    music: <Music size={18} />,
    travel: <Plane size={18} />,
    collections: <Package size={18} />
  };

  const handleImageClick = (user) => {
    setSelectedUser(user);
    setShowProfile(true);
  };

  const closeProfile = () => {
    setShowProfile(false);
  };

  const handleKeep = () => {
    setShowProfile(false);
  };

  const handleRemove = () => {
    // Remove the user from liked list
    setLikedUsers(prev => prev.filter(user => user.id !== selectedUser.id));
    setShowProfile(false);
  };

  const renderCategory = (title, items, icon) => {
    if (!items || items.length === 0) return null;
    
    return (
      <div className="mt-4">
        <div className="flex items-center mb-2">
          {icon}
          <span className="ml-2 font-semibold text-gray-700">{title}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation bar */}
      <Navbar />
      <div className="flex items-center justify-between p-4 ">
        <h1 className="text-2xl font-bold text-gray-800">Who is interested in you?</h1>
      </div>

      {/* Empty state */}
      {likedUsers.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <Heart className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No liked profiles yet</h3>
          <p className="text-gray-500 max-w-md">
            When you like someone, they'll appear here. Start swiping to find your matches!
          </p>
        </div>
      )}

      {/* Gallery Grid */}
      {likedUsers.length > 0 && (
        <div className="p-4 md:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {likedUsers.map(user => (
              <div 
                key={user.id} 
                className="aspect-square cursor-pointer rounded-lg overflow-hidden shadow-md relative group"
                onClick={() => handleImageClick(user)}
              >
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <p className="text-white font-semibold">{user.name}</p>
                  <p className="text-white text-sm">{user.age} • {user.mbti}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfile && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="border-b border-gray-100 px-6 py-4 flex justify-between items-center">
              <h3 className="font-semibold text-xl text-gray-800">Profile Details</h3>
              <button 
                onClick={closeProfile}
                className="text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="overflow-y-auto p-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-2/5">
                  <div className="rounded-xl overflow-hidden shadow-md">
                    <img
                      src={selectedUser.image}
                      alt={selectedUser.name}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  
                  {/* Basic Info Card */}
                  <div className="bg-gray-100 rounded-xl p-5 mt-4">
                    <h2 className="text-2xl font-bold text-gray-800">{selectedUser.name}</h2>
                    <div className="mt-3 space-y-2 text-gray-700">
                      <div className="flex items-center">
                        <span className="w-20 font-medium">Age:</span>
                        <span>{selectedUser.age}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20 font-medium">Gender:</span>
                        <span>{selectedUser.gender}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20 font-medium">MBTI:</span>
                        <span className="bg-gray-200 px-2 py-1 rounded-md">{selectedUser.mbti}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-3/5">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Interests & Preferences</h3>
                  
                  <div className="space-y-5">
                    {renderCategory("Pets", selectedUser.pets, categoryIcons.pets)}
                    {renderCategory("Sports", selectedUser.sports, categoryIcons.sports)}
                    {renderCategory("Games", selectedUser.games, categoryIcons.games)}
                    {renderCategory("Movies", selectedUser.movies, categoryIcons.movies)}
                    {renderCategory("Music", selectedUser.music, categoryIcons.music)}
                    {renderCategory("Travel", selectedUser.travel, categoryIcons.travel)}
                    {renderCategory("Collections", selectedUser.collections, categoryIcons.collections)}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Footer with Actions */}
            <div className="border-t border-gray-100 px-6 py-4 flex justify-center gap-6">
              <button 
                onClick={handleRemove}
                className="bg-red-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              >
                <X size={18} />
               
              </button>
              <button 
                onClick={handleKeep}
                className="bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <Check size={18} />
        
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Liked;