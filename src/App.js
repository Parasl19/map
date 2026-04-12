import React, { useState, useEffect } from "react";
import "./App.css";

import { supabase } from "./api/supabaseClient";
import MapView from "./components/MapView";
import SidePanel from "./components/SidePanel";
import DetailsPage from "./components/DetailsPage";

export default function App() {
  const [statesData, setStatesData] = useState({});
  const [selectedState, setSelectedState] = useState(null);
  const [hoveredState, setHoveredState] = useState("");
  const [view, setView] = useState("map");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  async function fetchAllData() {
    setLoading(true);

    const { data, error } = await supabase
      .from("states")
      .select(`
        *,
        places (*),
        culture (*),
        festivals (*),
        foods (*),
        spiritual_places (*),
        hiddenfestivals (*)
      `);

    if (error) {
      console.error("❌ ERROR:", error);
      setLoading(false);
      return;
    }

    console.log("🔥 RAW DATA:", data);

    const formatted = {};

    data.forEach((state) => {
      formatted[state.name] = {
        about: state.description,
        capital: state.capital,
        language: state.language,
        population: state.population,

        tourism: state.places || [],
        culture: state.culture || [],
        festivals: state.festivals || [],
        food: state.foods || [],
        hiddenfestivals: state.hiddenfestivals || [],
        spiritual: state.spiritual_places || [],
        
        
      };
    });

    console.log("✅ FORMATTED:", formatted);

    setStatesData(formatted);
    setLoading(false);
  }

  if (loading) {
    return <h2 style={{ padding: 20 }}>Loading data...</h2>;
  }

  return (
    <>
      {view === "map" && (
        <div className={`app-container ${selectedState ? "active" : ""}`}>

          <MapView
            STATES={statesData}   // ✅ DB data here
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            hoveredState={hoveredState}
            setHoveredState={setHoveredState}
          />

          <SidePanel
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            setView={setView}
          />

        </div>
      )}

      {view === "details" && (
        <DetailsPage
          selectedState={selectedState}
          setView={setView}
        />
      )}
    </>
  );
}