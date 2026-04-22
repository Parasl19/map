import React, { useState } from "react";
import { useParams } from "react-router-dom";

import ItemModal from "./ItemModal";
import "../styles/DetailsPage.css";
import { useNavigate } from "react-router-dom";

function formatStateName(name = "") {
  if (!name) return "";
  return name
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getItemTitle(item) {
  return item?.title || item?.name || "Untitled";
}

function getItemDescription(item) {
  return (
    item?.description ||
    item?.about ||
    item?.history ||
    item?.origin ||
    item?.significance ||
    item?.location ||
    ""
  );
}

function getPrimaryMeta(item) {
  return (
    item?.best_time || item?.city || item?.location || item?.category || ""
  );
}

function getSecondaryMeta(item) {
  return item?.type || item?.deity || item?.religion || "";
}

function SectionHeader({ title, subtitle, onViewAll }) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      <button type="button" className="ghost-btn" onClick={onViewAll}>
        View All
      </button>
    </div>
  );
}

export default function DetailsPage({ statesData }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeCultureCategory, setActiveCultureCategory] =
    useState("Festivals");
  const { stateName } = useParams();
  const navigate = useNavigate();

  const data = statesData[stateName];

  if (!data) {
    return <h2 className="details-loading">Loading...</h2>;
  }

  const tourism = data.tourism || [];
  const culture = data.culture || [];
  const festivals = [
    ...(data.festivals || []),
    ...(data.hiddenfestivals || []),
  ];
  const food = data.food || [];
  const spiritual = data.spiritual || [];
  const hiddenfestivals = data.hiddenfestivals || [];
  const castle = data.castle || [];
  // console.log(spiritual);

  const heroImage =
    tourism[0]?.image ||
    spiritual[0]?.image ||
    festivals[0]?.image ||
    food[0]?.image ||
    culture[0]?.image ||
    "";

  const featuredPlaces = tourism.slice(0, 3);
  const tourismHighlights = [...tourism]; //.slice(0, 8);

  const dynamicCategories = culture
    .map((item) => item?.category)
    .filter(Boolean)
    .filter((value, index, array) => array.indexOf(value) === index);
  const cultureCategories = ["Festivals", ...dynamicCategories];

  const cultureItems =
    activeCultureCategory === "Festivals"
      ? festivals.slice(0, 6)
      : culture
          .filter((item) => item?.category === activeCultureCategory)
          .slice(0, 6);

  const stateLabel = formatStateName(stateName);
  const aboutText =
    data.about ||
    `Explore the beauty, culture, and experiences of ${stateLabel}.`;

  return (
    <div className="details-page">
      <section
        className="details-hero"
        style={heroImage ? { backgroundImage: `url(${heroImage})` } : undefined}
      >
        <div className="details-hero__overlay" />
        <div className="details-hero__content">
          <span className="eyebrow">Discover {stateLabel}</span>
          <h1 className="details-title">{stateLabel}</h1>
          <p className="details-about">{aboutText}</p>

          <div className="hero-actions">
            <a href="#featured" className="hero-btn hero-btn--primary">
              Explore Now
            </a>
            <a href="#culture" className="hero-btn hero-btn--secondary">
              Culture Guide
            </a>
          </div>

          <div className="hero-stats">
            {data.capital ? (
              <div className="hero-stat">
                <span>Capital</span>
                <strong>{data.capital}</strong>
              </div>
            ) : null}
            {data.language ? (
              <div className="hero-stat">
                <span>Language</span>
                <strong>{data.language}</strong>
              </div>
            ) : null}
            {data.population ? (
              <div className="hero-stat">
                <span>Population</span>
                <strong>{data.population}</strong>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Featured Places Section */}
      <section id="featured" className="details-section">
        <SectionHeader
          title="Featured Places"
          subtitle={`Explore standout destinations across ${stateLabel}.`}
          onViewAll={() => navigate(`/Featured/${stateName}`)}
        />

        <div className="featured-grid">
          {featuredPlaces.map((item, index) => (
            <article
              key={`${getItemTitle(item)}-${index}`}
              className="featured-card"
              onClick={() => setSelectedItem(item)}
            >
              <img src={item.image} alt={getItemTitle(item)} loading="lazy" />
              <div className="featured-card__content">
                <div className="card-topline">
                  <span className="pill">
                    {item.type || item.category || "Landmark"}
                  </span>
                  {getPrimaryMeta(item) ? (
                    <span className="muted-pill">{getPrimaryMeta(item)}</span>
                  ) : null}
                </div>
                <h3>{getItemTitle(item)}</h3>
                <p>{getItemDescription(item)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Tourism Section */}
      <section className="details-section">
        <SectionHeader
          title="Tourism"
          subtitle={`Explore the landscapes, landmarks, and spiritual stops of ${stateLabel}.`}
          onViewAll={() => navigate(`/Tourism/${stateName}`)}
        />

        <div className="scroll-row">
          {tourismHighlights.map((item, index) => (
            <article
              key={`${getItemTitle(item)}-${index}`}
              className="compact-card"
              onClick={() => setSelectedItem(item)}
            >
              <img src={item.image} alt={getItemTitle(item)} loading="lazy" />
              <div className="compact-card__content">
                <h3>{getItemTitle(item)}</h3>
                <p>{getItemDescription(item)}</p>
                {getSecondaryMeta(item) ? (
                  <span className="card-tag">{getSecondaryMeta(item)}</span>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* --- Forts --- */}
      {/* <section className="details-section">
        <SectionHeader
          title="Forts"
          subtitle={`Explore the historical fortifications of ${stateLabel}.`}
          onViewAll={() => navigate(`/Forts/${stateName}`)}
        />

        <div className="scroll-row">
          {castle.map((item, index) => (
            <article
              key={`${getItemTitle(item)}-${index}`}
              className="compact-card"
              onClick={() => setSelectedItem(item)}
            >
              <img src={item.image} alt={getItemTitle(item)} loading="lazy" />
              <div className="compact-card__content">
                <h3>{getItemTitle(item)}</h3>
                <p>{getItemDescription(item)}</p>
                {getSecondaryMeta(item) ? (
                  <span className="card-tag">{getSecondaryMeta(item)}</span>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section> */}
      {stateName?.toLowerCase() === "maharashtra" && (
        <section className="details-section">
          <SectionHeader
            title="Forts"
            subtitle={`Explore the historical fortifications of ${stateLabel}.`}
            onViewAll={() => navigate(`/castle/${stateName}`)}
          />

          <div className="scroll-row">
            {castle.map((item, index) => (
              <article
                key={`${getItemTitle(item)}-${index}`}
                className="compact-card"
                onClick={() => setSelectedItem(item)}
              >
                <img src={item.image} alt={getItemTitle(item)} loading="lazy" />
                <div className="compact-card__content">
                  <h3>{getItemTitle(item)}</h3>
                  <p>{getItemDescription(item)}</p>
                  {getSecondaryMeta(item) ? (
                    <span className="card-tag">{getSecondaryMeta(item)}</span>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Culture Section */}
      <section id="culture" className="details-section">
        <SectionHeader
          title="Culture"
          subtitle={`Experience the traditions, celebrations, and art of ${stateLabel}.`}
          onViewAll={() => navigate(`/culture/${stateName}`)}
        />

        <div className="culture-layout">
          <aside className="culture-sidebar">
            {cultureCategories.map((category) => (
              <button
                key={category}
                type="button"
                className={`sidebar-chip ${
                  activeCultureCategory === category ? "active" : ""
                }`}
                onClick={() => setActiveCultureCategory(category)}
              >
                {category}
              </button>
            ))}
          </aside>

          <div className="culture-grid">
            {cultureItems.map((item, index) => (
              <article
                key={`${getItemTitle(item)}-${index}`}
                className="culture-card"
                onClick={() => setSelectedItem(item)}
              >
                <img src={item.image} alt={getItemTitle(item)} loading="lazy" />
                <div className="culture-card__content">
                  <h3>{getItemTitle(item)}</h3>
                  <p>{getItemDescription(item)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Food Section */}
      <section className="details-section details-section--last">
        <SectionHeader
          title="Delicious Food"
          subtitle={`Savor signature dishes and local flavors from ${stateLabel}.`}
          onViewAll={() => navigate(`/Food/${stateName}`)}
        />

        <div className="food-grid">
          {food.map((item, index) => (
            <article
              key={`${getItemTitle(item)}-${index}`}
              className="food-card"
              onClick={() => setSelectedItem(item)}
            >
              <img src={item.image} alt={getItemTitle(item)} loading="lazy" />
              <div className="food-card__content">
                <h3>{getItemTitle(item)}</h3>
                <p>{getItemDescription(item) || "Tap to learn more."}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Hidden Festivals Section */}
      <section className="details-section details-section--last">
        <SectionHeader
          title="Hidden Festivals"
          subtitle={`Discover the lesser-known celebrations of ${stateLabel}.`}
          onViewAll={() => navigate(`/Hidden Festivals/${stateName}`)}
        />

        <div className="food-grid">
          {hiddenfestivals.map((item, index) => (
            <article
              key={`${getItemTitle(item)}-${index}`}
              className="food-card"
              onClick={() => setSelectedItem(item)}
            >
              <img src={item.image} alt={getItemTitle(item)} loading="lazy" />
              <div className="food-card__content">
                <h3>{getItemTitle(item)}</h3>
                <p>{getItemDescription(item) || "Tap to learn more."}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Spirituality Section */}
      <section className="details-section details-section--last">
        <SectionHeader
          title="Sprituality"
          subtitle={`Explore the spiritual side of ${stateLabel}.`}
          onViewAll={() => navigate(`/Spirituality/${stateName}`)}
        />

        <div className="food-grid">
          {spiritual.map((item, index) => (
            <article
              key={`${getItemTitle(item)}-${index}`}
              className="food-card"
              onClick={() => setSelectedItem(item)}
            >
              <img src={item.image} alt={getItemTitle(item)} loading="lazy" />
              <div className="food-card__content">
                <h3>{getItemTitle(item)}</h3>
                <p>{getItemDescription(item) || "Tap to learn more."}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ItemModal
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </div>
  );
}
