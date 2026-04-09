import React, { useState, useEffect , useRef } from "react";
import "./App.css";

import { supabase } from "./api/supabaseClient";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";
import SidePanel from "./components/SidePanel";
import DetailsPage from "./components/DetailsPage";

export default function App() {
  const [statesData, setStatesData] = useState({});
  const [selectedState, setSelectedState] = useState(null);
  const [hoveredState, setHoveredState] = useState("");
  const [view, setView] = useState("map");
  const sidePanelRef = useRef(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  async function fetchAllData() {
    // 1️⃣ Get states
    const { data: states } = await supabase.from("states").select("*");

    // 2️⃣ Get related tables
    const { data: places } = await supabase.from("places").select("*");
    const { data: culture } = await supabase.from("culture").select("*");
    const { data: festivals } = await supabase.from("festivals").select("*");
    const { data: foods } = await supabase.from("foods").select("*");
    const { data: spiritual } = await supabase.from("spiritual_places").select("*");

    // 3️⃣ Combine everything
    const formatted = {};

    states.forEach((state) => {
      formatted[state.name] = {
        about: state.description,
        capital: state.capital,
        language: state.language,
        population: state.population,
        tourism: places.filter(p => p.state_id === state.id),
        culture: culture.filter(c => c.state_id === state.id),
        festivals: festivals.filter(f => f.state_id === state.id),
        food: foods.filter(f => f.state_id === state.id),
        spiritual: spiritual.filter(s => s.state_id === state.id)
      };
    });

    setStatesData(formatted);
  }

  return (
    < div className="app-root">

       {/* NAVBAR (FIXED) */}
      <Navbar selectedState={selectedState} view={view} />

      {/* MAIN CONTENT */}
      {view === "map" && (
        <div className={`app-container ${selectedState ? "active" : ""}`}>

          <MapView
            STATES={statesData}   // ✅ DB data
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            hoveredState={hoveredState}
            setHoveredState={setHoveredState}
          />

          <SidePanel
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            setView={setView}
            ref={sidePanelRef}
          />

        </div>
      )}

      {view === "details" && (
        <DetailsPage
          selectedState={selectedState}
          setView={setView}
        />
      )}
    </div>
  );
}