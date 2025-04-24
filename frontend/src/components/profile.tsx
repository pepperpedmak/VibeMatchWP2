import { useState } from "react";
import Navbar from "./navbar";

// Define types
type Pet = "Parrot" | "Rabbit" | string;
type Sport = "Basketball" | "Tennis" | string;
type Badge = { label: string; color: string };

interface UserProfile {
  id: string;
  username: string;
  birthDate: string;
  gender: string;
  mbti: string;
  pets: Pet[];
  sports: Sport[];
  movie: string;
  game: string;
  travel: string;
  avatar?: string;
}

// Simple SVG icons as components
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const SaveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserProfile>({
    id: "1",
    username: "User1",
    birthDate: "29 Febuary 2000", // Keeping the typo as in the image
    gender: "Female",
    mbti: "INTP",
    pets: ["Parrot", "Rabbit"],
    sports: ["Basketball", "Tennis"],
    movie: "None",
    game: "None",
    travel: "Beach",
  });

  const handleSave = () => {
    // Here you would typically send data to an API
    setIsEditing(false);
  };

  const updateField = (field: keyof UserProfile, value: any) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const addBadge = (category: "pets" | "sports") => {
    if (isEditing) {
      const newItem = prompt(`Add new ${category.slice(0, -1)}`);
      if (newItem && newItem.trim() !== "") {
        setUser((prev) => ({
          ...prev,
          [category]: [...prev[category], newItem],
        }));
      }
    }
  };

  const removeBadge = (category: "pets" | "sports", index: number) => {
    if (isEditing) {
      setUser((prev) => ({
        ...prev,
        [category]: prev[category].filter((_, i) => i !== index),
      }));
    }
  };

  const renderBadges = (items: string[], category: "pets" | "sports") => {
    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={index}
            className="bg-blue-400 text-white px-4 py-1 rounded-full flex items-center"
            onClick={() => removeBadge(category, index)}
          >
            {item}
            {isEditing && <span className="ml-2 cursor-pointer">×</span>}
          </span>
        ))}
        {isEditing && (
          <span
            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full cursor-pointer flex items-center justify-center"
            onClick={() => addBadge(category)}
          >
            <PlusIcon />
          </span>
        )}
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Avatar and decorations */}
            <div className="w-full md:w-1/3 bg-gray-50 p-6 border-r border-gray-200">
              <div className="relative mb-6">
                <img
                  src="/api/placeholder/300/300"
                  alt="Profile avatar"
                  className="w-full rounded-lg border-4 border-blue-100"
                />
                {isEditing && (
                  <label className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer">
                    <EditIcon />
                    <input type="file" className="hidden" />
                  </label>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[...Array(9)].map((_, idx) => (
                  <div key={idx} className="bg-gray-200 rounded-md h-16"></div>
                ))}
              </div>
            </div>

            {/* Right side - Profile information */}
            <div className="w-full md:w-2/3 p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                  {isEditing ? (
                    <input
                      type="text"
                      value={user.username}
                      onChange={(e) => updateField("username", e.target.value)}
                      className="border-b border-gray-400 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    user.username
                  )}
                </h1>
                <button
                  onClick={() =>
                    isEditing ? handleSave() : setIsEditing(true)
                  }
                  className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {isEditing ? (
                    <>
                      <SaveIcon />
                      <span className="ml-1">Save</span>
                    </>
                  ) : (
                    <>
                      <EditIcon />
                      <span className="ml-1">Edit</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-4">
                <ProfileField
                  label="Birth"
                  value={user.birthDate}
                  isEditing={isEditing}
                  onChange={(val) => updateField("birthDate", val)}
                />

                <ProfileField
                  label="Gender"
                  value={user.gender}
                  isEditing={isEditing}
                  onChange={(val) => updateField("gender", val)}
                />

                <ProfileField
                  label="MBTI"
                  value={user.mbti}
                  isEditing={isEditing}
                  onChange={(val) => updateField("mbti", val)}
                />

                <div>
                  <h3 className="text-gray-500 mb-1">Pet</h3>
                  {renderBadges(user.pets, "pets")}
                </div>

                <div>
                  <h3 className="text-gray-500 mb-1">Sport</h3>
                  {renderBadges(user.sports, "sports")}
                </div>

                <ProfileField
                  label="Movie"
                  value={user.movie}
                  isEditing={isEditing}
                  onChange={(val) => updateField("movie", val)}
                />

                <ProfileField
                  label="Game"
                  value={user.game}
                  isEditing={isEditing}
                  onChange={(val) => updateField("game", val)}
                />

                <ProfileField
                  label="Travel"
                  value={user.travel}
                  isEditing={isEditing}
                  onChange={(val) => updateField("travel", val)}
                />
              </div>
            </div>
          </div>

          {/* Bottom section for additional images */}
          <div className="bg-gray-50 p-4 border-t border-gray-200">
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-blue-300 rounded-md flex items-center justify-center cursor-pointer">
                <PlusIcon />
              </div>
              <div className="w-24 h-24 bg-blue-300 rounded-md flex items-center justify-center cursor-pointer">
                <PlusIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for profile fields
function ProfileField({
  label,
  value,
  isEditing,
  onChange,
}: {
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <h3 className="text-gray-500 mb-1">{label}</h3>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 py-1"
        />
      ) : (
        <p className="text-gray-800">
          {value === "None" ? (
            <span className="bg-blue-400 text-white px-4 py-1 rounded-full inline-block">
              None
            </span>
          ) : (
            value
          )}
        </p>
      )}
    </div>
  );
}
