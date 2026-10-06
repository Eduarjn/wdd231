// Campinas Trails - the form action page.
// The form uses GET, so everything the hiker entered arrives in the query
// string and is read back with URLSearchParams.

import { setUpMenu, setFooterYear } from './ui.js';

const STORAGE_KEY = 'campinas-trails-plans';

const summary = document.querySelector('#plan-summary');
const intro = document.querySelector('#plan-intro');

// Which parameters become rows, and what to call each one on screen.
const FIELDS = [
  { key: 'hikerName', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'trail', label: 'Trail' },
  { key: 'hikeDate', label: 'Date' },
  { key: 'groupSize', label: 'People in the group' },
  { key: 'experience', label: 'Experience' },
  { key: 'notes', label: 'Notes' },
];

function addRow(label, value) {
  const term = document.createElement('dt');
  const detail = document.createElement('dd');

  term.textContent = label;
  // textContent, never innerHTML: these values came from the address bar.
  detail.textContent = value;

  summary.append(term, detail);
}

// Counts how many plans this browser has built, so the page can say
// something more useful than "thank you".
function countPlan() {
  try {
    const previous = Number(window.localStorage.getItem(STORAGE_KEY)) || 0;
    const total = previous + 1;
    window.localStorage.setItem(STORAGE_KEY, `${total}`);
    return total;
  } catch (error) {
    return 0;
  }
}

function render() {
  const params = new URLSearchParams(window.location.search);

  if (!params.has('trail')) {
    intro.textContent = 'This page was opened without sending the form, so there is nothing to show yet.';
    addRow('Nothing submitted', 'Open the plan page and send the form to see your summary here.');
    return;
  }

  const present = FIELDS.filter((field) => {
    const value = params.get(field.key);
    return value !== null && value.trim() !== '';
  });

  present.forEach((field) => addRow(field.label, params.get(field.key)));

  const gear = params.getAll('gear');
  addRow('Gear checklist', gear.length > 0 ? gear.join(', ') : 'Nothing selected');

  const total = countPlan();
  intro.textContent = total > 1
    ? `Here is your hike plan. That is ${total} plans you have built in this browser.`
    : 'Here is your hike plan, laid out the way you entered it.';
}

setUpMenu();
setFooterYear();
render();
