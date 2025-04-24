import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MultiSelect from "../../components/MultiSelect";

const animalsList = [
    "none", "Dog", "Cat", "Rabbit", "Hamster", "Parrot",
    "Fish", "Turtle", "Horse", "Snake", "Lizard",
    "Gold fish", "Koi Fish", "Chinchilla", "Hermit Crab",
    "Mouse", "Axoloti", "Gerbil", "Hedgehog", "Ferret"
];

const PetSelection: React.FC = () => {
  return <MultiSelect title="What are yout favorite pets?" options={animalsList} nextPath="/select-sports" />;
};
export default PetSelection;