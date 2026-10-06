// Campinas Trails - the plan page.
// Fills the trail list in the form, preselects a trail when the modal sent
// one over in the query string, and remembers the hiker's name.

import { getTrails } from './data.js';
import { setUpMenu, setFooterYear } from './ui.js';

const STORAGE_KEY = 'campinas-trails-hiker';

const trailSelect = document.querySelector('#trail');
const nameInput = document.querySelector('#hiker-name');
const form = document.querySelector('#plan-form');

function fillTrailOptions(trails) {
  // Alphabetical, because a form is read rather than browsed.
  [...trails]
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((trail) => {
      const option = document.createElement('option');
      option.value = trail.name;
      option.textContent = `${trail.name} - ${trail.city} (${trail.difficulty})`;
      option.dataset.id = trail.id;
      trailSelect.appendChild(option);
    });
}

// The modal links here with ?trail=pedra-grande, so the form opens on the
// trail the visitor was already reading about.
function preselectFromQuery() {
  const wanted = new URLSearchParams(window.location.search).get('trail');

  if (!wanted) {
    return;
  }

  const match = [...trailSelect.options].find((option) => option.dataset.id === wanted);

  if (match) {
    trailSelect.value = match.value;
  }
}

function rememberName() {
  try {
    window.localStorage.setItem(STORAGE_KEY, nameInput.value.trim());
  } catch (error) {
    // storage blocked: the form still submits normally
  }
}

function restoreName() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved) {
      nameInput.value = saved;
    }
  } catch (error) {
    // nothing stored, nothing to restore
  }
}

async function init() {
  setUpMenu();
  setFooterYear();

  const trails = await getTrails();

  fillTrailOptions(trails);
  preselectFromQuery();
  restoreName();

  // Saving on submit rather than on every keystroke keeps the write to one
  // per visit.
  form.addEventListener('submit', rememberName);
}

init();
