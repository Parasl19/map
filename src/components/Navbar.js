import { useState } from "react";
import "../styles/navbar.css";

export default function Navbar() {
  const [active, setActive] = useState("maps");

  return (
    <header className="navbar">
      <div className="nav-left">
        <div className="logo-space" />
        <span className="brand-name">Heritage AI</span>
      </div>

      <nav className="nav-right">
        <a
          href="#maps"
          className={active === "maps" ? "active" : ""}
          onClick={() => setActive("maps")}
        >
          Map
        </a>

        <a
          href="#chatbot"
        >
          TravelMate AI
        </a>

        <a
          href="#translate"
        >
          Translation
        </a>

        <a
          href="#login"
        >
          Login
        </a>
      </nav>
    </header>
  );
}