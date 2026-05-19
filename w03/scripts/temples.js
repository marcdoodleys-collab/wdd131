// ================================================
// temples.js — WDD 131 | Week 02 | Temple Album
// ================================================

// ---------- Footer : année de copyright ----------
const yearSpan = document.getElementById('copyright-year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ---------- Footer : date de dernière modification ----------
const modifiedSpan = document.getElementById('last-modified');
if (modifiedSpan) {
  const lastMod = new Date(document.lastModified);
  modifiedSpan.textContent = lastMod.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ---------- Hamburger Menu ----------
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('main-nav');

if (hamburger && nav) {

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');

    // ☰  ouvert  →  ✕  fermé
    hamburger.innerHTML = isOpen ? '&#10005;' : '&#9776;';
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Fermer le menu quand on clique sur un lien
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.innerHTML = '&#9776;';
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

}