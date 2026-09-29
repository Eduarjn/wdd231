// Discover page: builds the eight cards from the data module and greets the
// visitor based on how long it has been since they were last here.

import placesOfInterest from '../data/discover.mjs';

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
const VISIT_KEY = 'valinhos-chamber-last-visit';

const gallery = document.querySelector('#discover-gallery');
const visitMessage = document.querySelector('#visit-message');

// One card. The first image loads eagerly because it is above the fold on a
// phone; the rest are deferred.
function buildCard(place, index) {
    const card = document.createElement('section');
    card.className = `discover-card card${index + 1}`;

    const title = document.createElement('h2');
    title.textContent = place.name;

    const figure = document.createElement('figure');
    const image = document.createElement('img');
    image.src = place.image;
    image.alt = place.alt;
    image.width = 300;
    image.height = 200;
    image.loading = index === 0 ? 'eager' : 'lazy';
    figure.appendChild(image);

    const address = document.createElement('address');
    address.textContent = place.address;

    const description = document.createElement('p');
    description.textContent = place.description;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'learn-more';
    button.textContent = 'Learn more';
    button.setAttribute('aria-label', `Learn more about ${place.name}`);

    card.append(title, figure, address, description, button);
    return card;
}

function buildGallery(places) {
    const fragment = document.createDocumentFragment();

    places.forEach((place, index) => {
        fragment.appendChild(buildCard(place, index));
    });

    gallery.appendChild(fragment);
}

// Returns the message for this visit and stores the current timestamp.
function buildVisitMessage() {
    const now = Date.now();
    let previous = null;

    try {
        previous = window.localStorage.getItem(VISIT_KEY);
        window.localStorage.setItem(VISIT_KEY, `${now}`);
    } catch (error) {
        // private browsing or blocked storage: greet them as a first visit
        return 'Welcome! Let us know if you have any questions.';
    }

    if (!previous) {
        return 'Welcome! Let us know if you have any questions.';
    }

    const elapsed = now - Number(previous);

    if (elapsed < MILLISECONDS_PER_DAY) {
        return 'Back so soon! Awesome!';
    }

    const days = Math.floor(elapsed / MILLISECONDS_PER_DAY);
    const unit = days === 1 ? 'day' : 'days';

    return `You last visited ${days} ${unit} ago.`;
}

buildGallery(placesOfInterest);
visitMessage.textContent = buildVisitMessage();
