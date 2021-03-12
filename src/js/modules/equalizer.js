const equalizer = document.querySelector('.menu__equalizer');
const popup = document.querySelector('.menu__popup-outer');

equalizer.addEventListener('click', () => {
  popup.classList.toggle('active');
});
