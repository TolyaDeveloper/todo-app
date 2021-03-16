const toggleClick = (selector, target) => {
  const selectorItem = document.querySelector(selector);
  const popupItem = document.querySelector(target);

  selectorItem.addEventListener('click', () => {
    popupItem.classList.toggle('active');
  });
};

toggleClick('.menu__equalizer', '.menu__popup-inner');
