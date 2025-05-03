import React, { useState, useRef } from "react";
import { Settings } from "lucide-react";
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

  // Render category function
  const renderCategory = (title: string, items?: string[]) => {
    if (!items || items.length === 0) return null;
    return (
      <p className="mt-6 text-lg">
        <strong>{title}</strong>
        {items.map((item, index) => (
          <span key={index} className="border border-gray-500 px-4 py-2 rounded-full text-lg ml-2">
            {item}
          </span>
        ))}
      </p>
    );
  };

  return (
      <div className="w-screen h-screen bg-white flex flex-col">
        <Navbar />
        
        {/* Swipeable/Draggable Profile Card */}
        <div
          ref={profileRef}
          className={`flex bg-white p-8 mt-8 shadow-lg rounded-lg border border-gray-300 mx-16 transition-transform duration-500 ${swipeAnimation}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
        >
          {/* Profile content */}
          <img
            src={user.image}
            alt="Profile"
            className="w-1/2 h-auto object-cover rounded-lg"
          />
          <div className="ml-52 w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">{user.name}</h2>
              <Settings className="w-8 h-8 cursor-pointer text-gray-600 hover:text-blue-600" />
            </div>
  
            <p className="mt-6 text-lg"><strong>Age : </strong> {user.age}</p>
            <p className="text-lg"><strong>Gender : </strong> {user.gender}</p>
            <p className="text-lg"><strong>MBTI : </strong> {user.mbti}</p>
  
            {renderCategory("Pets", user.pets)}
            {renderCategory("Sports", user.sports)}
            {renderCategory("Games", user.games)}
            {renderCategory("Movies", user.movies)}
            {renderCategory("Music", user.music)}
            {renderCategory("Travel", user.travel)}
            {renderCategory("Collections", user.collections)}
          
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
  );
};

export default Profile;