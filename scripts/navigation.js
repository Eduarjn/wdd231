const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');

menuButton.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    menuButton.textContent = isOpen ? '✖' : '☰';
    menuButton.setAttribute('aria-expanded', isOpen);
});
