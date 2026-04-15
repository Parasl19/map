import React from "react";
import "../styles/highlights.css";
import { useNavigate } from "react-router-dom";

function Highlights({onReset, selectedState }) {
    const navigate = useNavigate();
  const data = [
    {
      title: "Food",
      icon: "🍲",
      desc: "Puran Poli, Bhakri +2 more",
      className: "food",
    },
    {
      title: "Festival",
      icon: "🎉",
      desc: "Ganesh Chaturthi +3 more",
      className: "festival",
    },
    {
      title: "Dress",
      icon: "👕",
      desc: "Traditional wear",
      className: "dress",
    },
    {
      title: "Animal",
      icon: "🐘",
      desc: "State animal info",
      className: "animal",
    },
  ];

  return (
      <div className="highlights-container">
      <div className="highlights-card">
        
        {/* Header */}
        <div className="header">
          <h2>✨ Highlights</h2>
          <p>Quick cultural picks</p>
        </div>

        {/* Grid */}
        <div className="grid">
          {data.map((item, index) => (
            <div key={index} className={`card ${item.className}`}>
              
              <div className="top">
                <span className="icon">{item.icon}</span>
                <span className="tag">{item.title.toUpperCase()}</span>
              </div>

              <h3>{item.title}</h3>
              <p>{item.desc}</p>

              <span className="arrow">→</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        {/* navigate(`/details/${selectedState.name.toLowerCase().replace(/\s+/g, "-")}`);  if state name have spaces */}
        <div className="cta-buttons">
        <button className="btn reset" onClick={onReset}>Reset</button>
        <button className="btn explore" onClick={() => navigate(`/details/${selectedState.name.toLowerCase()}`)}>Explore More →</button>
        </div>

      </div>
    </div>
  );
}

export default Highlights;