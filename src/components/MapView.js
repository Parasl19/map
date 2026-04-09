import React, { useState } from "react";
import "../styles/MapView.css";

import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/geojson-india@0.0.2/india.json";

// Normalize names
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
 

  return (
    <div className="map-container">

      {/* 🔥 TOOLTIP */}
      {hoveredState && (
  <div className="tooltip fixed">
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
                  onMouseEnter={(e) => {
                    setHoveredState(rawName);
                  }}
                  onMouseLeave={() => setHoveredState("")}

                  /* 🔥 MOBILE TAP SUPPORT */
                  onClick={() => {
                    const data = STATES[normalized];
                    setSelectedState({ name: normalized, data });

                    // show tooltip briefly on mobile
                    if (window.innerWidth < 800) {
                      setHoveredState(rawName);
                      setTimeout(() => setHoveredState(""), 1500);
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