// Campinas Trails - the full list, with filters that survive a page reload.

import { getTrails } from './data.js';
import { setUpMenu, setFooterYear, renderTrails, setUpModal } from './ui.js';

const STORAGE_KEY = 'campinas-trails-filters';

const difficultySelect = document.querySelector('#difficulty');
const citySelect = document.querySelector('#city');
const dogsCheckbox = document.querySelector('#dogs-only');
const countLine = document.querySelector('#result-count');
const container = document.querySelector('#trail-list');

function readFilters() {
  return {
    difficulty: difficultySelect.value,
    city: citySelect.value,
    dogsOnly: dogsCheckbox.checked,
  };
}

function saveFilters(filters) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  } catch (error) {
    // Private browsing blocks storage. The page still filters, it just
    // forgets the choice on the next visit.
  }
}

function restoreFilters() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return;
    }

    const saved = JSON.parse(raw);

    if (saved.difficulty) {
      difficultySelect.value = saved.difficulty;
    }

    if (saved.city) {
      citySelect.value = saved.city;
    }

    dogsCheckbox.checked = Boolean(saved.dogsOnly);
  } catch (error) {
    // A corrupted entry just means the defaults are used.
  }
}

// The city list is built from the data, so adding a trail in a new city
// never requires touching this file or the HTML.
function fillCityOptions(trails) {
  const cities = [...new Set(trails.map((trail) => trail.city))].sort();

  cities.forEach((city) => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });
}

function applyFilters(trails) {
  const filters = readFilters();

  const visible = trails.filter((trail) => {
    const matchesDifficulty = filters.difficulty === 'all' || trail.difficulty === filters.difficulty;
    const matchesCity = filters.city === 'all' || trail.city === filters.city;
    const matchesDogs = !filters.dogsOnly || trail.dogsAllowed;

    return matchesDifficulty && matchesCity && matchesDogs;
  });

  renderTrails(visible, container);

  countLine.textContent = visible.length === trails.length
    ? `Showing all ${trails.length} trails.`
    : `Showing ${visible.length} of ${trails.length} trails.`;

  saveFilters(filters);
}

async function init() {
  setUpMenu();
  setFooterYear();

  const trails = await getTrails();

  fillCityOptions(trails);
  restoreFilters();
  applyFilters(trails);
  setUpModal(trails);

  difficultySelect.addEventListener('change', () => applyFilters(trails));
  citySelect.addEventListener('change', () => applyFilters(trails));
  dogsCheckbox.addEventListener('change', () => applyFilters(trails));
}

init();
