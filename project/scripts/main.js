// Campinas Trails - home page.
// Shows the three shortest easy trails as a starting point, plus the totals
// that describe the whole collection.

import { getTrails } from './data.js';
import { setUpMenu, setFooterYear, renderTrails, setUpModal } from './ui.js';

const FEATURED_COUNT = 3;

function buildSummary(trails) {
  const totalKm = trails.reduce((sum, trail) => sum + trail.distanceKm, 0);
  const cities = [...new Set(trails.map((trail) => trail.city))];
  const dogFriendly = trails.filter((trail) => trail.dogsAllowed).length;

  return [
    { label: 'Trails mapped', value: `${trails.length}` },
    { label: 'Cities covered', value: `${cities.length}` },
    { label: 'Kilometres in total', value: `${totalKm.toFixed(1)} km` },
    { label: 'Open to dogs', value: `${dogFriendly}` },
  ];
}

function renderSummary(trails) {
  const list = document.querySelector('#summary-list');

  if (!list) {
    return;
  }

  list.textContent = '';

  buildSummary(trails).forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.value}</strong><span>${item.label}</span>`;
    list.appendChild(li);
  });
}

function renderFeatured(trails) {
  const container = document.querySelector('#featured-trails');

  if (!container) {
    return;
  }

  // Easiest first, then shortest: the three a beginner should start with.
  const featured = trails
    .filter((trail) => trail.difficulty === 'Easy')
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, FEATURED_COUNT);

  renderTrails(featured, container);
}

async function init() {
  setUpMenu();
  setFooterYear();

  const trails = await getTrails();

  renderSummary(trails);
  renderFeatured(trails);
  setUpModal(trails);
}

init();
