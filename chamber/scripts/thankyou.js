// Display the required form fields that arrived in the query string.
const params = new URLSearchParams(window.location.search);

function show(id, value) {
    document.getElementById(id).textContent = value ? value : 'Not provided';
}

show('sum-first', params.get('first'));
show('sum-last', params.get('last'));
show('sum-email', params.get('email'));
show('sum-phone', params.get('phone'));
show('sum-organization', params.get('organization'));

const stamp = params.get('timestamp');

if (stamp) {
    const loaded = new Date(stamp);
    document.getElementById('sum-timestamp').textContent = loaded.toLocaleString();
} else {
    document.getElementById('sum-timestamp').textContent = 'Not provided';
}
