// ================================================
// filtered-temples.js
// WDD 131 – Week 04 | Temple Album (Filtered)
// ================================================

// ── Temple Data Array ──────────────────────────
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // ── 3 extra temples required by assignment ──────
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg"
  },
  {
    templeName: "Porto Alegre Brazil",
    location: "Porto Alegre, Brazil",
    dedicated: "2000, December, 17",
    area: 13325,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/porto-alegre-brazil-temple/porto-alegre-brazil-temple-60459-main.jpg"
  },
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-13760-main.jpg"
  }
];

// ── Helper: extract the year from "YYYY, Month, D" ──
function getYear(dedicated) {
  return parseInt(dedicated.split(',')[0].trim(), 10);
}

// ── Build and render temple cards ─────────────────
function createTempleCard(temple) {
  const card = document.createElement('article');
  card.classList.add('temple-card');

  const year = getYear(temple.dedicated);

  card.innerHTML = `
    <img
      src="${temple.imageUrl}"
      alt="${temple.templeName} Temple"
      loading="lazy"
      width="400"
      height="250"
    >
    <div class="temple-card-body">
      <h2 class="temple-name">${temple.templeName}</h2>
      <div class="temple-meta">
        <span>
          <span class="meta-label">Location</span>
          <span class="meta-value">${temple.location}</span>
        </span>
        <span>
          <span class="meta-label">Dedicated</span>
          <span class="meta-value">${year}</span>
        </span>
        <span>
          <span class="meta-label">Area (sq ft)</span>
          <span class="meta-value">${temple.area.toLocaleString()}</span>
        </span>
      </div>
    </div>
  `;

  return card;
}

function displayTemples(list) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = ''; // clear existing cards

  list.forEach((temple, i) => {
    const card = createTempleCard(temple);
    // stagger delay for animation
    card.style.animationDelay = `${i * 0.06}s`;
    gallery.appendChild(card);
  });
}

// ── Filter Logic, A key for the project ───────────────────────────────────
const FILTER_CONFIG = {
  home:  { label: 'All Temples',                fn: () => true },
  old:   { label: 'Old (before 1900)',           fn: t => getYear(t.dedicated) < 1900 },
  new:   { label: 'New (after 2000)',            fn: t => getYear(t.dedicated) > 2000 },
  large: { label: 'Large (> 90,000 sq ft)',      fn: t => t.area > 90000 },
  small: { label: 'Small (< 10,000 sq ft)',      fn: t => t.area < 10000 },
};

function applyFilter(filterKey) {
  const config = FILTER_CONFIG[filterKey] || FILTER_CONFIG.home;
  const filtered = temples.filter(config.fn);
  displayTemples(filtered);

  // Update the filter label text
  const labelEl = document.getElementById('filter-label');
  if (labelEl) {
    labelEl.innerHTML = `Showing: <strong>${config.label}</strong>`;
  }
}

// ── Navigation click handling ──────────────────────
function initNav() {
  const navLinks = document.querySelectorAll('.nav-link');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Extract filter key from the href hash (e.g. "#Old" → "old")
      const hash = link.getAttribute('href').replace('#', '').toLowerCase();
      applyFilter(hash);

      // Update active state
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Close hamburger on mobile
      if (nav && hamburger) {
        nav.classList.remove('open');
        hamburger.innerHTML = '&#9776;';
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Hamburger toggle
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      hamburger.innerHTML = isOpen ? '&#10005;' : '&#9776;';
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
  }
}

// ── Footer: copyright year & last modified ─────────
function initFooter() {
  const yearSpan = document.getElementById('copyright-year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  const modSpan = document.getElementById('last-modified');
  if (modSpan) {
    modSpan.textContent = new Date(document.lastModified).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }
}

// ── Init ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initFooter();
  displayTemples(temples); // show all on load
});