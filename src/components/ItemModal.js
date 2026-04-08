import React from "react";
import "../styles/ItemModal.css";

export default function ItemModal({ selectedItem, setSelectedItem }) {
    if (!selectedItem) return null;

    return (
        <div
            className="modal-overlay"
            onClick={() => setSelectedItem(null)}
        >
            <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
            >
                {/* CLOSE */}
                <button
                    className="close-btn"
                    onClick={() => setSelectedItem(null)}
                >
                    ✕
                </button>

                {/* IMAGE */}
                <img
                    src={selectedItem.image}
                    alt=""
                    className="modal-img"
                />

                {/* TITLE */}
                <h2>{selectedItem.name || selectedItem.title}</h2>

                {/* ================= MAIN DESCRIPTION ================= */}
                <p>
                    {selectedItem.about ||
                        selectedItem.history ||
                        selectedItem.origin ||
                        selectedItem.significance}
                </p>

                {/* ================= BASIC INFO ================= */}
                {selectedItem.location && <p>📍 {selectedItem.location}</p>}
                {selectedItem.deity && <p>🛕 {selectedItem.deity}</p>}
                {selectedItem.category && (
                    <p>🏷 {selectedItem.category.join(", ")}</p>
                )}

                {/* ================= BEST TIME ================= */}
                {typeof selectedItem.bestTime === "string" && (
                    <>
                        <h3>Best Time</h3>
                        <p>📅 {selectedItem.bestTime}</p>
                    </>
                )}

                {typeof selectedItem.bestTime === "object" && (
                    <>
                        <h3>Best Time</h3>
                        <p>📅 Season: {selectedItem.bestTime.season}</p>
                        <p>⏰ {selectedItem.bestTime.bestTimeOfDay}</p>
                    </>
                )}

                {/* ================= CULTURE ================= */}
                {selectedItem.origin && (
                    <>
                        <h3>Origin</h3>
                        <p>{selectedItem.origin}</p>
                    </>
                )}

                {selectedItem.costume && (
                    <>
                        <h3>Costume</h3>
                        <p>{selectedItem.costume}</p>
                    </>
                )}

                {selectedItem.music && (
                    <>
                        <h3>Music</h3>
                        <p>{selectedItem.music}</p>
                    </>
                )}

                {/* ================= FESTIVAL ================= */}
                {selectedItem.season && (
                    <>
                        <h3>Season</h3>
                        <p>{selectedItem.season}</p>
                    </>
                )}

                {selectedItem.highlights && (
                    <>
                        <h3>Highlights</h3>
                        <ul>
                            {selectedItem.highlights.map((h, i) => (
                                <li key={i}>{h}</li>
                            ))}
                        </ul>
                    </>
                )}

                {/* ================= SIGNIFICANCE ================= */}
                {selectedItem.significance && (
                    <>
                        <h3>Significance</h3>
                        <p>{selectedItem.significance}</p>
                    </>
                )}

                {/* ================= TIMINGS ================= */}
                {selectedItem.timings && (
                    <>
                        <h3>Timings</h3>
                        <p>
                            {selectedItem.timings.opening} -{" "}
                            {selectedItem.timings.closing}
                        </p>

                        {selectedItem.timings.aarti && (
                            <ul>
                                {selectedItem.timings.aarti.map((a, i) => (
                                    <li key={i}>{a}</li>
                                ))}
                            </ul>
                        )}
                    </>
                )}

                {/* ================= RITUALS ================= */}
                {selectedItem.rituals && (
                    <>
                        <h3>Rituals</h3>
                        <ul>
                            {selectedItem.rituals.map((r, i) => (
                                <li key={i}>{r}</li>
                            ))}
                        </ul>
                    </>
                )}

                {/* ================= FACILITIES ================= */}
                {selectedItem.facilities && (
                    <>
                        <h3>Facilities</h3>
                        <ul>
                            {selectedItem.facilities.map((f, i) => (
                                <li key={i}>{f}</li>
                            ))}
                        </ul>
                    </>
                )}

                {/* ================= NEARBY ================= */}
                {selectedItem.nearbyPlaces && (
                    <>
                        <h3>Nearby Places</h3>
                        <ul>
                            {selectedItem.nearbyPlaces.map((p, i) => (
                                <li key={i}>{p}</li>
                            ))}
                        </ul>
                    </>
                )}

                {/* ================= HOW TO REACH ================= */}
                {/* ================= HOW TO REACH ================= */}
                {selectedItem.howToReach && (
                    <>
                        <h3>How to Reach</h3>

                        {/* AIR */}
                        {selectedItem.howToReach.byAir && (
                            <p>
                                ✈ {selectedItem.howToReach.byAir.airport}
                                {" "}({selectedItem.howToReach.byAir.distance})
                            </p>
                        )}

                        {/* RAIL */}
                        {selectedItem.howToReach.byRail && (
                            <p>
                                🚆 {selectedItem.howToReach.byRail.station}
                                {" "}({selectedItem.howToReach.byRail.distance})
                            </p>
                        )}

                        {/* METRO */}
                        {selectedItem.howToReach.byMetro && (
                            <p>🚇 {selectedItem.howToReach.byMetro}</p>
                        )}

                        {/* ROAD */}
                        {selectedItem.howToReach.byRoad && (
                            <p>🚗 {selectedItem.howToReach.byRoad}</p>
                        )}
                    </>
                )}

                {/* ================= WEATHER ================= */}
                {selectedItem.weather && (
                    <>
                        <h3>Weather</h3>
                        <p>☀ {selectedItem.weather.summer}</p>
                        <p>🌧 {selectedItem.weather.monsoon}</p>
                        <p>❄ {selectedItem.weather.winter}</p>
                    </>
                )}

                {/* ================= SAFETY ================= */}
                {selectedItem.safetyTips && (
                    <>
                        <h3>Safety Tips</h3>
                        <ul>
                            {selectedItem.safetyTips.map((tip, i) => (
                                <li key={i}>{tip}</li>
                            ))}
                        </ul>
                    </>
                )}

                {/* ================= FACTS ================= */}
                {selectedItem.facts && (
                    <>
                        <h3>Facts</h3>
                        <ul>
                            {selectedItem.facts.map((fact, i) => (
                                <li key={i}>{fact}</li>
                            ))}
                        </ul>
                    </>
                )}

                {/* ================= AI ================= */}
                {selectedItem.aiInsights && (
                    <>
                        <h3>AI Insights 🤖</h3>
                        <p>⭐ {selectedItem.aiInsights.recommendedFor?.join(", ")}</p>
                        <p>⏳ {selectedItem.aiInsights.visitDuration}</p>
                        <p>🗺 {selectedItem.aiInsights.bestPlan}</p>
                        <p>⚡ {selectedItem.aiInsights.crowdTip}</p>
                    </>
                )}
            </div>
        </div>
    );
}