const input = document.querySelector('.menu__popup-accordion');
const equalizerMenu = document.querySelector('.menu__range');
const range = document.querySelector('.menu__range-input');
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
