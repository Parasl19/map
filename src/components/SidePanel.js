import React, { useEffect, useState } from "react";
import "../styles/SidePanel.css";
import Highlights from "./highlights";


export default function SidePanel({ selectedState, setSelectedState, zoom, setZoom }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  

  // ✅ SAFE DATA ACCESS
  const data = selectedState?.data;
  const images = data?.tourism?.slice(0, 5).map((item) => item.image) || [];

  /* ✅ HOOK ALWAYS AT TOP (FIXED ERROR) */
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length]);

  // ✅ AFTER HOOKS
  if (!selectedState) return null;

  return (
    <div className="panel">

      {/* 🔥 HERO SLIDER */}
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

        {/* DOTS */}
        <div className="dots">
          {images.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <div className="glass-card">
        <h3>About</h3>
        <p>{data?.about}</p>
      </div>

      {/* INFO GRID */}
      {/* <div className="info-grid">
        <div className="info-box">
          <span>🏛️</span>
          <p className="label">Capital</p>
          <p className="value">{data?.capital}</p>
        </div>

        <div className="info-box">
          <span>🌐</span>
          <p className="label">Language</p>
          <p className="value">{data?.language}</p>
        </div>

        <div className="info-box">
          <span>👥</span>
          <p className="label">Population</p>
          <p className="value">{data?.population}</p>
        </div>
      </div> */}

      {/* 🗺️ TOP PLACES */}
      <div className="glass-card">
        <h3>Top Places</h3>

        {/* <div className="mini-cards">
          {data?.tourism?.slice(0, 3).map((item, i) => (
            <div key={i} className="mini-card">
              <img src={item.image} alt={item.title}  loading="lazy"/>
              <p>{item.title}</p>
            </div>
          ))}
        </div> */}

        {/* card test */}
        <div className="places-grid">
  {data?.tourism?.slice(0, 3).map((item, i) => (
    <div 
      key={i} 
      className={`place-card ${i === 2 ? "full" : ""}`}
    >
      <img src={item.image} alt={item.title} loading="lazy" />
      <div className="overlay"></div>

      <div className="place-content">
        <h4>{item.title}</h4>
        <p>{item.location || "Maharashtra"} • Tourism</p>
      </div>
    </div>
  ))}
</div>

        {/* card test end */}
      </div>

      {/* 🍛 HIGHLIGHTS */}

      <Highlights onReset={() => {
              setSelectedState(null);
              setZoom({
                center: [80, 22],
                scale: 900
              });
          }}
          disabled={!selectedState}
           selectedState={selectedState} />

    </div>
  );
}