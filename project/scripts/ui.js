// Campinas Trails - shared interface pieces: the menu, the footer dates,
// the trail cards and the modal.

// ---------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------

export function setUpMenu() {
  const button = document.querySelector('#menu-button');
  const menu = document.querySelector('#menu');

  if (!button || !menu) {
    return;
  }

  button.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    button.setAttribute('aria-expanded', `${isOpen}`);
    button.textContent = isOpen ? '✕' : '☰';
  });
}

export function setFooterYear() {
  const year = document.querySelector('#year');

  if (year) {
    year.textContent = `${new Date().getFullYear()}`;
  }
}

// ---------------------------------------------------------------------
// Trail cards
// ---------------------------------------------------------------------

function difficultyClass(difficulty) {
  return `badge badge-${difficulty.toLowerCase()}`;
}

// One card. The first two images load eagerly because they sit above the
// fold on a phone; everything after that is deferred.
function buildCard(trail, index) {
  const article = document.createElement('article');
  article.className = 'trail-card';

  const loading = index < 2 ? 'eager' : 'lazy';

  article.innerHTML = `
    <img src="${trail.image}" alt="Illustration of the ${trail.name} trail"
         width="600" height="400" loading="${loading}" decoding="async">
    <div class="trail-body">
      <h3>${trail.name}</h3>
      <p class="trail-city">${trail.city}</p>
      <ul class="trail-facts">
        <li><span>Distance</span><strong>${trail.distanceKm} km</strong></li>
        <li><span>Difficulty</span><strong class="${difficultyClass(trail.difficulty)}">${trail.difficulty}</strong></li>
        <li><span>Time</span><strong>${trail.durationHours} h</strong></li>
        <li><span>Climb</span><strong>${trail.elevationGainM} m</strong></li>
      </ul>
      <button type="button" class="button details-button" data-trail="${trail.id}">
        Details
      </button>
    </div>`;

  return article;
}

export function renderTrails(trails, container) {
  container.textContent = '';

  if (trails.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'No trail matches those filters. Try widening them.';
    container.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  trails.forEach((trail, index) => fragment.appendChild(buildCard(trail, index)));
  container.appendChild(fragment);
}

// ---------------------------------------------------------------------
// Modal
// ---------------------------------------------------------------------

export function setUpModal(trails) {
  const dialog = document.querySelector('#trail-dialog');

  if (!dialog) {
    return;
  }

  const body = dialog.querySelector('#dialog-body');
  const closeButton = dialog.querySelector('#dialog-close');

  // One listener on the container handles every card, including the ones
  // added later by a filter.
  document.addEventListener('click', (event) => {
    const button = event.target.closest('.details-button');

    if (!button) {
      return;
    }

    const trail = trails.find((item) => item.id === button.dataset.trail);

    if (!trail) {
      return;
    }

    body.innerHTML = `
      <h2 id="dialog-title">${trail.name}</h2>
      <p class="trail-city">${trail.city}</p>
      <img src="${trail.image}" alt="Illustration of the ${trail.name} trail"
           width="600" height="400" loading="lazy" decoding="async">
      <p>${trail.description}</p>
      <dl class="dialog-facts">
        <dt>Distance</dt><dd>${trail.distanceKm} km</dd>
        <dt>Difficulty</dt><dd>${trail.difficulty}</dd>
        <dt>Walking time</dt><dd>${trail.durationHours} hours</dd>
        <dt>Elevation gain</dt><dd>${trail.elevationGainM} m</dd>
        <dt>Dogs</dt><dd>${trail.dogsAllowed ? 'Allowed' : 'Not allowed'}</dd>
        <dt>Best season</dt><dd>${trail.bestSeason}</dd>
      </dl>
      <p><a class="button" href="plan.html?trail=${trail.id}">Plan this hike</a></p>`;

    dialog.showModal();
  });

  closeButton.addEventListener('click', () => dialog.close());

  // Clicking the backdrop closes it too. The dialog element itself fills the
  // whole viewport, so a click that lands on it and not on the inner box is
  // a click outside the content.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
}
