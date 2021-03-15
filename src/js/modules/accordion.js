import {
  addActive,
  getLocal,
  removeActive,
  removeLocal,
  setLocal,
} from '../utils';
import { page } from './mode-switch';

const input = document.querySelector('.menu__popup-accordion');
const equalizerMenu = document.querySelector('.menu__range');
const range = document.querySelector('.menu__range-input');
const animation = document.querySelector('.menu__popup-animation');
const root = document.documentElement;

if (getLocal('fontSize')) {
  root.style.setProperty('--font-size-main', `${getLocal('fontSize')}px`);
  range.value = getLocal('fontSize');
}

if (getLocal('rangeOpened')) {
  input.setAttribute('checked', 'checked');
  addActive(equalizerMenu);
}

if (getLocal('animated')) {
  page.dataset.transition = '';
} else {
  page.dataset.transition = 'no';
  animation.removeAttribute('checked');
}

input.addEventListener('change', (e) => {
  if (e.target.checked) {
    addActive(equalizerMenu);
    setLocal('rangeOpened', true);
  } else {
    removeActive(equalizerMenu);
    removeLocal('rangeOpened');
  }
});

range.addEventListener('change', (e) => {
  const size = e.target.value;
  setLocal('fontSize', size);

  root.style.setProperty('--font-size-main', `${size}px`);
});

animation.addEventListener('change', (e) => {
  if (!e.target.checked) {
    page.dataset.transition = 'no';
    removeLocal('animated');
  } else {
    page.dataset.transition = '';
    setLocal('animated', true);
  }
});
