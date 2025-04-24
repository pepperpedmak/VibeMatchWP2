import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MultiSelect from "../../components/MultiSelect";

const typesgameList = [
    "none", "MMORPG", "MOBA", "FPS", "RTS", "RPG","TPS", "TBS", 
    "Action", "Adventure", "Role-Playing", "Simulation", "Strategy",
    "Sports", "Puzzle", "Idle", "Racing", "Fighting", "Survival", "Horror",
    "Educational", "Music", "Board", "Card", "Casual", "Trivia", "Arcade",
    "Platformer", "Rhythm", "Shooter", "Sandbox", 
    "Stealth", "Battle Royale", "Open World", "Tower Defense", "Visual Novel"
];

const GamesSelection: React.FC = () => {
  return <MultiSelect title="What types of games do you enjoy playing?" options={typesgameList} nextPath="/select-travel" />;
};

export default GamesSelection;