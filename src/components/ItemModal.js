import React from "react";
import "../styles/ItemModal.css";

export default function ItemModal({ selectedItem, setSelectedItem }) {
    if (!selectedItem) return null;

    // ✅ SAFE PARSER (handles jsonb or string)
    const parseJSON = (data) => {
        try {
            if (!data) return []; // 🔥 handles undefined/null
            if (Array.isArray(data)) return data;
            if (typeof data === "string") {
                // handle plain text like "a, b, c"
                if (!data.startsWith("["))
                    return data.split(",").map((d) => d.trim());
                return JSON.parse(data);
            }
            return [];
        } catch {
            return [];
        }
    };

    const gallery = parseJSON(selectedItem.gallery) || [];
    const highlights = parseJSON(selectedItem.highlights) || [];
    const activities = parseJSON(selectedItem.activities) || [];

    // ✅ FACTS FIX (TEXT → ARRAY)
    // const facts = Array.isArray(selectedItem.facts)
    //     ? selectedItem.facts
    //     : typeof selectedItem.facts === "string"
    //         ? selectedItem.facts.split(";").map(f => f.trim())
    //         : [];

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

                {/* type */}
                {selectedItem.type && (
                    <p className="type">{selectedItem.type}</p>
                )}

                {/* description */}
                {selectedItem.description && (
                    <p className="description">{selectedItem.description}</p>
                )}

                {/* DESCRIPTION */}
                <p>
                    {/* {selectedItem.description ||
                        selectedItem.history ||
                        selectedItem.origin ||
                        selectedItem.significance} */}
                </p>
                {/* ================= ABOUT ================= */}
                {selectedItem.about && (
                    <>
                        <h3>About</h3>
                        <p>{selectedItem.about}</p>
                    </>
                )}


                {/* ================= HISTORY ================= */}
                {selectedItem.history && (
                    <>
                        <h3>History</h3>
                        <p>{selectedItem.history}</p>
                    </>
                )}
                <p></p>


                {/* BASIC INFO */}
                {selectedItem.location && <p>location: {selectedItem.location}</p>}
                {selectedItem.city && <p>city: {selectedItem.city}</p>}
                {selectedItem.deity && <p>🛕 {selectedItem.deity}</p>}

                {/* ✅ CATEGORY FIX */}
                {selectedItem.category && (
                    <p>category: {selectedItem.category}</p>
                )}

                {/* BEST TIME */}
                {selectedItem.best_time && (
                    <>
                        <h3>Best Time</h3>
                        <p>📅 {selectedItem.best_time}</p>
                    </>
                )}

                {/* CULTURE */}
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

                {/* SIGNIFICANCE */}
                {selectedItem.significance && (
                    <>
                        <h3>Significance</h3>
                        <p>{selectedItem.significance}</p>
                    </>
                )}

                {/* ✅ FACTS FIX
                {facts.length > 0 && (
                    <>
                        <h3>Facts</h3>
                        <ul>
                            {facts.map((fact, i) => (
                                <li key={i}>{fact}</li>
                            ))}
                        </ul>
                    </>
                )} */}

                {/* ✅ HIGHLIGHTS FIX */}
                {highlights.length > 0 && (
                    <>
                        <h3>Highlights</h3>
                        <ul>
                            {highlights.map((h, i) => (
                                <li key={i}>{h}</li>
                            ))}
                        </ul>
                    </>
                )}

                {/* ✅ ACTIVITIES */}
                {activities.length > 0 && (
                    <>
                        <h3>Activities</h3>
                        <ul>
                            {activities.map((a, i) => (
                                <li key={i}>{a}</li>
                            ))}
                        </ul>
                    </>
                )}

                {/* ✅ GALLERY */}
                {gallery.length > 0 && (
                    <>
                        <h3>Gallery</h3>
                        <div className="gallery">
                            {gallery.map((img, i) => (
                                <img key={i} src={img} alt="gallery" />
                            ))}
                        </div>
                    </>
                )}

                {/* TIMINGS */}
                {selectedItem.timings && (
                    <>
                        <h3>Timings</h3>
                        <p>{selectedItem.timings}</p>
                    </>
                )}

                {/* ENTRY */}
                {selectedItem.entry_fee && (
                    <>
                        <h3>Entry Fee</h3>
                        <p>{selectedItem.entry_fee}</p>
                    </>
                )}

                {/* DURATION */}
                {selectedItem.duration && (
                    <>
                        <h3>Duration</h3>
                        <p>{selectedItem.duration}</p>
                    </>
                )}

                {/* AI */}
                {selectedItem.aiInsights && (
                    <>
                        <h3>AI Insights 🤖</h3>
                        <p>⭐ {selectedItem.aiInsights.recommendedFor?.join(", ")}</p>
                        <p>⏳ {selectedItem.aiInsights.visitDuration}</p>
                        <p>🗺 {selectedItem.aiInsights.bestPlan}</p>
                        <p>⚡ {selectedItem.aiInsights.crowdTip}</p>
                    </>
                )}

                {/* RELIGION */}
                {selectedItem.religion && (
                    <>
                        <h3>Religion</h3>
                        <p>{selectedItem.religion}</p>
                    </>
                )}

                {/* ================= TIMINGS ================= */}

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