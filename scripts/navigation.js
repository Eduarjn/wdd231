const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');

menuButton.addEventListener('click', () => {
    menu.classList.toggle('open');
    menuButton.textContent = menu.classList.contains('open') ? '✖' : '☰';
});