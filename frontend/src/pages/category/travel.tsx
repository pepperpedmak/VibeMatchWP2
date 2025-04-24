import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MultiSelect from "../../components/MultiSelect";

const travelList = [
    "none", "Adventure", "Beach", "City", "Cruise", "Cultural",
    "Family", "Historical", "Mountain", "Nature", "Relaxing",
    "Romantic", "Safari", "Ski", "Theme Park", "Water Fall", "National Park",
    "Zoo", "Aquarium", "Museum", "Amusement Park", "Botanical Garden",
    "Art Gallery", "Historical Site", "Science Museum", "Zoo and Aquarium",
    "Temples", "Churches", "Mosques", "Synagogues", "Cathedrals"
];

const TravelSelection: React.FC = () => {
  return <MultiSelect title="What are your favorite travel destinations?" options={travelList} nextPath="/select-music" />;
};

export default TravelSelection;