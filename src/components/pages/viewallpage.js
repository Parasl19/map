import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ItemModal from "../ItemModal";
import "../pages/fstyle.css";

export default function ViewAllPage({ statesData }) {
  const { category, stateName } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);

  const data = statesData[stateName];

  if (!data) return <h2>Loading...</h2>;

  // 🎯 Dynamic category selection
  let items = [];

  if (category === "tourism") {
    items = [...(data.tourism || []), ...(data.spiritual || [])];
  } else if (category === "culture") {
    items = [...(data.culture || []), ...(data.festivals || [])];
  } else if (category === "food") {
    items = data.food || [];
  } else if (category === "spiritual") {
    items = data.spiritual || [];
  }

  return (
    <div className="viewall-page">
      <h1 className="page-title">
        {category.toUpperCase()} in {stateName}
      </h1>

      <div className="grid">
        {items.map((item, index) => (
          <div
            key={index}
            className="grid-card"
            onClick={() => setSelectedItem(item)}
          >
            <img src={item.image} alt={item.name} />
            <div className="grid-content">
              <h3>{item.name || item.title}</h3>
              <p>{item.description || item.about || "Tap to explore"}</p>
            </div>
          </div>
        ))}
      </div>

      <ItemModal
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </div>
  );
}