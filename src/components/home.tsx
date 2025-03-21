import React from "react";
import { Settings } from "lucide-react";
import Navbar from "./navbar";

const Profile: React.FC = () => {
  //ทดลองใส่ข้อมูลของ user
  const user = {
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
  };

  return (
    <div className="w-screen h-screen bg-white flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Profile Card */}
      <div className="flex bg-white p-8 mt-8 shadow-lg rounded-lg border border-gray-300 mx-16">
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

          {/* User Details */}
          <p className="mt-6 text-lg"><strong>Age : </strong> {user.age}</p>
          <p className="text-lg"><strong>Gender : </strong> {user.gender}</p>
          <p className="text-lg"><strong>MBTI : </strong> {user.mbti}</p>

          {/* Display Interests */}
          {renderCategory("Pets", user.pets)}
          {renderCategory("Sports", user.sports)}
          {renderCategory("Games", user.games)}
          {renderCategory("Movies", user.movies)}
          {renderCategory("Music", user.music)}
          {renderCategory("Travel", user.travel)}
          {renderCategory("Collections", user.collections)}

          {/* Action Buttons */}
          <div className="flex gap-8 mt-8">
            <button className="bg-red-500 text-white text-4xl w-20 h-20 rounded-full shadow-md hover:bg-red-600 flex items-center justify-center">
              ✖
            </button>
            <button className="bg-green-500 text-white text-4xl w-20 h-20 rounded-full shadow-md hover:bg-green-600 flex items-center justify-center">
              ✔
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to render categories
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

export default Profile;
