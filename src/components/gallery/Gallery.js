import { useState, useRef } from "react";

/* ─── DATA ─────────────────────────────────────────────────── */
const FEATURED = [
  {
    id: 1,
    name: "Ajanta Caves",
    badge: "Heritage",
    badgeType: "heritage",
    rating: 6.7,
    reviews: "1.2k",
    tags: [{ label: "Matore", color: "green" }, { label: "Popular", color: "blue" }],
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Ajanta_cave9_map.jpg/800px-Ajanta_cave9_map.jpg",
    fallback: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&q=80",
  },
  {
    id: 2,
    name: "Ellora Caves",
    badge: "Heritage",
    badgeType: "heritage",
    rating: 6.7,
    reviews: "15k",
    tags: [{ label: "Mistone", color: "purple" }, { label: "Popular", color: "blue" }],
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Ellora_cave16_bailiff.jpg/800px-Ellora_cave16_bailiff.jpg",
    fallback: "https://images.unsplash.com/photo-1600101578594-19c20cde0eb6?w=600&q=80",
  },
  {
    id: 3,
    name: "Gateway of India",
    badge: "Iconic",
    badgeType: "iconic",
    rating: 1.9,
    reviews: "11k",
    tags: [{ label: "Iconic", color: "green" }, { label: "Popular", color: "blue" }],
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Gateway_of_India_2009.jpg/800px-Gateway_of_India_2009.jpg",
    fallback: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600&q=80",
  },
];

const TOURISM = [
  { id: 1, name: "Western Ghats Waterfall", reviews: "869", stars: 5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Dudhsagar_Falls_Goa.jpg/600px-Dudhsagar_Falls_Goa.jpg", fallback: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=400&q=80" },
  { id: 2, name: "Sinhagad Fort", reviews: "442", stars: 5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Sinhagad_fort_Pune.jpg/600px-Sinhagad_fort_Pune.jpg", fallback: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=400&q=80" },
  { id: 3, name: "Mahabaleshwar", reviews: "11k", stars: 5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Mahabaleshwar_Maharashtra_India.jpg/600px-Mahabaleshwar_Maharashtra_India.jpg", fallback: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80" },
  { id: 4, name: "Tadoba National Park", reviews: "11k", stars: 5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tadoba_Andhari_Tiger_Reserve_Maharashtra.jpg/600px-Tadoba_Andhari_Tiger_Reserve_Maharashtra.jpg", fallback: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&q=80" },
  { id: 5, name: "Lonavala", reviews: "716", stars: 4.5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Lonavala_Lake.jpg/600px-Lonavala_Lake.jpg", fallback: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80" },
  { id: 6, name: "Raigad Fort", reviews: "305", stars: 4, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Raigad_Fort_Maharashtra.jpg/600px-Raigad_Fort_Maharashtra.jpg", fallback: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=400&q=80" },
];

const FESTIVALS = [
  { id: 1, name: "Ganesh Chaturthi", rating: "4.7", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Ganesh_Chaturthi_Mumbai.jpg/600px-Ganesh_Chaturthi_Mumbai.jpg", fallback: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&q=80" },
  { id: 2, name: "Diwali", rating: "4.5", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Diwali_Fireworks_at_Visakhapatnam.jpg/600px-Diwali_Fireworks_at_Visakhapatnam.jpg", fallback: "https://images.unsplash.com/photo-1605098702090-4d3c5d7ef1e9?w=400&q=80" },
  { id: 3, name: "Maha Shivratri", rating: "4.6", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Shivratri_celebration_in_Varanasi.jpg/600px-Shivratri_celebration_in_Varanasi.jpg", fallback: "https://images.unsplash.com/photo-1571607388263-1044f9ea01a3?w=400&q=80" },
  { id: 4, name: "Holi", rating: "4.8", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Holi_Mumbai_celebration.jpg/600px-Holi_Mumbai_celebration.jpg", fallback: "https://images.unsplash.com/photo-1559181567-c3190e2e3d0f?w=400&q=80" },
  { id: 5, name: "Gudi Padwa", rating: "4.7", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Gudi_Padwa_2015.jpg/600px-Gudi_Padwa_2015.jpg", fallback: "https://images.unsplash.com/photo-1611169258238-8f5a0bad26da?w=400&q=80" },
];

const FOODS = [
  { id: 1, name: "Puran Poli", rating: "4.7", reviews: "696", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Puran_poli.jpg/600px-Puran_poli.jpg", fallback: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80" },
  { id: 2, name: "Bhakri", rating: "4.1", reviews: "389", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Bhakri.jpg/600px-Bhakri.jpg", fallback: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80" },
  { id: 3, name: "Sabudana Khichdi", rating: "4.13", reviews: "189", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Sabudana_Khichdi.jpg/600px-Sabudana_Khichdi.jpg", fallback: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80" },
  { id: 4, name: "Modak", rating: "4.2", reviews: "5", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Modak_Maharashtra.jpg/600px-Modak_Maharashtra.jpg", fallback: "https://images.unsplash.com/photo-1606471191009-63994c53433b?w=400&q=80" },
];

const FILTERS = ["All", "Tourism", "Dance", "Art", "Foods", "•••"];
const CULTURE_TABS = [
  { label: "Festivals", icon: "🎉" },
  { label: "Music", icon: "🎵" },
  { label: "Dance", icon: "💃" },
  { label: "Art", icon: "🎨" },
];

/* ─── HELPERS ───────────────────────────────────────────────── */
function Stars({ count }) {
  return (
    <span style={{ color: "#f59e0b", fontSize: "0.72rem" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i}>{i <= Math.floor(count) ? "★" : count - i > -1 ? "½" : "☆"}</span>
      ))}
    </span>
  );
}

function Img({ src, fallback, alt, style }) {
  return (
    <img
      src={src}
      alt={alt}
      style={style}
      onError={(e) => { e.target.onerror = null; e.target.src = fallback; }}
    />
  );
}

/* ─── STYLES (JS-in-object) ─────────────────────────────────── */
const S = {
  page: {
    fontFamily: "'Poppins', sans-serif",
    background: "#0d1117",
    color: "#f0f4ff",
    minHeight: "100vh",
    overflowX: "hidden",
  },
  // Hero
  hero: {
    position: "relative",
    height: 480,
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-end",
    padding: "48px 36px",
  },
  heroBg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center top",
    filter: "brightness(0.65)",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(13,17,23,0.9) 0%, rgba(13,17,23,0.2) 60%, transparent 100%)",
  },
  heroContent: { position: "relative", zIndex: 2 },
  heroH1: { fontSize: "2.8rem", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 8 },
  heroP: { fontSize: "1rem", color: "#c8d5e8", marginBottom: 22, fontWeight: 300 },
  btnPrimary: {
    display: "inline-flex", alignItems: "center", gap: 6,
    background: "#2563eb", color: "#fff",
    fontFamily: "'Poppins', sans-serif", fontSize: "0.92rem", fontWeight: 600,
    padding: "11px 26px", borderRadius: 8, border: "none", cursor: "pointer",
    transition: "background 0.2s, transform 0.15s",
  },
  // Section
  section: { padding: "36px 28px" },
  sectionHeader: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 },
  sectionH2: { fontSize: "1.45rem", fontWeight: 700, marginBottom: 3 },
  sectionP: { fontSize: "0.82rem", color: "#8b95a8", fontWeight: 300 },
  viewAll: {
    display: "inline-flex", alignItems: "center", gap: 4,
    color: "#8b95a8", fontSize: "0.82rem", fontWeight: 500,
    background: "none", border: "none", cursor: "pointer", whiteSpace: "nowrap", marginTop: 4,
  },
  // Featured grid
  featuredGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 },
  placeCard: {
    borderRadius: 14, overflow: "hidden", background: "#161c26",
    cursor: "pointer", border: "1px solid #1e2d42",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  cardImg: { position: "relative", height: 160, overflow: "hidden" },
  cardImgEl: { width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s" },
  cardBody: { padding: "12px 14px" },
  cardH3: { fontSize: "0.95rem", fontWeight: 600, marginBottom: 5 },
  starsRow: { display: "flex", alignItems: "center", gap: 3, fontSize: "0.75rem", marginBottom: 8 },
  ratingMuted: { color: "#8b95a8", marginLeft: 3 },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 5 },
  // Badge
  badge: (type) => ({
    position: "absolute", top: 10, right: 10,
    background: "rgba(13,17,23,0.7)",
    color: type === "heritage" ? "#fbbf24" : type === "iconic" ? "#a78bfa" : "#c8d5e8",
    fontSize: "0.7rem", fontWeight: 500, padding: "3px 8px", borderRadius: 20,
    backdropFilter: "blur(4px)",
    border: `1px solid ${type === "heritage" ? "#f59e0b55" : type === "iconic" ? "#a78bfa55" : "rgba(255,255,255,0.12)"}`,
  }),
  // Tag
  tag: (color) => ({
    display: "inline-flex", alignItems: "center", gap: 3,
    background: "#1e2a3a",
    color: color === "green" ? "#4ade80" : color === "purple" ? "#a78bfa" : "#60a5fa",
    fontSize: "0.68rem", fontWeight: 500, padding: "3px 9px",
    borderRadius: 20, border: "1px solid #1e2d42",
  }),
  // Filter pills
  filterRow: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 18, scrollbarWidth: "none" },
  pill: (active) => ({
    display: "inline-flex", alignItems: "center", gap: 5,
    background: active ? "#2563eb" : "#1a2535",
    color: active ? "#fff" : "#8b95a8",
    fontFamily: "'Poppins', sans-serif", fontSize: "0.8rem", fontWeight: 500,
    padding: "7px 16px", borderRadius: 24,
    border: `1px solid ${active ? "#2563eb" : "#1e2d42"}`,
    cursor: "pointer", whiteSpace: "nowrap",
  }),
  // Tourism scroll
  scrollWrapper: { position: "relative" },
  tourismScroll: { display: "flex", gap: 12, overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: 6, scrollbarWidth: "none" },
  tCard: { flex: "0 0 160px", borderRadius: 14, overflow: "hidden", position: "relative", cursor: "pointer", scrollSnapAlign: "start" },
  tCardImg: { width: "100%", height: 120, objectFit: "cover", display: "block" },
  tInfo: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
    padding: "20px 10px 10px",
  },
  tName: { fontSize: "0.78rem", fontWeight: 600, marginBottom: 3 },
  scrollBtn: (side) => ({
    position: "absolute", top: "50%", transform: "translateY(-50%)",
    [side]: -16,
    background: "rgba(22,28,38,0.9)", border: "1px solid #1e2d42", color: "#f0f4ff",
    width: 32, height: 32, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", zIndex: 10, fontSize: "1.1rem",
  }),
  // Culture
  cultureLayout: { display: "flex", gap: 16 },
  cultureSidebar: { flex: "0 0 100px", display: "flex", flexDirection: "column", gap: 8 },
  cultureTab: (active) => ({
    display: "flex", alignItems: "center", gap: 7,
    background: active ? "#2563eb" : "#1e2a3a",
    border: `1px solid ${active ? "#2563eb" : "#1e2d42"}`,
    borderRadius: 10, padding: "9px 12px",
    fontSize: "0.75rem", fontWeight: 500,
    color: active ? "#fff" : "#8b95a8",
    cursor: "pointer",
  }),
  cultureScrollWrap: { flex: 1, overflow: "hidden" },
  cultureScroll: { display: "flex", gap: 10, overflowX: "auto", scrollbarWidth: "none" },
  cCard: { flex: "0 0 140px", borderRadius: 12, overflow: "hidden", position: "relative", cursor: "pointer" },
  cCardImg: { width: "100%", height: 105, objectFit: "cover", display: "block" },
  cInfo: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
    padding: "18px 9px 8px",
  },
  cName: { fontSize: "0.75rem", fontWeight: 600, marginBottom: 2 },
  // Food
  foodGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 },
  foodCard: { borderRadius: 12, overflow: "hidden", background: "#161c26", border: "1px solid #1e2d42", cursor: "pointer" },
  foodImg: { width: "100%", height: 100, objectFit: "cover", display: "block" },
  fInfo: { padding: "9px 11px" },
  fName: { fontSize: "0.82rem", fontWeight: 600, marginBottom: 4 },
  // Load more
  loadMoreWrap: { textAlign: "center", padding: "24px 0 40px", borderTop: "1px solid #1e2d42" },
  btnLoad: { background: "none", border: "none", fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem", fontWeight: 500, color: "#8b95a8", cursor: "pointer" },
};

/* ─── MAIN COMPONENT ────────────────────────────────────────── */
export default function DiscoverMaharashtra() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeCultureTab, setActiveCultureTab] = useState("Festivals");
  const tourRef = useRef(null);

  const scroll = (dir) => {
    if (tourRef.current) tourRef.current.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <>
      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div style={S.page}>

        {/* ── HERO ── */}
        <div style={S.hero}>
          <Img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Raigad_Fort_Maharashtra.jpg/1280px-Raigad_Fort_Maharashtra.jpg"
            fallback="https://images.unsplash.com/photo-1597838816882-4435b1977fbe?w=1200&q=80"
            alt="Maharashtra Hero"
            style={S.heroBg}
          />
          <div style={S.heroOverlay} />
          <div style={S.heroContent}>
            <h1 style={S.heroH1}>Discover Maharashtra</h1>
            <p style={S.heroP}>Explore the beauty and culture of this vibrant Indian state.</p>
            <button
              style={S.btnPrimary}
              onMouseEnter={(e) => { e.target.style.background = "#3b82f6"; e.target.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.target.style.background = "#2563eb"; e.target.style.transform = "none"; }}
              onClick={() => alert("Exploring Maharashtra!")}
            >
              Explore Now
            </button>
          </div>
        </div>

        {/* ── FEATURED PLACES ── */}
        <section style={S.section}>
          <div style={S.sectionHeader}>
            <div>
              <h2 style={S.sectionH2}>Featured Places</h2>
              <p style={S.sectionP}>Explore the best places in Maharashtra</p>
            </div>
            <button style={S.viewAll} onClick={() => alert("View all places")}>View All →</button>
          </div>

          <div style={S.featuredGrid}>
            {FEATURED.map((place) => (
              <div
                key={place.id}
                style={S.placeCard}
                onClick={() => alert(place.name)}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.4)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={S.cardImg}>
                  <Img src={place.img} fallback={place.fallback} alt={place.name} style={S.cardImgEl} />
                  <span style={S.badge(place.badgeType)}>+ {place.badge}</span>
                </div>
                <div style={S.cardBody}>
                  <h3 style={S.cardH3}>{place.name}</h3>
                  <div style={S.starsRow}>
                    <Stars count={5} />
                    <span style={S.ratingMuted}>{place.rating}</span>
                    <span style={S.ratingMuted}>{place.reviews} reviews</span>
                  </div>
                  <div style={S.tagsRow}>
                    {place.tags.map((t) => (
                      <span key={t.label} style={S.tag(t.color)}>✦ {t.label}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TOURISM ── */}
        <section style={S.section}>
          <div style={S.sectionHeader}>
            <div>
              <h2 style={S.sectionH2}>Tourism</h2>
              <p style={S.sectionP}>Explore the best places in Maharashtra</p>
            </div>
            <button style={S.viewAll} onClick={() => alert("View all tourism")}>View All →</button>
          </div>

          {/* Filter pills */}
          <div style={S.filterRow}>
            {FILTERS.map((f) => (
              <button key={f} style={S.pill(activeFilter === f)} onClick={() => setActiveFilter(f)}>
                {f === "All" && "🗺 "}{f}
              </button>
            ))}
          </div>

          {/* Scroll carousel */}
          <div style={S.scrollWrapper}>
            <button style={S.scrollBtn("left")} onClick={() => scroll(-1)}>‹</button>
            <div style={S.tourismScroll} ref={tourRef}>
              {TOURISM.map((t) => (
                <div
                  key={t.id}
                  style={S.tCard}
                  onClick={() => alert(t.name)}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
                >
                  <Img src={t.img} fallback={t.fallback} alt={t.name} style={S.tCardImg} />
                  <div style={S.tInfo}>
                    <div style={S.tName}>{t.name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 2, fontSize: "0.65rem" }}>
                      <Stars count={t.stars} />
                      <span style={{ color: "#8b95a8", marginLeft: 2 }}>{t.reviews} reviews</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button style={S.scrollBtn("right")} onClick={() => scroll(1)}>›</button>
          </div>
        </section>

        {/* ── CULTURE ── */}
        <section style={S.section}>
          <div style={S.sectionHeader}>
            <div>
              <h2 style={S.sectionH2}>Culture</h2>
              <p style={S.sectionP}>Experience the festivals, music, dances, and art of Maharashtra.</p>
            </div>
            <button style={S.viewAll} onClick={() => alert("View all culture")}>View All →</button>
          </div>

          <div style={S.cultureLayout}>
            {/* Sidebar tabs */}
            <div style={S.cultureSidebar}>
              {CULTURE_TABS.map((tab) => (
                <button
                  key={tab.label}
                  style={S.cultureTab(activeCultureTab === tab.label)}
                  onClick={() => setActiveCultureTab(tab.label)}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Festival scroll */}
            <div style={S.cultureScrollWrap}>
              <div style={S.cultureScroll}>
                {FESTIVALS.map((f) => (
                  <div
                    key={f.id}
                    style={S.cCard}
                    onClick={() => alert(f.name)}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
                  >
                    <Img src={f.img} fallback={f.fallback} alt={f.name} style={S.cCardImg} />
                    <div style={S.cInfo}>
                      <div style={S.cName}>{f.name}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 2, fontSize: "0.62rem", color: "#f59e0b" }}>
                        <Stars count={parseFloat(f.rating)} />
                        <span style={{ color: "#8b95a8", marginLeft: 3 }}>{f.rating} reviews</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOD ── */}
        <section style={S.section}>
          <div style={S.sectionHeader}>
            <div>
              <h2 style={S.sectionH2}>Delicious Food</h2>
              <p style={S.sectionP}>Savor the flavors of authentic Maharashtrian cuisine.</p>
            </div>
            <button style={S.viewAll} onClick={() => alert("View all food")}>View All →</button>
          </div>

          <div style={S.foodGrid}>
            {FOODS.map((f) => (
              <div
                key={f.id}
                style={S.foodCard}
                onClick={() => alert(f.name)}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
              >
                <Img src={f.img} fallback={f.fallback} alt={f.name} style={S.foodImg} />
                <div style={S.fInfo}>
                  <div style={S.fName}>{f.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 2, fontSize: "0.68rem", color: "#f59e0b" }}>
                    <Stars count={parseFloat(f.rating)} />
                    <span style={{ color: "#8b95a8", marginLeft: 2 }}>{f.rating} · {f.reviews} reviews</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── LOAD MORE ── */}
        <div style={S.loadMoreWrap}>
          <button style={S.btnLoad} onClick={() => alert("Loading more...")}>Load More</button>
        </div>

      </div>
    </>
  );
}