export const addActive = (selector) => {
  selector.classList.add('active');
};

export const removeActive = (selector) => {
  selector.classList.remove('active');
};

export const input = (selector) => {
  const inp = document.querySelector(selector);

  return {
    getText() {
      return inp.value.trim();
    },
    focus() {
      inp.focus();
    },
  };
};

export const activatePopup = (selector, value) => {
  const popup = document.querySelector(selector);

  popup.textContent = value;
  popup.classList.add('active');

  setTimeout(() => popup.classList.remove('active'), 2000);
};
