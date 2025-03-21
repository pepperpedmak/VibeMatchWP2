import React, { useEffect, useState } from "react";
import { Settings } from "lucide-react";
import Navbar from "./navbar";
import { getUser } from "../api";

interface User {
    id: number;
    name: string;
    age: number;
    gender: string;
    mbti: string;
    image: string;
    collections?: string[];
    games?: string[];
    movies?: string[];
    music?: string[];
    pets?: string[];
    sports?: string[];
    travel?: string[];
  };

  const Profile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
      // Fetch user data when the component mounts
      const fetchUser = async () => {
        const userData = await getUser(); // Ensure getUser() is correctly fetching the data
        setUser(userData);
      };
  
      fetchUser();
    }, []);
  
    // If the user data hasn't been fetched yet, show a loading state
    if (!user) {
      return <div>Loading...</div>;
    }
    
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
