import { useState } from "react";
import Navbar from "./components/navbar";

// Define types
type Pet = "Parrot" | "Rabbit" | string;
type Sport = "Basketball" | "Tennis" | string;
type Movie = string;
type Game = string;
type Travel = string;
type Music = string;
type Collection = string;

// Define sample options for the new collections
const movieOptions = ["None", "Action", "Adventure", "Animation", "Biography", "Comedy",
    "Crime", "Documentary", "Drama", "Family", "Fantasy", "History",
    "Horror", "Music", "Musical", "Mystery", "Romance", "Sci-Fi",
    "Sport", "Thriller", "War", "Western", "Superhero", "Supernatural",
    "Zombie", "Vampire", "Werewolf", "Alien", "Robot", "Time Travel"];

const collectionsOptions = ["None", "Stamps", "Coins", "Postcards", "Vinyl Records", "Comic Books",
    "Action Figures", "Trading Cards", "Antiques", "Art", "Books",
    "Comic Strips", "Currency", "Dolls", "Figurines", "Jewelry",
    "Keychains", "Magnets", "Miniatures", "Models", "Music",
    "Ornaments", "Paperweights", "Patches", "Pins", "Pottery",
    "Prints", "Rocks", "Seashells", "Sculptures", "Signs"];

const gameOptions = ["None", "MMORPG", "MOBA", "FPS", "RTS", "RPG","TPS", "TBS", 
    "Action", "Adventure", "Role-Playing", "Simulation", "Strategy",
    "Sports", "Puzzle", "Idle", "Racing", "Fighting", "Survival", "Horror",
    "Educational", "Music", "Board", "Card", "Casual", "Trivia", "Arcade",
    "Platformer", "Rhythm", "Shooter", "Sandbox", 
    "Stealth", "Battle Royale", "Open World", "Tower Defense", "Visual Novel"];

const travelOptions = ["None", "Adventure", "Beach", "City", "Cruise", "Cultural",
    "Family", "Historical", "Mountain", "Nature", "Relaxing",
    "Romantic", "Safari", "Ski", "Theme Park", "Water Fall", "National Park",
    "Zoo", "Aquarium", "Museum", "Amusement Park", "Botanical Garden",
    "Art Gallery", "Historical Site", "Science Museum", "Zoo and Aquarium",
    "Temples", "Churches", "Mosques", "Synagogues", "Cathedrals"];

const musicOptions = ["None", "Pop", "Rock", "Hip Hop", "Rap", "Country",
    "Jazz", "Blues", "Classical", "Reggae", "Soul",
    "Folk", "Electronic", "Dance", "Indie", "Metal",
    "Punk", "R&B", "Gospel", "Latin", "K-Pop", "J-Pop",
    "Funk", "Disco", "Techno", "House", "Trance", "Dubstep",
    "Drum and Bass", "Garage"];

const petsOptions = ["None", "Dog", "Cat", "Rabbit", "Hamster", "Parrot",
    "Fish", "Turtle", "Horse", "Snake", "Lizard",
    "Gold fish", "Koi Fish", "Chinchilla", "Hermit Crab",
    "Mouse", "Axoloti", "Gerbil", "Hedgehog", "Ferret"];

const sportsOptions = [ "None", "Soccer", "Basketball", "Rugby", "American Football", "Cricket",
  "Baseball", "Volleyball", "Tennis", "Golf", "Badminton", "Boxing",
  "Table Tennis", "Karate", "Judo", "Mixed Martial Arts", "Formula 1",
  "Taekwondo", "Motorcycle Racing", "Cycling", "Swimming", "Skiing"];

interface UserProfile {
  id: string;
  username: string;
  birthDate: string;
  gender: string;
  mbti: string;
  pets: Pet[];
  sports: Sport[];
  movies: Movie[];
  games: Game[];
  travel: Travel[];
  music: Music[];
  collections: Collection[];
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

const CloseIcon = () => (
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
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// MBTI options array to match register.tsx
const mbtiOptions = [
  "none", "INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP"
];

// Gender options array to match register.tsx
const genderOptions = ["Male", "Female"];

// Popup component for category selection
function CategoryPopup({
  title,
  options,
  selectedItems,
  onToggle,
  onClose,
}: {
  title: string;
  options: string[];
  selectedItems: string[];
  onToggle: (option: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 m-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <CloseIcon />
          </button>
        </div>
        
        <div className="max-h-96 overflow-y-auto mb-4">
          <div className="flex flex-wrap gap-2 justify-start">
            {options.map((option) => (
              option !== "none" && (
                <button
                  key={option}
                  onClick={() => onToggle(option)}
                  className={`px-4 py-2 rounded-full border transition-all
                    ${selectedItems.includes(option)
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
                >
                  {option}
                </button>
              )
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activePopup, setActivePopup] = useState<keyof UserProfile | null>(null);
  
  const [user, setUser] = useState<UserProfile>({
    id: "1",
    username: "User1",
    birthDate: "2000-02-29", // Fixed date format for input type="date"
    gender: "Female",
    mbti: "INTP",
    pets: ["Parrot", "Rabbit"],
    sports: ["Basketball", "Tennis"],
    movies: ["Comedy", "Drama"],
    games: ["RPG", "Adventure"],
    travel: ["Beach", "Mountain"],
    music: ["Pop", "Rock"],
    collections: ["Stamps", "Coins"],
  });

  const handleSave = () => {
    // Here you would typically send data to an API
    setIsEditing(false);
  };

  const updateField = (field: keyof UserProfile, value: any) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  // Handle selection for multi-select fields
  const handleOptionToggle = (category: keyof UserProfile, option: string) => {
    if (Array.isArray(user[category])) {
      setUser((prev) => {
        const currentItems = prev[category] as string[];
        if (currentItems.includes(option)) {
          // Remove the option if already selected
          return {
            ...prev,
            [category]: currentItems.filter(item => item !== option)
          };
        } else {
          // Add the option if not already selected
          return {
            ...prev,
            [category]: [...currentItems, option]
          };
        }
      });
    }
  };

  // Function to handle gender selection similar to register.tsx
  const toggleGender = (gender: string) => {
    if (isEditing) {
      updateField("gender", gender);
    }
  };

  // Get options based on category
  const getCategoryOptions = (category: keyof UserProfile): string[] => {
    switch (category) {
      case "pets": return petsOptions;
      case "sports": return sportsOptions;
      case "movies": return movieOptions;
      case "games": return gameOptions;
      case "travel": return travelOptions;
      case "music": return musicOptions;
      case "collections": return collectionsOptions;
      default: return [];
    }
  };

  // Format category title
  const formatTitle = (category: string): string => {
    let title = category.charAt(0).toUpperCase() + category.slice(1);
    // Handle singular/plural form
    if (title.endsWith('s') && title !== 'sports') {
      title = title.slice(0, -1);
    }
    return `Select your ${title}`;
  };

  // MultiSelect-like component for categories
  const renderMultiSelect = (category: keyof UserProfile) => {
    if (!Array.isArray(user[category])) {
      return null;
    }
    
    const selectedItems = user[category] as string[];
    let title = category.charAt(0).toUpperCase() + category.slice(1);
    
    // Handle singular/plural form
    if (title.endsWith('s') && title !== 'sports') {
      title = title.slice(0, -1);
    }
    
    if (isEditing) {
      return (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">{title}</h3>
            <button
              onClick={() => setActivePopup(category)}
              className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              <PlusIcon />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedItems.map((item, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-blue-500 text-white text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      );
    }
    
    // Non-editing view
    return (
      <div className="mb-4">
        <h3 className="text-gray-500 mb-1">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {selectedItems.map((item, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-blue-500 text-white text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          {isEditing ? (
            // Edit mode using styling similar to register.tsx
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-start">
                  Edit your profile
                </h2>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <SaveIcon />
                  <span className="ml-1">Save</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="relative mb-6">
                    <img
                      src="/api/placeholder/300/300"
                      alt="Profile avatar"
                      className="w-full rounded-lg border-4 border-blue-100"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Your name</label>
                    <input
                      type="text"
                      value={user.username}
                      onChange={(e) => updateField("username", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                      type="date"
                      value={user.birthDate}
                      onChange={(e) => updateField("birthDate", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <div className="overflow-y-auto flex flex-wrap gap-2 justify-start p-2">
                      {genderOptions.map((gender) => (
                        <button
                          type="button"
                          key={gender}
                          onClick={() => toggleGender(gender)}
                          className={`px-3 py-1 rounded-full border border-gray-400 text-sm transition-all
                            ${user.gender === gender
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-700 hover:bg-gray-200"}`}
                        >
                          {gender}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">MBTI</label>
                    <select
                      value={user.mbti}
                      onChange={(e) => updateField("mbti", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      {mbtiOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Render all category sections with plus buttons */}
                  {renderMultiSelect("pets")}
                  {renderMultiSelect("sports")}
                  {renderMultiSelect("movies")}
                  {renderMultiSelect("games")}
                  {renderMultiSelect("travel")}
                  {renderMultiSelect("music")}
                  {renderMultiSelect("collections")}
                </div>
              </div>
            </div>
          ) : (
            // View mode (non-editing state)
            <div className="flex flex-col md:flex-row">
              {/* Left side - Avatar and decorations */}
              <div className="w-full md:w-1/3 bg-gray-50 p-6 border-r border-gray-200">
                <div className="relative mb-6">
                  <img
                    src=""
                    alt="Profile avatar"
                    className="w-full rounded-lg border-4 border-blue-100"
                  />
                </div>

                <div className="mb-4 text-center text-lg font-semibold text-gray-800 border-b pb-2">
                  Grouped by Interest: 
                </div>

                <div className="mb-4 text-center text-sm font-medium text-gray-500">
                  Click on the plus icon to add more interests
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[...Array(9)].map((_, idx) => (
                    <div key={idx} className="bg-gray-200 rounded-md h-16 flex items-center justify-center"><PlusIcon /></div>
                  ))}           
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mt-4">You want to public picture for your friends to see?</label>
                  <div className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only" />
                    <div className="relative">
                      <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                      <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-900">Public</span>
                  </div>

                </div>
              </div>

              {/* Right side - Profile information */}
              <div className="w-full md:w-2/3 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {user.username}
                  </h1>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <EditIcon />
                    <span className="ml-1">Edit</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <ProfileField
                    label="Birth"
                    value={user.birthDate}
                    isEditing={false}
                    onChange={() => {}}
                  />

                  <ProfileField
                    label="Gender"
                    value={user.gender}
                    isEditing={false}
                    onChange={() => {}}
                  />

                  <ProfileField
                    label="MBTI"
                    value={user.mbti}
                    isEditing={false}
                    onChange={() => {}}
                  />

                  {/* Collections display in view mode */}
                  {renderMultiSelect("pets")}
                  {renderMultiSelect("sports")}
                  {renderMultiSelect("movies")}
                  {renderMultiSelect("games")}
                  {renderMultiSelect("travel")}
                  {renderMultiSelect("music")}
                  {renderMultiSelect("collections")}
                </div>

                <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category Popup */}
      {activePopup && (
        <CategoryPopup
          title={formatTitle(activePopup)}
          options={getCategoryOptions(activePopup)}
          selectedItems={user[activePopup] as string[]}
          onToggle={(option) => handleOptionToggle(activePopup, option)}
          onClose={() => setActivePopup(null)}
        />
      )}
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
  onChange: (newValue: string) => void;
}) {
  return (
    <div>
      <h3 className="text-gray-500 mb-1">{label}</h3>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      ) : (
        <p className="text-gray-800">{value}</p>
      )}
    </div>
  );
}