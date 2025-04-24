import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MultiSelect from "../../components/MultiSelect";

const typesmovieList = [
    "none", "Action", "Adventure", "Animation", "Biography", "Comedy",
    "Crime", "Documentary", "Drama", "Family", "Fantasy", "History",
    "Horror", "Music", "Musical", "Mystery", "Romance", "Sci-Fi",
    "Sport", "Thriller", "War", "Western", "Superhero", "Supernatural",
    "Zombie", "Vampire", "Werewolf", "Alien", "Robot", "Time Travel",
];

const MovieSelection: React.FC = () => {
  return <MultiSelect title="What movie genres do you enjoy watching?" options={typesmovieList} nextPath="/generate-image" />;
};

export default MovieSelection;