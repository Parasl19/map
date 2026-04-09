import React from "react";
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
  setSelectedState,
  hoveredState,
  setHoveredState
}) {
  return (
    <div className="map-container">
      {hoveredState && (
        <div className="tooltip">{hoveredState}</div>
      )}

      <ComposableMap
      projection="geoMercator"
      projectionConfig={{
      scale: window.innerWidth < 800 ? 1400 : 900, // 🔥 bigger on mobile
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
                  onMouseEnter={() => setHoveredState(rawName)}
                  onMouseLeave={() => setHoveredState("")}
                  onClick={() => {
                    const data = STATES[normalized];
                    setSelectedState({ name: normalized, data });
                  }}
                  style={{
                    default: {
                      fill:
                        selectedState?.name === normalized
                          ? "#38bdf8"
                          : "#e5e7eb",
                           stroke: "#1e293b",   // 🔥 ADD BORDER COLOR
                           strokeWidth: 0.5,
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