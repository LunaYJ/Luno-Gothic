import '../scss/main.scss';
import { initIcons } from './core/icons';
import { initHighlight } from './core/highlight';

// 初始化 Font Awesome 图标
initIcons();

// 初始化代码高亮
initHighlight();

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

// 打赏弹窗切换
document.addEventListener('click', (event) => {
  const target = event.target;
  console.log('document click', target, event)
  if (!(target instanceof Element)) return;

  const rewardLink = target.closest('.reward-box a');
  if (rewardLink) {
    event.preventDefault();
    const rewardPop = document.querySelector('.reward-pop');
    if (rewardPop) {
      rewardPop.classList.toggle('pop-open');
    }
  }
});
