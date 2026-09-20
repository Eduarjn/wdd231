// Timestamp of the moment the form was loaded by the browser.
document.getElementById('timestamp').value = new Date().toISOString();

// Membership level modals.
const levelLinks = document.querySelectorAll('.level-link');

levelLinks.forEach((link) => {
    link.addEventListener('click', () => {
        document.getElementById(link.dataset.modal).showModal();
    });
});

document.querySelectorAll('.close-modal').forEach((button) => {
    button.addEventListener('click', () => {
        button.closest('dialog').close();
    });
});

// Clicking the backdrop closes the dialog too.
document.querySelectorAll('.level-modal').forEach((modal) => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
});
