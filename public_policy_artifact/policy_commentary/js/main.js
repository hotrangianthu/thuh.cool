/**
 * Vietnam Budget Infographics — main.js
 * Handles: sector card rendering, navigation, data loading
 */

const SECTORS_DATA_PATH = "data/sectors.json";

const SECTOR_ICONS = {
  "healthcare":        "🏥",
  "education":         "🎓",
  "infrastructure":    "🏗️",
  "defense":           "🛡️",
  "agriculture":       "🌾",
  "environment":       "🌿",
  "technology":        "💡",
  "social-protection": "🤝",
  "debt-management":   "📊"
};

/**
 * Fetch sectors data from JSON file.
 * Falls back gracefully if running without a local server (file://).
 */
async function loadSectors() {
  try {
    const res = await fetch(SECTORS_DATA_PATH);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Could not fetch sectors.json — check that you are serving via HTTP.", err);
    return [];
  }
}

/**
 * Build a single sector card element.
 */
function buildSectorCard(sector) {
  const card = document.createElement("article");
  card.className = "sector-card";
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", `${sector.name_en} — ${sector.name}`);

  const icon = SECTOR_ICONS[sector.id] || "📋";
  const metricsHtml = sector.key_metrics
    .slice(0, 3)
    .map(m => `<li class="card-metric-item">${m}</li>`)
    .join("");

  card.innerHTML = `
    <div class="card-icon" aria-hidden="true">${icon}</div>
    <div>
      <div class="card-name-vn">${sector.name}</div>
      <div class="card-name-en">${sector.name_en}</div>
    </div>
    <p class="card-description">${sector.description}</p>
    <ul class="card-metrics">${metricsHtml}</ul>
    <div class="card-source-link">
      Source: <a href="${sector.official_source}" target="_blank" rel="noopener noreferrer">${sector.official_source.replace("https://", "")}</a>
    </div>
    <span class="card-arrow" aria-hidden="true">&#8599;</span>
  `;

  // Navigate to sector page on click or Enter key
  const navigateTo = () => {
    window.location.href = `sectors/${sector.id}.html`;
  };
  card.addEventListener("click", navigateTo);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); navigateTo(); }
  });

  return card;
}

/**
 * Render all sector cards into the grid container.
 */
async function renderSectorGrid() {
  const grid = document.getElementById("sector-grid");
  if (!grid) return;

  const sectors = await loadSectors();
  if (!sectors.length) {
    grid.innerHTML = `<p style="color:#888;grid-column:1/-1;text-align:center;">
      Unable to load sector data. Please serve this site via a local HTTP server.</p>`;
    return;
  }

  sectors.forEach(sector => {
    grid.appendChild(buildSectorCard(sector));
  });
}

/**
 * Highlight active nav link on sector pages.
 */
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll(".footer-links a").forEach(link => {
    if (link.getAttribute("href") && path.includes(link.getAttribute("href"))) {
      link.style.color = "var(--vn-yellow)";
    }
  });
}

/**
 * Init on DOM ready.
 */
document.addEventListener("DOMContentLoaded", () => {
  renderSectorGrid();
  setActiveNav();
});
