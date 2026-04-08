import React, { useState } from "react";
import "./App.css";

import { STATES } from "./data/data";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";
import SidePanel from "./components/SidePanel";
import DetailsPage from "./components/DetailsPage";

export default function App() {
  const [selectedState, setSelectedState] = useState(null);
  const [hoveredState, setHoveredState] = useState("");
  const [view, setView] = useState("map");

  return (
    <>
    <Navbar />
      {/* ================= MAP VIEW ================= */}
      {view === "map" && (
        <div className={`app-container ${selectedState ? "active" : ""}`}>

          {/* MAP */}
          <MapView
            STATES={STATES}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            hoveredState={hoveredState}
            setHoveredState={setHoveredState}
          />

          {/* SIDE PANEL */}
          <SidePanel
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            setView={setView}
          />

        </div>
      )}

      {/* ================= DETAILS PAGE ================= */}
      {view === "details" && (
        <DetailsPage
          selectedState={selectedState}
          setView={setView}
        />
      )}
    </>
  );


}
