import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";

type Notification = {
  id: number;
  text: string;
  time: string;
  read: boolean;
  image?: string;
};

interface NotificationDropdownProps {
  notifications: Notification[];
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ notifications: initialNotifications }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const filteredNotifications =
    filter === "unread" ? notifications.filter(n => !n.read) : notifications;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Icon with Badge */}
      <div 
        className="cursor-pointer relative flex items-center justify-center w-10 h-10" 
        onClick={toggleDropdown}
      >
        <Bell size={24} className="text-white" />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        )}
      </div>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl py-1 z-10 text-gray-800 max-h-96 overflow-y-auto">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-bold text-xl">Notifications</span>
              <button 
                className="text-blue-500 cursor-pointer text-sm"
                onClick={markAllAsRead}
              >
                Mark all as read
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex mt-2 border-b border-gray-200">
              <button
                className={`mr-4 py-2 font-medium ${
                  filter === "all"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500"
                }`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`mr-4 py-2 font-medium ${
                  filter === "unread"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500"
                }`}
                onClick={() => setFilter("unread")}
              >
                Unread
              </button>
            </div>
          </div>

          {/* Notification List */}
          <div className="py-1">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <Link 
                  to="/notification" 
                  key={notification.id}
                  className="block px-4 py-3 hover:bg-gray-100 relative"
                >
                  <div className="flex">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{notification.text}</div>
                      <div className="text-xs text-blue-500 font-medium mt-1">{notification.time}</div>
                    </div>

                    {/* Unread indicator */}
                    {!notification.read && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 ml-2"></div>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                No notifications
              </div>
            )}
          </div>

          {/* See All Link */}
          <div className="px-4 py-2 text-center border-t border-gray-200">
            <Link 
              to="/notification" 
              className="text-blue-500 font-medium text-sm hover:text-blue-700"
            >
              See all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
