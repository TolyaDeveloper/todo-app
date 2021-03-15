import { page } from './mode-switch';

const input = document.querySelector('.menu__popup-accordion');
const equalizerMenu = document.querySelector('.menu__range');
const range = document.querySelector('.menu__range-input');
const animation = document.querySelector('.menu__popup-animation');
const root = document.documentElement;

input.addEventListener('change', (e) => {
  if (e.target.checked) {
    equalizerMenu.classList.add('active');
  } else {
    equalizerMenu.classList.remove('active');
  }
});

range.addEventListener('change', (e) => {
  const size = e.target.value;

  root.style.setProperty('--font-size-main', `${size}px`);
});

animation.addEventListener('change', (e) => {
  if (!e.target.checked) {
    page.dataset.transition = 'no';
  } else {
    page.dataset.transition = '';
  }
});
