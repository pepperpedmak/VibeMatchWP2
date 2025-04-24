import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MultiSelect from "../../components/MultiSelect";

const collectionsList = [
    "none", "Stamps", "Coins", "Postcards", "Vinyl Records", "Comic Books",
    "Action Figures", "Trading Cards", "Antiques", "Art", "Books",
    "Comic Strips", "Currency", "Dolls", "Figurines", "Jewelry",
    "Keychains", "Magnets", "Miniatures", "Models", "Music",
    "Ornaments", "Paperweights", "Patches", "Pins", "Pottery",
    "Prints", "Rocks", "Seashells", "Sculptures", "Signs"
];

const CollectionSelection: React.FC = () => {
  return <MultiSelect title="What sports do you enjoy playing or watching?" options={collectionsList} nextPath="/select-movies" />;
};

export default CollectionSelection;