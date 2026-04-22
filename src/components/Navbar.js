import React, { useState } from "react";
import "../styles/navbar.css";


export default function Navbar({ selectedState, view }) {

  const [active, setActive] = useState("maps");
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ MUST BE INSIDE FUNCTION
  const hideHamburger = selectedState && view !== "details";

  return (
    <header className="navbar">
      
      <div className="nav-left">
        <div className="logo-space" />
        <a href="/"  className="bt">
          <span  className="brand-name">Heritage AI</span>
        </a>
      </div>

      {/* HAMBURGER */}
      <div
        className={`menu-toggle 
          ${menuOpen ? "active" : ""} 
          ${hideHamburger ? "hide-hamburger" : ""}
        `}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* NAV MENU */}
      <nav className={`nav-right ${menuOpen ? "active" : ""}`}>
        <a
          href="#maps"
          className={active === "maps" ? "active" : ""}
          onClick={() => {
            setActive("maps");
            setMenuOpen(false);
          }}
        >
          Map
        </a>

        <a href="https://heritage-ui-hazel.vercel.app/
TravelMate Ai" onClick={() => {
          setMenuOpen(false);
        }}>
          TravelMate AI
        </a>

        <a href="/translation" onClick={() => setMenuOpen(false)}>
          Translation
        </a>

      </nav>
    </header>
  );
}