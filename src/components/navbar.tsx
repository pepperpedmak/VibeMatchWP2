import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="flex justify-between text-white items-center py-5 px-12 bg-[#008DDA] shadow-md">
      <div className="text-4xl font-bold">VibeMatch</div> {/* Increased font size */}
      <div className="flex gap-5"> {/* Increased gap between nav items */}
        <Link to="/home" className="cursor-pointer hover:underline text-3xl px-4 py-2">Home</Link> {/* Increased text size and padding */}
        <Link to="/liked" className="cursor-pointer hover:underline text-3xl px-4 py-2">Liked</Link>
        <Link to="/notifications" className="cursor-pointer hover:underline text-3xl px-4 py-2">Notifications</Link>
        <Link to="/chat" className="cursor-pointer hover:underline text-3xl px-4 py-2">Chat</Link>
        <Link to="/profile" className="cursor-pointer hover:underline text-3xl px-4 py-2">Profile</Link>
      </div>
    </div>
  );
};

export default Navbar;
