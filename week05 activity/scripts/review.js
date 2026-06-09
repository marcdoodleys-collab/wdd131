// ==============================
// Review counter (localStorage)
// ==============================
const COUNTER_KEY = "reviewCount";

function getCount() {
  return parseInt(localStorage.getItem(COUNTER_KEY) || "0", 10);
}

function incrementCount() {
  const next = getCount() + 1;
  localStorage.setItem(COUNTER_KEY, next);
  return next;
}

// ==============================
// Read submitted form data from URL params
// ==============================
function getParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key) || "—";
}

function formatStars(val) {
  const n = parseInt(val, 10);
  if (isNaN(n)) return "—";
  return "★".repeat(n) + "☆".repeat(5 - n) + ` (${n}/5)`;
}

// ==============================
// Product name lookup
// ==============================
const products = [
  { id: "fc-1888", name: "Flux Capacitor" },
  { id: "fc-2050", name: "Power Laces" },
  { id: "fs-1987", name: "Time Circuits" },
  { id: "ac-2000", name: "Low Voltage Reactor" },
  { id: "jj-1969", name: "Warp Equalizer" }
];

function getProductName(id) {
  const found = products.find(p => p.id === id);
  return found ? found.name : id;
}

// ==============================
// Build summary on page load
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  // Only increment if arrived via form submission (has query params)
  const hasParams = window.location.search.length > 1;
  const count = hasParams ? incrementCount() : getCount();

  // Update counter display
  const counterEl = document.getElementById("review-count");
  if (counterEl) counterEl.textContent = count;

  // Populate summary table
  const productId  = getParam("product-name");
  const rating     = getParam("rating");
  const installDate = getParam("install-date");
  const review     = getParam("written-review");
  const username   = getParam("username");

  // Features: can be multi-value
  const params = new URLSearchParams(window.location.search);
  const features = params.getAll("features");

  const setCell = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  setCell("sum-product",  getProductName(productId));
  setCell("sum-rating",   formatStars(rating));
  setCell("sum-date",     installDate !== "—" ? installDate : "Not specified");
  setCell("sum-features", features.length ? features.join(", ") : "None selected");
  setCell("sum-review",   review !== "—" ? review : "No written review");
  setCell("sum-username", username !== "—" ? username : "Anonymous");
});