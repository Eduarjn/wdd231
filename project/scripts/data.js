// Campinas Trails - data access.
// One module owns the fetch so every page asks for the trails the same way.

const DATA_URL = 'data/trails.json';

let cache = null;

// Fetches the trail list. The try block is here rather than at the call site
// because a network failure has one sensible answer for the whole site: an
// empty list plus a message, instead of a page that silently shows nothing.
export async function getTrails() {
  if (cache) {
    return cache;
  }

  try {
    const response = await fetch(DATA_URL);

    if (!response.ok) {
      throw new Error(`The server answered ${response.status} for ${DATA_URL}`);
    }

    const trails = await response.json();
    cache = trails;
    return trails;
  } catch (error) {
    console.error('Could not load the trail data:', error.message);
    return [];
  }
}

// A single trail by id, used by the modal and by the plan page.
export async function getTrailById(id) {
  const trails = await getTrails();
  return trails.find((trail) => trail.id === id);
}
