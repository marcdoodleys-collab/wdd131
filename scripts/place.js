/**
 * place.js — WDD 131 · W03 Country Page · Haïti
 *
 * 1. Footer: current year + last modified date
 * 2. Wind chill: calculate and display (metric)
 */

/* ---- FOOTER ---- */
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

/* ---- WIND CHILL (Metric) ----
 *  Formula: 13.12 + 0.6215·T − 11.37·V^0.16 + 0.3965·T·V^0.16
 *  Valid when: T ≤ 10°C  AND  V > 4.8 km/h
 *  Otherwise: display "N/A"
 */

// Static values — must match the displayed weather content
const temperature = 32;   // °C  (Port-au-Prince average high)
const windSpeed   = 15;   // km/h

/**
 * calculateWindChill
 * @param {number} T - temperature in °C
 * @param {number} V - wind speed in km/h
 * @returns {number} wind chill index in °C
 */
function calculateWindChill(T, V) {
  return parseFloat((13.12 + 0.6215 * T - 11.37 * Math.pow(V, 0.16) + 0.3965 * T * Math.pow(V, 0.16)).toFixed(1));
}

const windChillEl = document.getElementById('wind-chill');

if (temperature <= 10 && windSpeed > 4.8) {
  windChillEl.textContent = calculateWindChill(temperature, windSpeed) + ' °C';
} else {
  windChillEl.textContent = 'N/A';
}