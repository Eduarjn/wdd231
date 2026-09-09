// Chamber member directory: loads members.json and renders it as cards or as a list.

const membersContainer = document.getElementById('members');
const gridButton = document.getElementById('grid-view');
const listButton = document.getElementById('list-view');

const membershipLabels = {
    1: { text: 'Member', className: 'basic' },
    2: { text: 'Silver', className: 'silver' },
    3: { text: 'Gold', className: 'gold' }
};

async function getMembers() {
    try {
        const response = await fetch('data/members.json');

        if (!response.ok) {
            throw new Error(`Could not load members.json (${response.status})`);
        }

        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        membersContainer.innerHTML =
            '<p class="error">The member directory is unavailable right now. Please try again later.</p>';
        console.error(error);
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = '';

    members.forEach((member) => {
        const card = document.createElement('section');
        card.classList.add('member');

        const level = membershipLabels[member.membership] ?? membershipLabels[1];

        // The website hostname is friendlier to read than the full URL.
        const websiteLabel = member.website.replace(/^https?:\/\/(www\.)?/, '');

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" width="96" height="96" loading="lazy">
            <h2>${member.name}</h2>
            <p class="tagline">${member.tagline}</p>
            <address>${member.address}</address>
            <p><a href="tel:${member.phone.replace(/[^+\d]/g, '')}">${member.phone}</a></p>
            <p><a href="${member.website}" target="_blank" rel="noopener">${websiteLabel}</a></p>
            <p class="founded">Serving Valinhos since ${member.founded}</p>
            <p><span class="badge ${level.className}">${level.text}</span></p>
        `;

        membersContainer.appendChild(card);
    });
}

function setView(view) {
    const isList = view === 'list';

    membersContainer.classList.toggle('list', isList);
    gridButton.setAttribute('aria-pressed', String(!isList));
    listButton.setAttribute('aria-pressed', String(isList));
}

gridButton.addEventListener('click', () => setView('grid'));
listButton.addEventListener('click', () => setView('list'));

getMembers();
