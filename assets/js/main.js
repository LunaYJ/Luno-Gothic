import '../scss/main.scss';

const html = document.documentElement;
const menuToggle = document.querySelector('[data-menu-toggle]');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const open = html.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
}

document.addEventListener('click', (event) => {
  if (!html.classList.contains('menu-open')) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (target.closest('.mobile-nav') || target.closest('[data-menu-toggle]')) return;
  html.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
});
