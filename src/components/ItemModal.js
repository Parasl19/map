import React from "react";
import "../styles/ItemModal.css";

export default function ItemModal({ selectedItem, setSelectedItem }) {
    if (!selectedItem) return null;

    // ✅ SAFE PARSER (handles jsonb or string)
    const parseJSON = (data) => {
        try {
            return typeof data === "string" ? JSON.parse(data) : data;
        } catch {
            return [];
        }
    };

    const gallery = parseJSON(selectedItem.gallery);
    const highlights = parseJSON(selectedItem.highlights);
    const activities = parseJSON(selectedItem.activities);

    // ✅ FACTS FIX (TEXT → ARRAY)
    const facts = Array.isArray(selectedItem.facts)
        ? selectedItem.facts
        : typeof selectedItem.facts === "string"
            ? selectedItem.facts.split(";").map(f => f.trim())
            : [];

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

                {/* DESCRIPTION */}
                <p>
                    {selectedItem.description ||
                        selectedItem.about ||
                        selectedItem.history ||
                        selectedItem.origin ||  
                        selectedItem.significance}
                </p>

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

                {/* ✅ FACTS FIX */}
                {facts.length > 0 && (
                    <>
                        <h3>Facts</h3>
                        <ul>
                            {facts.map((fact, i) => (
                                <li key={i}>{fact}</li>
                            ))}
                        </ul>
                    </>
                )}

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
            </div>
        </div>
    );
}