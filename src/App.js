import React, { useState , useRef , useEffect } from "react";
import "./App.css";

// import { STATES } from "./data/data";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";
import SidePanel from "./components/SidePanel";
import DetailsPage from "./components/DetailsPage";

export default function App() {
  const [selectedState, setSelectedState] = useState(null);
  const [hoveredState, setHoveredState] = useState("");
  const [view, setView] = useState("map");
  const sidePanelRef = useRef(null);

  useEffect(() => {
  function handleClickOutside(event) {
    if (
      sidePanelRef.current &&
      !sidePanelRef.current.contains(event.target)
    ) {
      setSelectedState(null); // close sidebar
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <div className="app-root">

      {/* NAVBAR (FIXED) */}
      <Navbar selectedState={selectedState} view={view} />

      {/* MAIN CONTENT */}
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
            ref={sidePanelRef}
          />

        </div>
      )}

      {/* DETAILS PAGE */}
      {view === "details" && (
        <DetailsPage
          selectedState={selectedState}
          setView={setView}
        />
      )}
    </div>
  );
}