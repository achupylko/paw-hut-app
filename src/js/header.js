const menu = document.querySelector('[data-menu]');
const openBtn = document.querySelector('[data-menu-open]');
const closeBtn = document.querySelector('[data-menu-close]');
const menuLinks = document.querySelectorAll('.mobile-nav a');

const closeMenu = () => {
  menu.classList.remove('is-open');
  document.body.style.overflow = ''; 
};

openBtn.addEventListener('click', () => {
  menu.classList.add('is-open');
  document.body.style.overflow = 'hidden'; 
});


closeBtn.addEventListener('click', closeMenu);


menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menu.classList.contains('is-open')) {
    closeMenu();
  }
});

menu.addEventListener('click', e => {
  if (e.target === menu) {
    closeMenu();
  }
});
