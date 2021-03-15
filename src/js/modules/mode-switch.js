const switcher = document.querySelector('.menu__checkbox');
export const page = document.querySelector('html');

if (localStorage.getItem('dark')) {
  page.dataset.theme = 'dark';
  switcher.setAttribute('checked', 'checked');
} else {
  page.dataset.theme = '';
}

switcher.addEventListener('change', (e) => {
  if (e.target.checked) {
    page.dataset.theme = 'dark';
    localStorage.setItem('dark', true);
  } else {
    page.dataset.theme = '';
    localStorage.removeItem('dark');
  }
});
