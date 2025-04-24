import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MultiSelect from "../../components/MultiSelect";

const musicList = [
    "none", "Pop", "Rock", "Hip Hop", "Rap", "Country",
    "Jazz", "Blues", "Classical", "Reggae", "Soul",
    "Folk", "Electronic", "Dance", "Indie", "Metal",
    "Punk", "R&B", "Gospel", "Latin", "K-Pop", "J-Pop",
    "Funk", "Disco", "Techno", "House", "Trance", "Dubstep",
    "Drum and Bass", "Garage"
];

const MusicSelection: React.FC = () => {
  return <MultiSelect title="What kind of music do you enjoy listening to?" options={musicList} nextPath="/select-collections" />;
};

export default MusicSelection;