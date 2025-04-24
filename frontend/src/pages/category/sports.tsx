import React from "react";
import MultiSelect from "../../components/MultiSelect";

const sportsList = [
  "none", "Soccer", "Basketball", "Rugby", "American Football", "Cricket",
  "Baseball", "Volleyball", "Tennis", "Golf", "Badminton", "Boxing",
  "Table Tennis", "Karate", "Judo", "Mixed Martial Arts", "Formula 1",
  "Taekwondo", "Motorcycle Racing", "Cycling", "Swimming", "Skiing"
];

const SportsSelection: React.FC = () => {
  return <MultiSelect title="What sports do you enjoy playing or watching?" options={sportsList} nextPath="/select-games" />;
};

export default SportsSelection;
