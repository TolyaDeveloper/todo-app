const switcher = document.querySelector('.menu__checkbox');
const page = document.querySelector('html');

if (localStorage.getItem('dark') === 'true') {
  page.dataset.theme = 'dark';
  switcher.setAttribute('checked', 'checked');
} else {
  page.dataset.theme = '';
  switcher.removeAttribute('checked');
}

switcher.addEventListener('change', (e) => {
  if (e.target.checked) {
    page.dataset.theme = 'dark';
    localStorage.setItem('dark', true);
  } else {
    page.dataset.theme = '';
    localStorage.setItem('dark', false);
  }
});
