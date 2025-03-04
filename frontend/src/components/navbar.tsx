import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="flex justify-between text-white items-center py-4 px-8 bg-[#008DDA] shadow-md">
      <div className="text-2xl font-bold">VibeMatch</div>
      <div className="flex gap-4">
        <div className="cursor-pointer">Home</div>
        <div className="cursor-pointer">Liked</div>
        <div className="cursor-pointer">Notification</div>
        <div className="cursor-pointer">Chat</div>
        <div className="cursor-pointer">Profile</div>
      </div>
    </div>
  );
}

export default Navbar;