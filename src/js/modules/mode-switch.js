import { removeLocal, setLocal } from '../utils';

export const page = document.querySelector('html');
const switcher = document.querySelector('.menu__checkbox');

if (localStorage.getItem('dark')) {
  page.dataset.theme = 'dark';
  switcher.setAttribute('checked', 'checked');
} else {
  page.dataset.theme = '';
}

switcher.addEventListener('change', (e) => {
  if (e.target.checked) {
    page.dataset.theme = 'dark';
    setLocal('dark', true);
  } else {
    page.dataset.theme = '';
    removeLocal('dark');
  }
});
