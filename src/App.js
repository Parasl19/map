import React, { useState, useEffect } from "react";
import "./App.css";

import { supabase } from "./api/supabaseClient";
import MapView from "./components/MapView";
import SidePanel from "./components/SidePanel";
import DetailsPage from "./components/DetailsPage";
import { Routes, Route, } from "react-router-dom";
import Gallery from "./components/gallery/Gallery";
import ViewAllPage from "./components/pages/viewallpage";
import Navbar from "./components/Navbar";
import OCR from "./components/trans/trans";

export default function App() {
  const [statesData, setStatesData] = useState({});
  const [selectedState, setSelectedState] = useState(null);
  const [hoveredState, setHoveredState] = useState("");
  const [loading, setLoading] = useState(true);
  // for zoom effect on map
  const [zoom, setZoom] = useState({
    center: [80, 22],
    scale: 900
  });

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
        hiddenfestivals (*),
        castle (*)
      `);

    if (error) {
      console.error("❌ ERROR:", error);
      setLoading(false);
      return;
    }

    // print name from data
    // data.forEach((state) => {
    //   console.log("🔥 STATE NAME:", state.name);
    // });
    // print all stae names in data
    const stateNames = data.map((state) => state.name);
    console.log("🔥 ALL STATE NAMES:", stateNames);
    console.log("🔥 raw data from db:", data);
    
    
    // console.log("Available keys:", Object.keys(statesData));

    const formatted = {};

    data.forEach((state) => {
      formatted[state.name.toLowerCase()] = {
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
        castle: state.castle || [],
      };
    });

    // console.log("✅ FORMATTED:", formatted);

    setStatesData(formatted);
    setLoading(false);
  }

  if (loading) {
    return <h2 style={{ padding: 20 }}>Loading data...</h2>;
  }

  return (
    <>
    <Navbar selectedState={selectedState}  view="map"/>
  <Routes>

        {/* MAP PAGE */}
        <Route
          path="/"
          element={
            <div className={`app-container ${selectedState ? "active" : ""}`}>
              <MapView
                STATES={statesData}
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                hoveredState={hoveredState}
                setHoveredState={setHoveredState}
                zoom={zoom}
                setZoom={setZoom}
              />

              <SidePanel
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                zoom={zoom}
                setZoom={setZoom}
              />
            </div>
          }
        />

        {/* DETAILS PAGE */}
      <Route path="/details/:stateName" element={<DetailsPage statesData={statesData} />} />

      {/* GALLERY PAGE */}
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/:category/:stateName" element={<ViewAllPage statesData={statesData} />} />
      <Route path="/translation" element={<OCR />} />
      
  </Routes>
      

  </>
  );
}