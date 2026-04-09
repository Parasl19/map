import React, { useState } from "react";
import "../styles/MapView.css";

import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/geojson-india@0.0.2/india.json";

const normalizeStateName = (name) => {
  const map = {
    "Andaman and Nicobar": "Andaman & Nicobar",
    "NCT of Delhi": "Delhi",
    "Jammu and Kashmir": "Jammu & Kashmir",
    "Dadra and Nagar Haveli and Daman and Diu":
      "Dadra & Nagar Haveli and Daman & Diu",
    Odisha: "Odisa"
  };
  return map[name] || name;
};

export default function MapView({
  STATES,
  selectedState,
  setSelectedState
}) {

  const [hoveredState, setHoveredState] = useState("");
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 }); // ✅ ADD

  return (
    <div className="map-container">

      {/* 🔥 TOOLTIP ABOVE CURSOR */}
      {hoveredState && (
        <div
          className="tooltip cursor"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y
          }}
        >
          {hoveredState}
        </div>
      )}

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: window.innerWidth < 800 ? 1400 : 900,
          center: window.innerWidth < 800 ? [82.7, 22] : [80, 22]
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const rawName =
                geo.properties.st_nm ||
                geo.properties.NAME_1 ||
                geo.properties.state ||
                geo.properties.name;

              const normalized = normalizeStateName(rawName);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}

                  /* 🔥 HOVER EVENTS */
                  onMouseEnter={() => {
                    setHoveredState(rawName);
                  }}

                  onMouseMove={(e) => {   // ✅ ADD THIS
                    setTooltipPos({
                      x: e.clientX,
                      y: e.clientY
                    });
                  }}

                  onMouseLeave={() => setHoveredState("")}

                  /* MOBILE TAP */
                  onClick={() => {
                    // e.stopPropagation();
                    const data = STATES[normalized];
                    setSelectedState({ name: normalized, data });

                    if (window.innerWidth < 800) {
                      setHoveredState(rawName);
                      setTimeout(() => setHoveredState(""), 1200);
                    }
                  }}

                  style={{
                    default: {
                      fill:
                        selectedState?.name === normalized
                          ? "#38bdf8"
                          : "#e5e7eb",
                      stroke: "#1e293b",
                      strokeWidth: 0.6,
                      outline: "none"
                    },
                    hover: {
                      fill: "#60a5fa",
                      stroke: "#0f172a",
                      strokeWidth: 1,
                      outline: "none"
                    },
                    pressed: {
                      fill: "#2563eb",
                      stroke: "#0f172a",
                      strokeWidth: 1,
                      outline: "none"
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}