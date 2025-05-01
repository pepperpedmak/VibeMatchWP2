import React from "react";
import { Link } from "react-router-dom";
import { Home, Heart, MessageCircle, User } from "lucide-react";
import NotificationDropdown from "./notification";

const Navbar: React.FC = () => {
  // Sample notifications data with read/unread status
  const notifications = [
    { id: 1, text: "John Smith liked your profile", time: "2 min ago", read: false },
    { id: 2, text: "New match with Sarah Williams", time: "1 hour ago", read: false },
    { id: 3, text: "Mike Johnson sent you a message", time: "3 hours ago", read: true },
    { id: 4, text: "Emma Davis commented on your photo", time: "1 day ago", read: true },
    { id: 5, text: "Alex Wilson invited you to an event", time: "2 days ago", read: false }
  ];

  return (
    <div className="flex justify-between text-white items-center py-3 px-6 bg-blue-500 shadow-md">
      <div className="text-2xl font-bold">VibeMatch</div>
      <div className="flex gap-6 items-center">
        <div className="cursor-pointer "><Link to='/home'><Home /></Link></div>
        <div className="cursor-pointer" ><Link to='/like'><Heart /></Link></div>
        <NotificationDropdown notifications={notifications} />
        <div className="cursor-pointer"><Link to='/chat'><MessageCircle /></Link></div>
        <div className="cursor-pointer "><Link to='/profile'><User /></Link></div>
      </div>
    </div>
  );
}

export default Navbar;