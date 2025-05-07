import React, { useState, useRef } from "react";
import { Check, X, Music, Film, Gamepad2, Plane, Package, Dumbbell, Cat } from "lucide-react";
import Navbar from "./navbar";

const users = [
  {
    name: "John Doe",
    age: 25,
    gender: "Male",
    mbti: "INTJ",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    collections: ["Art", "Vintage Cars"],
    games: ["Chess", "Fortnite"],
    movies: ["Inception", "The Matrix"],
    music: ["Rock", "Jazz"],
    pets: ["Dog", "Cat"],
    sports: ["Football"],
    travel: [],
  },
  {
    name: "Jane Smith",
    age: 28,
    gender: "Female",
    mbti: "ENFP",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    collections: ["Books", "Stamps"],
    games: ["Minecraft", "Among Us"],
    movies: ["Pride and Prejudice", "La La Land"],
    music: ["Pop", "Classical"],
    pets: ["Cat"],
    sports: ["Tennis", "Yoga"],
    travel: ["Japan", "Italy"],
  },
  {
    name: "Alex Johnson",
    age: 30,
    gender: "Non-binary",
    mbti: "INTP",
    image: "https://randomuser.me/api/portraits/med/men/75.jpg",
    collections: ["Vinyl Records"],
    games: ["Dota 2", "Stardew Valley"],
    movies: ["Interstellar", "Parasite"],
    music: ["Electronic", "Indie"],
    pets: [],
    sports: ["Swimming"],
    travel: ["Thailand", "Mexico"],
  }
];

const Profile: React.FC = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [swipeAnimation, setSwipeAnimation] = useState("");
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const profileRef = useRef<HTMLDivElement>(null);

  const user = users[currentUserIndex];

  // Handle both touch and mouse events
  const handleStart = (clientX: number) => {
    setStartX(clientX);
  };

  const handleMove = (clientX: number) => {
    setEndX(clientX);
  };

  const handleEnd = () => {
    if (startX - endX > 100) {
      // Left swipe = ✔ (correct)
      handleCorrect();
    } else if (endX - startX > 100) {
      // Right swipe = ✖ (wrong)
      handleWrong();
    }
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  const handleCorrect = () => {
    setSwipeAnimation("animate-slide-left");
    setTimeout(goToNextUser, 500);
  };

  const handleWrong = () => {
    setSwipeAnimation("animate-slide-right");
    setTimeout(goToNextUser, 500);
  };

  const goToNextUser = () => {
    setCurrentUserIndex((prev) => (prev + 1) % users.length);
    setSwipeAnimation("");
  };

  const categoryIcons = {
    pets: <Cat size={20} />,
    sports: <Dumbbell size={20} />,
    games: <Gamepad2 size={20} />,
    movies: <Film size={20} />,
    music: <Music size={20} />,
    travel: <Plane size={20} />,
    collections: <Package size={20} />
  };

  // Render category function - fixed to include icon parameter
  const renderCategory = (title: string, items?: string[], icon?: React.ReactNode) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mt-3">
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <strong>{title}:</strong>
        </div>
        <div className="flex flex-wrap gap-2 mt-1">
          {items.map((item, index) => (
            <span key={index} className="border border-gray-500 px-3 py-1 rounded-full text-sm">
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-screen h-screen bg-white flex flex-col">
      <Navbar />
      
      {/* Swipeable/Draggable Profile Card */}
      <div
        ref={profileRef}
        className={`flex flex-col md:flex-row bg-white p-4 md:p-8 mt-8 shadow-lg rounded-lg border border-gray-300 mx-4 md:mx-16 transition-transform duration-500 ${swipeAnimation}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        {/* Image section */}
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <img
            src={user.image}
            alt="Profile"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        
        {/* Profile content section */}
        <div className="w-full md:w-2/3 md:ml-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-bold">{user.name}</h2>
          </div>

          <div className="mt-4">
            <p className="text-lg"><strong>Age:</strong> {user.age}</p>
            <p className="text-lg"><strong>Gender:</strong> {user.gender}</p>
            <p className="text-lg"><strong>MBTI:</strong> {user.mbti}</p>
          </div>

          {/* Interest Categories */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Interests</h3>
            <div className="space-y-3">
              {renderCategory("Pets", user.pets, categoryIcons.pets)}
              {renderCategory("Sports", user.sports, categoryIcons.sports)}
              {renderCategory("Games", user.games, categoryIcons.games)}
              {renderCategory("Movies", user.movies, categoryIcons.movies)}
              {renderCategory("Music", user.music, categoryIcons.music)}
              {renderCategory("Travel", user.travel, categoryIcons.travel)}
              {renderCategory("Collections", user.collections, categoryIcons.collections)}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-8 mt-8">
            <button 
              onClick={handleWrong}
              className="bg-red-500 text-white text-2xl md:text-4xl w-16 h-16 md:w-20 md:h-20 rounded-full shadow-md hover:bg-red-600 flex items-center justify-center"
            >
              <X size={32} color="white" />
            </button>
            <button 
              onClick={handleCorrect}
              className="bg-green-500 text-white text-2xl md:text-4xl w-16 h-16 md:w-20 md:h-20 rounded-full shadow-md hover:bg-green-600 flex items-center justify-center"
            >
              <Check size={32} color="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;