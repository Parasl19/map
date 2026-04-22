import React, { useState } from "react";
import "../styles/MapView.css";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
// import { Marker } from "react-simple-maps";

// GEOJSON URLS
const geoUrl = "https://cdn.jsdelivr.net/npm/geojson-india@0.0.2/india.json";

// district level geojson for zoom effect (optional, can be used for more detailed view when zoomed in)
// const districtGeoUrl = "https://raw.githubusercontent.com/geohacker/india/master/district/india_district.geojson";

// Normalize names
const normalizeStateName = (name) => {
  const map = {
    "Andaman and Nicobar": "Andaman & Nicobar",
    "NCT of Delhi": "Delhi",
    "Jammu and Kashmir": "Jammu & Kashmir",
    "Dadra and Nagar Haveli and Daman and Diu":
    "Dadra & Nagar Haveli and Daman & Diu",

    // Odisha: "Odisha" is already correct, but adding here for consistency and future-proofing,  changed for borders
    Odisha: "Odisha",
  };
  return map[name] || name;
};

export default function MapView({
  STATES,
  selectedState,
  setSelectedState,
  zoom,
  setZoom,
}) {
  // for city markers
  // const isZoomedIn = zoom.scale > 1500;
  // test data for cities in Maharashtra
  const [hoveredState, setHoveredState] = useState("");
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  return (
    <div className="map-container">
      {hoveredState && (
        <div
          className="tooltip cursor"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
          }}
        >
          {hoveredState}
        </div>
      )}

      <ComposableMap
        projection="geoMercator"
        // projectionConfig={{ scale: 900, center: [80, 22] }}
        // for zooming and centering on click effect
        projectionConfig={{
          scale: zoom.scale,
          center: zoom.center,
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
                  onMouseMove={(e) => {
                    setTooltipPos({
                      x: e.clientX,
                      y: e.clientY,
                    });
                  }}
                  onClick={() => {
                    const data = STATES[normalized.toLowerCase().replace(/\s+/g, "_")];

                    console.log("CLICK:", normalized.replace(/\s+/g, "_"));
                    console.log("DATA:", data);

                    if (!data) {
                      alert("No data found in DB for this state");
                      return;
                    }

                    // zoom in on click 🔥 GET CENTER OF STATE
                    const center = geoCentroid(geo);
                    setZoom({
                      center: center,
                      // defalt set by team is 1000 but for the marker to show up we need to set it to 2000
                      scale: 2000,
                    });

                    setSelectedState({ name: normalized, data });
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

        {/* District Boundaries */}
        {/* {isZoomedIn && selectedState && (
            <Geographies geography={districtGeoUrl}>
              {({ geographies }) =>
                geographies
                  .filter((geo) => {
                    const geoState = geo.properties?.NAME_1?.toLowerCase().trim();
                    const selected = selectedState?.name?.toLowerCase().trim();
                    return geoState === selected;
                    
                  })
                  .map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: "transparent",
                          stroke: "red",
                          strokeWidth: 0.1,
                        },hover: {
                          fill:
                            isZoomedIn
                              ? "#3a76ec"
                              : "#60a5fa",
                              stroke: "black",
                              strokeWidth: 0.5,
                        }
                      }}
                    />
                  ))
              }
            </Geographies>
          )} */}

        {/* City Markers */}
       
      </ComposableMap>
    </div>
  );
}