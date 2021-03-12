import { addActive, removeActive, input, activatePopup } from '../utils';
import { generate, message } from '../templates';

const form = document.querySelector('.form');
const modal = document.querySelector('[data-modal="todo"]');
const modalConfirm = document.querySelector('[data-modal="confirm"]');
const closers = document.querySelectorAll('[data-close]');
const closeAll = document.querySelector('[data-close-all]');

const btn = document.querySelector('.workplace__add');
const parent = document.querySelector('.workplace__inner');

btn.addEventListener('click', () => {
  addActive(modal);
  input('.form__input').focus();
});

closers.forEach((item) => {
  item.addEventListener('click', (e) => {
    if (input('.form__input').getText()) {
      addActive(modalConfirm);
    } else {
      removeActive(modal);
    }

    if (e.target.closest('.modal:not([data-modal="todo"])')) {
      removeActive(modalConfirm);
    }
  });
});

closeAll.addEventListener('click', () => {
  document.querySelectorAll('.modal').forEach((item) => {
    removeActive(item);
  });

  form.reset();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = input('.form__input').getText();

  if (text) {
    parent.insertAdjacentHTML('afterbegin', generate(text));
    removeActive(modal);
    form.reset();

    activatePopup('.popup-badge', message.add);
  }
});

parent.addEventListener('click', (e) => {
  const t = e.target;

  if (t.matches('.workplace__item-image')) {
    t.closest('.workplace__item').remove();
    activatePopup('.popup-badge', message.remove);
  }
});
