// Home page member spotlights: 2-3 gold or silver members, chosen at random on every render.

const spotlightContainer = document.getElementById('spotlight-cards');

const membershipLabels = {
    2: { text: 'Silver', className: 'silver' },
    3: { text: 'Gold', className: 'gold' }
};

async function getSpotlights() {
    try {
        const response = await fetch('data/members.json');

        if (!response.ok) {
            throw new Error(`Could not load members.json (${response.status})`);
        }

        const data = await response.json();
        const eligible = data.members.filter((member) => member.membership === 2 || member.membership === 3);

        displaySpotlights(pickRandomMembers(eligible));
    } catch (error) {
        spotlightContainer.innerHTML = '<p class="error">Member spotlights are unavailable right now.</p>';
        console.error(error);
    }
}

function pickRandomMembers(members) {
    const shuffled = [...members].sort(() => Math.random() - 0.5);
    const count = Math.min(shuffled.length, Math.random() < 0.5 ? 2 : 3);
    return shuffled.slice(0, count);
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = '';

    members.forEach((member) => {
        const level = membershipLabels[member.membership];
        const websiteLabel = member.website.replace(/^https?:\/\/(www\.)?/, '');

        const card = document.createElement('section');
        card.classList.add('spotlight-card');
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" width="88" height="88" loading="lazy">
            <h3>${member.name}</h3>
            <p><span class="badge ${level.className}">${level.text}</span></p>
            <address>${member.address}</address>
            <p><a href="tel:${member.phone.replace(/[^+\d]/g, '')}">${member.phone}</a></p>
            <p><a href="${member.website}" target="_blank" rel="noopener">${websiteLabel}</a></p>
        `;

        spotlightContainer.appendChild(card);
    });
}

getSpotlights();
