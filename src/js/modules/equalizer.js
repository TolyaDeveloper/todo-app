import { removeActive } from '../utils';

const equalizer = document.querySelector('.menu__equalizer');
const popup = document.querySelector('.menu__popup-outer');
const showShortcuts = document.querySelector('[data-open="shortcuts"]');
const showShortcutsContainer = document.querySelector(
  '[data-modal="shortcuts"]'
);
const closeUIModals = document.querySelectorAll('[data-close-ui-modal]');

equalizer.addEventListener('click', () => {
  popup.classList.toggle('active');
});

showShortcuts.addEventListener('click', () => {
  showShortcutsContainer.classList.add('active');
});

closeUIModals.forEach((item) => {
  item.addEventListener('click', (e) => {
    removeActive(e.target.closest('[data-modal]'));
  });
});
