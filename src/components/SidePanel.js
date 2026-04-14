import React, { useEffect, useState, forwardRef } from "react";
import "../styles/SidePanel.css";

const SidePanel = forwardRef(({ selectedState, setSelectedState, setView }, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const data = selectedState?.data;
  const images = data?.tourism?.map((item) => item.image) || [];

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (!selectedState) return null;

  return (
    <div ref={ref} className={`panel ${selectedState ? "active" : ""}`}>
      <div className="panel-content">
        {/* HERO */}
        <div className="hero">
          <img
            src={images[currentIndex] || images[0]}
            alt="hero"
            className="hero-img"
          />

          <div className="hero-overlay">
            <span className="tag">— INTERACTIVE MAP</span>
            <h1>{selectedState.name}</h1>
          </div>

          <div className="dots">
            {images.map((_, i) => (
              <span
                key={i}
                className={`dot ${i === currentIndex ? "active" : ""}`}
              />
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <div className="glass-card">
          <h3>About</h3>
          <p>{data?.about}</p>
        </div>

        {/* INFO */}
        <div className="info-grid">
          <div className="info-box">
             <span className="icon">🏛️</span>
            <p className="label">Capital</p>
            <p className="value">{data?.capital}</p>
          </div>

          <div className="info-box">
            <span className="icon">🌐</span>
            <p className="label">Language</p>
            <p className="value">{data?.language}</p>
          </div>

          <div className="info-box">
            <span className="icon">👥</span>
            <p className="label">Population</p>
            <p className="value">{data?.population}</p>
          </div>
        </div>

        {/* TOP PLACES */}
        <div className="glass-card">
          <h3>Top Places</h3>

          <div className="mini-cards">
            {data?.tourism?.slice(0, 3).map((item, i) => (
              <div key={i} className="mini-card">
                <img src={item.image} alt={item.title} />
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* HIGHLIGHTS */}
        <div className="glass-card">
          <h3>Highlights</h3>

          <div className="highlight">
            <span className="chip">🍛 Food</span>
            <p>{data?.food?.map((f) => f.title).join(", ")}</p>
          </div>

          <div className="highlight">
            <span className="chip">🎉 Festival</span>
            <p>{data?.festivals?.slice(0,5).map((f) => f.title).join(", ")}</p>
          </div>

          <div className="highlight">
            <span className="chip">👘 Dress</span>
            <p>{data?.dress}</p>
          </div>

          <div className="highlight">
            <span className="chip">🐾 Animal</span>
            <p>{data?.stateAnimal}</p>
          </div>
        </div>

        {/* 🔥 BUTTONS AT BOTTOM (NOT FIXED) */}
        <div className="bottom-actions">
          <button
            className="reset"
            onClick={() => setSelectedState(null)}
          >
            Reset
          </button>

          <button
            className="more"
            onClick={() => setView("details")}
          >
            Explore More →
          </button>
        </div>

      </div>
    </div>
  );
});

export default SidePanel;